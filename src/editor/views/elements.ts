/**
 * Specific Element View Types
 * Widget, Section, Column, and Container view classes
 */

import type { BaseElementView, BaseWidgetView, ElementBehaviors, ContextMenuGroup } from "./base";

/**
 * Widget View
 * View class for widget elements with draggable and resizable behaviors
 */
export declare class WidgetView extends BaseWidgetView {
  /** Template type for widgets */
  _templateType: string | null;

  /** Enable edit tools toggle */
  toggleEditTools: true;

  /**
   * Get widget-specific event handlers
   */
  events(): any;

  /**
   * Get widget behaviors including draggable and resizable
   */
  behaviors(): ElementBehaviors & {
    InlineEditing: {
      behaviorClass: any;
      inlineEditingClass: string;
    };
    Draggable: {
      behaviorClass: any;
    };
    Resizable: {
      behaviorClass: any;
    };
  };

  /**
   * Handle click to edit widget
   * @param event - Click event
   */
  onClickEdit(event: MouseEvent): void;

  /**
   * Get widget context menu groups with save action
   */
  getContextMenuGroups(): ContextMenuGroup[];
}

/**
 * Section View
 * View class for section elements with column management
 */
export declare class SectionView extends BaseElementView {
  /**
   * Get section-specific behaviors
   */
  behaviors(): ElementBehaviors;

  /**
   * Get section template type
   */
  getTemplateType(): 'js';

  /**
   * Add new column to section
   * @param columnModel - Column model to add
   * @param options - Addition options
   */
  addColumn(columnModel?: any, options?: any): void;

  /**
   * Add section controls
   */
  addSectionControls(): void;

  /**
   * Get section context menu groups
   */
  getContextMenuGroups(): ContextMenuGroup[];
}

/**
 * Column View
 * View class for column elements with resizable behavior
 */
export declare class ColumnView extends BaseElementView {
  /**
   * Get column-specific behaviors
   */
  behaviors(): ElementBehaviors & {
    Resizable: {
      behaviorClass: any;
    };
    Sortable: {
      behaviorClass: any;
    };
  };

  /**
   * Get column template type
   */
  getTemplateType(): 'js';

  /**
   * Handle column resize
   * @param event - Resize event
   * @param ui - Resize UI data
   */
  onResize(event: any, ui: any): void;

  /**
   * Get column context menu groups
   */
  getContextMenuGroups(): ContextMenuGroup[];
}

/**
 * Column Empty View
 * View for empty column placeholder
 */
export declare class ColumnEmptyView extends BaseElementView {
  /** Template for empty column */
  template: string;

  /**
   * Get empty column template type
   */
  getTemplateType(): 'underscore';
}

/**
 * Container View
 * View class for container elements (experimental feature)
 */
export declare class ContainerView extends BaseElementView {
  /**
   * Get container-specific behaviors
   */
  behaviors(): ElementBehaviors;

  /**
   * Get container template type
   */
  getTemplateType(): 'js';

  /**
   * Get container context menu groups
   */
  getContextMenuGroups(): ContextMenuGroup[];

  /**
   * Check if container is empty
   */
  isEmpty(): boolean;
}

/**
 * Container Empty View
 * View for empty container placeholder
 */
export declare class ContainerEmptyView extends BaseElementView {
  /** Template for empty container */
  template: string;

  /**
   * Get empty container template type
   */
  getTemplateType(): 'underscore';
}

/**
 * Container Empty Component
 * Component for managing empty container state
 */
export declare class ContainerEmptyComponent {
  /**
   * Show empty container placeholder
   */
  show(): void;

  /**
   * Hide empty container placeholder
   */
  hide(): void;

  /**
   * Check if container should show empty state
   */
  shouldShow(): boolean;
}

/**
 * Element view factory
 * Creates appropriate view instances for element types
 */
export interface ElementViewFactory {
  /**
   * Create view for element type
   * @param elementType - Element type
   * @param model - Element model
   * @param options - View options
   */
  createView(elementType: string, model: any, options?: any): BaseElementView;

  /**
   * Register view class for element type
   * @param elementType - Element type
   * @param viewClass - View class constructor
   */
  registerViewClass(elementType: string, viewClass: any): void;

  /**
   * Get view class for element type
   * @param elementType - Element type
   */
  getViewClass(elementType: string): any;

  /**
   * Check if view class exists for element type
   * @param elementType - Element type
   */
  hasViewClass(elementType: string): boolean;
}

/**
 * Preview management interface
 * Handles preview rendering and updates
 */
export interface PreviewManager {
  /** Preview iframe element */
  $iframe: JQuery;

  /** Preview document */
  previewDocument: Document;

  /** Preview window */
  previewWindow: Window;

  /** Preview loading state */
  isLoading: boolean;

  /**
   * Initialize preview
   */
  initPreview(): void;

  /**
   * Load preview content
   * @param url - Preview URL
   */
  loadPreview(url: string): void;

  /**
   * Refresh preview
   */
  refreshPreview(): void;

  /**
   * Update preview element
   * @param elementId - Element ID
   * @param content - New content
   */
  updatePreviewElement(elementId: string, content: string): void;

  /**
   * Scroll preview to element
   * @param elementId - Element ID
   */
  scrollToElement(elementId: string): void;

  /**
   * Handle preview ready event
   */
  onPreviewReady(): void;
}

/**
 * Element hierarchy manager
 * Manages element parent-child relationships
 */
export interface ElementHierarchyManager {
  /** Element hierarchy tree */
  hierarchy: Map<string, string[]>;

  /**
   * Add element to hierarchy
   * @param elementId - Element ID
   * @param parentId - Parent element ID
   */
  addElement(elementId: string, parentId?: string): void;

  /**
   * Remove element from hierarchy
   * @param elementId - Element ID
   */
  removeElement(elementId: string): void;

  /**
   * Get element children
   * @param elementId - Element ID
   */
  getChildren(elementId: string): string[];

  /**
   * Get element parent
   * @param elementId - Element ID
   */
  getParent(elementId: string): string | null;

  /**
   * Get element ancestors
   * @param elementId - Element ID
   */
  getAncestors(elementId: string): string[];

  /**
   * Get element descendants
   * @param elementId - Element ID
   */
  getDescendants(elementId: string): string[];

  /**
   * Move element in hierarchy
   * @param elementId - Element to move
   * @param newParentId - New parent ID
   * @param position - Position in new parent
   */
  moveElement(elementId: string, newParentId: string, position?: number): void;
}