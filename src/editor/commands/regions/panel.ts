/**
 * Panel Region Commands
 * Commands for managing the editor panel interface
 */

import type { CommandBase } from "../base";

/**
 * Panel command arguments base interface
 */
export interface PanelCommandArgs {
  panel?: string;
  page?: string;
  tab?: string;
  args?: any;
  options?: any;
}

/**
 * Device mode arguments
 */
export interface DeviceModeArgs extends PanelCommandArgs {
  device: string;
}

/**
 * Page settings arguments
 */
export interface PageSettingsArgs extends PanelCommandArgs {
  settings?: Record<string, any>;
}

/**
 * Editor preferences arguments
 */
export interface EditorPreferencesArgs extends PanelCommandArgs {
  preferences?: Record<string, any>;
}

/**
 * Change Device Mode command - switches preview device mode
 */
export declare class ChangeDeviceMode extends CommandBase {
  validateArgs(args: DeviceModeArgs): void;
  apply(args: DeviceModeArgs): void;
}

/**
 * Close command - closes the panel
 */
export declare class Close extends CommandBase {
  validateArgs(args: PanelCommandArgs): void;
  apply(args: PanelCommandArgs): void;
}

/**
 * Editor Preferences command - opens editor preferences
 */
export declare class EditorPreferences extends CommandBase {
  validateArgs(args: EditorPreferencesArgs): void;
  apply(args: EditorPreferencesArgs): void;
}

/**
 * Exit command - exits panel mode
 */
export declare class Exit extends CommandBase {
  validateArgs(args: PanelCommandArgs): void;
  apply(args: PanelCommandArgs): void;
}

/**
 * Open command - opens the panel
 */
export declare class Open extends CommandBase {
  validateArgs(args: PanelCommandArgs): void;
  apply(args: PanelCommandArgs): void;
}

/**
 * Page Settings command - opens page settings
 */
export declare class PageSettings extends CommandBase {
  validateArgs(args: PageSettingsArgs): void;
  apply(args: PageSettingsArgs): void;
}

/**
 * Publish command - publishes from panel
 */
export declare class Publish extends CommandBase {
  validateArgs(args: PanelCommandArgs): void;
  apply(args: PanelCommandArgs): Promise<any>;
}

/**
 * Save command - saves from panel
 */
export declare class Save extends CommandBase {
  validateArgs(args: PanelCommandArgs): void;
  apply(args: PanelCommandArgs): Promise<any>;
}

/**
 * Toggle command - toggles panel visibility
 */
export declare class Toggle extends CommandBase {
  validateArgs(args: PanelCommandArgs): void;
  apply(args: PanelCommandArgs): void;
}

/**
 * Panel Editor Commands
 */
export declare namespace PanelEditor {
  /**
   * Change Edit Mode command - changes panel edit mode
   */
  export class ChangeEditMode extends CommandBase {
    validateArgs(args: { mode: string }): void;
    apply(args: { mode: string }): void;
  }

  /**
   * Clear Page command - clears panel page content
   */
  export class ClearPage extends CommandBase {
    validateArgs(args: PanelCommandArgs): void;
    apply(args: PanelCommandArgs): void;
  }

  /**
   * Close Editor command - closes panel editor
   */
  export class CloseEditor extends CommandBase {
    validateArgs(args: PanelCommandArgs): void;
    apply(args: PanelCommandArgs): void;
  }

  /**
   * Open Editor command - opens panel editor
   */
  export class OpenEditor extends CommandBase {
    validateArgs(args: PanelCommandArgs & { model?: any; view?: any }): void;
    apply(args: PanelCommandArgs & { model?: any; view?: any }): void;
  }

  /**
   * Refresh Elements command - refreshes elements list
   */
  export class RefreshElements extends CommandBase {
    validateArgs(args: PanelCommandArgs): void;
    apply(args: PanelCommandArgs): void;
  }

  /**
   * Set Page command - sets active panel page
   */
  export class SetPage extends CommandBase {
    validateArgs(args: PanelCommandArgs & { name: string }): void;
    apply(args: PanelCommandArgs & { name: string }): void;
  }
}

/**
 * Panel Region Commands namespace
 */
export declare namespace PanelCommands {
  export {
    ChangeDeviceMode,
    Close,
    EditorPreferences,
    Exit,
    Open,
    PageSettings,
    Publish,
    Save,
    Toggle
  };

  export { PanelEditor };

  export type {
    PanelCommandArgs,
    DeviceModeArgs,
    PageSettingsArgs,
    EditorPreferencesArgs
  };
}