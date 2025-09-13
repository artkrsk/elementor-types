/**
 * Document UI Commands
 * Commands for UI-level operations (copy, paste, delete, duplicate)
 */

import type { CommandBase } from "../base";

/**
 * UI command arguments base interface
 */
export interface UICommandArgs {
  container?: any;
  containers?: any[];
  trigger?: string;
}

/**
 * Copy command - UI copy operation
 */
export declare class Copy extends CommandBase {
  validateArgs(args: UICommandArgs): void;
  apply(args: UICommandArgs): void;
}

/**
 * Delete command - UI delete operation
 */
export declare class Delete extends CommandBase {
  validateArgs(args: UICommandArgs): void;
  apply(args: UICommandArgs): void;
}

/**
 * Duplicate command - UI duplicate operation
 */
export declare class Duplicate extends CommandBase {
  validateArgs(args: UICommandArgs): void;
  apply(args: UICommandArgs): void;
}

/**
 * Paste command - UI paste operation
 */
export declare class Paste extends CommandBase {
  validateArgs(args: UICommandArgs): void;
  apply(args: UICommandArgs): void;
}

/**
 * Paste Style command - UI paste style operation
 */
export declare class PasteStyle extends CommandBase {
  validateArgs(args: UICommandArgs): void;
  apply(args: UICommandArgs): void;
}

/**
 * Document UI Commands namespace
 */
export declare namespace DocumentUI {
  export {
    Copy,
    Delete,
    Duplicate,
    Paste,
    PasteStyle
  };

  export type {
    UICommandArgs
  };
}