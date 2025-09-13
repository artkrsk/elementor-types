/**
 * Elementor Command System Types
 *
 * Complete type definitions for the Elementor command system including:
 * - Command base classes and their hierarchy
 * - Command execution system ($e.run, $e.internal, etc.)
 * - Argument validation and type checking
 * - Command registration and management
 */

import { Module } from "../core";
import { Container } from "./elements";

// Re-export from core for backward compatibility
export { ArgsObject, InstanceType } from "../core";

/**
 * Base command class that all commands extend from
 */
export interface CommandBase extends Module {
  /** Command arguments */
  args?: object;

  /** Command component reference */
  component?: any;

  /**
   * Validate command arguments before execution
   */
  validateArgs(args?: object): void;

  /**
   * Require that an argument exists
   */
  requireArgument(property: string, args?: object): void;

  /**
   * Require that an argument is of a specific type
   */
  requireArgumentType(property: string, type: string, args?: object): void;

  /**
   * Require that an argument is an instance of a specific class
   */
  requireArgumentInstance(property: string, instance: any, args?: object): void;

  /**
   * Require that an argument has a specific constructor
   */
  requireArgumentConstructor(property: string, type: any, args?: object): void;

  /**
   * Apply the command with given arguments
   */
  apply(args: object): any;

  /**
   * Optional run method for direct execution
   */
  run?(args: object): any;
}

/**
 * Command base constructor interface
 */
export interface CommandBaseConstructor {
  new (args?: object): CommandBase;
  getInstanceType(): string;
}

/**
 * Container-based command that operates on element containers
 */
export interface CommandContainerBase extends CommandBase {
  /**
   * Validate that container or containers argument is provided
   */
  requireContainer(args?: object): void;
}

/**
 * Container-based command constructor
 */
export interface CommandContainerBaseConstructor {
  new (args?: object): CommandContainerBase;
  getInstanceType(): string;
}

/**
 * Container internal command base
 */
export interface CommandContainerInternalBase extends CommandContainerBase {
  /** Uses internal command registry */
}

/**
 * Container internal command constructor
 */
export interface CommandContainerInternalBaseConstructor {
  new (args?: object): CommandContainerInternalBase;
  getInstanceType(): string;
}

/**
 * Internal command base for system commands
 */
export interface CommandInternalBase extends CommandBase {
  /** Internal command marker */
}

/**
 * Internal command constructor
 */
export interface CommandInternalBaseConstructor {
  new (args?: object): CommandInternalBase;
  getInstanceType(): string;
}

/**
 * Data command base for data operations
 */
export interface CommandData extends CommandBase {
  /** Data command marker */
}

/**
 * Data command constructor
 */
export interface CommandDataConstructor {
  new (args?: object): CommandData;
  getInstanceType(): string;
}

/**
 * History-enabled command base for undo/redo support
 */
export interface CommandHistoryBase extends CommandContainerBase {
  /**
   * Get history entry for this command
   */
  getHistory(args: object): {
    type: string;
    title: string;
    subTitle?: string;
  };
}

/**
 * History command constructor
 */
export interface CommandHistoryBaseConstructor {
  new (args?: object): CommandHistoryBase;
  getInstanceType(): string;
}

/**
 * Command argument interfaces for common operations
 */
export namespace CommandArgs {
  /** Base arguments for all commands */
  export interface Base {
    [key: string]: any;
  }

  /** Container-based command arguments */
  export interface Container extends Base {
    container?: Container;
    containers?: Container[];
  }

  /** Document command arguments */
  export interface Document extends Base {
    id: string | number;
    selector?: string;
    shouldScroll?: boolean;
    shouldNavigateToDefaultRoute?: boolean;
    setAsInitial?: boolean;
  }

  /** Element creation arguments */
  export interface ElementCreate extends Container {
    model: object;
    options?: object;
  }

  /** Element selection arguments */
  export interface ElementSelect extends Container {
    append?: boolean;
  }

  /** Settings update arguments */
  export interface SettingsUpdate extends Container {
    settings: object;
  }

  /** Import arguments */
  export interface Import extends Base {
    target?: Container;
    targets?: Container[];
    input: any;
    options?: object;
  }

  /** Browser import validation arguments */
  export interface BrowserImportValidate extends Base {
    input: any;
    options?: object;
  }
}

/**
 * Command return types for different operations
 */
export namespace CommandReturns {
  /** Document open returns a promise */
  export type DocumentOpen = Promise<any>;

  /** Element creation returns the created element */
  export type ElementCreate = any | any[];

  /** Selection returns void */
  export type ElementSelect = void;

  /** Settings update returns void */
  export type SettingsUpdate = void;

  /** Import returns a promise */
  export type Import = Promise<any>;

  /** Validation returns a promise with boolean result */
  export type Validate = Promise<boolean>;
}

/**
 * Command system execution interface
 */
export interface CommandSystem {
  /**
   * Run a public command
   */
  run(command: string, args?: object): any;

  /**
   * Run an internal command
   */
  internal(command: string, args?: object): any;

