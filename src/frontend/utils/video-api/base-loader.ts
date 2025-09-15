/**
 * Video API Base Loader
 *
 * Mirrors frontend/utils/video-api/base-loader.js
 * Base class for video API loaders (YouTube, Vimeo, etc.)
 */

import type { ViewModule } from '../../../core/modules';

/**
 * Video loader settings configuration
 */
export interface VideoLoaderSettings {
	isInserted: boolean;
	selectors: {
		firstScript: string;
		[key: string]: string;
	};
	apiURL?: string;
	[key: string]: any;
}

/**
 * Video loader elements
 */
export interface VideoLoaderElements {
	$firstScript: JQuery;
	[key: string]: JQuery;
}

/**
 * Base Video API Loader
 * Provides common functionality for all video service loaders
 */
export interface BaseVideoLoader extends ViewModule {
	/**
	 * Get default settings for video loader
	 */
	getDefaultSettings(): VideoLoaderSettings;

	/**
	 * Get default elements
	 */
	getDefaultElements(): VideoLoaderElements;

	/**
	 * Insert video API script into DOM
	 */
	insertAPI(): void;

	/**
	 * Extract video ID from URL
	 */
	getVideoIDFromURL(url: string): string | null;

	/**
	 * Execute callback when API is ready
	 */
	onApiReady(callback: (apiObject: any) => void): void;

	/**
	 * Get autoplay version of video URL
	 */
	getAutoplayURL(videoURL: string): string;

	/**
	 * Get API URL for this video service
	 */
	getApiURL(): string;

	/**
	 * Get URL regex for extracting video ID
	 */
	getURLRegex(): RegExp;

	/**
	 * Check if API is loaded
	 */
	isApiLoaded(): boolean;

	/**
	 * Get API object
	 */
	getApiObject(): any;
}

/**
 * Constructor for BaseVideoLoader
 */
export interface BaseVideoLoaderConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): BaseVideoLoaderConstructor;
}

declare const BaseVideoLoader: BaseVideoLoaderConstructor;

export { BaseVideoLoader };
export default BaseVideoLoader;