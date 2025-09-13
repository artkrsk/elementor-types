/**
 * Panel Command Types
 * Commands specific to panel operations and UI interactions
 */

import type { CommandBase } from "./base";

/**
 * Panel component commands namespace
 */
export declare namespace panel {
  /**
   * Publish command for saving and publishing changes
   */
  class Publish extends CommandBase {
    apply(): Promise<any>;
  }

  /**
   * Save command for saving changes
   */
  class Save extends CommandBase {
    apply(): Promise<any>;
  }

  /**
   * Device mode change command
   */
  class ChangeDeviceMode extends CommandBase {
    apply(args: { device: string }): void;
  }

  /**
   * Page settings command
   */
  class PageSettings extends CommandBase {
    apply(): void;
  }

  /**
   * Close panel command
   */
  class Close extends CommandBase {
    apply(): void;
  }

  /**
   * Exit editor command
   */
  class Exit extends CommandBase {
    apply(): void;
  }

  /**
   * Toggle panel command
   */
  class Toggle extends CommandBase {
    apply(): void;
  }

  /**
   * Editor preferences command
   */
  class EditorPreferences extends CommandBase {
    apply(): void;
  }
}
