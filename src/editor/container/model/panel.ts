/**
 * Container Panel
 *
 * Mirrors editor/container/panel.js
 * Panel management for container state and editor interaction
 */

// Forward declaration to avoid circular reference
export interface PanelContainer {
	[key: string]: any;
}

/**
 * Panel class for container management
 * Handles panel refresh, editor routing, and control access
 */
export interface Panel {
	/**
	 * Reference to the container
	 */
	container: PanelContainer;

	/**
	 * Refresh the panel
	 * Routes to panel refresh if on editor route
	 */
	refresh(): void;

	/**
	 * Close editor and route to elements categories
	 */
	closeEditor(): void;

	/**
	 * Get control view by name
	 */
	getControlView(name: string): any;

	/**
	 * Get control model by name
	 */
	getControlModel(name: string): any;
}

/**
 * Constructor for Panel
 */
export interface PanelConstructor {
	new (container: PanelContainer): any;
	extend(proto: any, staticProps?: any): PanelConstructor;
}

declare const Panel: PanelConstructor;

export { Panel };
export default Panel;