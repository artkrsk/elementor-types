/**
 * Document UI States Direction Mode
 *
 * Mirrors editor/document/ui-states/direction-mode.js
 * Manages flex direction states for the editor and preview
 */

/**
 * Direction mode constants
 */
export const DIRECTION_ROW = 'row';
export const DIRECTION_ROW_REVERSE = 'row-reverse';
export const DIRECTION_COLUMN = 'column';
export const DIRECTION_COLUMN_REVERSE = 'column-reverse';

/**
 * UI State Base interface
 */
export interface UiStateBase {
	getId(): string;
	getOptions(): Record<string, string>;
	getScopes(): any[];
}

/**
 * Direction Mode UI State
 * Handles flex direction states for responsive editing
 */
export interface DirectionMode extends UiStateBase {
	/**
	 * Get unique identifier for this UI state
	 */
	getId(): 'direction-mode';

	/**
	 * Get available direction options
	 */
	getOptions(): {
		[DIRECTION_ROW]: '';
		[DIRECTION_ROW_REVERSE]: '';
		[DIRECTION_COLUMN]: '';
		[DIRECTION_COLUMN_REVERSE]: '';
	};

	/**
	 * Get DOM scopes where this state applies
	 */
	getScopes(): [HTMLElement, HTMLElement];
}

/**
 * Constructor for DirectionMode
 */
export interface DirectionModeConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): DirectionModeConstructor;
}

declare const DirectionMode: DirectionModeConstructor;

export { DirectionMode };
export default DirectionMode;