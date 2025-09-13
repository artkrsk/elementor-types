/**
 * Elementor Window Controls
 *
 * TypeScript definitions for window.elementor.modules.controls
 * Based on the actual JavaScript control implementations
 */

import type { Module } from '../../core/modules';

/**
 * Base control interface - foundation for all controls
 */
export interface ControlBase extends Module {
  /** Control model */
  model: {
    get(key: string): any;
    set(key: string, value: any): void;
    toJSON(): Record<string, any>;
    cid: string;
  };

  /** UI elements */
  ui: Record<string, any>;

  /** Control behaviors */
  behaviors(): Record<string, any>;

  /** Get specific behavior */
  getBehavior(name: string): any;

  /** CSS class name generation */
  className(): string;

  /** Template helper data */
  templateHelpers(): {
    view: ControlBase;
    data: Record<string, any> & { _cid: string };
  };

  /** Get template for rendering */
  getTemplate(): any;

  /** Event handlers */
  events(): Record<string, string>;
}

/**
 * Base data control interface - for controls that handle data input
 */
export interface ControlBaseData extends ControlBase {
  /** Validator types */
  validatorTypes: {
    Base: any;
    Number: any;
    Breakpoint: any;
  };

  /** Get control value */
  getControlValue(key?: string): any;

  /** Set control value */
  setControlValue(value: any, key?: string): void;

  /** Get current value */
  getCurrentValue(): any;

  /** Validation methods */
  validate(): boolean;

  /** Input change handlers */
  onBaseInputChange(event: Event): void;
  onBaseInputTextChange(event: Event): void;
  onResponsiveSwitchersClick(event: Event): void;
}

/**
 * Color control interface
 */
export interface ColorControl extends ControlBaseData {
  /** Color picker instance */
  colorPicker?: {
    picker: {
      setHSVA(h: number, s: number, v: number, a: number, silent?: boolean): void;
      _parseLocalColor(color: string): { values: [number, number, number, number] };
      _clearColor(silent?: boolean): void;
    };
  };

  /** Initialize color picker */
  initPicker(): void;

  /** Apply saved value to picker */
  applySavedValue(): void;

  /** Picker event handlers */
  onPickerChange(): void;
  onPickerClear(): void;
  onAddGlobalButtonClick(): void;

  /** Route handling for picker visibility */
  reRoute(show: boolean): void;
}

/**
 * Media control interface
 */
export interface MediaControl extends ControlBaseData {
  /** Media type */
  mediaType?: string;

  /** Get media type */
  getMediaType(): string;

  /** Get library type for wp.media */
  getLibraryType(mediaType?: string): string;

  /** Open media frame */
  openFrame(): void;

  /** Delete selected media */
  deleteImage(): void;

  /** Media input handlers */
  onMediaInputImageSizeChange(event: Event): void;
  onPromotionDismiss(event: Event): void;
  onPromotionAction(event: Event): void;

  /** File upload handling */
  filesUploadHandler?: any;
}

/**
 * Dimensions control interface
 */
export interface DimensionsControl extends ControlBaseData {
  /** Default dimension value */
  defaultDimensionValue: number;

  /** Link dimensions handler */
  onLinkDimensionsClicked(event: Event): void;

  /** Scrubbing behavior settings */
  behaviors(): {
    Scrubbing: {
      behaviorClass: any;
      scrubSettings: {
        intentTime: number;
        valueModifier(): number;
        enhancedNumber(): number;
      };
    };
  };
}

/**
 * Number control interface
 */
export interface NumberControl extends ControlBaseData {
  /** Number-specific validation and formatting */
  validateNumber(value: any): boolean;
  formatNumber(value: number): string;
}

/**
 * Select control interface
 */
export interface SelectControl extends ControlBaseData {
  /** Select options */
  getOptions(): Record<string, string>;

  /** Option change handler */
  onSelectChange(event: Event): void;
}

/**
 * Switcher control interface
 */
