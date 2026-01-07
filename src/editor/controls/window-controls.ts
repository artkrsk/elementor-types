/**
 * Elementor Window Controls
 *
 * TypeScript definitions for window.elementor.modules.controls
 * Based on the actual JavaScript control implementations
 */

import type { Module } from '../../core/modules';

/**
 * Helper type for Backbone/Marionette extendable constructors
 * All Elementor controls support .extend() for creating subclasses
 */
type ExtendableConstructor<T> = (new (...args: any[]) => T) & {
  extend(proto: any, staticProps?: any): ExtendableConstructor<T>;
};

/**
 * Base control interface - foundation for all controls
 * Extends Module and includes ControlView requirements
 */
export interface ControlBase extends Module {
  /** Control model */
  model: {
    get(key: string): any;
    set(key: string | object, value?: any): any;
    toJSON(): Record<string, any>;
    cid: string;
    attributes: Record<string, any>;
  };

  /** Container reference */
  container: any;

  /** Native DOM element */
  el: HTMLElement;

  /** jQuery wrapped DOM element */
  $el: JQuery<HTMLElement>;

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

  /** Get current control value */
  getControlValue(): any;

  /** Set control value */
  setValue(value: any): void;

  /** Re-render the control */
  render(): this;

  /** Destroy the control */
  destroy(): void;
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
 * URL control interface
 */
export interface UrlControl extends ControlBaseData {
  /** Initialize autocomplete functionality */
  autoComplete(): void;

  /** Handle more options toggle click */
  onMoreOptionsToggleClick(): void;

  /** Ready handler */
  onReady(): void;

  /** Cleanup before destroy */
  onBeforeDestroy(): void;

  /** Extend method for creating subclasses */
  extend(properties: Record<string, any>): new (...args: any[]) => UrlControl;
}

/**
 * Complete control constructors interface for window.elementor.modules.controls
 */
export interface ElementorWindowControls {
  /** Animation control */
  Animation: ExtendableConstructor<SelectControl>;

  /** Base control */
  Base: ExtendableConstructor<ControlBase>;

  /** Base data control */
  BaseData: ExtendableConstructor<ControlBaseData>;

  /** Base multiple control */
  BaseMultiple: ExtendableConstructor<ControlBaseData>;

  /** Box shadow control */
  Box_shadow: ExtendableConstructor<ControlBaseData>;

  /** Button control */
  Button: ExtendableConstructor<ControlBase>;

  /** Choose control */
  Choose: ExtendableConstructor<ControlBaseData>;

  /** Visual choice control */
  Visual_choice: ExtendableConstructor<ControlBaseData>;

  /** Code control */
  Code: ExtendableConstructor<ControlBaseData>;

  /** Color control */
  Color: ExtendableConstructor<ColorControl>;

  /** Date time control */
  Date_time: ExtendableConstructor<ControlBaseData>;

  /** Dimensions control */
  Dimensions: ExtendableConstructor<DimensionsControl>;

  /** Exit animation control */
  Exit_animation: ExtendableConstructor<SelectControl>;

  /** Font control */
  Font: ExtendableConstructor<SelectControl>;

  /** Gaps control */
  Gaps: ExtendableConstructor<DimensionsControl>;

  /** Gallery control */
  Gallery: ExtendableConstructor<MediaControl>;

  /** Hidden control */
  Hidden: ExtendableConstructor<ControlBase>;

  /** Hover animation control */
  Hover_animation: ExtendableConstructor<SelectControl>;

  /** Icon control */
  Icon: ExtendableConstructor<ControlBaseData>;

  /** Icons control */
  Icons: ExtendableConstructor<ControlBaseData>;

  /** Image dimensions control */
  Image_dimensions: ExtendableConstructor<DimensionsControl>;

  /** Media control */
  Media: ExtendableConstructor<MediaControl>;

  /** Notice control */
  Notice: ExtendableConstructor<ControlBase>;

  /** Number control */
  Number: ExtendableConstructor<NumberControl>;

  /** Popover toggle control */
  Popover_toggle: ExtendableConstructor<ControlBaseData>;

  /** Repeater control */
  Repeater: ExtendableConstructor<RepeaterControl>;

  /** Repeater row control */
  RepeaterRow: ExtendableConstructor<ControlBaseData>;

  /** Section control */
  Section: ExtendableConstructor<ControlBase>;

  /** Select control */
  Select: ExtendableConstructor<SelectControl>;

  /** Select2 control */
  Select2: ExtendableConstructor<SelectControl>;

  /** Slider control */
  Slider: ExtendableConstructor<NumberControl>;

  /** Structure control */
  Structure: ExtendableConstructor<ControlBaseData>;

  /** Switcher control */
  Switcher: ExtendableConstructor<SwitcherControl>;

  /** Tab control */
  Tab: ExtendableConstructor<ControlBase>;

  /** Text shadow control */
  Text_shadow: ExtendableConstructor<ControlBaseData>;

  /** URL control */
  Url: ExtendableConstructor<UrlControl>;

  /** WordPress widget control */
  Wp_widget: ExtendableConstructor<ControlBaseData>;

  /** WYSIWYG control */
  Wysiwyg: ExtendableConstructor<ControlBaseData>;
}