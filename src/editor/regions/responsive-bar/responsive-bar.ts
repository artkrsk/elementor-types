/**
 * Responsive Bar Region
 *
 * Mirrors editor/regions/responsive-bar/responsive-bar.js
 * Main responsive bar region for device preview switching
 */

/**
 * Region interface for Marionette regions
 */
export interface Region {
	$el: JQuery;
	show(view: any): void;
	[key: string]: any;
}

/**
 * Preview size configuration
 */
export interface PreviewSize {
	width: number;
	height: number;
}

/**
 * Device constraints for responsive preview
 */
export interface DeviceConstraints {
	minWidth: number;
	maxWidth: number;
}

/**
 * Responsive Bar Region
 * Manages device switching, preview scaling, and responsive editing
 */
export interface ResponsiveBar extends Region {
	/**
	 * Scale percentage for preview
	 */
	scalePercentage: number;

	/**
	 * Flag for updating preview size
	 */
	updatingPreviewSize: boolean;

	/**
	 * Timeout for restoring preview size
	 */
	restorePreviewSizeTimeout: any;

	/**
	 * Initialize the responsive bar
	 */
	initialize(): void;

	/**
	 * Handle panel resize start
	 */
	onPanelResizeStart(): void;

	/**
	 * Handle panel resize stop
	 */
	onPanelResizeStop(): void;

	/**
	 * Auto scale preview to fit container
	 */
	autoScale(): void;

	/**
	 * Scale the preview iframe
	 */
	scalePreview(): void;

	/**
	 * Reset scale to 100%
	 */
	resetScale(): void;

	/**
	 * Set scale percentage
	 */
	setScalePercentage(scalePercentage?: number): void;

	/**
	 * Handle device mode changes
	 */
	onDeviceModeChange(): void;

	/**
	 * Handle breakpoint selection
	 */
	onBreakpointSelected(event: Event): void;

	/**
	 * Handle size input changes
	 */
	onSizeInputChange(): void;

	/**
	 * Handle scale plus button click
	 */
	onScalePlusButtonClick(): void;

	/**
	 * Handle scale minus button click
	 */
	onScaleMinusButtonClick(): void;

	/**
	 * Handle scale reset button click
	 */
	onScaleResetButtonClick(): void;

	/**
	 * Handle close button click
	 */
	onCloseButtonClick(): void;

	/**
	 * Handle breakpoint settings open
	 */
	onBreakpointSettingsOpen(): void;

	/**
	 * Handle preview resize
	 */
	onPreviewResize(): void;

	/**
	 * Handle preview open
	 */
	onPreviewOpen(): void;

	/**
	 * Set width/height inputs editable state
	 */
	setWidthHeightInputsEditableState(): void;

	/**
	 * Restore last valid preview size
	 */
	restoreLastValidPreviewSize(): void;

	/**
	 * Add tooltips to icon buttons
	 */
	addTipsyToIconButtons(): void;
}

/**
 * Constructor for ResponsiveBar
 */
export interface ResponsiveBarConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): ResponsiveBarConstructor;
}

declare const ResponsiveBar: ResponsiveBarConstructor;

export { ResponsiveBar };
export default ResponsiveBar;