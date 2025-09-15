/**
 * YouTube Video API Loader
 *
 * Mirrors frontend/utils/video-api/youtube-loader.js
 * Loader for YouTube video API integration
 */

import type { BaseVideoLoader } from './base-loader';

/**
 * YouTube API configuration
 */
export interface YouTubeAPIConfig {
	playerVars?: {
		autoplay?: 0 | 1;
		controls?: 0 | 1;
		rel?: 0 | 1;
		mute?: 0 | 1;
		[key: string]: any;
	};
	events?: {
		onReady?: (event: any) => void;
		onStateChange?: (event: any) => void;
		[key: string]: any;
	};
}

/**
 * YouTube Video Loader
 * Handles YouTube video API loading and integration
 */
export interface YouTubeLoader extends BaseVideoLoader {
	/**
	 * Get YouTube API URL
	 */
	getApiURL(): 'https://www.youtube.com/iframe_api';

	/**
	 * Get YouTube URL regex pattern
	 */
	getURLRegex(): RegExp;

	/**
	 * Check if YouTube API is loaded
	 */
	isApiLoaded(): boolean;

	/**
	 * Get YouTube API object
	 */
	getApiObject(): any;

	/**
	 * Create YouTube player
	 */
	createPlayer(element: HTMLElement, videoId: string, config?: YouTubeAPIConfig): any;

	/**
	 * Get video ID from YouTube URL
	 */
	getVideoIDFromURL(url: string): string | null;
}

/**
 * Constructor for YouTubeLoader
 */
export interface YouTubeLoaderConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): YouTubeLoaderConstructor;
}

declare const YouTubeLoader: YouTubeLoaderConstructor;

export { YouTubeLoader };
export default YouTubeLoader;