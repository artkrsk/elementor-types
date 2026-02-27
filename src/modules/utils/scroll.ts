/**
 * Elementor Scroll Utility Module
 *
 * Mirrors modules/imports/utils/scroll.js
 * Provides scroll-based utilities and intersection observers
 */

export interface ScrollObserverData {
	sensitivity?: number;
	isInViewport: boolean;
	scrollPercentage: number;
	intersectionScrollDirection: 'up' | 'down';
}

export interface ScrollObserverConfig {
	/** Value between 0-100 - Will determine the intersection trigger points on the element */
	sensitivity?: number;
	/** Will be triggered on each intersection point between the element and the viewport top/bottom */
	callback: (data: ScrollObserverData) => void;
	/** Offset between the element intersection points and the viewport, written like in CSS: '-50% 0 -25%' */
	offset?: string;
	/** The element that the events will be relative to, if null will be relative to the viewport */
	root?: HTMLElement | null;
}

export interface ElementViewportOffsets {
	start?: number;
	end?: number;
}

export interface PageScrollOffsets {
	start?: number;
	end?: number;
}

/**
 * Scroll utility class for scroll-based interactions and viewport calculations
 * Provides static methods for scroll observation and percentage calculations
 */
export declare class Scroll {
	/**
	 * Creates an intersection observer for scroll-based animations
	 *
	 * @param config Configuration object for scroll observer
	 * @returns IntersectionObserver instance
	 *
	 * @example
	 * const observer = Scroll.scrollObserver({
	 *   sensitivity: 50,
	 *   callback: (data) => {
	 *     console.log('Scroll percentage:', data.scrollPercentage);
	 *     console.log('Direction:', data.intersectionScrollDirection);
	 *   },
	 *   offset: '-10% 0 -10%'
	 * });
	 *
	 * observer.observe(element);
	 */
	static scrollObserver(config: ScrollObserverConfig): IntersectionObserver;

	/**
	 * Get element viewport percentage
	 * Calculates what percentage of an element is visible in the viewport
	 *
	 * @param $element jQuery element to check
	 * @param offsetObj Optional offset configuration
	 * @returns Percentage (0-100) of element visible in viewport
	 *
	 * @example
	 * const percentage = Scroll.getElementViewportPercentage($element, {
	 *   start: 10,  // 10% offset from top
	 *   end: 10     // 10% offset from bottom
	 * });
	 */
	static getElementViewportPercentage(
		$element: JQuery,
		offsetObj?: ElementViewportOffsets
	): number;

	/**
	 * Get page scroll percentage
	 * Calculates how far down the page the user has scrolled
	 *
	 * @param offsetObj Optional offset configuration
	 * @param limitPageHeight Optional page height limit
	 * @returns Percentage (0-100) of page scrolled
	 *
	 * @example
	 * const scrolled = Scroll.getPageScrollPercentage({
	 *   start: 0,   // No offset from start
	 *   end: 20     // 20% offset from end
	 * });
	 */
	static getPageScrollPercentage(
		offsetObj?: PageScrollOffsets,
		limitPageHeight?: number
	): number;
}
