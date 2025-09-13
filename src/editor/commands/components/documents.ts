/**
 * Documents Component Commands
 * Commands for managing multiple documents
 */

import type { CommandBase } from "../base";

/**
 * Document command arguments base interface
 */
export interface DocumentCommandArgs {
  id?: string;
  document?: any;
  options?: any;
}

/**
 * Document switch arguments
 */
export interface DocumentSwitchArgs extends DocumentCommandArgs {
  onClose?: () => void;
  onSwitch?: () => void;
}

/**
 * Close command - closes a document
 */
export declare class Close extends CommandBase {
  validateArgs(args: DocumentCommandArgs): void;
  apply(args: DocumentCommandArgs): void;
}

/**
 * Open command - opens a document
 */
export declare class Open extends CommandBase {
  validateArgs(args: DocumentCommandArgs): void;
  apply(args: DocumentCommandArgs): void;
}

/**
 * Preview command - previews a document
 */
export declare class Preview extends CommandBase {
  validateArgs(args: DocumentCommandArgs): void;
  apply(args: DocumentCommandArgs): void;
}

/**
 * Switch command - switches between documents
 */
export declare class Switch extends CommandBase {
  validateArgs(args: DocumentSwitchArgs): void;
  apply(args: DocumentSwitchArgs): void;
}

/**
 * View command - views a document
 */
export declare class View extends CommandBase {
  validateArgs(args: DocumentCommandArgs): void;
  apply(args: DocumentCommandArgs): void;
}

/**
 * Internal document commands
 */
export declare namespace Internal {
  /**
   * Attach Preview command - attaches preview to document
   */
  export class AttachPreview extends CommandBase {
    validateArgs(args: DocumentCommandArgs): void;
    apply(args: DocumentCommandArgs): void;
  }

  /**
   * Load command - loads document data
   */
  export class Load extends CommandBase {
    validateArgs(args: DocumentCommandArgs): void;
    apply(args: DocumentCommandArgs): Promise<any>;
  }

  /**
   * Unload command - unloads document data
   */
  export class Unload extends CommandBase {
    validateArgs(args: DocumentCommandArgs): void;
    apply(args: DocumentCommandArgs): void;
  }
}

/**
 * Documents Component Commands namespace
 */
export declare namespace DocumentsCommands {
  export {
    Close,
    Open,
    Preview,
    Switch,
    View
  };

  export { Internal };

  export type {
    DocumentCommandArgs,
    DocumentSwitchArgs
  };
}