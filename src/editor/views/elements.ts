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