/**
 * Navigator View Types
 * View classes for the Elementor editor navigator panel
 */

/**
 * Navigator storage configuration
 */
export interface NavigatorStorage {
  /** Navigator visibility */
  visible: boolean;
  /** Navigator size and position */
  size: {
    width: string;
    height: string;
    top: string;
    bottom: string;
    right: string;
    left: string;
  };
}

/**
 * Navigator indicator configuration
 */
export interface NavigatorIndicator {
  /** Indicator title */
  title: string;
  /** Indicator icon class */
  icon: string;
  /** Related setting keys */
  settingKeys: string[];
  /** Related control section */
  section: string;
}

/**
 * Navigator draggable options
 */
export interface NavigatorDraggableOptions {
  /** Fix for iframe interactions */
  iframeFix: boolean;
  /** Drag handle selector */
  handle: string;
  /** Drag callback function */
  drag: (event: any, ui: any) => void;
  /** Drag stop callback */
  stop: (event: any, ui: any) => void;
}

/**
 * Navigator resizable options
 */
export interface NavigatorResizableOptions {
  /** Resize handles */
  handles: string;
  /** Containment element */
  containment: string | HTMLElement;
  /** Minimum width */
  minWidth: number;
  /** Maximum width */
  maxWidth: number;
  /** Minimum height */
  minHeight: number;
  /** Resize start callback */
  start: () => void;
  /** Resize stop callback */
  stop: () => void;
}

/**
 * Navigator Region
 * Main navigator region with docking and resize capabilities
 */
export declare class NavigatorRegion {
  /** Navigator component instance */
  component: any;

  /** Whether navigator is docked */
  isDocked: boolean;

  /** Navigator indicators configuration */
  indicators: {
    [key: string]: NavigatorIndicator;
  };

  /** Storage instance */
  storage: NavigatorStorage;

  /** Current layout view */
  currentView: any;

  /**
   * Constructor
   * @param options - Navigator options
   */
  constructor(options: any);

  /**
   * Get storage key for navigator
   */
  getStorageKey(): string;

  /**
   * Get default storage configuration
   */
  getDefaultStorage(): NavigatorStorage;

  /**
   * Get current layout view
   */
  getLayout(): any;

  /**
   * Get draggable options for navigator
   */
  getDraggableOptions(): NavigatorDraggableOptions;

  /**
   * Get resizable options for navigator
   */
  getResizableOptions(): NavigatorResizableOptions;

  /**
   * Set navigator size from storage
   */
  setSize(): void;

  /**
   * Make navigator draggable
   */
  draggable(): void;

  /**
   * Make navigator resizable
   */
  resizable(): void;

  /**
   * Ensure navigator position is valid
   */
  ensurePosition(): void;

  /**
   * Handle navigator drag
   * @param event - Drag event
   * @param ui - UI data
   */
  onDrag(event: any, ui: any): void;

  /**
   * Handle drag stop
   * @param event - Drag event
   * @param ui - UI data
   */
  onDragStop(event: any, ui: any): void;

  /**
   * Handle edit mode switch
   * @param activeMode - New active mode
   */
  onEditModeSwitched(activeMode: string): void;

  /**
   * Handle document loaded
   */
  onDocumentLoaded(): void;

  /**
   * Handle document unloaded
   */
  onDocumentUnloaded(): void;

  /**
   * Show navigator
   */
  show(): void;

  /**
   * Hide navigator
   */
  hide(): void;

  /**
   * Toggle navigator visibility
   */
  toggle(): void;

  /**
   * Check if navigator is visible
   */
  isVisible(): boolean;

  /**
   * Dock navigator to panel
   */
  dock(): void;

  /**
   * Undock navigator from panel
   */
  undock(): void;

  /**
   * Toggle dock state
   */
  toggleDock(): void;
}

/**
 * Navigator Layout View
 * Layout view for navigator content
 */
export declare class NavigatorLayoutView {
  /** Navigator template */
  template: string;

  /** Navigator element ID */
  id: string;

  /** Navigator regions */
  regions: {
    content: string;
    header: string;
    footer: string;
  };

  /**
   * Initialize navigator layout
   */
  initialize(): void;

  /**
   * Handle navigator show
   */
  onShow(): void;

  /**
   * Render navigator content
   */
  renderContent(): void;

  /**
   * Update navigator display
   */
  updateDisplay(): void;
}

/**
 * Navigator Element View
 * View for individual elements in navigator tree
 */
export declare class NavigatorElementView {
  /** Element template */
  template: string;

  /** Element model */
  model: any;

  /** UI selectors */
  ui: {
    item: string;
    title: string;
    toggle: string;
    indicators: string;
  };

  /**
   * Get CSS class name
   */
  className(): string;

  /**
   * Get event handlers
   */
  events(): { [event: string]: string };

