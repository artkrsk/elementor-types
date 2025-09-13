/**
 * Core Module System
 * Base classes and interfaces for the Elementor module system
 */

/**
 * Settings object for modules
 */
export interface ModuleSettings {
  [key: string]: any;
}

/**
 * Collection of DOM elements used by modules
 */
export interface ModuleElements {
  [key: string]: JQuery<HTMLElement> | HTMLElement;
}

/**
 * Base Module class
 * Foundation for all Elementor modules
 */
export declare class Module {
  constructor(settings?: ModuleSettings);

  /**
   * Static extend method for creating subclasses
   * Creates a new class that inherits from this class
   * The returned class will have a __super__ property pointing to the parent prototype
   */
  static extend<T = any>(properties: object): typeof Module & (new (...args: any[]) => T) & {
    __super__: typeof Module.prototype;
  };

  /**
   * Get default settings for the module
   */
  getDefaultSettings(): ModuleSettings;

  /**
   * Get a specific setting or all settings
   */
  getSettings(setting?: string): any;

  /**
   * Set module settings
   */
  setSettings(
    settingKey: string | object,
    value?: any,
    settingsContainer?: object
  ): this;

  /**
   * Get error message for a specific type
   */
  getErrorMessage(type: string, functionName?: string): string;

  /**
   * Force method implementation error
   */
  forceMethodImplementation(functionName?: string): never;

  /**
   * Event handling methods
   * 
   * @param eventName - Event name(s). Can be:
   *   - Single event: 'init'
   *   - Multiple events (space-separated): 'init destroy'
   *   - Object with event-callback pairs: { init: callback1, destroy: callback2 }
   * @param callback - Event callback function (not used when eventName is object)
   */
  on(eventName: string, callback: Function): this;
  on(eventName: object): this;
  on(eventName: string | object, callback?: Function): this;

  /**
   * Remove event listeners
   * 
   * @param eventName - Event name to remove listeners from
   * @param callback - Specific callback to remove (optional - removes all if not provided)
   */
  off(eventName: string, callback?: Function): this;

  /**
   * Trigger event and call associated callbacks
   * Also automatically calls onEventName method if it exists on the instance
   * 
   * @param eventName - Event name to trigger
   * @param params - Parameters to pass to callbacks
   */
  trigger(eventName: string, ...params: any[]): this;

  /**
   * Get constructor ID
   */
  getConstructorID(): string;

  /**
   * Get items utility
   */
  getItems(items: any, itemKey?: string): any;

  /**
   * Constructor method
   */
  __construct(...args: any[]): void;

  /**
   * Extend the module class
   */
  static extend(properties: object): typeof Module;
}

/**
 * ViewModule extends Module with DOM element handling
 */
export declare class ViewModule extends Module {
  /**
   * Static extend method for creating subclasses
   * Creates a new class that inherits from this class
   * The returned class will have a __super__ property pointing to the parent prototype
   */
  static extend<T = any>(properties: object): typeof ViewModule & (new (...args: any[]) => T) & {
    __super__: typeof ViewModule.prototype;
  };
  elements: ModuleElements | null;

  /**
   * Get default elements for the view
   */
  getDefaultElements(): ModuleElements;

  /**
   * Bind events to elements
   */
  bindEvents(): void;

  /**
   * Unbind events from elements
   */
  unbindEvents?(): void;

  /**
   * Initialize the view module
   */
  onInit(...args: any[]): void;

  /**
   * Initialize elements
   */
  initElements(): void;

  /**
   * Find an element by selector
   */
  findElement(selector: string): JQuery<HTMLElement>;
}

/**
 * ArgsObject for argument validation
 */
export declare class ArgsObject {
  args: object;

  constructor(args: object);

  /**
   * Require a specific argument
   */
  requireArgument(property: string, args?: object): void;

  /**
   * Require an argument of a specific type
   */
  requireArgumentType(property: string, type: string, args?: object): void;

  /**
   * Require an argument to be an instance of a specific class
   */
  requireArgumentInstance(property: string, instance: any, args?: object): void;

  /**
   * Require an argument to be constructed from a specific type
   */
  requireArgumentConstructor(property: string, type: any, args?: object): void;
}

/**
 * InstanceType utility class
 */
export declare class InstanceType {
  static getInstanceType(): string;
  instanceTypes?: string[];
}

/**
 * Error class for forcing method implementation
 */
export declare class ForceMethodImplementation extends Error {
  constructor(
    info?: { isStatic?: boolean; fullName: string; functionName?: string },
    args?: object
  );
}
