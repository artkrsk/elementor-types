/**
 * Document UI States Scrubbing Mode
 *
 * Mirrors editor/document/ui-states/scrubbing-mode.js
 * Manages scrubbing interaction states for numeric controls
 */

import type { UiStateBase } from './direction-mode';

/**
 * Scrubbing Mode UI State
 * Handles mouse scrubbing interactions for numeric input controls
 */
export interface ScrubbingMode extends UiStateBase {
	/**
	 * Get unique identifier for this UI state
	 */
	getId(): 'scrubbing-mode';

	/**
	 * Get available scrubbing options
	 */
	getOptions(): Record<string, string>;

	/**
	 * Get DOM scopes where scrubbing applies
	 */
	getScopes(): HTMLElement[];

	/**
	 * Check if scrubbing is currently active
	 */
	isActive(): boolean;

	/**
	 * Start scrubbing interaction
	 */
	start(event: MouseEvent): void;

	/**
	 * Update scrubbing value
	 */
	update(event: MouseEvent): void;

	/**
	 * End scrubbing interaction
	 */
	end(): void;
}

/**
 * Constructor for ScrubbingMode
 */
export interface ScrubbingModeConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): ScrubbingModeConstructor;
}

declare const ScrubbingMode: ScrubbingModeConstructor;

export { ScrubbingMode };
export default ScrubbingMode;