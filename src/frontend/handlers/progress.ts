/**
 * Progress Handler
 *
 * Mirrors frontend/handlers/progress.js
 * Handles progress bar widget with animated progression
 */

import type { Base } from './base';

/**
 * Progress bar settings
 */
export interface ProgressSettings {
	selectors: {
		progressNumber: '.elementor-progress-bar';
		progressBar: '.elementor-progress-percentage';
	};
}

/**
 * Progress bar elements
 */
export interface ProgressElements {
	$progressNumber: JQuery;
	$progressBar: JQuery;
	[key: string]: JQuery;
}

/**
 * Progress Handler
 * Manages animated progress bar with intersection observer
 */
export interface ProgressHandler extends Base {
	/**
	 * Intersection observer for progress visibility
	 */
	intersectionObserver: any;

	/**
	 * Get default progress settings
	 */
	getDefaultSettings(): ProgressSettings;

	/**
	 * Get default progress elements
	 */
	getDefaultElements(): ProgressElements;

	/**
	 * Initialize progress with intersection observer
	 */
	onInit(): void;

	/**
	 * Start progress animation
	 */
	startAnimation(): void;

	/**
	 * Handle progress visibility
	 */
	handleIntersection(entries: IntersectionObserverEntry[]): void;
}

/**
 * Constructor for ProgressHandler
 */
export interface ProgressHandlerConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): ProgressHandlerConstructor;
}

declare const ProgressHandler: ProgressHandlerConstructor;

export { ProgressHandler };
export default ProgressHandler;