  /**
   * Register a command
   */
  register(namespace: string, command: string, callback: any): void;

  /**
   * Get command instance
   */
  getCommand(command: string): CommandBase | null;

  /**
   * Check if command exists
   */
  exists(command: string): boolean;
}

/**
 * Command categories and their specific types
 */
export namespace Commands {
  /** Document-related commands */
  export namespace Document {
    export interface Open extends CommandBase {
      apply(args: CommandArgs.Document): CommandReturns.DocumentOpen;
    }

    export interface Close extends CommandBase {
      apply(args: { id: string | number }): Promise<void>;
    }

    export interface Switch extends CommandBase {
      apply(args: { id: string | number }): void;
    }

    export interface Preview extends CommandBase {
      apply(args: { id: string | number }): void;
    }
  }

  /** Element-related commands */
  export namespace Elements {
    export interface Create extends CommandContainerBase {
      apply(args: CommandArgs.ElementCreate): CommandReturns.ElementCreate;
    }

    export interface Select extends CommandContainerBase {
      apply(args: CommandArgs.ElementSelect): CommandReturns.ElementSelect;
    }

    export interface Copy extends CommandContainerBase {
      apply(args: CommandArgs.Container): void;
    }

    export interface Paste extends CommandContainerBase {
      apply(args: CommandArgs.Container): any[];
    }

    export interface Delete extends CommandContainerBase {
      apply(args: CommandArgs.Container): void;
    }

    export interface Settings extends CommandContainerBase {
      apply(args: CommandArgs.SettingsUpdate): CommandReturns.SettingsUpdate;
    }
  }

  /** Browser import commands */
  export namespace BrowserImport {
    export interface Import extends CommandBase {
      apply(args: CommandArgs.Import): CommandReturns.Import;
    }

    export interface Validate extends CommandBase {
      apply(args: CommandArgs.BrowserImportValidate): CommandReturns.Validate;
    }
  }

  /** Library commands */
  export namespace Library {
    export interface Open extends CommandBase {
      apply(args: object): void;
    }

    export interface Insert extends CommandBase {
      apply(args: object): any;
    }
  }

  /** UI commands */
  export namespace UI {
    export interface Paste extends CommandBase {
      apply(args: object): void;
    }

    export interface Copy extends CommandBase {
      apply(args: object): void;
    }
  }

  /** Internal commands */
  export namespace Internal {
    export interface Load extends CommandInternalBase {
      apply(args: { config: object }): void;
    }

    export interface Unload extends CommandInternalBase {
      apply(args: object): void;
    }

    export interface AttachPreview extends CommandInternalBase {
      apply(args: { selector?: string }): void;
    }
  }
}

/**
 * Command manager interface
 */
export interface CommandManager {
  /** Commands registry */
  commands: Map<string, CommandBase>;

  /** Internal commands registry */
  commandsInternal: Map<string, CommandBase>;

  /**
   * Register a new command
   */
  register(
    namespace: string,
    command: string,
    callback: CommandBaseConstructor
  ): void;

  /**
   * Register an internal command
   */
  registerInternal(
    namespace: string,
    command: string,
    callback: CommandBaseConstructor
  ): void;

  /**
   * Execute a command
   */
  run(command: string, args?: object): any;

  /**
   * Execute an internal command
   */
  runInternal(command: string, args?: object): any;

  /**
   * Get command by name
   */
  getCommand(name: string): CommandBase | undefined;

  /**
   * Check if command exists
   */
  exists(name: string): boolean;
}

/**
 * Global command system extension ($e)
 */
export interface GlobalCommandSystem extends CommandSystem {
  /** Command manager instance */
  commands: CommandManager;

  /** Internal commands manager */
  commandsInternal: CommandManager;

  /** Modules namespace */
  modules: {
    CommandBase: CommandBaseConstructor;
    CommandContainerBase: CommandContainerBaseConstructor;
    CommandContainerInternalBase: CommandContainerInternalBaseConstructor;
    CommandInternalBase: CommandInternalBaseConstructor;
    CommandData: CommandDataConstructor;

    /** Editor-specific command classes */
    editor: {
      CommandContainerBase: CommandContainerBaseConstructor;
      CommandHistoryBase: CommandHistoryBaseConstructor;
      CommandInternalBase: CommandInternalBaseConstructor;

      /** Document namespace */
      document: {
        CommandHistoryBase: CommandHistoryBaseConstructor;
      };
    };
  };
}

/**
 * Main command system types export
 */
export namespace CommandSystem {
  export type Base = CommandBase;
  export type ContainerBase = CommandContainerBase;
  export type ContainerInternalBase = CommandContainerInternalBase;
  export type InternalBase = CommandInternalBase;
  export type Data = CommandData;
  export type HistoryBase = CommandHistoryBase;
  export type Manager = CommandManager;
  export type Global = GlobalCommandSystem;
  export type Args = CommandArgs.Base;
  export type Returns = any;
}

// Default export for convenience
export default CommandSystem;
