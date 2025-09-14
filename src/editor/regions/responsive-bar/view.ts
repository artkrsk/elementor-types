/**
 * Responsive Bar View
 *
 * Mirrors editor/regions/responsive-bar/view.js
 * View component for the responsive bar interface
 */

import type { View } from '../../../third-party/marionette';
import type { Model } from 'backbone';

/**
 * UI elements for responsive bar
 */
export interface ResponsiveBarUI {
	switcherInput: string;
	switcherLabel: string;
	switcher: string;
	sizeInputWidth: string;
	sizeInputHeight: string;
	scaleValue: string;
	scalePlusButton: string;
	scaleMinusButton: string;
	scaleResetButton: string;
	closeButton: string;
	breakpointSettingsButton: string;
}

/**
 * Events for responsive bar
 */
export interface ResponsiveBarEvents {
	'change @ui.switcherInput': 'onBreakpointSelected';
	'input @ui.sizeInputWidth': 'onSizeInputChange';
	'input @ui.sizeInputHeight': 'onSizeInputChange';
	'click @ui.scalePlusButton': 'onScalePlusButtonClick';
	'click @ui.scaleMinusButton': 'onScaleMinusButtonClick';
	'click @ui.scaleResetButton': 'onScaleResetButtonClick';
	'click @ui.closeButton': 'onCloseButtonClick';
	'click @ui.breakpointSettingsButton': 'onBreakpointSettingsOpen';
	[key: string]: string;
}

/**
 * Responsive Bar View
 * Handles the responsive bar UI and interactions
 */
export interface ResponsiveBarView extends View<Model> {
	/**
	 * Get template ID for the view
	 */
	getTemplate(): '#tmpl-elementor-templates-responsive-bar';

	/**
	 * Get view ID
	 */
	id: 'e-responsive-bar';

	/**
	 * Get UI elements configuration
	 */
	ui(): ResponsiveBarUI;

	/**
	 * Get events configuration
	 */
	events(): ResponsiveBarEvents;

	/**
	 * Initialize the view
	 */
	initialize(): void;

	/**
	 * Called when view is rendered
	 */
	onRender(): void;
}

/**
 * Constructor for ResponsiveBarView
 */
export interface ResponsiveBarViewConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): ResponsiveBarViewConstructor;
}

declare const ResponsiveBarView: ResponsiveBarViewConstructor;

export { ResponsiveBarView };
export default ResponsiveBarView;