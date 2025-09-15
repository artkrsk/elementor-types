/**
 * Popover Toggle Behavior
 *
 * Mirrors editor/controls/behaviors/popover-toggle.js
 * Behavior for controls with popover toggle functionality
 */

import type { ControlBaseView } from '../base';

/**
 * Popover toggle configuration
 */
export interface PopoverToggleConfig {
	trigger: 'click' | 'hover';
	placement: 'top' | 'bottom' | 'left' | 'right';
	offset?: number;
	closeOnClickOutside?: boolean;
}

/**
 * Popover Toggle Behavior
 * Adds popover functionality to controls
 */
export interface PopoverToggleBehavior {
	/**
	 * Associated control view
	 */
	view: ControlBaseView;

	/**
	 * Popover configuration
	 */
	config: PopoverToggleConfig;

	/**
	 * Initialize popover behavior
	 */
	initialize(): void;

	/**
	 * Show popover
	 */
	showPopover(): void;

	/**
	 * Hide popover
	 */
	hidePopover(): void;

	/**
	 * Toggle popover visibility
	 */
	togglePopover(): void;

	/**
	 * Handle trigger events
	 */
	bindTriggerEvents(): void;

	/**
	 * Handle outside clicks
	 */
	handleOutsideClick(event: Event): void;

	/**
	 * Destroy behavior
	 */
	destroy(): void;
}

/**
 * Constructor for PopoverToggleBehavior
 */
export interface PopoverToggleBehaviorConstructor {
	new (view: ControlBaseView, config: PopoverToggleConfig): any;
	extend(proto: any, staticProps?: any): PopoverToggleBehaviorConstructor;
}

declare const PopoverToggleBehavior: PopoverToggleBehaviorConstructor;

export { PopoverToggleBehavior };
export default PopoverToggleBehavior;