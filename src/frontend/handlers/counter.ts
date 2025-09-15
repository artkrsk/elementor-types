/**
 * Counter Handler
 *
 * Mirrors frontend/handlers/counter.js
 * Handles counter widget with animated number counting
 */

import type { Base } from './base';

/**
 * Counter settings
 */
export interface CounterSettings {
	selectors: {
		counterNumber: '.elementor-counter-number';
	};
}

/**
 * Counter elements
 */
export interface CounterElements {
	$counterNumber: JQuery;
	[key: string]: JQuery;
}

/**
 * Counter data configuration
 */
export interface CounterData {
	toValue: number;
	fromValue?: number;
	duration?: number;
	rounding?: number;
	delimiter?: string;
	[key: string]: any;
}

/**
 * Counter Handler
 * Manages animated number counting with intersection observer
 */
export interface CounterHandler extends Base {
	/**
	 * Intersection observer for counter visibility
	 */
	intersectionObserver: any;

	/**
	 * Get default counter settings
	 */
	getDefaultSettings(): CounterSettings;

	/**
	 * Get default counter elements
	 */
	getDefaultElements(): CounterElements;

	/**
	 * Initialize counter with intersection observer
	 */
	onInit(): void;

	/**
	 * Start counter animation
	 */
	startAnimation(data: CounterData): void;

	/**
	 * Handle counter visibility
	 */
	handleIntersection(entries: IntersectionObserverEntry[]): void;
}

/**
 * Constructor for CounterHandler
 */
export interface CounterHandlerConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): CounterHandlerConstructor;
}

declare const CounterHandler: CounterHandlerConstructor;

export { CounterHandler };
export default CounterHandler;