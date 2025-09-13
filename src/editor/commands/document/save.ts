/**
 * Document Save Commands
 * Commands for saving, publishing, and managing document state
 */

import type { CommandBase } from "../base";

/**
 * Save command arguments base interface
 */
export interface SaveCommandArgs {
  document?: any;
  force?: boolean;
  onSuccess?: () => void;
  onError?: (error: any) => void;
  status?: string;
}

/**
 * Save document arguments
 */
export interface SaveDocumentArgs extends SaveCommandArgs {
  options?: {
    revision?: boolean;
    external?: boolean;
  };
}

/**
 * Auto save arguments
 */
export interface AutoSaveArgs extends SaveCommandArgs {
  interval?: number;
}

/**
 * Base save command class
 */
export declare class BaseSaveCommand extends CommandBase {
  document: any;
  initialize(args: SaveCommandArgs): void;
  validateArgs(args: SaveCommandArgs): void;
  apply(args: SaveCommandArgs): Promise<any>;
}

/**
 * Auto command - handles auto-save functionality
 */
export declare class Auto extends BaseSaveCommand {
  validateArgs(args: AutoSaveArgs): void;
  apply(args: AutoSaveArgs): Promise<any>;
}

/**
 * Default command - default save operation
 */
export declare class Default extends BaseSaveCommand {
  validateArgs(args: SaveDocumentArgs): void;
  apply(args: SaveDocumentArgs): Promise<any>;
}

/**
 * Discard command - discards unsaved changes
 */
export declare class Discard extends BaseSaveCommand {
  validateArgs(args: SaveCommandArgs): void;
  apply(args: SaveCommandArgs): Promise<any>;
}

/**
 * Draft command - saves as draft
 */
export declare class Draft extends BaseSaveCommand {
  validateArgs(args: SaveCommandArgs): void;
  apply(args: SaveCommandArgs): Promise<any>;
}

/**
 * Pending command - marks document as pending review
 */
export declare class Pending extends BaseSaveCommand {
  validateArgs(args: SaveCommandArgs): void;
  apply(args: SaveCommandArgs): Promise<any>;
}

/**
 * Publish command - publishes document
 */
export declare class Publish extends BaseSaveCommand {
  validateArgs(args: SaveCommandArgs): void;
  apply(args: SaveCommandArgs): Promise<any>;
}

/**
 * Update command - updates published document
 */
export declare class Update extends BaseSaveCommand {
  validateArgs(args: SaveCommandArgs): void;
  apply(args: SaveCommandArgs): Promise<any>;
}

/**
 * Internal save commands for system use
 */
export declare namespace Internal {
  /**
   * Internal save command
   */
  export class Save extends BaseSaveCommand {
    validateArgs(args: SaveDocumentArgs): void;
    apply(args: SaveDocumentArgs): Promise<any>;
  }

  /**
   * Set is modified command - marks document as modified
   */
  export class SetIsModified extends CommandBase {
    validateArgs(args: { isModified: boolean; document?: any }): void;
    apply(args: { isModified: boolean; document?: any }): void;
  }
}

/**
 * Document Save Commands namespace
 */
export declare namespace DocumentSave {
  export {
    Auto,
    Default,
    Discard,
    Draft,
    Pending,
    Publish,
    Update,
    BaseSaveCommand
  };

  export { Internal };

  export type {
    SaveCommandArgs,
    SaveDocumentArgs,
    AutoSaveArgs
  };
}