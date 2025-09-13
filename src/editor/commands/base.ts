/**
 * Command System Types
 * Types for the $e command system used throughout Elementor editor
 */

import type { Module } from "../../core/modules";

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
 * Editor-specific command types
 */
export declare namespace editor {
  class EditorCommandContainerBase extends CommandContainerBase {}
  class CommandHistoryBase extends CommandContainerBase {}
  class EditorCommandInternalBase extends CommandInternalBase {}

  namespace utils {
    class EditorUtilsModule extends Module {}
  }
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
 * Main $e namespace interface
 */
export interface $e {
  modules: {
    CommandBase: typeof CommandBase;
    CommandContainerBase: typeof CommandContainerBase;
    CommandContainerInternalBase: typeof CommandContainerInternalBase;
    CommandInternalBase: typeof CommandInternalBase;
    CommandData: typeof CommandData;
    editor: typeof editor;
  };

  components: ComponentRegistry;

  route(route: string, args?: object): void;
  run(command: string, args?: object): any;
  runShortcut(command: string, event?: Event): any;
}
