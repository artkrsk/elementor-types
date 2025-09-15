/**
 * Video Handler
 *
 * Mirrors frontend/handlers/video.js
 * Handles video widget functionality
 */

import type { Base } from './base';

/**
 * Video settings
 */
export interface VideoSettings {
	selectors: {
		iframe: 'iframe';
		video: 'video';
		playButton: '.elementor-custom-embed-play';
		imageOverlay: '.elementor-custom-embed-image-overlay';
	};
}

/**
 * Video elements
 */
export interface VideoElements {
	$iframe: JQuery;
	$video: JQuery;
	$playButton: JQuery;
	$imageOverlay: JQuery;
	[key: string]: JQuery;
}

/**
 * Video Handler
 * Manages video widget with custom controls and overlays
 */
export interface VideoHandler extends Base {
	/**
	 * Get default video settings
	 */
	getDefaultSettings(): VideoSettings;

	/**
	 * Get default video elements
	 */
	getDefaultElements(): VideoElements;

	/**
	 * Bind video events
	 */
	bindEvents(): void;

	/**
	 * Handle play button click
	 */
	handlePlay(): void;

	/**
	 * Handle video aspect ratio
	 */
	handleAspectRatio(): void;

	/**
	 * Check if video is hosted
	 */
	isHosted(): boolean;

	/**
	 * Get video source URL
	 */
	getVideoUrl(): string;
}

/**
 * Constructor for VideoHandler
 */
export interface VideoHandlerConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): VideoHandlerConstructor;
}

declare const VideoHandler: VideoHandlerConstructor;

export { VideoHandler };
export default VideoHandler;