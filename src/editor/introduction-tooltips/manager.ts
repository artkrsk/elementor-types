/**
 * Introduction Tooltips Manager
 *
 * Mirrors editor/introduction-tooltips/manager.js
 * Manages introduction tooltips for new users
 */

/**
 * Introduction tooltip interface
 */
export interface IntroductionTooltip {
	introductionKey: string;
	initTooltip(): void;
	bindEvent(): void;
	show(): void;
	hide(): void;
}

/**
 * Dialog elements for tooltip widget
 */
export interface TooltipDialogElements {
	$title: JQuery;
	$closeButton: JQuery;
	header: JQuery;
}

/**
 * Introduction Tooltips Manager
 * Handles registration and management of introduction tooltips
 */
export interface IntroductionTooltipsManager {
	/**
	 * Register the tooltip widget type
	 */
	registerTooltipWidget(): void;

	/**
	 * Register all available tooltips
	 */
	registerTooltips(): void;

	/**
	 * Get tooltip by key
	 */
	getTooltip(key: string): IntroductionTooltip | null;

	/**
	 * Show tooltip by key
	 */
	showTooltip(key: string): void;

	/**
	 * Hide tooltip by key
	 */
	hideTooltip(key: string): void;

	/**
	 * Check if tooltip should be shown
	 */
	shouldShowTooltip(key: string): boolean;
}

/**
 * Constructor for IntroductionTooltipsManager
 */
export interface IntroductionTooltipsManagerConstructor {
	new (): any;
	extend(proto: any, staticProps?: any): IntroductionTooltipsManagerConstructor;
}

declare const IntroductionTooltipsManager: IntroductionTooltipsManagerConstructor;

export { IntroductionTooltipsManager };
export default IntroductionTooltipsManager;