/**
 * Specific Control Types
 * Individual control implementations for various UI elements
 */

import type {
  ControlBaseView,
  ControlBaseDataView,
  ControlBaseMultiple,
  ControlBaseUnits,
} from "./base";

/**
 * Box shadow control
 */
export declare class BoxShadow extends ControlBaseDataView {
  onColorChanged(): void;
  updateCSSVar(styleItem: any, key: string, value: any): void;
  applyValueFromSettings(): void;
}

/**
 * Button control
 */
export declare class Button extends ControlBaseView {
  onButtonClick(event: Event): void;
}

/**
 * Choose control (radio-like selection)
 */
export declare class Choose extends ControlBaseDataView {
  applySavedValue(): void;
}

/**
 * Code editor control
 */
export declare class Code extends ControlBaseDataView {
  editor?: any;
  onRender(): void;
  applySavedValue(): void;
  onDestroy(): void;
}

/**
 * Color picker control with advanced color management
 */
export declare class Color extends ControlBaseDataView {
  colorPicker?: {
    picker: any;
    onChange: () => void;
    onClear: () => void;
    onAddButtonClick: () => void;
    onPickerShow: () => void;
    onPickerHide: () => void;
  };
  $pickerButton?: JQuery;

  // UI elements
  ui(): {
    pickerContainer: JQuery;
  } & ReturnType<ControlBaseDataView["ui"]>;

  // Core functionality
  applySavedValue(): void;
  initPicker(): void;
  onPickerChange(): void;
  onPickerClear(): void;
  onAddGlobalButtonClick(): void;
  onPickerButtonClick(): void;

  // UI enhancement methods
  hidePickerOnPreviewClick(): void;
  addTipsyToPickerButton(): void;
  addEyedropper(): void;

  // Global color support
  getGlobalKey(): string;
  getCurrentValue(): string;
  reRoute(isEnabled: boolean): void;

  // Lifecycle methods
  onRender(): void;
  onDestroy(): void;
}

/**
 * Date/time picker control
 */
export declare class DateTime extends ControlBaseDataView {
  onInputChange(): void;
  onRender(): void;
}

/**
 * Dimensions control (padding, margin, etc.)
 */
export declare class Dimensions extends ControlBaseDataView {
  onInputChange(): void;
  onLinkedInputChange(): void;
  getCurrentValue(): any;
  applySavedValue(): void;
}

/**
 * Font control
 */
export declare class Font extends ControlBaseDataView {
  cache?: { [key: string]: any };
  childView?: any;
  getStyleId(): string;
  onFontChange(): void;
  enqueueFont(): void;
  onRender(): void;
  onDestroy(): void;
}

/**
 * Gallery control
 */
export declare class Gallery extends ControlBaseDataView {
  attachments?: any;
  library?: any;
  onButtonClick(): void;
  initRemoveDialog(): void;
  onRender(): void;
  applySavedValue(): void;
}

/**
 * Gaps control for grid layouts
 */
export declare class Gaps extends ControlBaseDataView {
  onInputChange(): void;
  getCurrentValue(): any;
  applySavedValue(): void;
}

/**
 * Hidden control
 */
export declare class Hidden extends ControlBaseDataView {}

/**
 * Icon picker control
 */
export declare class Icon extends ControlBaseDataView {
  onRender(): void;
  onIconPickerSelect(): void;
  getControlValue(): any;
}

/**
 * Icons control (multiple icons)
 */
export declare class Icons extends ControlBaseMultiple {
  childView: any;
  onRender(): void;
  getChildView(): any;
  onIconPickerSelect(): void;
  getControlValue(): any;
  updateElementModel(value: any): void;
}

/**
 * Image dimensions control
 */
export declare class ImageDimensions extends ControlBaseDataView {
  onApplyImageSize(): void;
  onImageDimensionChange(): void;
  onCustomImageDimensionChange(): void;
  getCurrentValue(): any;
  applySavedValue(): void;
  onRender(): void;
}

/**
 * Media picker control with file upload and management
 */
export declare class Media extends ControlBaseMultiple {
  mediaType?: string;

  // UI elements
  ui(): {
    controlMedia: JQuery;
    mediaImage: JQuery;
    mediaVideo: JQuery;
    frameOpeners: JQuery;
    removeButton: JQuery;
    promotions: JQuery;
    promotions_dismiss: JQuery;
    promotions_action: JQuery;
    fileName: JQuery;
    mediaInputImageSize: JQuery;
  } & ReturnType<ControlBaseMultiple["ui"]>;

  // Event handlers
  events(): {
    "click @ui.frameOpeners": "openFrame";
    "click @ui.removeButton": "deleteImage";
    "change @ui.mediaInputImageSize": "onMediaInputImageSizeChange";
    "click @ui.promotions_dismiss": "onPromotionDismiss";
    "click @ui.promotions_action": "onPromotionAction";
  } & ReturnType<ControlBaseMultiple["events"]>;

