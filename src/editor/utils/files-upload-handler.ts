/**
 * Elementor Editor Files Upload Handler Utility
 *
 * Handles file uploads, drag & drop functionality, and file management
 * for the Elementor editor interface.
 */

/**
 * Upload file configuration
 */
export interface UploadFileConfig {
  /** Allowed file types */
  acceptedTypes?: string[];
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Multiple file selection */
  multiple?: boolean;
  /** Upload endpoint URL */
  url?: string;
  /** Additional form data */
  data?: Record<string, any>;
  /** Upload progress callback */
  onProgress?: (percent: number, file: File) => void;
  /** Upload success callback */
  onSuccess?: (response: any, file: File) => void;
  /** Upload error callback */
  onError?: (error: any, file: File) => void;
  /** Upload complete callback */
  onComplete?: (files: File[]) => void;
  /** File validation callback */
  onValidate?: (file: File) => boolean | string;
}

/**
 * Drag and drop configuration
 */
export interface DragDropConfig {
  /** Target drop zone element */
  dropZone: HTMLElement | JQuery | string;
  /** Accepted file types */
  acceptedTypes?: string[];
  /** Maximum file size */
  maxSize?: number;
  /** Multiple files allowed */
  multiple?: boolean;
  /** Drag enter callback */
  onDragEnter?: (event: DragEvent) => void;
  /** Drag leave callback */
  onDragLeave?: (event: DragEvent) => void;
  /** Drag over callback */
  onDragOver?: (event: DragEvent) => void;
  /** Drop callback */
  onDrop?: (files: FileList, event: DragEvent) => void;
  /** CSS classes for visual feedback */
  cssClasses?: {
    dragOver?: string;
    dragEnter?: string;
    dragLeave?: string;
    error?: string;
  };
}

/**
 * File validation result
 */
export interface FileValidationResult {
  /** Whether file is valid */
  valid: boolean;
  /** Error message if invalid */
  error?: string;
  /** Warning message */
  warning?: string;
}

/**
 * Upload progress information
 */
export interface UploadProgress {
  /** File being uploaded */
  file: File;
  /** Upload percentage (0-100) */
  percent: number;
  /** Bytes uploaded */
  loaded: number;
  /** Total file size */
  total: number;
  /** Upload speed in bytes/second */
  speed?: number;
  /** Estimated time remaining */
  timeRemaining?: number;
}

/**
 * File upload utilities
 */
