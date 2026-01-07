/**
 * Hook UI Base Interfaces
 *
 * Type definitions for Elementor's $e hook system
 */

/**
 * Hook arguments passed to apply() method
 */
export interface HookArgs {
  /** Element container */
  container?: any;
  /** Control/element name */
  name?: string;
  /** Index for repeater operations */
  index?: number;
  /** Backbone model */
  model?: any;
  /** Settings object */
  settings?: any;
  /** For undo/redo operations */
  isRestored?: boolean;
  /** Document reference */
  document?: any;
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
