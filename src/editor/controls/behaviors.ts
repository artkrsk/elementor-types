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

  /**
   * Scrubbing behavior for numeric controls
   * Allows changing values by dragging the mouse
   */
  class Scrubbing extends Module {
    scrubSettings: {
      intentTime: number;
    };

    initialize(): void;
    onMouseDown(event: MouseEvent): void;
    onMouseMove(event: MouseEvent): void;
    onMouseUp(event: MouseEvent): void;
    updateValue(delta: number): void;
  }
}
