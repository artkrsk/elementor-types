/**
 * Elementor Editor Images Manager Utility
 *
 * Handles image management, loading, caching, and processing for the editor.
 * Provides image optimization and metadata retrieval functionality.
 */

// Global declarations
declare const elementor: any;

/**
 * Timer type for debouncing
 */
type Timer = ReturnType<typeof setTimeout>;

/**
 * Image dimension configuration
 */
export interface ImageDimension {
  /** Image width */
  width?: number | string;
  /** Image height */
  height?: number | string;
}

/**
 * Image configuration for requests
 */
export interface ImageConfig {
  /** Image ID */
  id?: number | string;
  /** Image URL */
  url?: string;
  /** Image size name */
  size?: string;
  /** Custom dimensions */
  dimension?: ImageDimension;
  /** Alt text */
  alt?: string;
  /** Image title */
  title?: string;
  /** Image description */
  description?: string;
  /** Image caption */
  caption?: string;
  /** Additional metadata */
  [key: string]: any;
}

/**
 * Image details response from server
 */
export interface ImageDetails {
  /** Image ID */
  id: number;
  /** Image URL */
  url: string;
  /** Image width */
  width: number;
  /** Image height */
  height: number;
  /** File size in bytes */
  filesize: number;
  /** Image sizes available */
  sizes: Record<
    string,
    {
      url: string;
      width: number;
      height: number;
    }
  >;
  /** Image metadata */
  meta: {
    alt?: string;
    title?: string;
    description?: string;
    caption?: string;
    [key: string]: any;
  };
}

/**
 * Images cache entry
 */
export interface ImageCacheEntry {
  /** Image details */
  details: ImageDetails;
  /** Cache timestamp */
  timestamp: number;
  /** Cache expiry time */
  expiry?: number;
}

/**
 * View update callback function
 */
export type ViewUpdateCallback = (view: any) => void;

/**
 * Images Manager Class
 *
 * Manages image loading, caching, and processing throughout the editor.
 */
export class ImagesManager {
  /** Image cache storage */
  private cache: Record<string, ImageCacheEntry> = {};

  /** Debounce delay for API requests */
  private debounceDelay: number = 300;

  /** Registered items for updates */
  private registeredItems: string[] = [];

  /** Views to update after image loading */
  private viewsToUpdate: Record<string, any> = {};

  /** Debounced update functions */
  private debouncedUpdates: Record<string, Timer> = {};

  /**
   * Get normalized size string for caching
   *
   * @param image - Image configuration
   * @returns Normalized size string
   */
  private getNormalizedSize(image: ImageConfig): string {
    let size: string;
    const imageSize = image.size;

    if (imageSize === "custom") {
      const customDimension = image.dimension;

      if (customDimension?.width || customDimension?.height) {
        size = `custom_${customDimension.width || 0}x${
          customDimension.height || 0
        }`;
      } else {
        return "full";
      }
    } else {
      size = imageSize || "full";
    }

    return size;
  }

  /**
   * Get cache key for image
   *
   * @param imageId - Image ID
   * @param size - Image size
   * @returns Cache key
   */
  private getCacheKey(imageId: string | number, size: string): string {
    return `${imageId}_${size}`;
  }

  /**
   * Check if cache entry is valid
   *
   * @param entry - Cache entry
   * @returns Whether cache is valid
   */
  private isCacheValid(entry: ImageCacheEntry): boolean {
    const now = Date.now();
    if (entry.expiry && now > entry.expiry) {
      return false;
    }
    // Default cache validity: 5 minutes
    const defaultExpiry = entry.timestamp + 5 * 60 * 1000;
    return now < defaultExpiry;
  }

  /**
   * Store image details in cache
   *
   * @param imageId - Image ID
   * @param size - Image size
   * @param details - Image details
   * @param expiry - Custom expiry time
   */
  private setCache(
    imageId: string | number,
    size: string,
    details: ImageDetails,
    expiry?: number
  ): void {
    const cacheKey = this.getCacheKey(imageId, size);
    this.cache[cacheKey] = {
      details,
      timestamp: Date.now(),
      expiry,
    };
  }

  /**
   * Get image details from cache
   *
   * @param imageId - Image ID
   * @param size - Image size
   * @returns Cached image details or null
   */
  private getCache(
    imageId: string | number,
    size: string
  ): ImageDetails | null {
    const cacheKey = this.getCacheKey(imageId, size);
    const entry = this.cache[cacheKey];

    if (entry && this.isCacheValid(entry)) {
      return entry.details;
    }

    // Remove invalid cache
    if (entry) {
      delete this.cache[cacheKey];
    }

    return null;
  }

  /**
   * Update views after receiving image details
   */
  updateOnReceiveImage(): void {
    const elementView = (elementor as any)
      ?.getPanelView()
      ?.getCurrentPageView()
      ?.getOption("editedElementView");

    if (elementView) {
      elementView.$el.addClass("elementor-loading");
      // Add per cid for multiple images in a single view
      this.viewsToUpdate[elementView.cid] = elementView;

      // Listen for details received event
      (elementor as any)?.channels?.editor?.once(
        "imagesManager:detailsReceived",
        () => {
          if (Object.keys(this.viewsToUpdate).length > 0) {
            Object.values(this.viewsToUpdate).forEach((view: any) => {
              view.render();
              view.$el.removeClass("elementor-loading");
            });
          }
          this.viewsToUpdate = {};
        }
      );
    }
  }