export class FileUploadUtils {
  /**
   * Default accepted file types for different contexts
   */
  static readonly FILE_TYPES = {
    images: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ],
    videos: ["video/mp4", "video/webm", "video/ogg", "video/avi", "video/mov"],
    audio: ["audio/mp3", "audio/wav", "audio/ogg", "audio/m4a"],
    documents: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    archives: [
      "application/zip",
      "application/x-rar-compressed",
      "application/x-tar",
      "application/gzip",
    ],
    fonts: [
      "font/woff",
      "font/woff2",
      "font/ttf",
      "font/otf",
      "application/font-woff",
      "application/font-woff2",
    ],
  };

  /**
   * Default file size limits (in bytes)
   */
  static readonly SIZE_LIMITS = {
    image: 10 * 1024 * 1024, // 10MB
    video: 100 * 1024 * 1024, // 100MB
    audio: 50 * 1024 * 1024, // 50MB
    document: 25 * 1024 * 1024, // 25MB
    general: 5 * 1024 * 1024, // 5MB
  };

  /**
   * Validate file against criteria
   *
   * @param file - File to validate
   * @param acceptedTypes - Allowed file types
   * @param maxSize - Maximum file size
   * @returns Validation result
   */
  static validateFile(
    file: File,
    acceptedTypes?: string[],
    maxSize?: number
  ): FileValidationResult {
    // Check file type
    if (acceptedTypes && acceptedTypes.length > 0) {
      const isValidType = acceptedTypes.some((type) => {
        if (type.endsWith("/*")) {
          return file.type.startsWith(type.slice(0, -1));
        }
        return (
          file.type === type ||
          file.name.toLowerCase().endsWith(type.replace(/.*\//, "."))
        );
      });

      if (!isValidType) {
        return {
          valid: false,
          error: `File type "${
            file.type
          }" is not allowed. Accepted types: ${acceptedTypes.join(", ")}`,
        };
      }
    }

    // Check file size
    if (maxSize && file.size > maxSize) {
      return {
        valid: false,
        error: `File size (${this.formatFileSize(
          file.size
        )}) exceeds maximum allowed size (${this.formatFileSize(maxSize)})`,
      };
    }

    // Check for empty files
    if (file.size === 0) {
      return {
        valid: false,
        error: "File is empty",
      };
    }

    return { valid: true };
  }

  /**
   * Format file size for display
   *
   * @param bytes - File size in bytes
   * @returns Formatted file size string
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  /**
   * Get file type category
   *
   * @param file - File to categorize
   * @returns File type category
   */
  static getFileCategory(file: File): string {
    if (file.type.startsWith("image/")) return "image";
    if (file.type.startsWith("video/")) return "video";
    if (file.type.startsWith("audio/")) return "audio";
    if (
      file.type.includes("pdf") ||
      file.type.includes("document") ||
      file.type.includes("text")
    )
      return "document";
    if (
      file.type.includes("zip") ||
      file.type.includes("rar") ||
      file.type.includes("tar")
    )
      return "archive";
    if (
      file.type.includes("font") ||
      file.name.match(/\.(woff|woff2|ttf|otf)$/i)
    )
      return "font";
    return "general";
  }

  /**
   * Upload file via XMLHttpRequest
   *
   * @param file - File to upload
   * @param config - Upload configuration
   * @returns Promise resolving to upload response
   */
  static uploadFile(file: File, config: UploadFileConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      // Validate file
      const validation = this.validateFile(
        file,
        config.acceptedTypes,
        config.maxSize
      );
      if (!validation.valid) {
        const error = new Error(validation.error);
        config.onError?.(error, file);
        reject(error);
        return;
      }

      // Custom validation
      if (config.onValidate) {
        const customValidation = config.onValidate(file);
        if (customValidation !== true && typeof customValidation === "string") {
          const error = new Error(customValidation);
          config.onError?.(error, file);
          reject(error);
          return;
        }
      }

      // Create form data
      const formData = new FormData();
      formData.append("file", file);

      // Add additional data
      if (config.data) {
        Object.entries(config.data).forEach(([key, value]) => {
          formData.append(key, value);
        });
      }

      // Create XMLHttpRequest
      const xhr = new XMLHttpRequest();

      // Set up progress tracking
      let startTime = Date.now();
      let lastLoaded = 0;

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);

          // Calculate upload speed
          const currentTime = Date.now();
          const timeDiff = (currentTime - startTime) / 1000; // seconds
          const loadedDiff = event.loaded - lastLoaded;
          const speed = timeDiff > 0 ? loadedDiff / timeDiff : 0;

          // Calculate time remaining
          const remainingBytes = event.total - event.loaded;
          const timeRemaining = speed > 0 ? remainingBytes / speed : 0;

          lastLoaded = event.loaded;

          config.onProgress?.(percent, file);

          // Trigger custom progress event
          const progressInfo: UploadProgress = {
            file,
            percent,
            loaded: event.loaded,
            total: event.total,
            speed,
            timeRemaining,
          };

          // Dispatch custom event
          window.dispatchEvent(
            new CustomEvent("elementor:upload:progress", {
              detail: progressInfo,
            })
          );
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            config.onSuccess?.(response, file);
            resolve(response);
          } catch (error) {
            config.onError?.(error, file);
            reject(error);
          }
        } else {
          const error = new Error(
            `Upload failed with status ${xhr.status}: ${xhr.statusText}`
          );
          config.onError?.(error, file);
          reject(error);
        }
      });

      xhr.addEventListener("error", () => {
        const error = new Error("Upload failed due to network error");
        config.onError?.(error, file);
        reject(error);
      });

      xhr.addEventListener("abort", () => {
        const error = new Error("Upload was aborted");
        config.onError?.(error, file);
        reject(error);
      });

      // Send request
      const url = config.url || "/wp-admin/admin-ajax.php";
      xhr.open("POST", url);
      xhr.send(formData);
    });
  }

  /**
   * Upload multiple files
   *
   * @param files - Files to upload
   * @param config - Upload configuration
   * @returns Promise resolving to array of upload responses
   */
  static uploadMultipleFiles(
    files: FileList | File[],
    config: UploadFileConfig
  ): Promise<any[]> {
    const fileArray = Array.from(files);
    const uploadPromises = fileArray.map((file) =>
      this.uploadFile(file, config)
    );

    return Promise.allSettled(uploadPromises).then((results) => {
      const responses = results.map((result, index) => {
        if (result.status === "fulfilled") {
          return result.value;
        } else {
          console.error(
            "Upload failed for file:",
            fileArray[index].name,
            result.reason
          );
          return null;
        }
      });

      config.onComplete?.(fileArray);
      return responses;
    });
  }

  /**
   * Create file input element for uploads
   *
   * @param config - Upload configuration
   * @returns File input element
   */
  static createFileInput(config: UploadFileConfig): HTMLInputElement {
    const input = document.createElement("input");
    input.type = "file";
    input.style.display = "none";

    if (config.acceptedTypes) {
      input.accept = config.acceptedTypes.join(",");
    }

    if (config.multiple) {
      input.multiple = true;
    }

    input.addEventListener("change", (event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        if (config.multiple) {
          this.uploadMultipleFiles(files, config);
        } else {
          this.uploadFile(files[0], config);
        }
      }
    });

    return input;
  }

  /**
   * Setup drag and drop functionality
   *
   * @param config - Drag and drop configuration
   * @returns Cleanup function
   */
  static setupDragAndDrop(config: DragDropConfig): () => void {
    const dropZone =
      typeof config.dropZone === "string"
        ? (document.querySelector(config.dropZone) as HTMLElement)
        : config.dropZone instanceof HTMLElement
        ? config.dropZone
        : (config.dropZone as JQuery)[0];

    if (!dropZone) {
      throw new Error("Drop zone element not found");
    }

    const classes = config.cssClasses || {};

    // Prevent default drag behaviors
    const preventDefaults = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // Highlight drop area when item is dragged over it
    const highlight = (e: Event) => {
      const dragEvent = e as DragEvent;
      if (classes.dragOver) {
        dropZone.classList.add(classes.dragOver);
      }
      config.onDragOver?.(dragEvent);
    };

    // Unhighlight drop area when item is dragged away
    const unhighlight = (e: Event) => {
      const dragEvent = e as DragEvent;
      if (classes.dragOver) {
        dropZone.classList.remove(classes.dragOver);
      }
      config.onDragLeave?.(dragEvent);
    };

    // Handle dropped files
    const handleDrop = (e: Event) => {
      const dragEvent = e as DragEvent;
      unhighlight(e);

      const files = dragEvent.dataTransfer?.files;
      if (!files || files.length === 0) {
        return;
      }

      // Validate multiple files
      if (!config.multiple && files.length > 1) {
        console.error("Multiple files not allowed");
        return;
      }

      // Validate each file
      const validFiles: File[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const validation = this.validateFile(
          file,
          config.acceptedTypes,
          config.maxSize
        );

        if (validation.valid) {
          validFiles.push(file);
        } else {
          console.error("File validation failed:", file.name, validation.error);
        }
      }

      if (validFiles.length > 0) {
        const fileList = new DataTransfer();
        validFiles.forEach((file) => fileList.items.add(file));
        config.onDrop?.(fileList.files, dragEvent);
      }
    };

    // Handle drag enter
    const handleDragEnter = (e: Event) => {
      const dragEvent = e as DragEvent;
      if (classes.dragEnter) {
        dropZone.classList.add(classes.dragEnter);
      }
      config.onDragEnter?.(dragEvent);
    };

    // Add event listeners
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      dropZone.addEventListener(eventName, preventDefaults, false);
      document.body.addEventListener(eventName, preventDefaults, false);
    });

    ["dragenter", "dragover"].forEach((eventName) => {
      dropZone.addEventListener(eventName, highlight, false);
    });

    dropZone.addEventListener("dragenter", handleDragEnter, false);
    dropZone.addEventListener("dragleave", unhighlight, false);
    dropZone.addEventListener("drop", handleDrop, false);

    // Return cleanup function
    return () => {
      ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
        dropZone.removeEventListener(eventName, preventDefaults, false);
        document.body.removeEventListener(eventName, preventDefaults, false);
      });

      ["dragenter", "dragover"].forEach((eventName) => {
        dropZone.removeEventListener(eventName, highlight, false);
      });

      dropZone.removeEventListener("dragenter", handleDragEnter, false);
      dropZone.removeEventListener("dragleave", unhighlight, false);
      dropZone.removeEventListener("drop", handleDrop, false);
    };
  }

  /**
   * Create WordPress media uploader instance
   *
   * @param config - Media uploader configuration
   * @returns Media uploader instance
   */
  static createMediaUploader(
    config: {
      title?: string;
      button?: string;
      multiple?: boolean;
      library?: { type?: string };
      onSelect?: (attachments: any[]) => void;
    } = {}
  ): any {
    if (typeof (window as any).wp?.media?.frames?.file === "undefined") {
      console.error("WordPress media library not available");
      return null;
    }

    const mediaUploader = ((window as any).wp.media.frames.file = (
      window as any
    ).wp.media({
      title: config.title || "Select Media",
      button: {
        text: config.button || "Choose Media",
      },
      multiple: config.multiple || false,
      library: config.library || { type: "image" },
    }));

    mediaUploader.on("select", () => {
      const selection = mediaUploader.state().get("selection");
      const attachments = selection.toJSON();
      config.onSelect?.(attachments);
    });

    return mediaUploader;
  }

  /**
   * Upload file to WordPress media library
   *
   * @param file - File to upload
   * @param config - Upload configuration
   * @returns Promise resolving to attachment data
   */
  static uploadToMediaLibrary(
    file: File,
    config: UploadFileConfig = {}
  ): Promise<any> {
    const uploadConfig: UploadFileConfig = {
      url: (globalThis as any).ajaxurl || "/wp-admin/admin-ajax.php",
      data: {
        action: "upload-attachment",
        _wpnonce: (globalThis as any)._wpnonce || "",
      },
      ...config,
    };

    return this.uploadFile(file, uploadConfig);
  }

  /**
   * Get file icon class based on file type
   *
   * @param file - File object
   * @returns CSS class for file icon
   */
  static getFileIcon(file: File): string {
    const extension = file.name.split(".").pop()?.toLowerCase() || "";
    const iconMap: Record<string, string> = {
      // Images
      jpg: "eicon-image",
      jpeg: "eicon-image",
      png: "eicon-image",
      gif: "eicon-image",
      svg: "eicon-image",
      webp: "eicon-image",

      // Videos
      mp4: "eicon-video-camera",
      avi: "eicon-video-camera",
      mov: "eicon-video-camera",
      webm: "eicon-video-camera",

      // Audio
      mp3: "eicon-music",
      wav: "eicon-music",
      ogg: "eicon-music",

      // Documents
      pdf: "eicon-document-file",
      doc: "eicon-document-file",
      docx: "eicon-document-file",
      txt: "eicon-document-file",

      // Archives
      zip: "eicon-archive-title",
      rar: "eicon-archive-title",
      tar: "eicon-archive-title",

      // Fonts
      woff: "eicon-font",
      woff2: "eicon-font",
      ttf: "eicon-font",
      otf: "eicon-font",
    };

    return iconMap[extension] || "eicon-document-file";
  }
}

