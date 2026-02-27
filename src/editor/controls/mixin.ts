/**
 * Control View Mixin Types
 *
 * Provides ThisType helper for typing `this` context in control view mixins.
 * Used when extending Elementor controls via object literals merged with `.extend()`.
 *
 * @example
 * ```javascript
 * /** @type {import('@artemsemkin/elementor-types').ControlViewMixin} *\/
 * export const MyControlMixin = {
 *   onRender() {
 *     this.model.get('name') // ✓ typed
 *     this.$el.find('.control') // ✓ typed
 *   }
 * }
 * ```
 */

import type { Container } from "../container";
import type { Model } from "backbone";

/** Extended UI elements for fluid controls */
interface IFluidControlUI {
  [key: string]: JQuery | HTMLElement | HTMLElement[] | HTMLSelectElement[] | undefined;
  controlTitle?: JQuery;
  input?: JQuery;
  checkbox?: JQuery;
  radio?: JQuery;
  select?: JQuery;
  textarea?: JQuery;
  responsiveSwitchersSibling?: JQuery;
  responsiveSwitchers?: JQuery;
  responsiveSwitchersWrapper?: JQuery;
  contentEditable?: JQuery;
  tooltipTargets?: JQuery;
  units?: JQuery;
  unitSwitcher?: JQuery;
  unitChoices?: JQuery;
  /** Fluid preset select elements */
  selectControls?: HTMLSelectElement[];
  /** Dimension input containers */
  dimensions?: HTMLElement[];
  /** Control input elements */
  controls?: JQuery<HTMLElement>;
  /** Link/unlink button */
  link?: JQuery<HTMLElement>;
  /** Slider element (for slider controls) */
  slider?: JQuery<HTMLElement>;
}

/** Inherited control value with device inheritance metadata */
export interface IInheritedControlValue {
  [key: string]: string | boolean | string[] | undefined;
  unit?: string;
  __inheritedFrom?: string;
  __directParentDevice?: string;
  __inheritPath?: string[];
  __sourceUnit?: string;
}

/** Preset dialog instance */
interface IPresetDialog {
  show(): void;
  hide(): void;
}

/** Preset data for dialog */
interface IPresetData {
  setting: string;
  minSize: string;
  minUnit: string;
  maxSize: string;
  maxUnit: string;
  presetId?: string;
  title?: string;
  groupId?: string;
}

/**
 * Control view `this` context interface.
 * Standalone interface for mixin `this` typing.
 */
export interface IControlViewThis {
  /** DOM element */
  el: HTMLElement;

  /** jQuery wrapper for el */
  $el: JQuery<HTMLElement>;

  /** Control model */
  model: Model & {
    get(key: string): any;
    set(key: string, value: any): void;
  };

  /** UI element cache with fluid control extensions */
  ui: IFluidControlUI;

  /** Elementor container */
  container?: Container;

  /** View options */
  options: {
    container?: Container;
    elementSettingsModel?: Model;
    [key: string]: any;
  };

  /** Parent view reference */
  _parent?: IControlViewThis;

  /** Destroyed state flag */
  isDestroyed: boolean;

  /** AbortController storage for cleanup */
  abortControllers: Map<string, AbortController>;

  /** Check if dimensions are linked */
  isLinkedDimensions?(): boolean;

  /** Update dimensions display */
  updateDimensions?(): void;

  /** Check if fluid unit is available */
  hasFluidUnit(): boolean;

  /** Check if current unit is fluid */
  isFluidUnit?(): boolean;

  /** Get current unit */
  getCurrentUnit?(): string;

  /** Check if current unit is custom */
  isCustomUnit?(): boolean;

  /** Update placeholder class state */
  updatePlaceholderClassState?(): void;

  /** Get parent control value for inheritance */
  getParentControlValue?(): IInheritedControlValue | null;

