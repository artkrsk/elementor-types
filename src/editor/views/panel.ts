/**
 * Panel View Types
 * View classes for panel interface elements and pages
 */

/**
 * Panel Element View
 * View for individual elements in the panel element library
 */
export declare class PanelElementView {
  /** Element template */
  template: string;

  /** Element model */
  model: any;

  /** UI selectors */
  ui: {
    element: string;
  };

  /**
   * Get CSS class name for element
   */
  className(): string;

  /**
   * Get event handlers
   */
  events(): { [event: string]: string };

  /**
   * Get element behaviors
   */
  behaviors(): any;

  /**
   * Check if element is editable
   */
  isEditable(): boolean;

  /**
   * Handle render completion
   */
  onRender(): void;

  /**
   * Add element to page
   */
  addToPage(): void;

  /**
   * Handle mouse down events
   * @param event - Mouse event
   */
  onMouseDown(event: MouseEvent): void;
}

/**
 * Panel Category View
 * View for element categories in the panel
 */
export declare class PanelCategoryView {
  /** Category template */
  template: string;

  /** Category model */
  model: any;

  /** Child view for elements */
  childView: any;

  /** Container for child views */
  childViewContainer: string;

  /**
   * Get CSS class name for category
   */
  className(): string;

  /**
   * Get event handlers
   */
  events(): { [event: string]: string };

  /**
   * Initialize category view
   */
  initialize(): void;

  /**
   * Handle category toggle
   * @param event - Click event
   */
  onCategoryToggle(event: MouseEvent): void;

  /**
   * Show category elements
   */
  showElements(): void;

  /**
   * Hide category elements
   */
  hideElements(): void;

  /**
   * Check if category is active
   */
  isActive(): boolean;
}

/**
 * Panel Categories View
 * Composite view for all element categories
 */
export declare class PanelCategoriesView {
  /** Categories template */
  template: string;

  /** Child view class */
  childView: typeof PanelCategoryView;

  /** Container for child views */
  childViewContainer: string;

  /** View ID */
  id: string;

  /**
   * Initialize categories view
   */
  initialize(): void;

  /**
   * Handle panel elements filter changes
   */
  onPanelElementsFilterChange(): void;

  /**
   * Filter categories by search term
   * @param searchTerm - Search filter
   */
  filterBySearch(searchTerm: string): void;
}

/**
 * Panel Elements View
 * View for displaying filtered elements list
 */
export declare class PanelElementsView {
  /** Elements template */
  template: string;

  /** Child view class */
  childView: typeof PanelElementView;

  /** Container for child views */
  childViewContainer: string;

  /** View ID */
  id: string;

  /** Collection of elements */
  collection: any;

  /**
   * Initialize elements view
   */
  initialize(): void;

  /**
   * Handle collection changes
   */
  onCollectionChange(): void;

  /**
   * Filter elements by search term
   * @param searchTerm - Search filter
   */
  filterBySearch(searchTerm: string): void;

  /**
   * Reset to show all elements
   */
  resetFilter(): void;
}

/**
 * Panel Search View
 * View for element search functionality
 */
export declare class PanelSearchView {
  /** Search template */
  template: string;

  /** UI selectors */
  ui: {
    input: string;
    clear: string;
  };

  /**
   * Get event handlers
   */
  events(): { [event: string]: string };

  /**
   * Handle search input
   * @param event - Input event
   */
  onSearchInput(event: InputEvent): void;

  /**
   * Handle clear search
   * @param event - Click event
   */
  onClearSearch(event: MouseEvent): void;

  /**
   * Focus search input
   */
  focusInput(): void;

  /**
   * Clear search input
   */
  clearInput(): void;

  /**
   * Get current search value
   */
  getSearchValue(): string;
}

/**
 * Panel Global Elements View
 * View for global/saved elements
 */
export declare class PanelGlobalElementsView {
  /** Global elements template */
  template: string;

  /** Child view class */
  childView: typeof PanelElementView;

  /** Container for child views */
  childViewContainer: string;

  /**
   * Initialize global elements view
   */
  initialize(): void;

  /**
   * Handle global element selection
   * @param event - Selection event
   */
  onGlobalElementSelect(event: any): void;

  /**
   * Add global element to page
   * @param globalElement - Global element model
   */
  addGlobalElement(globalElement: any): void;
}