/**
 * File upload progress tracker
 */
export class UploadProgressTracker {
  private uploads: Map<string, UploadProgress> = new Map();
  private callbacks: {
    onProgress?: (uploads: UploadProgress[]) => void;
    onComplete?: (fileId: string, result: any) => void;
    onError?: (fileId: string, error: any) => void;
  } = {};

  /**
   * Constructor
   *
   * @param callbacks - Progress tracking callbacks
   */
  constructor(
    callbacks: {
      onProgress?: (uploads: UploadProgress[]) => void;
      onComplete?: (fileId: string, result: any) => void;
      onError?: (fileId: string, error: any) => void;
    } = {}
  ) {
    this.callbacks = callbacks;
  }

  /**
   * Start tracking file upload
   *
   * @param file - File being uploaded
   * @returns File ID for tracking
   */
  startTracking(file: File): string {
    const fileId = `${file.name}_${file.size}_${Date.now()}`;
    this.uploads.set(fileId, {
      file,
      percent: 0,
      loaded: 0,
      total: file.size,
    });
    return fileId;
  }

  /**
   * Update upload progress
   *
   * @param fileId - File ID
   * @param progress - Progress information
   */
  updateProgress(fileId: string, progress: Partial<UploadProgress>): void {
    const existing = this.uploads.get(fileId);
    if (existing) {
      const updated = { ...existing, ...progress };
      this.uploads.set(fileId, updated);
      this.callbacks.onProgress?.(Array.from(this.uploads.values()));
    }
  }

