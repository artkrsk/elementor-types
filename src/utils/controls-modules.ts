/**
 * Controls Modules Types
 * Type definitions for window.elementor.modules.controls
 */

import type { ControlBaseView, ControlBaseDataView } from "../editor/controls/base";

/**
 * Dimensions Control Interface
 * For managing spacing, padding, margin controls
 */
export interface DimensionsControl extends ControlBaseDataView {
  /** Get dimensions value as object */
  getDimensionsValue(): {
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
    left?: string | number;
    unit?: string;
    isLinked?: boolean;
  };

  /** Set dimensions value */
  setDimensionsValue(value: {
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
    left?: string | number;
    unit?: string;
    isLinked?: boolean;
  }): void;

  /** Toggle link status between dimensions */
  toggleLink(): void;

  /** Check if dimensions are linked */
  isLinked(): boolean;

  /** Get available units */
  getAvailableUnits(): string[];
}

/**
 * Gaps Control Interface
 * For managing gap spacing in flexbox/grid layouts
 */
export interface GapsControl extends ControlBaseDataView {
  /** Get gaps value */
  getGapsValue(): {
    row?: string | number;
    column?: string | number;
    unit?: string;
  };

  /** Set gaps value */
  setGapsValue(value: {
    row?: string | number;
    column?: string | number;
    unit?: string;
  }): void;

  /** Get available units for gaps */
  getAvailableUnits(): string[];
}

/**
 * Global Style Repeater Control Interface
 * For managing repeatable global style configurations
 */
export interface GlobalStyleRepeaterControl extends ControlBaseDataView {
  /** Get repeater items */
  getRepeaterItems(): Array<{
    id: string;
    settings: Record<string, any>;
    [key: string]: any;
  }>;

  /** Add new repeater item */
  addRepeaterItem(settings?: Record<string, any>): string;

  /** Remove repeater item */
  removeRepeaterItem(itemId: string): boolean;

  /** Update repeater item */
  updateRepeaterItem(itemId: string, settings: Record<string, any>): boolean;

  /** Duplicate repeater item */
  duplicateRepeaterItem(itemId: string): string | null;

  /** Reorder repeater items */
  reorderRepeaterItems(newOrder: string[]): void;

  /** Get repeater item by ID */
  getRepeaterItem(itemId: string): {
    id: string;
    settings: Record<string, any>;
    [key: string]: any;
  } | null;

  /** Apply global styles */
  applyGlobalStyles(): void;

  /** Get global style options */
  getGlobalStyleOptions(): Array<{
    value: string;
    label: string;
    settings?: Record<string, any>;
  }>;
}

/**
 * Repeater Row Control Interface
 * For managing individual rows within repeater controls
 */
export interface RepeaterRowControl extends ControlBaseView {
  /** Get row index */
  getRowIndex(): number;

  /** Get row data */
  getRowData(): Record<string, any>;

  /** Set row data */
  setRowData(data: Record<string, any>): void;

  /** Remove this row */
  removeRow(): void;

  /** Duplicate this row */
  duplicateRow(): void;

  /** Move row up */
  moveRowUp(): boolean;

  /** Move row down */
  moveRowDown(): boolean;

  /** Get parent repeater */
  getParentRepeater(): ControlBaseView | null;

  /** Toggle row collapse state */
  toggleCollapse(): void;

  /** Check if row is collapsed */
  isCollapsed(): boolean;
}

/**
 * Slider Control Interface
 * For range/slider input controls
 */
export interface SliderControl extends ControlBaseDataView {
  /** Get slider value */
  getSliderValue(): {
    size?: number;
    unit?: string;
  };

  /** Set slider value */
  setSliderValue(value: {
    size?: number;
    unit?: string;
  }): void;

  /** Get slider range configuration */
  getRange(): {
    min: number;
    max: number;
    step: number;
  };

  /** Set slider range */
  setRange(range: {
    min?: number;
    max?: number;
    step?: number;
  }): void;

  /** Get available units */
  getAvailableUnits(): string[];

  /** Handle slider change events */
  onSliderChange(value: number): void;
}

/**
 * Controls Module Interface
 * Main interface for window.elementor.modules.controls
 */
export interface ElementorControlsModule {
  /** Dimensions control */
  Dimensions: new (...args: any[]) => DimensionsControl;

  /** Gaps control */
  Gaps: new (...args: any[]) => GapsControl;

  /** Global style repeater control */
  'Global-style-repeater': new (...args: any[]) => GlobalStyleRepeaterControl;

  /** Repeater row control */
  RepeaterRow: new (...args: any[]) => RepeaterRowControl;

  /** Slider control */
  Slider: new (...args: any[]) => SliderControl;

  /** Base control classes */
  BaseControl?: new (...args: any[]) => ControlBaseView;
  BaseDataControl?: new (...args: any[]) => ControlBaseDataView;

  /** Get control by name */
  get?(controlName: string): (new (...args: any[]) => ControlBaseView) | undefined;

  /** Check if control exists */
  has?(controlName: string): boolean;

  /** Get all available control names */
  getAvailableControls?(): string[];

  /** Register new control */
  register?(
    controlName: string,
    controlClass: new (...args: any[]) => ControlBaseView
  ): void;
}

/**
 * Editor Modules Interface
 * Interface for window.elementor.modules (editor-specific modules)
 */
export interface ElementorEditorModules {
  /** Controls module */
  controls: ElementorControlsModule;

  /** Additional modules can be added here */
  [moduleName: string]: any;
}

/**
 * Type guards for control types
 */

/**
 * Check if object is a dimensions control
 */
export function isDimensionsControl(obj: any): obj is DimensionsControl {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    'getDimensionsValue' in obj &&
    'setDimensionsValue' in obj &&
    typeof obj.getDimensionsValue === 'function' &&
    typeof obj.setDimensionsValue === 'function'
  );
}

/**
 * Check if object is a gaps control
 */
export function isGapsControl(obj: any): obj is GapsControl {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    'getGapsValue' in obj &&
    'setGapsValue' in obj &&
    typeof obj.getGapsValue === 'function' &&
    typeof obj.setGapsValue === 'function'
  );
}

/**
 * Check if object is a slider control
 */
export function isSliderControl(obj: any): obj is SliderControl {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    'getSliderValue' in obj &&
    'setSliderValue' in obj &&
    'getRange' in obj &&
    typeof obj.getSliderValue === 'function' &&
    typeof obj.setSliderValue === 'function' &&
    typeof obj.getRange === 'function'
  );
}

/**
 * Check if object is a repeater row control
 */
export function isRepeaterRowControl(obj: any): obj is RepeaterRowControl {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    'getRowIndex' in obj &&
    'getRowData' in obj &&
    'setRowData' in obj &&
    typeof obj.getRowIndex === 'function' &&
    typeof obj.getRowData === 'function' &&
    typeof obj.setRowData === 'function'
  );
}