/**
 * Editor Element View System
 * Base classes and interfaces for Elementor editor element views
 */

/**
 * Element UI selectors
 */
export interface ElementUISelectors {
  /** Tools overlay selector */
  tools: string;
  /** Edit button selector */
  editButton: string;
  /** Duplicate button selector */
  duplicateButton: string;
  /** Add button selector */
  addButton: string;
  /** Remove button selector */
  removeButton: string;
}

/**
 * Element render attributes
 */
export interface ElementRenderAttributes {
  /** Element ID attribute */
  'data-id': string;
  /** Element type attribute */
  'data-element_type': string;
  /** Model CID attribute */
  'data-model-cid': string;
  /** Additional custom attributes */
  [attribute: string]: string | number;
}

/**
 * Context menu group configuration
 */
export interface ContextMenuGroup {
  /** Group name/identifier */
  name: string;
  /** Group actions */
  actions: ContextMenuAction[];
}

/**
 * Context menu action configuration
 */
export interface ContextMenuAction {
  /** Action name/identifier */
  name: string;
  /** Action display title */
  title: string;
  /** Action icon class */
  icon?: string;
  /** Keyboard shortcut */
  shortcut?: string | JQuery;
  /** Callback function */
  callback?: Function;
  /** Promotion URL for pro features */
  promotionURL?: string;
}

/**
 * Element behavior configuration
 */
export interface ElementBehaviors {
  /** Context menu behavior */
  contextMenu?: {
    behaviorClass: any;
    groups: ContextMenuGroup[];
  };
  /** Inline editing behavior */
  InlineEditing?: {
    behaviorClass: any;
    inlineEditingClass: string;
  };
  /** Draggable behavior */
  Draggable?: {
    behaviorClass: any;
  };
  /** Resizable behavior */
  Resizable?: {
    behaviorClass: any;
  };
  /** Sortable behavior */
  Sortable?: {
    behaviorClass: any;
  };
  /** Additional behaviors */
  [behaviorName: string]: any;
}

/**
 * Element view events map
 */
export interface ElementViewEvents {
  /** Mouse down event */
  mousedown: string;
  /** Click event */
  click: string;
  /** Edit button click */
  'click @ui.editButton': string;
  /** Duplicate button click */
  'click @ui.duplicateButton': string;
  /** Add button click */
  'click @ui.addButton': string;
  /** Remove button click */
  'click @ui.removeButton': string;
  /** Additional events */
  [event: string]: string;
}

/**
 * Data binding interface for element views
 */
export interface DataBinding {
  /** Element dataset */
  dataset: DOMStringMap;
  /** DOM element */
  el: HTMLElement;
}

/**
 * Base Element View
 * Foundation class for all Elementor editor element views
 */
export declare class BaseElementView {
  /** HTML tag name for the view */
  tagName: string;

  /** Controls CSS parser instance */
  controlsCSSParser: any | null;

  /** Whether rendering is allowed */
  allowRender: boolean;

  /** Whether edit tools should be toggled */
  toggleEditTools: boolean;

  /** Render attributes for the element */
  renderAttributes: ElementRenderAttributes;

  /** Whether element is currently rendering */
  isRendering: boolean;

  /** Element model */
  model: any;

  /** Element container */
  container: any;

  /** Parent view */
  _parent: BaseElementView | null;

  /** View behaviors */
  _behaviors: any[];

  /**
   * Get CSS class names for the element
   */
  className(): string;

  /**
   * Get HTML attributes for the element
   */
  attributes(): ElementRenderAttributes;

  /**
   * Get UI selectors for the element
   */
  ui(): ElementUISelectors;

  /**
   * Get element behaviors configuration
   */
  behaviors(): ElementBehaviors;

  /**
   * Get specific behavior by name
   * @param name - Behavior name
   */
  getBehavior(name: string): any;

  /**
   * Get event handlers map
   */
  events(): ElementViewEvents;

  /**
   * Get element type
   */
  getElementType(): string;

  /**
   * Get element ID as integer
   */
  getIDInt(): number;

  /**
   * Get child element type
   */
  getChildType(): string;

  /**
   * Get child view for a model
   * @param model - Child model
   */
  getChildView(model: any): any;

  /**
   * Get template type
   */
  getTemplateType(): 'js' | 'underscore';

  /**
   * Get model for editing
   */
  getEditModel(): any;

  /**
   * Get element container
   */
  getContainer(): any;

  /**
   * Get element unique ID
   */
  getElementUniqueID(): string;

  /**
   * Get element ID
   */
  getID(): string;

  /**
   * Get context menu groups
   */
  getContextMenuGroups(): ContextMenuGroup[];

