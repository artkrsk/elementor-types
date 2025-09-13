/**
 * Panel Elements Page Types
 * Types for the elements browser and element management in the panel
 */

/**
 * Element model data structure
 */
export interface ElementModelData {
  /** Element widget type */
  widgetType: string;
  /** Element type (widget, section, column, etc.) */
  elType?: string;
  /** Element title */
  title: string;
  /** Element icon class */
  icon: string;
  /** Element categories */
  categories: string[];
  /** Element keywords for search */
  keywords: string[];
  /** Whether element is editable */
  editable: boolean;
  /** Whether element is a custom element */
  custom?: boolean;
  /** Whether to hide on search */
  hideOnSearch?: boolean;
  /** Element help URL */
  help_url?: string;
  /** Whether element is deprecated */
  is_deprecated?: boolean;
  /** Element promotion configuration */
  promotion?: any;
}

/**
 * Category model data structure
 */
export interface CategoryModelData {
  /** Category name/slug */
  name: string;
  /** Category title */
  title: string;
  /** Category icon */
  icon: string;
  /** Category default open state */
  defaultActive: boolean;
  /** Category sort order */
  sort?: "a-z" | "default";
  /** Hide category if empty */
  hideIfEmpty?: boolean;
  /** Category items */
  items?: ElementModel[];
  /** Category promotion configuration */
  promotion?: any;
}

/**
 * Element search filters
 */
export interface ElementSearchFilters {
  /** Search query string */
  query?: string;
  /** Category filter */
  category?: string;
  /** Element type filter */
  elType?: string;
  /** Only editable elements */
  editableOnly?: boolean;
  /** Exclude deprecated elements */
  excludeDeprecated?: boolean;
}

/**
 * Element browser UI elements
 */
export interface ElementsBrowserUI {
  /** Search input */
  input: string;
  /** Categories container */
  categories: string;
  /** Elements container */
  elements: string;
  /** Notice area */
  notice: string;
}

/**
 * Element browser events
 */
export interface ElementsBrowserEvents {
  /** Search input keydown */
  "keydown @ui.input": "onInputChanged";
  /** Search input change */
  "input @ui.input": "onInputChanged";
}

/**
 * Category model data structure
 */
export interface CategoryModelData {
  /** Category name/slug */
  name: string;
  /** Category title */
  title: string;
  /** Category icon */
  icon: string;
  /** Category default open state */
  defaultActive: boolean;
  /** Category promotion configuration */
  promotion?: any;
}

/**
 * Element model for panel elements page
 */
export declare class ElementModel {
  /** Element configuration data */
  attributes: ElementModelData;

  /**
   * Get element widget type
   */
  get(attribute: "widgetType"): string;
  get(attribute: "title"): string;
  get(attribute: "icon"): string;
  get(attribute: "categories"): string[];
  get(attribute: "keywords"): string[];
  get(attribute: "editable"): boolean;
  get(attribute: keyof ElementModelData): any;

  /**
   * Check if element matches search query
   * @param query - Search query string
   */
  matchesSearch(query: string): boolean;

  /**
   * Check if element belongs to category
   * @param categoryName - Category name to check
   */
  belongsToCategory(categoryName: string): boolean;

  /**
   * Check if element is editable
   */
  isEditable(): boolean;

  /**
   * Check if element is promoted
   */
  isPromoted(): boolean;

  /**
   * Check if element should be hidden on search
   */
  isHiddenOnSearch(): boolean;

  /**
   * Get element context menu groups
   */
  getContextMenuGroups(): any[];

  /**
   * Create drag helper for element
   */
  createDragHelper(): JQuery;
}

/**
 * Category model for panel elements page
 */
export declare class CategoryModel {
  /** Category configuration data */
  attributes: CategoryModelData;

  /** Category elements collection */
  collection: ElementsCollection;

  /**
   * Get category attribute
   */
  get(attribute: keyof CategoryModelData): any;

  /**
   * Check if category is active/open
   */
  isActive(): boolean;

  /**
   * Set category active state
   * @param active - Whether category should be active
   */
  setActive(active: boolean): void;

  /**
   * Get category element count
   */
  getElementCount(): number;

  /**
   * Check if category should be hidden when empty
   */
  shouldHideIfEmpty(): boolean;

  /**
   * Sort category elements
   */
  sortElements(): void;

  /**
   * Get filtered elements
   * @param filters - Filter criteria
   */
  getFilteredElements(filters: ElementSearchFilters): ElementModel[];
}

