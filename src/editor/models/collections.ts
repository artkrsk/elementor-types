/**
 * Editor Collection Types
 * Collection classes for managing groups of models
 */

import type { BaseElementModel, ElementModel } from "./base";

/**
 * Collection add options
 */
export interface CollectionAddOptions {
  /** Suppress events when adding */
  silent?: boolean;
  /** Position to add at */
  at?: number;
  /** Merge with existing models */
  merge?: boolean;
  /** Remove duplicates */
  remove?: boolean;
  /** Additional options */
  [key: string]: any;
}

/**
 * Collection initialization options
 */
export interface CollectionOptions {
  /** Comparator function for sorting */
  comparator?: string | ((model: any) => any) | ((a: any, b: any) => number);
  /** Additional options */
  [key: string]: any;
}

/**
 * Base Collection
 * Foundation collection class for model management
 */
export declare class BaseCollection<T extends BaseElementModel = BaseElementModel> {
  /** Collection models array */
  models: T[];

  /** Collection length */
  length: number;

  /**
   * Initialize collection
   * @param models - Initial models
   * @param options - Collection options
   */
  initialize(models?: T[], options?: CollectionOptions): void;

  /**
   * Add model(s) to collection
   * @param models - Model(s) to add
   * @param options - Add options
   */
  add(models: T | T[], options?: CollectionAddOptions): T | T[];

  /**
   * Remove model(s) from collection
   * @param models - Model(s) to remove
   * @param options - Remove options
   */
  remove(models: T | T[], options?: any): T | T[];

  /**
   * Get model by ID or index
   * @param id - Model ID or index
   */
  get(id: string | number): T | undefined;

  /**
   * Get model at specific index
   * @param index - Model index
   */
  at(index: number): T | undefined;

  /**
   * Find model by predicate
   * @param predicate - Search predicate
   */
  find(predicate: (model: T) => boolean): T | undefined;

  /**
   * Filter models by predicate
   * @param predicate - Filter predicate
   */
  filter(predicate: (model: T) => boolean): T[];

  /**
   * Map over models
   * @param iterator - Map function
   */
  map<U>(iterator: (model: T) => U): U[];

  /**
   * For each model
   * @param iterator - Iterator function
   */
  forEach(iterator: (model: T) => void): void;

  /**
   * Get collection as array
   */
  toArray(): T[];

  /**
   * Convert collection to JSON
   */
  toJSON(): any[];

  /**
   * Clone the collection
   */
  clone(): BaseCollection<T>;

  /**
   * Clear all models
   */
  reset(models?: T[], options?: any): T[];

  /**
   * Check if collection is empty
   */
  isEmpty(): boolean;

  /**
   * Get first model
   */
  first(): T | undefined;

  /**
   * Get last model
   */
  last(): T | undefined;

  /**
   * Sort collection
   * @param options - Sort options
   */
  sort(options?: any): this;

  /**
   * Bind event listeners
   * @param events - Events object or event name
   * @param callback - Event callback
   */
  on(events: string | object, callback?: Function): this;

  /**
   * Unbind event listeners
   * @param events - Events object or event name
   * @param callback - Event callback
   */
  off(events?: string | object, callback?: Function): this;

  /**
   * Trigger events
   * @param event - Event name
   * @param args - Event arguments
   */
  trigger(event: string, ...args: any[]): this;
}

/**
 * Elements Collection
 * Collection for managing element models with type-specific model creation
 */
export declare class ElementsCollection extends BaseCollection<ElementModel> {
  /**
   * Add model to collection with validation
   * @param models - Model(s) to add
   * @param options - Add options
   * @param isCorrectSet - Whether this is called from correct method
   */
  add(models: ElementModel | ElementModel[], options?: CollectionAddOptions, isCorrectSet?: boolean): ElementModel | ElementModel[];

  /**
   * Create model instance based on element type
   * @param attrs - Model attributes
   * @param options - Model options
   */
  model(attrs: any, options?: any): ElementModel;

  /**
   * Clone collection with all models
   */
  clone(): ElementsCollection;

  /**
   * Add child model to collection (safe method)
   * @param model - Model to add
   * @param options - Add options
   */
  addChildModel(model: ElementModel, options?: CollectionAddOptions): ElementModel;

  /**
   * Get elements by type
   * @param elType - Element type
   */
  getElementsByType(elType: string): ElementModel[];

  /**
   * Get widgets by widget type
   * @param widgetType - Widget type
   */
  getWidgetsByType(widgetType: string): ElementModel[];

  /**
   * Find element by ID
   * @param id - Element ID
   */
  findById(id: string): ElementModel | undefined;

  /**
   * Get all nested elements (recursive)
   */
  getAllElements(): ElementModel[];

  /**
   * Filter elements by predicate (recursive)
   * @param predicate - Filter function
   */
  filterElements(predicate: (model: ElementModel) => boolean): ElementModel[];
}

/**
 * Categories Collection
 * Collection for managing element categories
 */
export declare class CategoriesCollection extends BaseCollection {
  /**
   * Get category by name
   * @param name - Category name
   */
  getByName(name: string): any | undefined;

  /**
   * Get active category
   */
  getActive(): any | undefined;

  /**
   * Set active category
   * @param category - Category to activate
   */
  setActive(category: any): void;

  /**
   * Get visible categories
   */
  getVisible(): any[];

  /**
   * Filter categories by search term
   * @param searchTerm - Search term
   */
  filterBySearch(searchTerm: string): any[];
}

/**
 * Panel Elements Collection
 * Collection for managing panel element library
 */
export declare class PanelElementsCollection extends BaseCollection {
  /**
   * Get elements by category
   * @param categoryName - Category name
   */
  getByCategory(categoryName: string): any[];

  /**
   * Filter elements by search term
   * @param searchTerm - Search term
   */
  filterBySearch(searchTerm: string): any[];

  /**
   * Get promoted elements
   */
  getPromoted(): any[];

  /**
   * Get recently used elements
   */
  getRecentlyUsed(): any[];

  /**
   * Add element to recently used
   * @param element - Element to add
   */
  addToRecentlyUsed(element: any): void;

  /**
   * Get elements by keywords
   * @param keywords - Search keywords
   */
  getByKeywords(keywords: string[]): any[];
}

/**
 * History Collection
 * Collection for managing undo/redo history
 */
export declare class HistoryCollection extends BaseCollection {
  /** Current history position */
  currentIndex: number;

  /** Maximum history items */
  maxItems: number;

  /**
   * Add history item
   * @param item - History item
   */
  addItem(item: any): void;

  /**
   * Undo last action
   */
  undo(): any | undefined;

  /**
   * Redo next action
   */
  redo(): any | undefined;

  /**
   * Check if can undo
   */
  canUndo(): boolean;

  /**
   * Check if can redo
   */
  canRedo(): boolean;

  /**
   * Clear history
   */
  clearHistory(): void;

  /**
   * Get current history item
   */
  getCurrentItem(): any | undefined;

  /**
   * Navigate to specific history index
   * @param index - History index
   */
  navigateTo(index: number): any | undefined;
}