  /**
   * Handle mouse down events
   * @param event - Mouse event
   */
  onMouseDown(event: MouseEvent): void;

  /**
   * Handle anchor link clicks
   * @param event - Click event
   */
  handleAnchorClick(event: MouseEvent): void;

  /**
   * Handle edit button clicks
   * @param event - Click event
   */
  onEditButtonClick(event: MouseEvent): void;

  /**
   * Handle duplicate button clicks
   * @param event - Click event
   */
  onDuplicateButtonClick(event: MouseEvent): void;

  /**
   * Handle add button clicks
   * @param event - Click event
   */
  onAddButtonClick(event: MouseEvent): void;

  /**
   * Handle remove button clicks
   * @param event - Click event
   */
  onRemoveButtonClick(event: MouseEvent): void;
}

/**
 * Base Widget View
 * Extended base for widget elements
 */
export declare class BaseWidgetView extends BaseElementView {
  /** Template type for widget */
  _templateType: string | null;

  /** Enable edit tools toggle */
  toggleEditTools: true;

  /**
   * Handle click to edit widget
   * @param event - Click event
   */
  onClickEdit(event: MouseEvent): void;

  /**
   * Get widget-specific behaviors
   */
  behaviors(): ElementBehaviors;

  /**
   * Get widget-specific context menu groups
   */
  getContextMenuGroups(): ContextMenuGroup[];
}

/**
 * View manager interface
 * Manages view lifecycle and hierarchy
 */
export interface ViewManager {
  /** Active views registry */
  activeViews: Map<string, BaseElementView>;

  /** View hierarchy tree */
  viewHierarchy: Map<string, string[]>;

  /** View event bus */
  eventBus: any;

  /**
   * Register a view
   * @param id - View ID
   * @param view - View instance
   */
  registerView(id: string, view: BaseElementView): void;

  /**
   * Unregister a view
   * @param id - View ID
   */
  unregisterView(id: string): void;

  /**
   * Get view by ID
   * @param id - View ID
   */
  getView(id: string): BaseElementView | undefined;

  /**
   * Get all views of a specific type
   * @param type - Element type
   */
  getViewsByType(type: string): BaseElementView[];

  /**
   * Get child views of a parent
   * @param parentId - Parent view ID
   */
  getChildViews(parentId: string): BaseElementView[];

  /**
   * Destroy view and cleanup
   * @param id - View ID
   */
  destroyView(id: string): void;

  /**
   * Refresh view rendering
   * @param id - View ID
   */
  refreshView(id: string): void;

  /**
   * Broadcast event to all views
   * @param event - Event name
   * @param data - Event data
   */
  broadcastEvent(event: string, data?: any): void;
}

/**
 * View renderer interface
 * Handles view rendering and updates
 */
export interface ViewRenderer {
  /** Rendering queue */
  renderQueue: Set<string>;

  /** Rendering in progress flag */
  isRendering: boolean;

  /**
   * Queue view for rendering
   * @param viewId - View ID
   * @param priority - Render priority
   */
  queueRender(viewId: string, priority?: number): void;

  /**
   * Process render queue
   */
  processRenderQueue(): void;

  /**
   * Render view immediately
   * @param view - View to render
   */
  renderView(view: BaseElementView): void;

  /**
   * Batch render multiple views
   * @param views - Views to render
   */
  batchRender(views: BaseElementView[]): void;

  /**
   * Clear render queue
   */
  clearRenderQueue(): void;
}

/**
 * View state interface
 * Manages view state and persistence
 */
export interface ViewState {
  /** View visibility state */
  visible: boolean;

  /** View selected state */
  selected: boolean;

  /** View locked state */
  locked: boolean;

  /** View editing state */
  editing: boolean;

  /** View loading state */
  loading: boolean;

  /** Custom state properties */
  custom: Record<string, any>;
}

/**
 * View state manager
 * Manages view state across the application
 */
export interface ViewStateManager {
  /** View states registry */
  viewStates: Map<string, ViewState>;

  /**
   * Get view state
   * @param viewId - View ID
   */
  getState(viewId: string): ViewState;

  /**
   * Set view state
   * @param viewId - View ID
   * @param state - State to set
   */
  setState(viewId: string, state: Partial<ViewState>): void;

  /**
   * Update view state property
   * @param viewId - View ID
   * @param property - Property name
   * @param value - Property value
   */
  updateState(viewId: string, property: keyof ViewState, value: any): void;

  /**
   * Clear view state
   * @param viewId - View ID
   */
  clearState(viewId: string): void;

  /**
   * Persist view states
   */
  persistStates(): void;

  /**
   * Restore view states
   */
  restoreStates(): void;
}