  /** Open preset dialog */
  openPresetDialog?(
    mode: "create" | "edit",
    data: IPresetData
  ): Promise<IPresetDialog>;

  /** Check if value is empty */
  isEmptyValue?(value: any): boolean;

  /** Get control value by key */
  getControlValue(key?: string): any;

  /** Set control value */
  setValue(keyOrValue: string | Record<string, any>, value?: any): void;

  /** Check if this is a multiple-value control */
  isMultiple?(): boolean;

  /** Initialize slider */
  initSlider?(): void;

  /** Destroy slider */
  destroySlider?(): void;

  /** Check if slider is initialized */
  isSliderInitialized?(): boolean;

  /** jQuery selector helper */
  $(selector: string): JQuery<HTMLElement>;

  /** Trigger method on view */
  triggerMethod?(event: string, ...args: any[]): any;

  /** Listen to events */
  listenTo?(obj: any, event: string, callback: (...args: any[]) => void): this;

  /** Get option value */
  getOption?(name: string): any;

  /** Render the view */
  render?(): this;

  // ============================================
  // Mixin methods (defined in BaseControlView)
  // ============================================

  /** Check if fluid selector has been rendered */
  hasRenderedFluidSelector?(): boolean;

  /** Render fluid selector elements */
  renderFluidSelector?(): Promise<void>;

  /** Render fluid select elements */
  renderFluidSelectElements?(): void;

  /** Add loading options to selects */
  addLoadingOptions?(): void;

  /** Initialize Select2 on elements */
  createSelect2?(): void;

  /** Populate select elements with options */
  populateSelectElements?(): Promise<void>;

  /** Attach event listeners to select elements */
  attachSelectElementsListeners?(): void;

  /** Initialize inline inputs visibility state */
  initializeInlineInputsState?(): void;

  /** Get inline input container for setting */
  getInlineContainer?(setting: string): HTMLElement | null;

  /** Toggle inline inputs visibility */
  toggleInlineInputs?(setting: string, show: boolean): void;

  /** Get inline input values for setting */
  getInlineInputValues?(setting: string): {
    minSize: string;
    minUnit: string;
    maxSize: string;
    maxUnit: string;
  } | null;

  /** Set inline input values */
  setInlineInputValues?(setting: string, values: {
    minSize: string;
    minUnit: string;
    maxSize: string;
    maxUnit: string;
  }): void;

  /** Handle select change event */
  onSelectChange?(selectEl: HTMLSelectElement): void;

  /** Handle linked dimensions change */
  handleLinkedDimensionsChange?(selectEl: HTMLSelectElement, value: string, isInheritValue: boolean): void;

  /** Handle unlinked dimensions change */
  handleUnlinkedDimensionsChange?(dimensionName: string, value: string): void;

  /** Update unit choices display */
  updateUnitChoices?(): void;

  /** Handle link dimensions click */
  onLinkDimensionsClicked?(evt: Event): void;

  /** Create fluid selector element */
  createFluidSelector?(dimension: HTMLElement, inputEl: HTMLInputElement, labelEl: HTMLLabelElement): void;

  /** Create inline inputs container */
  createInlineInputsContainer?(setting: string): HTMLElement;

  /** Handle inline input change */
  onInlineInputChange?(setting: string): void;

  /** Handle Save as Preset button click */
  onSaveAsPresetClick?(setting: string): Promise<void>;

  /** Handle Edit icon click on preset */
  onEditPresetClick?(selectEl: HTMLSelectElement, presetId: string): Promise<void>;

  /** Handle preset create confirmation */
  onConfirmCreatePreset?(title: string, group: string, minValue: string, maxValue: string, setting: string): Promise<void>;

  /** Handle preset update confirmation */
  onConfirmUpdatePreset?(presetId: string, title: string, groupId: string, minValue: string, maxValue: string): Promise<void>;

  /** Refresh preset dropdowns */
  refreshPresetDropdowns?(): Promise<void>;