  /**
   * Get image details with caching
   *
   * @param image - Image configuration
   * @param callback - Callback function
   */
  getImageDetails(
    image: ImageConfig,
    callback?: (details: ImageDetails) => void
  ): void {
    if (!image.id) {
      if (callback) callback({} as ImageDetails);
      return;
    }

    const size = this.getNormalizedSize(image);
    const cached = this.getCache(image.id, size);

    if (cached) {
      if (callback) callback(cached);
      return;
    }

    // Debounce API requests
    const requestKey = `${image.id}_${size}`;
    if (this.debouncedUpdates[requestKey]) {
      clearTimeout(this.debouncedUpdates[requestKey]);
    }

    this.debouncedUpdates[requestKey] = setTimeout(() => {
      this.fetchImageDetails(image, size, callback);
      delete this.debouncedUpdates[requestKey];
    }, this.debounceDelay);
  }

  /**
   * Fetch image details from server
   *
   * @param image - Image configuration
   * @param size - Normalized size
   * @param callback - Callback function
   */
  private fetchImageDetails(
    image: ImageConfig,
    size: string,
    callback?: (details: ImageDetails) => void
  ): void {
    // Mock API call - in real implementation, this would call WordPress media API
    const requestData = {
      action: "elementor_get_image_details",
      id: image.id,
      size: size,
      nonce: (elementor as any)?.config?.nonce || "",
    };

    // Simulate API call
    if (typeof jQuery !== "undefined" && (jQuery as any).post) {
      (jQuery as any)
        .post(
          (elementor as any)?.config?.ajaxurl || "/wp-admin/admin-ajax.php",
          requestData
        )
        .done((response: any) => {
          if (response.success && response.data) {
            const details = response.data as ImageDetails;
            this.setCache(image.id!, size, details);

            if (callback) callback(details);

            // Trigger global event
            (elementor as any)?.channels?.editor?.trigger(
              "imagesManager:detailsReceived",
              details
            );
          } else {
            if (callback) callback({} as ImageDetails);
          }
        })
        .fail(() => {
          if (callback) callback({} as ImageDetails);
        });
    } else {
      // Fallback: return basic details
      const fallbackDetails: ImageDetails = {
        id: Number(image.id),
        url: image.url || "",
        width: 0,
        height: 0,
        filesize: 0,
        sizes: {},
        meta: {},
      };

      if (callback) callback(fallbackDetails);
    }
  }

  /**
   * Get image URL for specific size
   *
   * @param image - Image configuration
   * @param size - Image size
   * @returns Image URL
   */
  getImageUrl(image: ImageConfig, size: string = "full"): string {
    if (!image.id) {
      return image.url || "";
    }

    const normalizedSize = this.getNormalizedSize({ ...image, size });
    const cached = this.getCache(image.id, normalizedSize);

    if (cached) {
      if (size === "full") {
        return cached.url;
      } else if (cached.sizes[size]) {
        return cached.sizes[size].url;
      }
    }

    return image.url || "";
  }

  /**
   * Preload images for better performance
   *
   * @param images - Array of image configurations
   */
  preloadImages(images: ImageConfig[]): void {
    images.forEach((image) => {
      if (image.id) {
        this.getImageDetails(image);
      }
    });
  }

  /**
   * Clear image cache
   *
   * @param imageId - Specific image ID to clear, or undefined to clear all
   */
  clearCache(imageId?: string | number): void {
    if (imageId) {
      Object.keys(this.cache).forEach((key) => {
        if (key.startsWith(`${imageId}_`)) {
          delete this.cache[key];
        }
      });
    } else {
      this.cache = {};
    }
  }

  /**
   * Register item for image updates
   *
   * @param item - Item identifier
   */
  registerItem(item: string): void {
    if (!this.registeredItems.includes(item)) {
      this.registeredItems.push(item);
    }
  }

  /**
   * Unregister item from updates
   *
   * @param item - Item identifier
   */
  unregisterItem(item: string): void {
    const index = this.registeredItems.indexOf(item);
    if (index > -1) {
      this.registeredItems.splice(index, 1);
    }
  }

  /**
   * Get cache statistics
   *
   * @returns Cache statistics
   */
  getCacheStats(): {
    totalEntries: number;
    validEntries: number;
    expiredEntries: number;
    memoryUsage: number;
  } {
    const totalEntries = Object.keys(this.cache).length;
    let validEntries = 0;
    let expiredEntries = 0;

    Object.values(this.cache).forEach((entry) => {
      if (this.isCacheValid(entry)) {
        validEntries++;
      } else {
        expiredEntries++;
      }
    });

    return {
      totalEntries,
      validEntries,
      expiredEntries,
      memoryUsage: JSON.stringify(this.cache).length,
    };
  }

  /**
   * Clean expired cache entries
   */
  cleanupCache(): void {
    Object.keys(this.cache).forEach((key) => {
      if (!this.isCacheValid(this.cache[key])) {
        delete this.cache[key];
      }
    });
  }
}

/**
 * Export singleton instance for global use
 */
export const imagesManager = new ImagesManager();
