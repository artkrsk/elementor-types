/**
 * Hook UI Base Interfaces
 *
 * Type definitions for Elementor's $e hook system
 */

/**
 * Hook arguments passed to apply() method
 */
export interface HookArgs {
  /** Element container (fallback when `containers` is absent) */
  container?: any;
  /** Element containers — the primary field; commands destructure `containers = [ args.container ]` */
  containers?: any[];
  /** Control/element name */
  name?: string;
  /** Index for repeater insert/remove operations */
  index?: number;
  /** Source index for repeater move */
  sourceIndex?: number;
  /** Target index for repeater move */
  targetIndex?: number;
  /** Backbone model */
  model?: any;
  /** Settings object */
  settings?: any;
  /** Per-container settings keyed by container id (document/elements/settings) */
  isMultiSettings?: boolean;
  /** Command options bag (e.g. { external: true }, { at: number }) */
  options?: any;
  /** For undo/redo operations */
  isRestored?: boolean;
  /** Document reference */
  document?: any;
  /** Document status for save commands ('publish' | 'draft' | 'pending' | ...) */
  status?: string;
  /** Command-specific additional arguments */
  [key: string]: any;
}

/**
 * Base interface for UI hooks
 */
export interface HookUIBase {
  /**
   * Get the command this hook listens to
   * @returns Command path (e.g., 'document/repeater/insert')
   */
  getCommand(): string;

  /**
   * Get unique hook identifier
   * @returns Hook ID
   */
  getId(): string;

  /**
   * Wire this hook instance into $e.hooks (registerUIAfter/registerUIBefore
   * depending on the concrete subclass)
   */
  register(): void;

  /**
   * Get container type filter (optional)
   * @returns Container type (e.g., 'document', 'widget', 'section')
   */
  getContainerType?(): string;

  /**
   * Check if hook should run (optional)
   * @param args - Command arguments
   * @returns True if hook should execute
   */
  getConditions?(args: HookArgs): boolean;
}

/**
 * After Hook - Runs after command execution
 */
export interface HookUIAfter extends HookUIBase {
  /**
   * Execute hook logic after command completes
   * @param args - Command arguments
   */
  apply(args: HookArgs): void;
}

/**
 * Before Hook - Runs before command execution
 */
export interface HookUIBefore extends HookUIBase {
  /**
   * Execute hook logic before command runs
   * @param args - Command arguments
   * @returns True to continue command execution, false to cancel
   */
  apply(args: HookArgs): boolean | void;
}

/**
 * After Hook Constructor
 */
export interface HookUIAfterConstructor {
  new (): HookUIAfter;
}

/**
 * Before Hook Constructor
 */
export interface HookUIBeforeConstructor {
  new (): HookUIBefore;
}

/**
 * Hook UI namespace
 */
export interface HookUI {
  After: HookUIAfterConstructor;
  Before: HookUIBeforeConstructor;
}

/**
 * Base interface for data hooks ($e.modules.hookData)
 */
export interface HookDataBase {
  /**
   * Get the command this hook listens to
   */
  getCommand(): string;

  /**
   * Get unique hook identifier
   */
  getId(): string;

  /**
   * Wire this hook instance into $e.hooks (registerDataAfter/registerDataCatch/
   * registerDataDependency depending on the concrete subclass)
   */
  register(): void;

  /**
   * Get container type filter (optional)
   */
  getContainerType?(): string;

  /**
   * Check if hook should run (optional)
   */
  getConditions?(args: HookArgs): boolean;

  /**
   * Execute hook logic
   */
  apply(args: HookArgs): any;
}

/**
 * Data hook constructors namespace ($e.modules.hookData)
 */
export interface HookData {
  Base: new () => HookDataBase;
  After: new () => HookDataBase;
  Catch: new () => HookDataBase;
  Dependency: new () => HookDataBase;
}
