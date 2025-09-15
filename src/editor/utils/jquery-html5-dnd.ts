/**
 * jQuery HTML5 Drag and Drop
 *
 * Mirrors editor/utils/jquery-html5-dnd.js
 * HTML5 drag and drop utilities for jQuery
 */

/**
 * Drag data configuration
 */
export interface DragData {
	type: string;
	data: any;
	effectAllowed?: 'none' | 'copy' | 'copyLink' | 'copyMove' | 'link' | 'linkMove' | 'move' | 'all' | 'uninitialized';
}

/**
 * Drop configuration
 */
export interface DropConfig {
	accept: string[];
	dropEffect?: 'none' | 'copy' | 'link' | 'move';
	onDrop?: (data: any, event: DragEvent) => void;
	onDragOver?: (event: DragEvent) => void;
	onDragEnter?: (event: DragEvent) => void;
	onDragLeave?: (event: DragEvent) => void;
}

/**
 * jQuery HTML5 Drag and Drop Interface
 * Utilities for implementing HTML5 drag and drop with jQuery
 */
export interface JQueryHTML5DnD {
	/**
	 * Make element draggable
	 */
	makeDraggable(element: HTMLElement | JQuery, data: DragData): void;

	/**
	 * Make element droppable
	 */
	makeDroppable(element: HTMLElement | JQuery, config: DropConfig): void;

	/**
	 * Remove draggable functionality
	 */
	removeDraggable(element: HTMLElement | JQuery): void;

	/**
	 * Remove droppable functionality
	 */
	removeDroppable(element: HTMLElement | JQuery): void;

	/**
	 * Get drag data from event
	 */
	getDragData(event: DragEvent): any;

	/**
	 * Set drag data for event
	 */
	setDragData(event: DragEvent, data: DragData): void;
}

declare const JQueryHTML5DnD: any;

export { JQueryHTML5DnD };
export default JQueryHTML5DnD;