  /**
   * Complete upload tracking
   *
   * @param fileId - File ID
   * @param result - Upload result
   */
  completeUpload(fileId: string, result: any): void {
    this.uploads.delete(fileId);
    this.callbacks.onComplete?.(fileId, result);
    this.callbacks.onProgress?.(Array.from(this.uploads.values()));
  }

  /**
   * Handle upload error
   *
   * @param fileId - File ID
   * @param error - Upload error
   */
  errorUpload(fileId: string, error: any): void {
    this.uploads.delete(fileId);
    this.callbacks.onError?.(fileId, error);
    this.callbacks.onProgress?.(Array.from(this.uploads.values()));
  }

  /**
   * Get all active uploads
   *
   * @returns Array of active upload progress
   */
  getActiveUploads(): UploadProgress[] {
    return Array.from(this.uploads.values());
  }

  /**
   * Clear all tracking
   */
  clear(): void {
    this.uploads.clear();
    this.callbacks.onProgress?.([]);
  }
}

// Global upload events
declare global {
  interface WindowEventMap {
    "elementor:upload:progress": CustomEvent<UploadProgress>;
    "elementor:upload:complete": CustomEvent<{ file: File; result: any }>;
    "elementor:upload:error": CustomEvent<{ file: File; error: any }>;
  }
}
