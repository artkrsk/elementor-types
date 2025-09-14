/**
 * Document Save Footer Saver Behavior
 *
 * Mirrors editor/document/save/behaviors/footer-saver.js
 * Manages the footer save indicator/button
 */

/**
 * Footer Saver Behavior
 * Manages the footer save button and indicators
 */
export interface FooterSaverBehavior {
	/**
	 * Show the footer saver
	 */
	show(): void;

	/**
	 * Hide the footer saver
	 */
	hide(): void;

	/**
	 * Toggle footer saver visibility
	 */
	toggle(show: boolean): void;

	/**
	 * Update save status display
	 */
	updateStatus(status: 'saving' | 'saved' | 'error'): void;

	/**
	 * Get save button element
	 */
	getSaveButton(): any;
}

/**
 * Constructor for FooterSaverBehavior
 */
export interface FooterSaverBehaviorConstructor {
	new (options?: any): FooterSaverBehavior;
	extend(proto: any, staticProps?: any): FooterSaverBehaviorConstructor;
}

declare const FooterSaver: FooterSaverBehaviorConstructor;

export { FooterSaver };
export default FooterSaver;