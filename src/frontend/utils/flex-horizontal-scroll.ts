/**
 * Flex Horizontal Scroll Utilities
 *
 * Mirrors frontend/utils/flex-horizontal-scroll.js
 * Utilities for horizontal scrolling in flex containers
 */

/**
 * Horizontal scroll alignment configuration
 */
export interface HorizontalScrollAlignment {
	element: HTMLElement;
	direction: 'start' | 'end';
	justifyCSSVariable: string;
	horizontalScrollStatus: 'enable' | 'disable';
}

/**
 * Change scroll status based on mouse events
 * Adds/removes scroll classes and tracks mouse position
 */
export declare function changeScrollStatus(element: HTMLElement, event: MouseEvent): void;

/**
 * Set horizontal title scroll values based on mouse movement
 * Handles horizontal scrolling with mouse drag
 */
export declare function setHorizontalTitleScrollValues(
	element: HTMLElement,
	horizontalScrollStatus: 'enable' | 'disable',
	event: MouseEvent
): void;

/**
 * Set horizontal scroll alignment for flex containers
 * Configures initial scroll position and alignment
 */
export declare function setHorizontalScrollAlignment(config: HorizontalScrollAlignment): void;

/**
 * Check if element requires horizontal scrolling
 */
declare function isHorizontalScroll(element: HTMLElement, horizontalScrollStatus: string): boolean;

/**
 * Get total width of children elements including gaps
 */
declare function getChildrenWidth(children: HTMLCollection): number;

/**
 * Set initial scroll position based on direction
 */
declare function initialScrollPosition(
	element: HTMLElement,
	direction: string,
	justifyCSSVariable: string
): void;