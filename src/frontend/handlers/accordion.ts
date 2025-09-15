/**
 * Accordion Handler
 *
 * Mirrors frontend/handlers/accordion.js
 * Handles accordion widget functionality
 */

import type { BaseTabsHandler, BaseTabsSettings } from './base-tabs';

/**
 * Accordion settings extending base tabs
 */
export interface AccordionSettings extends BaseTabsSettings {
	showTabFn: 'slideDown';
	hideTabFn: 'slideUp';
}

/**
 * Accordion Handler
 * Manages accordion widget with slide animations
 */
export interface AccordionHandler extends BaseTabsHandler {
	/**
	 * Get default accordion settings
	 */
	getDefaultSettings(): AccordionSettings;
}

/**
 * Constructor for AccordionHandler
 */
export interface AccordionHandlerConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): AccordionHandlerConstructor;
}

declare const AccordionHandler: AccordionHandlerConstructor;

export { AccordionHandler };
export default AccordionHandler;