/**
 * Elements collection for panel
 */
export declare class ElementsCollection {
  /** Array of element models */
  models: ElementModel[];

  /**
   * Add element to collection
   * @param elementData - Element data or model
   */
  add(elementData: ElementModelData | ElementModel): void;

  /**
   * Remove element from collection
   * @param element - Element model or index
   */
  remove(element: ElementModel | number): void;

  /**
   * Filter elements by search query
   * @param query - Search query string
   */
  filterBySearch(query: string): ElementModel[];

  /**
   * Filter elements by category
   * @param categoryName - Category name
   */
  filterByCategory(categoryName: string): ElementModel[];

  /**
   * Filter elements by type
   * @param elType - Element type
   */
  filterByType(elType: string): ElementModel[];

  /**
   * Apply multiple filters
   * @param filters - Filter criteria
   */
  filter(filters: ElementSearchFilters): ElementModel[];

  /**
   * Search elements with advanced criteria
   * @param query - Search query
   * @param options - Search options
   */
  search(
    query: string,
    options?: {
      includeKeywords?: boolean;
      includeCategories?: boolean;
      caseSensitive?: boolean;
    }
  ): ElementModel[];

  /**
   * Get all elements in collection
   */
  getAllElements(): ElementModel[];

  /**
   * Get editable elements only
   */
  getEditableElements(): ElementModel[];

  /**
   * Get promoted elements
   */
  getPromotedElements(): ElementModel[];

  /**
   * Sort collection by criteria
   * @param sortBy - Sort criteria
   */
  sortBy(sortBy: "name" | "category" | "type" | "custom"): void;

  /**
   * Get element by widget type
   * @param widgetType - Widget type to find
   */
  findByWidgetType(widgetType: string): ElementModel | undefined;

  /**
   * Each iteration helper
   * @param callback - Callback function
   */
  each(callback: (element: ElementModel, index: number) => void): void;
}

/**
 * Categories collection for panel
 */
export declare class CategoriesCollection {
  /** Array of category models */
  models: CategoryModel[];

  /**
   * Add category to collection
   * @param categoryData - Category data or model
   */
  add(categoryData: CategoryModelData | CategoryModel): void;

  /**
   * Get category by name
   * @param name - Category name
   */
  getCategory(name: string): CategoryModel | undefined;

  /**
   * Get all categories
   */
  getAllCategories(): CategoryModel[];

  /**
   * Get active category
   */
  getActiveCategory(): CategoryModel | null;

  /**
   * Set active category
   * @param categoryName - Category name to activate
   */
  setActiveCategory(categoryName: string): void;

  /**
   * Get visible categories (not hidden when empty)
   */
  getVisibleCategories(): CategoryModel[];

  /**
   * Sort categories by configuration
   */
  sortCategories(): void;

  /**
   * Filter categories by element availability
   * @param elements - Available elements
   */
  filterByAvailableElements(elements: ElementModel[]): CategoryModel[];
}

/**
 * Elements page view configuration
 */
export interface ElementsPageConfig {
  /** Search input selector */
  searchSelector: string;
  /** Categories container selector */
  categoriesSelector: string;
  /** Elements container selector */
  elementsSelector: string;
  /** Auto focus search on load */
  autoFocusSearch: boolean;
}

/**
 * Element search view
 * Handles search input and filtering
 */
export interface ElementSearchView {
  /** Search template */
  template: string;
  /** Tag name for search container */
  tagName: string;
  /** Search view ID */
  id: string;
  /** Search UI elements */
  ui: ElementsBrowserUI;
  /** Search events */
  events: ElementsBrowserEvents;
  /** Localized search value */
  localizedValue: string;
  /** Localized value store */
  localizedValueStore: any;

  /**
   * Clear search input
   */
  clearInput(): void;

  /**
   * Handle input change events
   * @param event - Input event
   */
  onInputChanged(event: Event): void;

  /**
   * Focus search input
   */
  focus(): void;
}

/**
 * Element category view
 * Individual category display with elements
 */
export interface ElementCategoryView {
  /** Category template */
  template: string;
  /** Category CSS class */
  className: string;
  /** Category UI elements */
  ui: {
    title: string;
    items: string;
    chip: string;
  };
  /** Category events */
  events: {
    "click @ui.title": "onTitleClick";
    "click @ui.chip": "onChipClick";
  };
  /** Category model */
  model: CategoryModel;
  /** Category elements collection */
  collection: ElementsCollection;
  /** Child view for elements */
  childView: any;
  /** Child view container */
  childViewContainer: string;