export interface SwitcherControl extends ControlBaseData {
  /** Toggle switch value */
  toggle(): void;

  /** Switch change handler */
  onSwitchChange(event: Event): void;
}

/**
 * Repeater control interface
 */
export interface RepeaterControl extends ControlBaseData {
  /** Repeater items collection */
  collection: any;

  /** Add new item */
  addItem(): void;

  /** Remove item */
  removeItem(index: number): void;

  /** Item change handlers */
  onItemAdd(): void;
  onItemRemove(): void;
  onItemSort(): void;
}

/**
 * Complete control constructors interface for window.elementor.modules.controls
 */
export interface ElementorWindowControls {
  /** Animation control */
  Animation: new (...args: any[]) => SelectControl;

  /** Base control */
  Base: new (...args: any[]) => ControlBase;

  /** Base data control */
  BaseData: new (...args: any[]) => ControlBaseData;

  /** Base multiple control */
  BaseMultiple: new (...args: any[]) => ControlBaseData;

  /** Box shadow control */
  Box_shadow: new (...args: any[]) => ControlBaseData;

  /** Button control */
  Button: new (...args: any[]) => ControlBase;

  /** Choose control */
  Choose: new (...args: any[]) => ControlBaseData;

  /** Visual choice control */
  Visual_choice: new (...args: any[]) => ControlBaseData;

  /** Code control */
  Code: new (...args: any[]) => ControlBaseData;

  /** Color control */
  Color: new (...args: any[]) => ColorControl;

  /** Date time control */
  Date_time: new (...args: any[]) => ControlBaseData;

  /** Dimensions control */
  Dimensions: new (...args: any[]) => DimensionsControl;

  /** Exit animation control */
  Exit_animation: new (...args: any[]) => SelectControl;

  /** Font control */
  Font: new (...args: any[]) => SelectControl;

  /** Gaps control */
  Gaps: new (...args: any[]) => DimensionsControl;

  /** Gallery control */
  Gallery: new (...args: any[]) => MediaControl;

  /** Hidden control */
  Hidden: new (...args: any[]) => ControlBase;

  /** Hover animation control */
  Hover_animation: new (...args: any[]) => SelectControl;

  /** Icon control */
  Icon: new (...args: any[]) => ControlBaseData;

  /** Icons control */
  Icons: new (...args: any[]) => ControlBaseData;

  /** Image dimensions control */
  Image_dimensions: new (...args: any[]) => DimensionsControl;

  /** Media control */
  Media: new (...args: any[]) => MediaControl;

  /** Notice control */
  Notice: new (...args: any[]) => ControlBase;

  /** Number control */
  Number: new (...args: any[]) => NumberControl;

  /** Popover toggle control */
  Popover_toggle: new (...args: any[]) => ControlBaseData;

  /** Repeater control */
  Repeater: new (...args: any[]) => RepeaterControl;

  /** Repeater row control */
  RepeaterRow: new (...args: any[]) => ControlBaseData;

  /** Section control */
  Section: new (...args: any[]) => ControlBase;

  /** Select control */
  Select: new (...args: any[]) => SelectControl;

  /** Select2 control */
  Select2: new (...args: any[]) => SelectControl;

  /** Slider control */
  Slider: new (...args: any[]) => NumberControl;

  /** Structure control */
  Structure: new (...args: any[]) => ControlBaseData;

  /** Switcher control */
  Switcher: new (...args: any[]) => SwitcherControl;

  /** Tab control */
  Tab: new (...args: any[]) => ControlBase;

  /** Text shadow control */
  Text_shadow: new (...args: any[]) => ControlBaseData;

  /** URL control */
  Url: new (...args: any[]) => ControlBaseData;

  /** WordPress widget control */
  Wp_widget: new (...args: any[]) => ControlBaseData;

  /** WYSIWYG control */
  Wysiwyg: new (...args: any[]) => ControlBaseData;
}