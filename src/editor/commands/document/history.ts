/**
 * Document History Commands
 * Commands for managing document history, undo/redo operations
 */

import type { CommandBase, editor } from "../base";

/**
 * History command arguments base interface
 */
export interface HistoryCommandArgs {
  id?: string;
  times?: number;
  container?: any;
}

/**
 * History item interface
 */
export interface HistoryItem {
  id: string;
  type: string;
  title: string;
  subTitle?: string;
  containers: any[];
  data: any;
  restore: (historyItem: HistoryItem, isRedo: boolean) => void;
}

/**
 * Transaction arguments
 */
export interface TransactionArgs extends HistoryCommandArgs {
  title?: string;
  type?: string;
}

/**
 * Log arguments
 */
export interface LogArgs extends HistoryCommandArgs {
  title: string;
  type: string;
  subTitle?: string;
  restore: (historyItem: HistoryItem, isRedo: boolean) => void;
  data?: any;
}

/**
 * Base history command class
 */
export declare class CommandHistoryInternalBase extends editor.EditorCommandInternalBase {
  validateArgs(args: HistoryCommandArgs): void;
  isHistoryActive(): boolean;
}

/**
 * Do command - executes a command with history tracking
 */
export declare class Do extends editor.CommandHistoryBase {
  validateArgs(args: { command: string; args?: any }): void;
  apply(args: { command: string; args?: any }): any;
}

/**
 * Redo command - redoes the last undone action
 */
export declare class Redo extends CommandBase {
  validateArgs(args: HistoryCommandArgs): void;
  apply(args: HistoryCommandArgs): any;
}

/**
 * Undo command - undoes the last action
 */
export declare class Undo extends CommandBase {
  validateArgs(args: HistoryCommandArgs): void;
  apply(args: HistoryCommandArgs): any;
}

/**
 * Undo All command - undoes all actions in current session
 */
export declare class UndoAll extends CommandBase {
  validateArgs(args: HistoryCommandArgs): void;
  apply(args: HistoryCommandArgs): any;
}

/**
 * Internal history commands for system use
 */
export declare namespace Internal {
  /**
   * Add Transaction command - adds transaction to history
   */
  export class AddTransaction extends CommandHistoryInternalBase {
    validateArgs(args: TransactionArgs): void;
    apply(args: TransactionArgs): any;
  }

  /**
   * Clear Transaction command - clears current transaction
   */
  export class ClearTransaction extends CommandHistoryInternalBase {
    validateArgs(args: HistoryCommandArgs): void;
    apply(args: HistoryCommandArgs): void;
  }

  /**
   * Delete Log command - removes log entry from history
   */
  export class DeleteLog extends CommandHistoryInternalBase {
    validateArgs(args: { id: string }): void;
    apply(args: { id: string }): void;
  }

  /**
   * End Log command - ends current log entry
   */
  export class EndLog extends CommandHistoryInternalBase {
    validateArgs(args: HistoryCommandArgs): void;
    apply(args: HistoryCommandArgs): void;
  }

  /**
   * End Transaction command - ends current transaction
   */
  export class EndTransaction extends CommandHistoryInternalBase {
    validateArgs(args: HistoryCommandArgs): void;
    apply(args: HistoryCommandArgs): void;
  }

  /**
   * Log Sub Item command - logs sub-item in history
   */
  export class LogSubItem extends CommandHistoryInternalBase {
    validateArgs(args: LogArgs): void;
    apply(args: LogArgs): void;
  }

  /**
   * Start Log command - starts new log entry
   */
  export class StartLog extends CommandHistoryInternalBase {
    validateArgs(args: LogArgs): void;
    apply(args: LogArgs): string;
  }
}

/**
 * Document History Commands namespace
 */
export declare namespace DocumentHistory {
  export {
    Do,
    Redo,
    Undo,
    UndoAll,
    CommandHistoryInternalBase
  };

  export { Internal };

  export type {
    HistoryCommandArgs,
    HistoryItem,
    TransactionArgs,
    LogArgs
  };
}