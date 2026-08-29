/**
 * Command System Types
 * Types for the $e command system used throughout Elementor editor
 */

import type { Module } from "../../core/modules";
import type { HookData, HookDataBase, HookUIAfter, HookUIBefore } from "../../core/hook-ui-base";

/**
 * Base command class that all commands extend
 */
export declare class CommandBase extends Module {
  validateArgs(args?: object): void;
  requireArgument(property: string, args?: object): void;
  requireArgumentType(property: string, type: string, args?: object): void;
  requireArgumentInstance(property: string, instance: any, args?: object): void;
  requireArgumentConstructor(property: string, type: any, args?: object): void;
  apply(args: object): any;
  run?(args: object): any;
}

/**
 * Command that operates on containers
 */
export declare class CommandContainerBase extends CommandBase {
  requireContainer(args?: object): void;
}

/**
 * Internal container command
 */
export declare class CommandContainerInternalBase extends CommandContainerBase {}

/**
 * Internal command base
 */
export declare class CommandInternalBase extends CommandBase {}

/**
 * Data command base
 */
export declare class CommandData extends CommandBase {}

/**
 * $e.modules.editor — editor-specific command bases
 * Mirrors assets/dev/js/editor/editor-document.js
 */
export interface EModulesEditor {
  CommandContainerBase: typeof CommandContainerBase;
  CommandContainerInternalBase: typeof CommandContainerInternalBase;
  document: {
    CommandHistoryBase: import("./base/command-history-base").CommandHistoryBaseConstructor;
    CommandHistoryDebounceBase: import("./base/command-history-debounce-base").CommandHistoryDebounceBaseConstructor;
  };
}

/**
 * Route interface for command routing
 */
export interface Route {
  callback(args: object): void;
  isValidContainer(container: any): boolean;
}

/**
 * Component registry for managing command components
 */
export interface ComponentRegistry {
  register(component: any): void;
  get(id: string): any;
}

/**
 * Commands manager ($e.commands / $e.commandsInternal)
 */
export interface ECommandsManager {
  /** Run a command through the command bus */
  run(command: string, args?: object): any;
  /** Run a command triggered by a keyboard shortcut */
  runShortcut(command: string, event?: Event): any;
  /** Whether the given command is the first (outermost) command in the current trace */
  isCurrentFirstTrace(command: string): boolean;
  /** The outermost currently-running command, or false when idle */
  getCurrentFirstTrace(): string | false;
  [key: string]: any;
}

/**
 * Hooks manager ($e.hooks) — registration entry points for UI and data hooks
 */
export interface EHooksManager {
  registerUIAfter(instance: HookUIAfter): any;
  registerUIBefore(instance: HookUIBefore): any;
  registerUICatch(instance: any): any;
  registerDataAfter(instance: HookDataBase): any;
  registerDataCatch(instance: HookDataBase): any;
  registerDataDependency(instance: HookDataBase): any;
  [key: string]: any;
}

/**
 * Data manager ($e.data) — REST-backed data layer
 */
export interface EDataManager {
  get(command: string, args?: object, options?: object): Promise<any>;
  [key: string]: any;
}

/**
 * Routes manager ($e.routes)
 */
export interface ERoutesManager {
  /** Currently active route per component root (e.g. { panel: 'panel/elements/categories' }) */
  current: Record<string, string>;
  [key: string]: any;
}

/**
 * Main $e namespace interface
 */
export interface $e {
  modules: {
    CommandBase: typeof CommandBase;
    CommandContainerBase: typeof CommandContainerBase;
    CommandContainerInternalBase: typeof CommandContainerInternalBase;
    CommandInternalBase: typeof CommandInternalBase;
    CommandData: typeof CommandData;
    editor: EModulesEditor;
    ComponentBase: typeof import('../../core/component-base').ComponentBase;
    hookUI: import('../../core/hook-ui-base').HookUI;
    hookData: HookData;
  };

  components: ComponentRegistry;
  commands: ECommandsManager;
  commandsInternal: ECommandsManager;
  hooks: EHooksManager;
  data: EDataManager;
  routes: ERoutesManager;
  store: any;
  shortcuts: any;
  uiStates: any;
  extras: any;
  bc: any;

  route(route: string, args?: object, options?: object): void;
  run(command: string, args?: object): any;
  /** Alias of $e.commandsInternal.run() */
  internal(command: string, args?: object): any;
}
