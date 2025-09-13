/**
 * Navigator Region Commands
 * Commands for managing the navigator panel
 */

import type { CommandBase } from "../base";

/**
 * Navigator command arguments base interface
 */
export interface NavigatorCommandArgs {
  toggle?: boolean;
  options?: any;
}

/**
 * Close command - closes the navigator
 */
export declare class Close extends CommandBase {
  validateArgs(args: NavigatorCommandArgs): void;
  apply(args: NavigatorCommandArgs): void;
}

/**
 * Open command - opens the navigator
 */
export declare class Open extends CommandBase {
  validateArgs(args: NavigatorCommandArgs): void;
  apply(args: NavigatorCommandArgs): void;
}

/**
 * Toggle command - toggles navigator visibility
 */
export declare class Toggle extends CommandBase {
  validateArgs(args: NavigatorCommandArgs): void;
  apply(args: NavigatorCommandArgs): void;
}

/**
 * Navigator Commands namespace
 */
export declare namespace NavigatorCommands {
  export {
    Close,
    Open,
    Toggle
  };

  export type {
    NavigatorCommandArgs
  };
}