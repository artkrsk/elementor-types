/**
 * Backbone.js Type Definitions
 * Essential Backbone interfaces for Elementor types
 */

/**
 * Backbone Events interface
 */
export interface BackboneEvents {
  on(event: string, callback: Function, context?: any): this;
  off(event?: string, callback?: Function, context?: any): this;
  trigger(event: string, ...args: any[]): this;
  once(event: string, callback: Function, context?: any): this;
  listenTo(object: any, events: string, callback: Function): this;
  stopListening(object?: any, events?: string, callback?: Function): this;
}

/**
 * Backbone Model interface
 */
export interface BackboneModel extends BackboneEvents {
  /** Model attributes */
  attributes: Record<string, any>;

  /** Model collection */
  collection?: BackboneCollection<this>;

  /** Model unique identifier */
  cid: string;

  /** Model ID */
  id?: string | number;

  /** Model changed attributes */
  changed: Record<string, any>;

  /** Previous attributes */
  _previousAttributes: Record<string, any>;

  // Core methods
  get(attribute: string): any;
  set(key: string | Record<string, any>, value?: any, options?: any): this;
  unset(attribute: string, options?: any): this;
  clear(options?: any): this;
  has(attribute: string): boolean;

  // State methods
  hasChanged(attribute?: string): boolean;
  changedAttributes(attributes?: Record<string, any>): Record<string, any> | false;
  getPrevious(attribute: string): any;
  previousAttributes(): Record<string, any>;

  // Validation
  isValid(options?: any): boolean;
  validate?(attributes: Record<string, any>, options?: any): string | undefined;
  validationError: string | null;

  // Persistence
  save(attributes?: Record<string, any>, options?: any): Promise<this>;
  fetch(options?: any): Promise<this>;
  destroy(options?: any): Promise<this>;

  // Utilities
  clone(): this;
  toJSON(): Record<string, any>;
  escape(attribute: string): string;

  // URL
  url(): string;
  urlRoot?: string | (() => string);
}

/**
 * Backbone Collection interface
 */
export interface BackboneCollection<TModel extends BackboneModel = BackboneModel> extends BackboneEvents {
  /** Collection models */
  models: TModel[];

  /** Collection length */
  length: number;

  /** Model constructor */
  model: new (...args: any[]) => TModel;

  // Core methods
  add(models: TModel | TModel[] | Record<string, any> | Record<string, any>[], options?: any): TModel | TModel[];
  remove(models: TModel | TModel[], options?: any): TModel | TModel[];
  reset(models?: TModel[] | Record<string, any>[], options?: any): TModel[];
  set(models: TModel[] | Record<string, any>[], options?: any): TModel[];

  // Retrieval
  get(id: string | number): TModel | undefined;
  at(index: number): TModel | undefined;
  where(attributes: Record<string, any>): TModel[];
  findWhere(attributes: Record<string, any>): TModel | undefined;

  // Iteration
  each(iterator: (model: TModel, index: number) => void, context?: any): void;
  map<T>(iterator: (model: TModel, index: number) => T, context?: any): T[];
  find(predicate: (model: TModel) => boolean, context?: any): TModel | undefined;
  filter(predicate: (model: TModel) => boolean, context?: any): TModel[];

  // Persistence
  fetch(options?: any): Promise<this>;
  create(attributes: Record<string, any>, options?: any): TModel;

  // Utilities
  toJSON(): Record<string, any>[];
  clone(): this;

  // Array methods
  push(model: TModel, options?: any): TModel;
  pop(options?: any): TModel | undefined;
  unshift(model: TModel, options?: any): TModel;
  shift(options?: any): TModel | undefined;
  slice(begin?: number, end?: number): TModel[];

  // URL
  url: string | (() => string);
}

/**
 * Backbone View interface
 */
export interface BackboneView extends BackboneEvents {
  /** View element */
  el: HTMLElement;

  /** jQuery wrapped element */
  $el: JQuery<HTMLElement>;

  /** View model */
  model?: BackboneModel;

  /** View collection */
  collection?: BackboneCollection;

  /** View unique identifier */
  cid: string;

  /** HTML tag name */
  tagName?: string;

  /** CSS class name */
  className?: string;

  /** Element ID */
  id?: string;

  /** Element attributes */
  attributes?: Record<string, string>;

  /** Event hash */
  events?: Record<string, string> | (() => Record<string, string>);

  // Core methods
  $(selector?: string): JQuery;
  render(): this;
  remove(): this;
  setElement(element: HTMLElement | JQuery, delegate?: boolean): this;

  // Event delegation
  delegateEvents(events?: Record<string, string>): this;
  undelegateEvents(): this;

  // Internal methods
  _ensureElement(): void;
  _setElement(el: HTMLElement | JQuery): void;
  _removeElement(): void;
}

/**
 * Backbone Router interface
 */
export interface BackboneRouter extends BackboneEvents {
  /** Router routes */
  routes: Record<string, string>;

  /** Navigate to route */
  navigate(fragment: string, options?: { trigger?: boolean; replace?: boolean }): this;

  /** Execute route */
  execute(callback: Function, args: any[], name: string): void;
}

/**
 * Backbone History interface
 */
export interface BackboneHistory extends BackboneEvents {
  /** Current fragment */
  fragment: string;

  /** History started */
  started: boolean;

  // Core methods
  start(options?: { pushState?: boolean; hashChange?: boolean; root?: string }): boolean;
  stop(): void;
  navigate(fragment: string, options?: { trigger?: boolean; replace?: boolean }): boolean;

  // URL methods
  getFragment(fragment?: string, forcePushState?: boolean): string;
  getHash(window?: Window): string;
}

/**
 * Backbone Radio Channel interface (for Elementor's radio system)
 */
export interface BackboneRadioChannel extends BackboneEvents {
  /** Channel name */
  channelName: string;

  // Request/Reply pattern
  request(event: string, ...args: any[]): any;
  reply(event: string, callback: (...args: any[]) => any): this;
  replyOnce(event: string, callback: (...args: any[]) => any): this;
  stopReplying(event?: string, callback?: Function): this;

  // Command pattern
  command(event: string, ...args: any[]): this;
  comply(event: string, callback: (...args: any[]) => void): this;
  complyOnce(event: string, callback: (...args: any[]) => void): this;
  stopComplying(event?: string, callback?: Function): this;

  // Reset
  reset(): this;
}

/**
 * Backbone Radio interface
 */
export interface BackboneRadio {
  /** Get or create channel */
  channel(channelName: string): BackboneRadioChannel;

  // Direct methods
  request(channelName: string, event: string, ...args: any[]): any;
  command(channelName: string, event: string, ...args: any[]): void;

  // Utilities
  reset(channelName?: string): void;
}