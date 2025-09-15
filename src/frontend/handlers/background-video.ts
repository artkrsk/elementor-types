/**
 * Background Video Handler
 *
 * Mirrors frontend/handlers/background-video.js
 * Handles background video functionality for sections and containers
 */

import type { Base } from './base';

/**
 * Background video settings
 */
export interface BackgroundVideoSettings {
	selectors: {
		backgroundVideoContainer: '.elementor-background-video-container';
		backgroundVideoEmbed: '.elementor-background-video-embed';
		backgroundVideoHosted: '.elementor-background-video-hosted';
	};
}

/**
 * Background video elements
 */
export interface BackgroundVideoElements {
	$backgroundVideoContainer: JQuery;
	$backgroundVideoEmbed: JQuery;
	$backgroundVideoHosted: JQuery;
	[key: string]: JQuery;
}

/**
 * Video size calculation result
 */
export interface VideoSizeResult {
	width: number;
	height: number;
}

/**
 * Background Video Handler
 * Manages background video playback for sections and containers
 */
export interface BackgroundVideoHandler extends Base {
	/**
	 * Video type (youtube, vimeo, hosted)
	 */
	videoType: 'youtube' | 'vimeo' | 'hosted';

	/**
	 * API provider for video service
	 */
	apiProvider: any;

	/**
	 * Video player instance
	 */
	player: any;

	/**
	 * Get default background video settings
	 */
	getDefaultSettings(): BackgroundVideoSettings;

	/**
	 * Get default background video elements
	 */
	getDefaultElements(): BackgroundVideoElements;

	/**
	 * Calculate video size for container
	 */
	calcVideosSize($video: JQuery): VideoSizeResult;

	/**
	 * Change video size to fit container
	 */
	changeVideoSize(): void;

	/**
	 * Start video loop with start/end times
	 */
	startVideoLoop(firstTime: boolean): void;

	/**
	 * Prepare Vimeo video player
	 */
	prepareVimeoVideo(Vimeo: any, videoLink: string): void;

	/**
	 * Handle Vimeo start/end times
	 */
	handleVimeoStartEndTimes(elementSettings: any): void;

	/**
	 * Prepare YouTube video player
	 */
	prepareYTVideo(YT: any, videoID: string): void;

	/**
	 * Activate background video
	 */
	activate(): void;

	/**
	 * Deactivate background video
	 */
	deactivate(): void;

	/**
	 * Run background video handler
	 */
	run(): void;

	/**
	 * Handle element setting changes
	 */
	onElementChange(propertyName: string): void;
}

/**
 * Constructor for BackgroundVideoHandler
 */
export interface BackgroundVideoHandlerConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): BackgroundVideoHandlerConstructor;
}

declare const BackgroundVideoHandler: BackgroundVideoHandlerConstructor;

export { BackgroundVideoHandler };
export default BackgroundVideoHandler;