  // Media type management
  getMediaType(): string;
  getLibraryType(mediaType?: string): string;

  // Core functionality
  onRender(): void;
  applySavedValue(): void;
  openFrame(view?: string): void;
  select(): void;
  deleteImage(event: Event): void;

  // Frame event handlers
  onFrameOpen(): void;
  onFrameSelect(): void;
  onFrameClose(): void;
  onRemoveClick(): void;
  onButtonClick(): void;
}

/**
 * Notice control (informational display)
 */
export declare class Notice extends ControlBaseView {
  onRender(): void;
}

/**
 * Number input control with scrubbing behavior and validation
 */
export declare class Number extends ControlBaseDataView {
  // Behavior integration for mouse scrubbing
  behaviors(): {
    Scrubbing: {
      behaviorClass: any;
      scrubSettings: { intentTime: number };
    };
  } & ReturnType<ControlBaseDataView["behaviors"]>;

  // Validation methods
  registerValidators(): void;
  validateValue(value: any): number | null;

  // Event handlers
  onInputChange(): void;
  onRender(): void;
}

/**
 * Popover toggle control
 */
export declare class PopoverToggle extends Choose {
  onRender(): void;
  onChildControlValueChange(): void;
  onChooseSelect(): void;
  updatePopoverVisibility(): void;
}

/**
 * Repeater control for dynamic content
 */
export declare class Repeater extends ControlBaseDataView {
  childView?: any;
  templateHelpers(): object;
  getChildView(): any;
  getChildViewOptions(model: any): object;
  updateElementModel(value: any): void;
  onAddButtonClick(): void;
  onSortUpdate(): void;
  onRender(): void;
  onBeforeDestroy(): void;
}

/**
 * Repeater row control
 */
export declare class RepeaterRow extends ControlBaseDataView {
  className(): string;
  tagName(): string;
  controlViews?: object;
  onRowDuplicate(): void;
  onRowRemove(): void;
  onRowToggle(): void;
  onRender(): void;
  onDestroy(): void;
}

/**
 * Section control (control grouping)
 */
export declare class Section extends ControlBaseView {
  onRender(): void;
}

/**
 * Select dropdown control with placeholder and option group support
 */
export declare class Select extends ControlBaseDataView {
  // UI elements
  ui(): {
    select: JQuery;
  } & ReturnType<ControlBaseDataView["ui"]>;

  // Core functionality
  updatePlaceholder(): void;
  getControlPlaceholder(): string;
  onReady(): void;
  onInputChange(): void;
  onRender(): void;
  onSelectChange(): void;
  applySavedValue(): void;

  // Static methods for clipboard operations
  static onPasteStyle(control: any, clipboardValue: any): boolean;
}

/**
 * Select2 enhanced dropdown control
 */
export declare class Select2 extends ControlBaseDataView {
  cache?: { [key: string]: any };
  getSelect2Placeholder(): string;
  getSelect2Options(): object;
  onRender(): void;
  onDestroy(): void;
}

/**
 * Slider control with units and multiple value support
 */
export declare class Slider extends ControlBaseUnits {
  // UI elements
  ui(): {
    slider: JQuery;
  } & ReturnType<ControlBaseUnits["ui"]>;

  // Template helpers
  templateHelpers(): {
    isMultiple: boolean;
  } & ReturnType<ControlBaseUnits["templateHelpers"]>;

  // Core functionality
  isMultiple(): boolean;
  isCustomUnit(): boolean;
  initSlider(): void;
  destroySlider(): void;
  getCurrentRange(): object;
  getSize(): any;

  // Event handlers
  onInputChange(): void;
  onSliderChange(): void;
  resetDimensions(): void;
  onRender(): void;
  onDestroy(): void;
}

/**
 * Structure control for layout selection
 */
export declare class Structure extends ControlBaseView {
  currentPreset?: any;
  onPresetSelected(event: Event): void;
  onRender(): void;
}

/**
 * Switcher control (toggle)
 */
export declare class Switcher extends ControlBaseDataView {
  onSwitcherChange(): void;
  applySavedValue(): void;
}

/**
 * Tab control
 */
export declare class Tab extends ControlBaseView {
  onRender(): void;
}

/**
 * URL control
 */
export declare class URL extends ControlBaseMultiple {
  onRender(): void;
  onInputChange(): void;
  updateElementModel(value: any): void;
}

/**
 * Visual choice control
 */
export declare class VisualChoice extends ControlBaseDataView {
  onChoiceSelect(event: Event): void;
  applySavedValue(): void;
}

/**
 * WordPress widget control
 */
export declare class WpWidget extends ControlBaseDataView {
  onFormUpdate(): void;
  onRender(): void;
  applySavedValue(): void;
}

/**
 * WYSIWYG editor control
 */
export declare class WYSIWYG extends ControlBaseDataView {
  editor?: any;
  onRender(): void;
  onDestroy(): void;
  applySavedValue(): void;
  getWysiwygValue(): string;
}
