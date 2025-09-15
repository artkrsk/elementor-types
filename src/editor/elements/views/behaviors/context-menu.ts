/**
 * Context Menu Behavior
 *
 * Mirrors editor/elements/views/behaviors/context-menu.js
 * Right-click context menu behavior for elements
 */

/**
 * Context menu item configuration
 */
export interface ContextMenuItem {
	name: string;
	title: string;
	icon?: string;
	callback: () => void;
	isEnabled?: () => boolean;
	separator?: boolean;
}

/**
 * Context Menu Behavior
 * Provides right-click context menu for elements
 */
export interface ContextMenuBehavior {
	/**
	 * Menu items configuration
	 */
	menuItems: ContextMenuItem[];

	/**
	 * Initialize context menu behavior
	 */
	initialize(): void;

	/**
	 * Show context menu
	 */
	showContextMenu(event: MouseEvent): void;

	/**
	 * Hide context menu
	 */
	hideContextMenu(): void;

	/**
	 * Add menu item
	 */
	addMenuItem(item: ContextMenuItem): void;

	/**
	 * Remove menu item
	 */
	removeMenuItem(name: string): void;

	/**
	 * Handle menu item click
	 */
	onMenuItemClick(item: ContextMenuItem): void;

	/**
	 * Get available menu items
	 */
	getAvailableMenuItems(): ContextMenuItem[];

	/**
	 * Bind context menu events
	 */
	bindEvents(): void;

	/**
	 * Destroy context menu behavior
	 */
	destroy(): void;
}

/**
 * Constructor for ContextMenuBehavior
 */
export interface ContextMenuBehaviorConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): ContextMenuBehaviorConstructor;
}

declare const ContextMenuBehavior: ContextMenuBehaviorConstructor;

export { ContextMenuBehavior };
export default ContextMenuBehavior;