  /**
   * Handle element click
   * @param event - Click event
   */
  onElementClick(event: MouseEvent): void;

  /**
   * Handle toggle click
   * @param event - Click event
   */
  onToggleClick(event: MouseEvent): void;

  /**
   * Select this element
   */
  select(): void;

  /**
   * Deselect this element
   */
  deselect(): void;

  /**
   * Check if element is selected
   */
  isSelected(): boolean;

  /**
   * Expand element children
   */
  expand(): void;

  /**
   * Collapse element children
   */
  collapse(): void;

  /**
   * Check if element is expanded
   */
  isExpanded(): boolean;

  /**
   * Update element indicators
   */
  updateIndicators(): void;
}

/**
 * Navigator search interface
 * Handles navigator element search and filtering
 */
export interface NavigatorSearch {
  /** Search input element */
  searchInput: HTMLInputElement;

  /** Search results */
  searchResults: NavigatorElementView[];

  /** Current search query */
  currentQuery: string;

  /**
   * Perform search
   * @param query - Search query
   */
  search(query: string): void;

  /**
   * Clear search results
   */
  clearSearch(): void;

  /**
   * Filter elements by search
   * @param elements - Elements to filter
   * @param query - Search query
   */
  filterElements(elements: NavigatorElementView[], query: string): NavigatorElementView[];

  /**
   * Highlight search matches
   * @param element - Element to highlight
   * @param query - Search query
   */
  highlightMatches(element: NavigatorElementView, query: string): void;
}

/**
 * Navigator tree manager
 * Manages navigator tree structure and operations
 */
export interface NavigatorTreeManager {
  /** Tree root elements */
  rootElements: NavigatorElementView[];

  /** Expanded elements set */
  expandedElements: Set<string>;

  /** Selected elements set */
  selectedElements: Set<string>;

  /**
   * Build navigator tree
   * @param document - Document model
   */
  buildTree(document: any): void;

  /**
   * Refresh tree structure
   */
  refreshTree(): void;

  /**
   * Add element to tree
   * @param element - Element to add
   * @param parent - Parent element
   */
  addElementToTree(element: any, parent?: NavigatorElementView): void;

  /**
   * Remove element from tree
   * @param elementId - Element ID
   */
  removeElementFromTree(elementId: string): void;

  /**
   * Move element in tree
   * @param elementId - Element to move
   * @param newParentId - New parent ID
   * @param position - Position in new parent
   */
  moveElementInTree(elementId: string, newParentId: string, position: number): void;

  /**
   * Expand all elements
   */
  expandAll(): void;

  /**
   * Collapse all elements
   */
  collapseAll(): void;

  /**
   * Select element
   * @param elementId - Element ID
   * @param multiSelect - Allow multiple selection
   */
  selectElement(elementId: string, multiSelect?: boolean): void;

  /**
   * Deselect element
   * @param elementId - Element ID
   */
  deselectElement(elementId: string): void;

  /**
   * Clear all selections
   */
  clearSelection(): void;
}

/**
 * Navigator context menu
 * Handles navigator element context menu
 */
export interface NavigatorContextMenu {
  /** Context menu groups */
  menuGroups: any[];

  /**
   * Show context menu
   * @param element - Target element
   * @param position - Menu position
   */
  showContextMenu(element: NavigatorElementView, position: { x: number; y: number }): void;

  /**
   * Hide context menu
   */
  hideContextMenu(): void;

  /**
   * Get context menu items for element
   * @param element - Target element
   */
  getContextMenuItems(element: NavigatorElementView): any[];

  /**
   * Handle context menu action
   * @param action - Menu action
   * @param element - Target element
   */
  handleContextMenuAction(action: string, element: NavigatorElementView): void;
}

/**
 * Navigator drag and drop
 * Handles navigator element drag and drop operations
 */
export interface NavigatorDragDrop {
  /** Currently dragging element */
  draggingElement: NavigatorElementView | null;

  /** Drop target element */
  dropTarget: NavigatorElementView | null;

  /** Drag helper element */
  dragHelper: HTMLElement | null;

  /**
   * Initialize drag and drop
   */
  initDragDrop(): void;

  /**
   * Start drag operation
   * @param element - Element to drag
   * @param event - Drag event
   */
  startDrag(element: NavigatorElementView, event: DragEvent): void;

  /**
   * Handle drag over
   * @param element - Target element
   * @param event - Drag event
   */
  dragOver(element: NavigatorElementView, event: DragEvent): void;

  /**
   * Handle drop
   * @param element - Target element
   * @param event - Drop event
   */
  drop(element: NavigatorElementView, event: DragEvent): void;

  /**
   * End drag operation
   */
  endDrag(): void;

  /**
   * Check if drop is allowed
   * @param source - Source element
   * @param target - Target element
   */
  isDropAllowed(source: NavigatorElementView, target: NavigatorElementView): boolean;
}