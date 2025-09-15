/**
 * Background Control
 *
 * Mirrors editor/controls/background.js
 * Comprehensive background control with multiple types
 */

import type { ControlBaseDataView } from './base';

/**
 * Background types
 */
export type BackgroundType = 'classic' | 'gradient' | 'video' | 'slideshow';

/**
 * Background control configuration
 */
export interface BackgroundControlConfig {
	types: BackgroundType[];
	default: BackgroundType;
	selector: string;
	fields_options?: {
		background?: Record<string, any>;
		color?: Record<string, any>;
		color_stop?: Record<string, any>;
		color_b?: Record<string, any>;
		gradient_type?: Record<string, any>;
		gradient_angle?: Record<string, any>;
		gradient_position?: Record<string, any>;
		image?: Record<string, any>;
		position?: Record<string, any>;
		attachment?: Record<string, any>;
		attachment_alert?: Record<string, any>;
		repeat?: Record<string, any>;
		size?: Record<string, any>;
		bg_width?: Record<string, any>;
		video_link?: Record<string, any>;
		video_start?: Record<string, any>;
		video_end?: Record<string, any>;
		play_once?: Record<string, any>;
		play_on_mobile?: Record<string, any>;
		privacy_mode?: Record<string, any>;
		video_fallback?: Record<string, any>;
		slideshow_gallery?: Record<string, any>;
		slideshow_loop?: Record<string, any>;
		slideshow_slide_duration?: Record<string, any>;
		slideshow_slide_transition?: Record<string, any>;
		slideshow_transition_duration?: Record<string, any>;
		slideshow_ken_burns?: Record<string, any>;
		slideshow_ken_burns_zoom_direction?: Record<string, any>;
		slideshow_lazyload?: Record<string, any>;
	};
	[key: string]: any;
}

/**
 * Background Control
 * Comprehensive control for all background types and options
 */
export interface BackgroundControl extends ControlBaseDataView {
	/**
	 * Get background configuration
	 */
	getBackgroundConfig(): BackgroundControlConfig;

	/**
	 * Get current background type
	 */
	getCurrentBackgroundType(): BackgroundType;

	/**
	 * Set background type
	 */
	setBackgroundType(type: BackgroundType): void;

	/**
	 * Handle background type change
	 */
	onBackgroundTypeChange(newType: BackgroundType): void;

	/**
	 * Get background CSS
	 */
	getBackgroundCSS(): Record<string, string>;

	/**
	 * Validate background settings
	 */
	validateBackgroundSettings(): boolean;
}

/**
 * Constructor for BackgroundControl
 */
export interface BackgroundControlConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): BackgroundControlConstructor;
}

declare const BackgroundControl: BackgroundControlConstructor;

export { BackgroundControl };
export default BackgroundControl;