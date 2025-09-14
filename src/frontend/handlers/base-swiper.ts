/**
 * Base Swiper Handler
 *
 * Mirrors frontend/handlers/base-swiper.js
 * Extends BaseHandler with Swiper-specific functionality
 */

import type { Base } from './base';

export interface SwiperElements {
	$swiperContainer: JQuery;
	$slides: JQuery;
	$swiperWrapper: JQuery;
	[key: string]: JQuery | HTMLElement;
}

/**
 * Base class for Swiper-based handlers
 * Provides common functionality for swiper carousel components
 */
export interface BaseSwiperHandler extends Base {
	elements: SwiperElements;
	swiper?: any; // Swiper instance
	$activeImageBg?: JQuery;
	activeItemIndex?: number;

	/**
	 * Get the initial slide index based on edit settings
	 */
	getInitialSlide(): number;

	/**
	 * Get total number of slides
	 */
	getSlidesCount(): number;

	/**
	 * Toggle pause on hover functionality
	 * @param toggleOn - Whether to enable or disable pause on hover
	 */
	togglePauseOnHover(toggleOn: boolean): void;

	/**
	 * Handle Ken Burns effect for active slide
	 */
	handleKenBurns(): void;
}

/**
 * Base Swiper Handler Constructor
 */
export interface BaseSwiperHandlerConstructor {
	new (...args: any[]): any;
	extend(proto: any): BaseSwiperHandlerConstructor;
}

declare const BaseSwiperHandler: BaseSwiperHandlerConstructor;

export { BaseSwiperHandler };
export default BaseSwiperHandler;