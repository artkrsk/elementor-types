/**
 * Lightbox Manager
 *
 * Mirrors frontend/utils/lightbox/lightbox-manager.js
 * Manages lightbox functionality and loading
 */

import type { ViewModule } from '../../../core/modules';

/**
 * Lightbox settings configuration
 */
export interface LightboxSettings {
	selectors: {
		links: string;
		slideshow: string;
		[key: string]: string;
	};
	[key: string]: any;
}

/**
 * Lightbox elements
 */
export interface LightboxElements {
	$links: JQuery;
	$slideshow: JQuery;
	[key: string]: JQuery;
}

/**
 * Lightbox Manager
 * Handles lightbox initialization, link detection, and lightbox loading
 */
export interface LightboxManager extends ViewModule {
	/**
	 * Get lightbox instance
	 */
	getLightbox(): Promise<any>;

	/**
	 * Get default settings for lightbox
	 */
	getDefaultSettings(): LightboxSettings;

	/**
	 * Get default elements
	 */
	getDefaultElements(): LightboxElements;

	/**
	 * Check if element should open in lightbox
	 */
	isLightboxLink(element: HTMLElement): boolean;

	/**
	 * Check if slideshow mode is enabled
	 */
	isLightboxSlideshow(): boolean;

	/**
	 * Handle link click events
	 */
	onLinkClick(event: Event): Promise<void>;

	/**
	 * Bind event listeners
	 */
	bindEvents(): void;

	/**
	 * Maybe activate lightbox on detected links
	 */
	maybeActivateLightboxOnLink(): void;

	/**
	 * Initialize lightbox manager
	 */
	onInit(...args: any[]): void;
}

/**
 * Constructor for LightboxManager
 */
export interface LightboxManagerConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): LightboxManagerConstructor;
	getLightbox(): Promise<any>;
}

declare const LightboxManager: LightboxManagerConstructor;

export { LightboxManager };
export default LightboxManager;