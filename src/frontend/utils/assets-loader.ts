/**
 * Assets Loader Utility
 * Dynamic loading of scripts and stylesheets for Elementor frontend
 */

/**
 * Asset configuration
 */
export interface AssetConfig {
  /** Asset source URL */
  src: string;
  /** Parent element to append to ('head' | 'body') */
  parent?: 'head' | 'body';
  /** Element selector to insert before */
  before?: string;
  /** Promise loader for the asset */
  loader?: Promise<boolean>;
}

/**
 * Assets registry structure
 */
export interface AssetsRegistry {
  /** Script assets */
  script: {
    [key: string]: AssetConfig;
  };
  /** Style assets */
  style: {
    [key: string]: AssetConfig;
  };
}

/**
 * Assets Loader for dynamic script and stylesheet loading
 * Handles loading external resources with promises and prevents duplicates
 */
export declare class AssetsLoader {
  /** Global assets registry with predefined assets */
  static assets: AssetsRegistry;

  /**
   * Create script element with source
   * @param src - Script source URL
   * @returns Script element ready for DOM insertion
   */
  getScriptElement(src: string): HTMLScriptElement;

  /**
   * Create link element for stylesheet
   * @param src - Stylesheet source URL  
   * @returns Link element ready for DOM insertion
   */
  getStyleElement(src: string): HTMLLinkElement;

  /**
   * Load asset by type and key
   * @param type - Asset type ('script' | 'style')
   * @param key - Asset key from registry
   * @returns Promise that resolves when asset is loaded
   */
  load(type: 'script' | 'style', key: string): Promise<boolean>;

  /**
   * Check if asset is already loaded in DOM
   * @param assetData - Asset configuration
   * @param assetType - Asset type ('script' | 'style')
   * @returns True if asset is already loaded
   */
  isAssetLoaded(assetData: AssetConfig, assetType: 'script' | 'style'): boolean;

  /**
   * Load asset and return promise
   * @param assetData - Asset configuration
   * @param assetType - Asset type ('script' | 'style')
   * @returns Promise that resolves when asset loads
   */
  loadAsset(assetData: AssetConfig, assetType: 'script' | 'style'): Promise<boolean>;

  /**
   * Append asset element to DOM
   * @param assetData - Asset configuration
   * @param element - Element to append (script or link)
   */
  appendAsset(assetData: AssetConfig, element: HTMLScriptElement | HTMLLinkElement): void;
}

/**
 * Predefined assets available for loading
 */
export interface ElementorAssets {
  script: {
    /** Dialog library asset */
    dialog: AssetConfig;
    /** Share link functionality */
    'share-link': AssetConfig;
    /** Swiper library */
    swiper: AssetConfig;
  };
  style: {
    /** Swiper stylesheet */
    swiper: AssetConfig;
    /** Lightbox styles */
    'e-lightbox': AssetConfig;
  };
}