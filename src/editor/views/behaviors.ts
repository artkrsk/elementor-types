/**
 * Element View Behaviors
 * Behavior classes for element interactions and functionality
 */

/**
 * Context Menu Behavior
 * Manages right-click context menus for elements
 */
export declare class ContextMenuBehavior {
  /** Menu groups configuration */
  groups: any[];

  /**
   * Initialize context menu
   */
  initialize(): void;

  /**
   * Show context menu
   * @param event - Mouse event
   */
  show(event: MouseEvent): void;

  /**
   * Hide context menu
   */
  hide(): void;

  /**
   * Handle menu item selection
   * @param action - Selected action
   */
  onMenuItemClick(action: any): void;
}

/**
 * Inline Editing Behavior
 * Enables inline text editing for elements
 */
export declare class InlineEditingBehavior {
  /** CSS class for inline editing mode */
  inlineEditingClass: string;

  /**
   * Start inline editing mode
   * @param element - Target element
   */
  startEditing(element: HTMLElement): void;

  /**
   * Stop inline editing mode
   */
  stopEditing(): void;

  /**
   * Handle text changes during editing
   * @param event - Input event
   */
  onTextChange(event: InputEvent): void;

  /**
   * Save inline editing changes
   */
  saveChanges(): void;
}

/**
 * Widget Draggable Behavior
 * Enables dragging widgets within the editor
 */
export declare class WidgetDraggableBehavior {
  /**
   * Initialize draggable functionality
   */
  initialize(): void;

  /**
   * Handle drag start
   * @param event - Drag event
   * @param ui - UI data
   */
  onDragStart(event: any, ui: any): void;

  /**
   * Handle drag stop
   * @param event - Drag event
   * @param ui - UI data
   */
  onDragStop(event: any, ui: any): void;

  /**
   * Get drag helper element
   */
  getDragHelper(): HTMLElement;
}

/**
 * Widget Resizable Behavior
 * Enables resizing widgets in the editor
 */
export declare class WidgetResizableBehavior {
  /**
   * Initialize resizable functionality
   */
  initialize(): void;

  /**
   * Handle resize start
   * @param event - Resize event
   * @param ui - UI data
   */
  onResizeStart(event: any, ui: any): void;

  /**
   * Handle resize stop
   * @param event - Resize event
   * @param ui - UI data
   */
  onResizeStop(event: any, ui: any): void;

  /**
   * Update widget size
   * @param width - New width
   * @param height - New height
   */
  updateSize(width: number, height: number): void;
}

/**
 * Column Resizable Behavior
 * Enables resizing columns in sections
 */
export declare class ColumnResizableBehavior {
  /**
   * Initialize column resizable functionality
   */
  initialize(): void;

  /**
   * Handle column resize start
   * @param event - Resize event
   * @param ui - UI data
   */
  onResizeStart(event: any, ui: any): void;

  /**
   * Handle column resize
   * @param event - Resize event
   * @param ui - UI data
   */
  onResize(event: any, ui: any): void;

  /**
   * Handle column resize stop
   * @param event - Resize event
   * @param ui - UI data
   */
  onResizeStop(event: any, ui: any): void;

  /**
   * Update column width
   * @param width - New width percentage
   */
  updateColumnWidth(width: number): void;
}

/**
 * Sortable Behavior
 * Enables drag-and-drop sorting of elements
 */
export declare class SortableBehavior {
  /**
   * Initialize sortable functionality
   */
  initialize(): void;

  /**
   * Handle sort start
   * @param event - Sort event
   * @param ui - UI data
   */
  onSortStart(event: any, ui: any): void;

  /**
   * Handle sort update
   * @param event - Sort event
   * @param ui - UI data
   */
  onSortUpdate(event: any, ui: any): void;

  /**
   * Handle sort stop
   * @param event - Sort event
   * @param ui - UI data
   */
  onSortStop(event: any, ui: any): void;

  /**
   * Get sortable items selector
   */
  getSortableSelector(): string;
}

/**
 * Inner Tabs Behavior
 * Manages tabbed content within elements
 */
export declare class InnerTabsBehavior {
  /** Active tab index */
  activeTabIndex: number;

  /**
   * Initialize tabs functionality
   */
  initialize(): void;

  /**
   * Switch to specific tab
   * @param tabIndex - Tab index to activate
   */
  switchTab(tabIndex: number): void;

  /**
   * Handle tab click
   * @param event - Click event
   */
  onTabClick(event: MouseEvent): void;

  /**
   * Get tab content element
   * @param tabIndex - Tab index
   */
  getTabContent(tabIndex: number): HTMLElement;
}