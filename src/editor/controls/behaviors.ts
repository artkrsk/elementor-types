/**
 * Control Behaviors
 * Behavior classes for enhanced control functionality
 */

import type { Module } from "../../core/modules";

/**
 * Global settings behavior namespace
 */
export declare namespace behaviors {
  /**
   * Global settings behavior for controls
   */
  class GlobalSettings extends Module {
    initialize(): void;
    onElementChange(): void;
    updateElementModel(): void;
  }

  /**
   * Tags behavior for dynamic content
   */
  class Tags extends Module {
    initialize(): void;
    onRender(): void;
    onDestroy(): void;
  }
}
