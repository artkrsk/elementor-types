/**
 * Background Slideshow Handler
 *
 * Mirrors frontend/handlers/background-slideshow.js
 * Handles background slideshow functionality using Swiper
 */

import type { BaseSwiperHandler } from './base-swiper';

/**
 * Background slideshow settings
 */
export interface BackgroundSlideshowSettings {
	classes: {
		swiperContainer: 'elementor-background-slideshow swiper';
		swiperWrapper: 'swiper-wrapper';
		swiperSlide: 'elementor-background-slideshow__slide swiper-slide';
		swiperPreloader: 'swiper-lazy-preloader';
		slideBackground: 'elementor-background-slideshow__slide__image';
		kenBurns: 'elementor-ken-burns';
		kenBurnsActive: 'elementor-ken-burns--active';
		kenBurnsIn: 'elementor-ken-burns--in';
		kenBurnsOut: 'elementor-ken-burns--out';
	};
}

/**
 * Background slideshow elements
 */
export interface BackgroundSlideshowElements {
	$backgroundSlideShowContainer: JQuery;
	$slides: JQuery;
}

/**
 * Slideshow gallery item
 */
export interface SlideshowGalleryItem {
	url: string;
	id?: string;
	alt?: string;
}

/**
 * Background Slideshow Handler
 * Manages background slideshow with Ken Burns effects and transitions
 */
export interface BackgroundSlideshowHandler extends BaseSwiperHandler {
	/**
	 * Get default slideshow settings
	 */
	getDefaultSettings(): BackgroundSlideshowSettings;

	/**
	 * Get Swiper configuration for slideshow
	 */
	getSwiperOptions(): any;

	/**
	 * Build Swiper DOM elements
	 */
	buildSwiperElements(): void;

	/**
	 * Initialize slider with Swiper
	 */
	initSlider(): Promise<void>;

	/**
	 * Activate background slideshow
	 */
	activate(): void;

	/**
	 * Deactivate background slideshow
	 */
	deactivate(): void;

	/**
	 * Run slideshow handler
	 */
	run(): void;

	/**
	 * Handle Ken Burns effect
	 */
	handleKenBurns(): void;

	/**
	 * Get slides count
	 */
	getSlidesCount(): number;

	/**
	 * Handle element setting changes
	 */
	onElementChange(propertyName: string): void;
}

/**
 * Constructor for BackgroundSlideshowHandler
 */
export interface BackgroundSlideshowHandlerConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): BackgroundSlideshowHandlerConstructor;
}

declare const BackgroundSlideshowHandler: BackgroundSlideshowHandlerConstructor;

export { BackgroundSlideshowHandler };
export default BackgroundSlideshowHandler;