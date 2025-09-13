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
  /**
   * Module constructor with flexible initialization
   *
   * @param settings - Initial settings object
   * @param instanceParams - Additional instance parameters for complex initialization
   *
   * The constructor handles:
   * - Basic settings initialization
   * - Instance parameter processing
   * - Automatic __construct() method calling if present
   * - Element initialization for ViewModules
   * - Event binding setup
   */
  constructor(settings?: ModuleSettings, instanceParams?: any);

  /**
   * Instance parameters for complex module initialization
   * Used by modules that need additional context during construction
   */
  instanceParams?: any;

  /**
   * Static extend method for creating subclasses
   *
   * Creates a new class that inherits from this class with proper prototype chain.
   * The returned class will have a __super__ property for accessing parent methods.
   *
   * @param properties - Object containing methods and properties for the new class
   * @returns Extended class constructor with __super__ property
   *
   * @example
   * const MyModule = Module.extend({
   *   initialize() {
   *     MyModule.__super__.initialize.call(this);
   *     // Custom initialization
   *   }
   * });
   *
   * // Access parent prototype methods
   * MyModule.__super__.getSettings.call(instance);
   */
  static extend<T = any>(
    properties: object
  ): typeof Module &
    (new (...args: any[]) => T) & {
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
   *   - Multiple events (space-separated): 'init destroy ready'
   *   - Object with event-callback pairs: { init: callback1, destroy: callback2 }
   * @param callback - Event callback function (not used when eventName is object)
   *
   * @example
   * // Single event
   * module.on('init', callback);
   *
   * // Multiple events with same callback
   * module.on('init destroy ready', callback);
   *
   * // Object syntax for different callbacks
   * module.on({ init: initCallback, destroy: destroyCallback });
   */
  on(eventName: string, callback: Function): this;
  on(eventName: object): this;
  on(eventName: string | object, callback?: Function): this;

  /**
   * Remove event listeners
   *
   * @param eventName - Event name(s) to remove listeners from. Supports:
   *   - Single event: 'init'
   *   - Multiple events (space-separated): 'init destroy'
   * @param callback - Specific callback to remove (optional - removes all if not provided)
   *
   * @example
   * // Remove specific callback
   * module.off('init', callback);
   *
   * // Remove all callbacks for multiple events
   * module.off('init destroy');
   */
  off(eventName: string, callback?: Function): this;

  /**
   * Trigger event and call associated callbacks
   *
   * Automatically calls onEventName method if it exists on the instance:
   * - trigger('init') will call this.onInit() if it exists
   * - trigger('before:render') will call this.onBeforeRender() if it exists
   *
   * @param eventName - Event name to trigger. Supports:
   *   - Single event: 'init'
   *   - Multiple events (space-separated): 'init ready'
   *   - Namespaced events: 'before:render', 'after:destroy'
   * @param params - Parameters to pass to callbacks and auto-methods
   *
   * @example
   * // Single event with auto-method calling
   * module.trigger('init', data); // Calls callbacks + this.onInit(data)
   *
   * // Multiple events
   * module.trigger('before:render after:render', element);
   *
   * // Namespaced event
   * module.trigger('editor:ready', editor); // Calls this.onEditorReady(editor)
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

  /**
   * Get element viewport percentage
   * Calculates what percentage of an element is visible in the viewport
   *
   * @param element - DOM element or jQuery element to check
   * @returns Percentage (0-100) of element visible in viewport
   *
   * @example
   * const percentage = module.getElementViewportPercentage(element);
   * if (percentage > 50) {
   *   // Element is more than 50% visible
   * }
   */
  getElementViewportPercentage(
    element: HTMLElement | JQuery<HTMLElement>
  ): number;

  /**
   * Get page scroll percentage
   * Calculates how far down the page the user has scrolled
   *
   * @returns Percentage (0-100) of page scrolled
   *
   * @example
   * const scrolled = module.getPageScrollPercentage();
   * if (scrolled > 75) {
   *   // User has scrolled more than 75% of the page
   * }
   */
  getPageScrollPercentage(): number;
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
  static extend<T = any>(
    properties: object
  ): typeof ViewModule &
    (new (...args: any[]) => T) & {
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
