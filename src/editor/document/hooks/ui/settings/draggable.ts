/**
 * Document UI Settings Draggable Hook
 *
 * Mirrors editor/document/hooks/ui/settings/draggable.js
 * Handles draggable functionality for positioned elements
 */

/**
 * Hook interface for UI operations
 */
export interface UIHook {
	getCommand(): string;
	getId(): string;
	getConditions(args: any): boolean;
	apply(args: any): void;
}

/**
 * Arguments for draggable hook
 */
export interface DraggableHookArgs {
	container?: any;
	containers?: any[];
	settings: {
		_position?: string;
		[key: string]: any;
	};
	[key: string]: any;
}

/**
 * Draggable hook for UI settings operations
 * Toggles draggable functionality based on position settings
 */
export interface DraggableHook extends UIHook {
	/**
	 * Get the command this hook applies to
	 */
	getCommand(): 'document/elements/settings';

	/**
	 * Get unique identifier for this hook
	 */
	getId(): 'draggable';

	/**
	 * Check if conditions are met for this hook
	 */
	getConditions(args: DraggableHookArgs): boolean;

	/**
	 * Apply draggable toggle to containers
	 */
	apply(args: DraggableHookArgs): void;
}

/**
 * Constructor for DraggableHook
 */
export interface DraggableHookConstructor {
	new (options?: any): DraggableHook;
	extend(proto: any, staticProps?: any): DraggableHookConstructor;
}

declare const Draggable: DraggableHookConstructor;

export { Draggable };
export default Draggable;