  /**
   * Get category ID
   */
  id(): string;

  /**
   * Initialize category view
   */
  initialize(): void;

  /**
   * Get category behaviors
   */
  behaviors(): any;

  /**
   * Handle category title click
   */
  onTitleClick(): void;

  /**
   * Handle category chip click
   */
  onChipClick(): void;

  /**
   * Render category view
   */
  onRender(): void;

  /**
   * Check if category is active
   */
  isActive(): boolean;

  /**
   * Toggle category active state
   */
  toggleActive(): void;
}

/**
 * Elements categories view
 * Container for all category views
 */
export interface ElementCategoriesView {
  /** Categories template */
  template: string;
  /** Child view type */
  childView: any;
  /** Child view container */
  childViewContainer: string;
  /** Categories view ID */
  id: string;

  /**
   * Initialize categories view
   */
  initialize(): void;

  /**
   * Handle panel elements filter change
   */
  onPanelElementsFilterChange(): void;
}

/**
 * Individual element view
 * Single element display and interaction
 */
export interface ElementItemView {
  /** Element template */
  template: string;
  /** Element UI elements */
  ui: {
    element: string;
  };
  /** Element model */
  model: ElementModel;

  /**
   * Get element CSS class
   */
  className(): string;

  /**
   * Get element events
   */
  events(): any;

  /**
   * Get element behaviors
   */
  behaviors(): any;

  /**
   * Check if element is editable
   */
  isEditable(): boolean;

  /**
   * Handle element render
   */
  onRender(): void;

  /**
   * Handle element mouse down
   * @param event - Mouse event
   */
  onMouseDown(event: MouseEvent): void;

  /**
   * Create element drag helper
   */
  createDragHelper(): JQuery;
}

/**
 * Elements list view
 * Container for element item views
 */
export interface ElementsListView {
  /** Elements template */
  template: string;
  /** Child view type */
  childView: any;
  /** Child view container */
  childViewContainer: string;
  /** Elements collection */
  collection: ElementsCollection;

  /**
   * Initialize elements list
   */
  initialize(): void;

  /**
   * Filter elements display
   * @param filters - Filter criteria
   */
  filterElements(filters: ElementSearchFilters): void;

  /**
   * Handle collection change
   */
  onCollectionChange(): void;
}

/**
 * Elements page layout view
 * Main container for elements browser
 */
export interface ElementsPageLayoutView {
  /** Page template */
  template: string;
  /** Page ID */
  id: string;
  /** Page options */
  options: {
    autoFocusSearch: boolean;
  };
  /** Page regions */
  regions: {
    elements: string;
    search: string;
    notice: string;
  };
  /** Region views configuration */
  regionViews: any;
  /** Elements collection */
  elementsCollection: ElementsCollection;
  /** Categories collection */
  categoriesCollection: CategoriesCollection;

  /**
   * Initialize elements page
   */
  initialize(): void;

  /**
   * Initialize region views
   */
  initRegionViews(): void;

  /**
   * Initialize elements collection
   */
  initElementsCollection(): void;

  /**
   * Initialize categories collection
   */
  initCategoriesCollection(): void;

  /**
   * Check if widget should be added
   * @param widget - Widget configuration
   */
  shouldAddWidget(widget: any): boolean;

  /**
   * Get collection item data
   * @param item - Item configuration
   */
  getCollectionItem(item: any): ElementModelData;

  /**
   * Deep merge objects
   * @param originalObj - Original object
   * @param replacementObj - Replacement object
   */
  deepMerge(originalObj: any, replacementObj: any): any;

  /**
   * Show specific view
   * @param viewName - View name to show
   */
  showView(viewName: string): void;

  /**
   * Clear search input
   */
  clearSearchInput(): void;

  /**
   * Change filter value
   * @param filterValue - New filter value
   */
  changeFilter(filterValue: string | null): void;

  /**
   * Clear all filters
   */
  clearFilters(): void;

  /**
   * Focus search input
   */
  focusSearch(): void;

  /**
   * Handle child view render
   */
  onChildviewChildrenRender(): void;

  /**
   * Handle search input change
   * @param child - Child view
   */
  onChildviewSearchChangeInput(child: any): void;

  /**
   * Handle page show
   */
  onShow(): void;

  /**
   * Handle page destroy
   */
  onDestroy(): void;
}
