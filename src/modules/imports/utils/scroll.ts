/**
 * Scroll Utility
 *
 * Mirrors modules/imports/utils/scroll.js
 * Scroll utility functions and helpers
 */

import type { ViewModule } from '../../../core/modules';

/**
 * Scroll to options configuration
 */
export interface ScrollToOptions {
	target: HTMLElement | string;
	duration?: number;
	offset?: number;
	easing?: string;
	callback?: () => void;
}

/**
 * Scroll position information
 */
export interface ScrollPosition {
	top: number;
	left: number;
}

/**
 * Scroll Utility
 * Provides scroll-related functionality and smooth scrolling
 */
export interface Scroll extends ViewModule {
	/**
	 * Scroll to target element or position
	 */
	scrollTo(options: ScrollToOptions): void;

	/**
	 * Scroll to top of page
	 */
	scrollToTop(duration?: number): void;

	/**
	 * Get current scroll position
	 */
	getScrollPosition(): ScrollPosition;

	/**
	 * Check if element is in viewport
	 */
	isInViewport(element: HTMLElement): boolean;

	/**
	 * Get element offset from viewport
	 */
	getElementOffset(element: HTMLElement): { top: number; left: number };

	/**
	 * Smooth scroll to element
	 */
	smoothScrollTo(element: HTMLElement, options?: Partial<ScrollToOptions>): void;

	/**
	 * Add scroll event listener with debouncing
	 */
	onScroll(callback: () => void, debounce?: number): void;

	/**
	 * Remove scroll event listener
	 */
	offScroll(callback: () => void): void;
}

/**
 * Constructor for Scroll
 */
export interface ScrollConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): ScrollConstructor;
}

declare const Scroll: ScrollConstructor;

export { Scroll };
export default Scroll;