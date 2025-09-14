/**
 * Panel Elements Page Component
 *
 * Mirrors editor/regions/panel/pages/elements/component.js
 * Main component for the elements panel page
 */

import type { ComponentBase } from '../../../../components';

/**
 * Panel elements tabs configuration
 */
export interface ElementsPageTabs {
	categories: { title: string };
	global: { title: string };
}

/**
 * Arguments for rendering tabs
 */
export interface RenderTabArgs {
	[key: string]: any;
}

/**
 * Panel Elements Page Component
 * Manages the elements panel page with categories and global widgets
 */
export interface ElementsPageComponent extends ComponentBase {
	/**
	 * Get component namespace
	 */
	getNamespace(): 'panel/elements';

	/**
	 * Get default tabs configuration
	 */
	defaultTabs(): ElementsPageTabs;

	/**
	 * Get tabs wrapper selector
	 */
	getTabsWrapperSelector(): '#elementor-panel-elements-navigation';

	/**
	 * Render specific tab
	 */
	renderTab(tab: string, args?: RenderTabArgs): void;

	/**
	 * Activate specific tab
	 */
	activateTab(tab: string): void;
}

/**
 * Constructor for ElementsPageComponent
 */
export interface ElementsPageComponentConstructor {
	new (options?: { manager?: any }): any;
	extend(proto: any, staticProps?: any): ElementsPageComponentConstructor;
}

declare const ElementsPageComponent: ElementsPageComponentConstructor;

export { ElementsPageComponent };
export default ElementsPageComponent;