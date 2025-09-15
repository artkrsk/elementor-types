/**
 * Lightbox
 *
 * Mirrors frontend/utils/lightbox/lightbox.js
 * Main lightbox implementation for media display
 */

import type { ViewModule } from '../../../core/modules';

/**
 * Lightbox configuration
 */
export interface LightboxConfig {
	type?: 'image' | 'video' | 'iframe';
	url?: string;
	title?: string;
	description?: string;
	width?: number;
	height?: number;
	autoplay?: boolean;
	[key: string]: any;
}

/**
 * Slide configuration for lightbox
 */
export interface LightboxSlide {
	image?: string;
	video?: string;
	title?: string;
	description?: string;
	type: 'image' | 'video' | 'iframe';
	[key: string]: any;
}

/**
 * Lightbox
 * Handles media lightbox display and navigation
 */
export interface Lightbox extends ViewModule {
	/**
	 * Current slide index
	 */
	currentSlide: number;

	/**
	 * Array of slides
	 */
	slides: LightboxSlide[];

	/**
	 * Lightbox dialog instance
	 */
	dialog: any;

	/**
	 * Create lightbox from element
	 */
	createLightbox(element: HTMLElement): void;

	/**
	 * Create lightbox from slides
	 */
	createLightboxFromSlides(slides: LightboxSlide[], startSlide?: number): void;

	/**
	 * Show lightbox
	 */
	show(): void;

	/**
	 * Hide lightbox
	 */
	hide(): void;

	/**
	 * Navigate to next slide
	 */
	next(): void;

	/**
	 * Navigate to previous slide
	 */
	previous(): void;

	/**
	 * Go to specific slide
	 */
	goToSlide(index: number): void;

	/**
	 * Get slide content
	 */
	getSlideContent(slide: LightboxSlide): string;

	/**
	 * Handle keyboard navigation
	 */
	onKeyDown(event: KeyboardEvent): void;

	/**
	 * Initialize lightbox
	 */
	initialize(): void;

	/**
	 * Destroy lightbox
	 */
	destroy(): void;
}

/**
 * Constructor for Lightbox
 */
export interface LightboxConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): LightboxConstructor;
}

declare const Lightbox: LightboxConstructor;

export { Lightbox };
export default Lightbox;