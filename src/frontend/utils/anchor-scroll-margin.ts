/**
 * Anchor Scroll Margin Utilities
 *
 * Mirrors frontend/utils/anchor-scroll-margin.js
 * Utilities for anchor scrolling with margin adjustments
 */

/**
 * Scroll margin configuration
 */
export interface ScrollMarginConfig {
	offset: number;
	duration: number;
	easing: string;
}

/**
 * Anchor Scroll Margin Utilities
 * Handles anchor scrolling with proper margin calculations
 */
export interface AnchorScrollMarginUtils {
	/**
	 * Calculate scroll margin for anchor
	 */
	calculateScrollMargin(anchor: HTMLElement): number;

	/**
	 * Scroll to anchor with margin
	 */
	scrollToAnchor(anchor: HTMLElement | string, config?: Partial<ScrollMarginConfig>): void;

	/**
	 * Get admin bar height
	 */
	getAdminBarHeight(): number;

	/**
	 * Get sticky header height
	 */
	getStickyHeaderHeight(): number;

	/**
	 * Update scroll margin on resize
	 */
	updateScrollMargin(): void;
}

declare const AnchorScrollMarginUtils: any;

export { AnchorScrollMarginUtils };
export default AnchorScrollMarginUtils;