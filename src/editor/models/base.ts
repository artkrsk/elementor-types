/**
 * Editor Model System
 * Base model classes and interfaces for Elementor editor data models
 */

/**
 * Element model default attributes
 */
export interface ElementModelDefaults {
  /** Element unique ID */
  id: string;
  /** Element type (section, column, widget) */
  elType: string;
  /** Whether element is inner (inside another element) */
  isInner: boolean;
  /** Whether element is locked from editing */
  isLocked: boolean;
  /** Element settings object */
  settings: any;
  /** Default edit settings */
  defaultEditSettings: {
    defaultEditRoute: string;
  };
  /** Widget type (for widget elements) */
  widgetType?: string;
  /** Element title */
  _title?: string;
  /** Element elements/children */
  elements?: any[];
}

/**
 * Model initialization options
 */
export interface ModelInitializeOptions {
  /** HTML cache for widgets */
  htmlCache?: string;
  /** Additional options */
  [key: string]: any;
}

/**
 * Settings model configuration
 */
export interface SettingsModelConfig {
  /** Element type */
  elType: string;
  /** Widget type (for widgets) */
  widgetType?: string;
  /** Whether element is inner */
  isInner: boolean;
  /** Custom title */
  _title?: string;
  /** Additional settings */
  [key: string]: any;
}

/**
 * Base Element Model
 * Foundation model class for all Elementor editor elements
 */
export declare class BaseElementModel {
  /** Model attributes */
  attributes: ElementModelDefaults;

  /**
   * Validate if child model can be added to this model
   * @param childModel - Child model to validate
   * @returns Whether the child model is valid
   */
  isValidChild(childModel: BaseElementModel): boolean;

  /**
   * Get model attribute value
   * @param attribute - Attribute name
   */
  get<K extends keyof ElementModelDefaults>(attribute: K): ElementModelDefaults[K];
  get(attribute: string): any;

  /**
   * Set model attribute value
   * @param attribute - Attribute name or attributes object
   * @param value - Attribute value
   */
  set(attribute: string | object, value?: any): this;

  /**
   * Check if model has attribute
   * @param attribute - Attribute name
   */
  has(attribute: string): boolean;

  /**
   * Unset model attribute
   * @param attribute - Attribute name
   */
  unset(attribute: string): this;

  /**
   * Clear all model attributes
   */
  clear(): this;

  /**
   * Convert model to JSON
   */
  toJSON(): ElementModelDefaults;

  /**
   * Clone the model
   */
  clone(): BaseElementModel;

  /**
   * Destroy the model
   */
  destroy(): void;

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
 * Element Model
 * Extended model for section, column, and widget elements
 */
export declare class ElementModel extends BaseElementModel {
  /** Model defaults */
  defaults: ElementModelDefaults;

  /** Whether model uses remote rendering */
  remoteRender: boolean;

  /** HTML cache for widgets */
  _htmlCache: string | null;

  /** jQuery XHR object for remote requests */
  _jqueryXhr: any | null;

  /** Whether to render when leaving element */
  renderOnLeave: boolean;

  /**
   * Initialize element model
   * @param attributes - Model attributes
   * @param options - Initialization options
   */
  initialize(attributes?: Partial<ElementModelDefaults>, options?: ModelInitializeOptions): void;

  /**
   * Initialize settings model
   */
  initSettings(): void;

  /**
   * Initialize edit settings
   */
  initEditSettings(): void;

  /**
   * Set HTML cache for widget
   * @param htmlCache - HTML cache string
   */
  setHtmlCache(htmlCache: string): void;

  /**
   * Get HTML cache
   */
  getHtmlCache(): string | null;

  /**
   * Render on remote server (throttled)
   */
  renderRemoteServer(): void;

  /**
   * Handle model destroy
   */
  onDestroy(): void;

  /**
   * Handle editor close
   */
  onCloseEditor(): void;

  /**
   * Get element settings model
   */
  getSettings(): any;

  /**
   * Get edit settings model
   */
  getEditSettings(): any;

  /**
   * Get element container
   */
  getContainer(): any;

  /**
   * Check if element is editable
   */
  isEditable(): boolean;

  /**
   * Get element label
   */
  getLabel(): string;

  /**
   * Get element icon
   */
  getIcon(): string;

  /**
   * Get element visibility status
   */
  getVisibility(): boolean;

  /**
   * Toggle element visibility
   */
  toggleVisibility(): void;

  /**
   * Get active controls for the element
   */
  getActiveControls(): any;

  /**
   * Check if element has active controls
   */
  hasActiveControls(): boolean;

  /**
   * Get element view type
   */
  getViewType(): string;

  /**
   * Check if element should render when leaving
   */
  shouldRenderOnLeave(): boolean;
}