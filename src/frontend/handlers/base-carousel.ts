/**
 * Base Carousel Handler
 *
 * Mirrors frontend/handlers/base-carousel.js
 * Extends BaseSwiperHandler with carousel-specific functionality
 */

import type { BaseSwiperHandler, SwiperElements } from './base-swiper';

export interface CarouselSettings {
	selectors: {
		carousel: string;
		swiperWrapper: string;
		slideContent: string;
		swiperArrow: string;
		paginationWrapper: string;
		paginationBullet: string;
		paginationBulletWrapper: string;
	};
}

export interface CarouselElements extends SwiperElements {
	$swiperArrows: JQuery;
	$paginationWrapper: JQuery;
	$paginationBullets: JQuery;
	$paginationBulletWrapper: JQuery;
}

export interface SwiperOptions {
	slidesPerView?: number | string;
	loop?: boolean;
	speed?: number;
	handleElementorBreakpoints?: boolean;
	breakpoints?: Record<number, any>;
	autoplay?: {
		delay: number;
		disableOnInteraction: boolean;
	};
	effect?: string;
	fadeEffect?: {
		crossFade: boolean;
	};
	slidesPerGroup?: number;
	spaceBetween?: number;
	navigation?: {
		prevEl: string;
		nextEl: string;
	};
	pagination?: {
		el: string;
		type: string;
		clickable: boolean;
		renderBullet: (index: number, className: string) => string;
	};
	lazy?: {
		loadPrevNext: boolean;
		loadPrevNextAmount: number;
	};
	a11y?: {
		enabled: boolean;
		prevSlideMessage: string;
		nextSlideMessage: string;
		firstSlideMessage: string;
		lastSlideMessage: string;
	};
	on?: {
		slideChange: () => void;
		init: () => void;
	};
}

/**
 * Base class for carousel handlers
 * Extends BaseSwiperHandler with carousel-specific configuration and behaviors
 */
export interface BaseCarouselHandler extends BaseSwiperHandler {
	elements: CarouselElements;
	swiper?: any; // Swiper instance

	/**
	 * Get default carousel settings
	 */
	getDefaultSettings(): CarouselSettings;

	/**
	 * Get default carousel elements
	 */
	getDefaultElements(): CarouselElements;

	/**
	 * Get Swiper configuration options
	 */
	getSwiperSettings(): SwiperOptions;

	/**
	 * Get offset width for carousel positioning
	 */
	getOffsetWidth(): number;

	/**
	 * Apply offset settings to Swiper configuration
	 */
	applyOffsetSettings(elementSettings: any, swiperOptions: SwiperOptions, slidesToShow: number): void;

	/**
	 * Force slider to show next slide when on last slide
	 */
	forceSliderToShowNextSlideWhenOnLast(swiperOptions: SwiperOptions, slidesToShow: number): void;

	/**
	 * Add CSS class to swiper container
	 */
	addClassToSwiperContainer(className: string): void;

	/**
	 * Initialize Swiper instance
	 */
	initSwiper(): Promise<void>;

	/**
	 * Bind carousel-specific events
	 */
	bindEvents(): void;

	/**
	 * Unbind carousel events
	 */
	unbindEvents(): void;

	/**
	 * Handle direction arrow keydown events
	 */
	onDirectionArrowKeydown(event: Event): void | boolean;

	/**
	 * Handle focus events that disable autoplay
	 */
	onFocusDisableAutoplay(): void;

	/**
	 * Update specific Swiper option
	 */
	updateSwiperOption(propertyName: string): void;

	/**
	 * Get changeable properties mapping
	 */
	getChangeableProperties(): Record<string, string>;

	/**
	 * Handle element setting changes
	 */
	onElementChange(propertyName: string): void;

	/**
	 * Handle edit settings changes
	 */
	onEditSettingsChange(propertyName: string): void;

	/**
	 * Get space between slides for specific device
	 */
	getSpaceBetween(device?: string | null): number;

	/**
	 * Update space between slides
	 */
	updateSpaceBetween(propertyName: string): void;

	/**
	 * Get pagination bullets
	 */
	getPaginationBullets(type?: 'array' | 'jquery'): HTMLElement[] | JQuery;

	/**
	 * Set pagination tabindex for accessibility
	 */
	a11ySetPaginationTabindex(): void;

	/**
	 * Get Swiper wrapper transform X value
	 */
	getSwiperWrapperTranformXValue(): number;

	/**
	 * Set slide aria-hidden attributes for accessibility
	 */
	a11ySetSlideAriaHidden(status?: string): void;

	/**
	 * Handle element handlers (can be overridden by child classes)
	 */
	handleElementHandlers(): void;
}

/**
 * Base Carousel Handler Constructor
 */
export interface BaseCarouselHandlerConstructor {
	new (...args: any[]): any;
	extend(proto: any): BaseCarouselHandlerConstructor;
}

declare const BaseCarouselHandler: BaseCarouselHandlerConstructor;

export { BaseCarouselHandler };
export default BaseCarouselHandler;