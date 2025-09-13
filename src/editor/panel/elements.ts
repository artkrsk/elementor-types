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
  get(attribute: 'widgetType'): string;
  get(attribute: 'title'): string;
  get(attribute: 'icon'): string;
  get(attribute: 'categories'): string[];
  get(attribute: 'keywords'): string[];
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
}

/**
 * Category model for panel elements page
 */
export declare class CategoryModel {
  /** Category configuration data */
  attributes: CategoryModelData;

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
}

/**
 * Elements collection for panel
 */
export declare class ElementsCollection {
  /** Array of element models */
  models: ElementModel[];

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
   * Get all elements in collection
   */
  getAllElements(): ElementModel[];
}

/**
 * Categories collection for panel
 */
export declare class CategoriesCollection {
  /** Array of category models */
  models: CategoryModel[];

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
 * Elements page view for panel
 */
export declare class ElementsPageView {
  /** Page template selector */
  template: string;

  /** Elements collection */
  collection: ElementsCollection;

  /** Categories collection */
  categoriesCollection: CategoriesCollection;

  /** Current search query */
  searchQuery: string;

  /** Currently active category */
  activeCategory: string | null;

  /**
   * Initialize elements page
   */
  initialize(): void;

  /**
   * Bind events for search and category interactions
   */
  bindEvents(): void;

  /**
   * Handle search input changes
   * @param query - Search query
   */
  onSearchChanged(query: string): void;

  /**
   * Handle category selection
   * @param categoryName - Selected category name
   */
  onCategorySelected(categoryName: string): void;

  /**
   * Render elements based on current filters
   */
  renderElements(): void;

  /**
   * Render categories list
   */
  renderCategories(): void;

  /**
   * Clear search and show all elements
   */
  clearSearch(): void;

  /**
   * Focus on search input
   */
  focusSearch(): void;
}