/**
 * Document Elements Commands
 * Commands for manipulating elements within documents
 */

import type { CommandBase, editor } from "../base";
import type { ElementModel } from "../../models";

/**
 * Element command arguments base interface
 */
export interface ElementCommandArgs {
  container?: any;
  containers?: any[];
  model?: any;
  options?: any;
}

/**
 * Element creation arguments
 */
export interface CreateElementArgs extends ElementCommandArgs {
  model: any;
  clone?: boolean;
}

/**
 * Element copy arguments
 */
export interface CopyElementArgs extends ElementCommandArgs {
  storageKey?: string;
}

/**
 * Element paste arguments
 */
export interface PasteElementArgs extends ElementCommandArgs {
  storageKey?: string;
  at?: number;
  rebuild?: boolean;
}

/**
 * Element move arguments
 */
export interface MoveElementArgs extends ElementCommandArgs {
  target?: any;
  options?: {
    at?: number;
    edit?: boolean;
  };
}

/**
 * Element settings arguments
 */
export interface ElementSettingsArgs extends ElementCommandArgs {
  settings?: Record<string, any>;
  options?: {
    external?: boolean;
  };
}

/**
 * Element reset arguments
 */
export interface ResetElementArgs extends ElementCommandArgs {
  settings?: string[];
}

/**
 * Copy command - copies element(s) to storage
 */
export declare class Copy extends editor.CommandHistoryBase {
  static restore(historyItem: any, isRedo: boolean): void;
  validateArgs(args: CopyElementArgs): void;
  getHistory(args: CopyElementArgs): any;
  apply(args: CopyElementArgs): any;
}

/**
 * Copy All command - copies all elements in container
 */
export declare class CopyAll extends editor.CommandHistoryBase {
  static restore(historyItem: any, isRedo: boolean): void;
  validateArgs(args: CopyElementArgs): void;
  getHistory(args: CopyElementArgs): any;
  apply(args: CopyElementArgs): any;
}

/**
 * Create command - creates new element(s)
 */
export declare class Create extends editor.CommandHistoryBase {
  static restore(historyItem: any, isRedo: boolean): void;
  validateArgs(args: CreateElementArgs): void;
  getHistory(args: CreateElementArgs): any;
  apply(args: CreateElementArgs): any;
}

/**
 * Delete command - deletes element(s)
 */
export declare class Delete extends editor.CommandHistoryBase {
  static restore(historyItem: any, isRedo: boolean): void;
  validateArgs(args: ElementCommandArgs): void;
  getHistory(args: ElementCommandArgs): any;
  apply(args: ElementCommandArgs): any;
}

/**
 * Deselect command - deselects specific element
 */
export declare class Deselect extends CommandBase {
  validateArgs(args: ElementCommandArgs): void;
  apply(args: ElementCommandArgs): any;
}

/**
 * Deselect All command - deselects all elements
 */
export declare class DeselectAll extends CommandBase {
  validateArgs(args: ElementCommandArgs): void;
  apply(args: ElementCommandArgs): any;
}

/**
 * Duplicate command - duplicates element(s)
 */
export declare class Duplicate extends editor.CommandHistoryBase {
  static restore(historyItem: any, isRedo: boolean): void;
  validateArgs(args: ElementCommandArgs): void;
  getHistory(args: ElementCommandArgs): any;
  apply(args: ElementCommandArgs): any;
}

/**
 * Empty command - empties container of all elements
 */
export declare class Empty extends editor.CommandHistoryBase {
  static restore(historyItem: any, isRedo: boolean): void;
  validateArgs(args: ElementCommandArgs): void;
  getHistory(args: ElementCommandArgs): any;
  apply(args: ElementCommandArgs): any;
}

/**
 * Import command - imports elements from external data
 */
export declare class Import extends editor.CommandHistoryBase {
  static restore(historyItem: any, isRedo: boolean): void;
  validateArgs(args: ElementCommandArgs & { data: any }): void;
  getHistory(args: ElementCommandArgs): any;
  apply(args: ElementCommandArgs & { data: any }): any;
}

/**
 * Move command - moves element(s) to different position/container
 */
export declare class Move extends editor.CommandHistoryBase {
  static restore(historyItem: any, isRedo: boolean): void;
  validateArgs(args: MoveElementArgs): void;
  getHistory(args: MoveElementArgs): any;
  apply(args: MoveElementArgs): any;
}

/**
 * Paste command - pastes element(s) from storage
 */
export declare class Paste extends editor.CommandHistoryBase {
  static restore(historyItem: any, isRedo: boolean): void;
  validateArgs(args: PasteElementArgs): void;
  getHistory(args: PasteElementArgs): any;
  apply(args: PasteElementArgs): any;
}

/**
 * Paste Area command - pastes elements into specific area
 */
export declare class PasteArea extends editor.CommandHistoryBase {
  static restore(historyItem: any, isRedo: boolean): void;
  validateArgs(args: PasteElementArgs): void;
  getHistory(args: PasteElementArgs): any;
  apply(args: PasteElementArgs): any;
}

/**
 * Paste Style command - pastes only styling from storage
 */
export declare class PasteStyle extends editor.CommandHistoryBase {
  static restore(historyItem: any, isRedo: boolean): void;
  validateArgs(args: PasteElementArgs): void;
  getHistory(args: PasteElementArgs): any;
  apply(args: PasteElementArgs): any;
}

/**
 * Reset Settings command - resets element settings to defaults
 */
export declare class ResetSettings extends editor.CommandHistoryBase {
  static restore(historyItem: any, isRedo: boolean): void;
  validateArgs(args: ResetElementArgs): void;
  getHistory(args: ResetElementArgs): any;
  apply(args: ResetElementArgs): any;
}

/**
 * Reset Style command - resets element style settings
 */
export declare class ResetStyle extends editor.CommandHistoryBase {
  static restore(historyItem: any, isRedo: boolean): void;
  validateArgs(args: ResetElementArgs): void;
  getHistory(args: ResetElementArgs): any;
  apply(args: ResetElementArgs): any;
}

/**
 * Select command - selects specific element
 */
export declare class Select extends CommandBase {
  validateArgs(args: ElementCommandArgs): void;
  apply(args: ElementCommandArgs): any;
}

/**
 * Select All command - selects all elements in container
 */
export declare class SelectAll extends CommandBase {
  validateArgs(args: ElementCommandArgs): void;
  apply(args: ElementCommandArgs): any;
}

/**
 * Settings command - updates element settings
 */
export declare class Settings extends editor.CommandHistoryBase {
  static restore(historyItem: any, isRedo: boolean): void;
  validateArgs(args: ElementSettingsArgs): void;
  getHistory(args: ElementSettingsArgs): any;
  apply(args: ElementSettingsArgs): any;
}

/**
 * Toggle Selection command - toggles element selection state
 */
export declare class ToggleSelection extends CommandBase {
  validateArgs(args: ElementCommandArgs): void;
  apply(args: ElementCommandArgs): any;
}

/**
 * Document Elements Commands namespace
 */
export declare namespace DocumentElements {
  export {
    Copy,
    CopyAll,
    Create,
    Delete,
    Deselect,
    DeselectAll,
    Duplicate,
    Empty,
    Import,
    Move,
    Paste,
    PasteArea,
    PasteStyle,
    ResetSettings,
    ResetStyle,
    Select,
    SelectAll,
    Settings,
    ToggleSelection
  };

  export type {
    ElementCommandArgs,
    CreateElementArgs,
    CopyElementArgs,
    PasteElementArgs,
    MoveElementArgs,
    ElementSettingsArgs,
    ResetElementArgs
  };
}