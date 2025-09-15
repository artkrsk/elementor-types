/**
 * Vimeo Video API Loader
 *
 * Mirrors frontend/utils/video-api/vimeo-loader.js
 * Loader for Vimeo video API integration
 */

import type { BaseVideoLoader } from './base-loader';

/**
 * Vimeo API configuration
 */
export interface VimeoAPIConfig {
	autoplay?: boolean;
	controls?: boolean;
	loop?: boolean;
	muted?: boolean;
	responsive?: boolean;
	[key: string]: any;
}

/**
 * Vimeo Video Loader
 * Handles Vimeo video API loading and integration
 */
export interface VimeoLoader extends BaseVideoLoader {
	/**
	 * Get Vimeo API URL
	 */
	getApiURL(): 'https://player.vimeo.com/api/player.js';

	/**
	 * Get Vimeo URL regex pattern
	 */
	getURLRegex(): RegExp;

	/**
	 * Check if Vimeo API is loaded
	 */
	isApiLoaded(): boolean;

	/**
	 * Get Vimeo API object
	 */
	getApiObject(): any;

	/**
	 * Create Vimeo player
	 */
	createPlayer(element: HTMLElement, videoId: string, config?: VimeoAPIConfig): any;

	/**
	 * Get video ID from Vimeo URL
	 */
	getVideoIDFromURL(url: string): string | null;
}

/**
 * Constructor for VimeoLoader
 */
export interface VimeoLoaderConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): VimeoLoaderConstructor;
}

declare const VimeoLoader: VimeoLoaderConstructor;

export { VimeoLoader };
export default VimeoLoader;