  /** Select preset value */
  selectPreset?(setting: string, presetValue: string): void;

  /** Setup inheritance attributes */
  setupInheritanceAttributes?(fluidSelector: HTMLElement, setting: string): void;

  /** Handle widescreen inheritance */
  handleWidescreenInheritance?(baseControlName: string): IInheritedControlValue | null;

  /** Handle standard inheritance */
  handleStandardInheritance?(baseControlName: string, currentDeviceSuffix: string, deviceOrder: string[]): IInheritedControlValue | null;

  /** Find non-empty ancestor value */
  findNonEmptyAncestorValue?(baseControlName: string, ancestorDevices: string[], inheritPath: string[], directParent: string): IInheritedControlValue | null;

  /** Get control value by name (internal) */
  _getControlValue?(controlName: string): any;

  /** Check if custom fluid value */
  isCustomFluidValue?(value: string): boolean;

  /** Validate inline input */
  validateInlineInput?(input: HTMLInputElement): boolean;

  /** Parse value with unit */
  parseValueWithUnit?(value: string): { size: string; unit: string } | null;

  /** Update save button state */
  updateSaveButtonState?(container: HTMLElement): void;

  /** Populate group options */
  populateGroupOptions?($select: JQuery): Promise<void>;

  // ============================================
  // Slider-specific methods (BaseSliderControlView)
  // ============================================

  /** Create slider fluid selector */
  _createSliderFluidSelector?(inputWrapperEl: HTMLElement, inputEl: HTMLInputElement): void;

  /** Setup slider inheritance attributes */
  _setupSliderInheritanceAttributes?(fluidSelector: HTMLElement): void;

  /** Create slider inline inputs container */
  _createSliderInlineInputsContainer?(setting: string): HTMLElement;

  /** Get slider inline container */
  _getSliderInlineContainer?(setting: string): HTMLElement | null;

  /** Toggle slider inline inputs */
  _toggleSliderInlineInputs?(setting: string, show: boolean): void;

  /** Get slider inline input values */
  _getSliderInlineInputValues?(setting: string): any;

  /** Set slider inline input values */
  _setSliderInlineInputValues?(setting: string, values: any): void;

  /** Handle slider inline input change */
  _onSliderInlineInputChange?(setting: string): void;

  /** Handle slider save as preset click */
  _onSliderSaveAsPresetClick?(setting: string): Promise<void>;

  /** Refresh slider preset dropdown */
  _refreshSliderPresetDropdown?(): Promise<void>;

  /** Select slider preset */
  _selectSliderPreset?(presetValue: string): void;

  /** Validate slider inline input */
  _validateSliderInlineInput?(input: HTMLInputElement): boolean;

  /** Update slider save button state */
  _updateSliderSaveButtonState?(container: HTMLElement): void;

  /** Parse slider value with unit */
  _parseSliderValueWithUnit?(value: string): any;

  /** Populate slider group options */
  _populateSliderGroupOptions?($select: JQuery): Promise<void>;

  /** Check if inside fluid preset repeater */
  _isInFluidPresetRepeater?(): boolean;

  /** Handle unit change */
  handleUnitChange?(): void;
}

/**
 * ThisType helper for control view mixins.
 * Use this to type object literals that will be merged into control views.
 *
 * @example
 * ```javascript
 * /** @type {import('@artemsemkin/elementor-types').ControlViewMixin} *\/
 * export const BaseControlView = {
 *   initialize() {
 *     callSuper(this, 'initialize', arguments)
 *     this.isDestroyed = false // ✓ typed
 *   }
 * }
 * ```
 */
export type ControlViewMixin = ThisType<IControlViewThis>;

/**
 * Static methods mixin type for control views.
 * Used for the second argument of `.extend()`.
 */
export type ControlViewStaticMixin = {
  getStyleValue?(placeholder: string, controlValue: any): any;
  onPasteStyle?(): boolean;
};
