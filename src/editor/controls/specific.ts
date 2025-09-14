/**
 * Specific Control Types
 * Individual control implementations for various UI elements
 */

import type {
  ControlBaseView,
  ControlBaseDataView,
  ControlBaseMultiple,
  ControlBaseUnits,
  ControlUIElements,
} from "./base";
import type { Select2 as Select2Instance, Options as Select2Options } from "select2";

/**
 * Box shadow control
 */
export interface BoxShadow extends ControlBaseDataView {
  onColorChanged(): void;
  updateCSSVar(styleItem: any, key: string, value: any): void;
  applyValueFromSettings(): void;
}

/**
 * Button control
 */
export interface Button extends ControlBaseView {
  onButtonClick(event: Event): void;
}

/**
 * Choose control (radio-like selection)
 */
export interface Choose extends ControlBaseDataView {
  applySavedValue(): void;
}

/**
 * Code editor control
 */
export interface Code extends ControlBaseDataView {
  editor?: any;
  onRender(): void;
  applySavedValue(): void;
  onDestroy(): void;
}

/**
 * Color picker control with advanced color management
 */
export interface Color extends ControlBaseDataView {
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
  ui(): ControlUIElements & {
    pickerContainer: JQuery;
  };

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
export interface DateTime extends ControlBaseDataView {
  onInputChange(): void;
  onRender(): void;
}

/**
 * Dimensions control (padding, margin, etc.)
 */
export interface Dimensions extends ControlBaseDataView {
  onInputChange(): void;
  onLinkedInputChange(): void;
  getCurrentValue(): any;
  applySavedValue(): void;
}

/**
 * Font control
 */
export interface Font extends ControlBaseDataView {
  cache?: Record<string, any>;
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
export interface Gallery extends ControlBaseDataView {
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
export interface Gaps extends ControlBaseDataView {
  onInputChange(): void;
  getCurrentValue(): any;
  applySavedValue(): void;
}

/**
 * Hidden control
 */
export interface Hidden extends ControlBaseDataView {}

/**
 * Icon picker control
 */
export interface Icon extends ControlBaseDataView {
  onRender(): void;
  onIconPickerSelect(): void;
  getControlValue(): any;
}

/**
 * Icons control (multiple icons)
 */
export interface Icons extends ControlBaseMultiple {
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
export interface ImageDimensions extends ControlBaseDataView {
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
export interface Media extends ControlBaseMultiple {
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
  } & ControlUIElements;

  // Event handlers
  events(): {
    "click @ui.frameOpeners": "openFrame";
    "click @ui.removeButton": "deleteImage";
    "change @ui.mediaInputImageSize": "onMediaInputImageSizeChange";
    "click @ui.promotions_dismiss": "onPromotionDismiss";
    "click @ui.promotions_action": "onPromotionAction";
  } & Record<string, string>;

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
export interface Notice extends ControlBaseView {
  onRender(): void;
}

/**
 * Number input control with scrubbing behavior and validation
 */
export interface Number extends ControlBaseDataView {
  // Behavior integration for mouse scrubbing
  behaviors(): {
    Scrubbing: {
      behaviorClass: any;
      scrubSettings: { intentTime: number };
    };
  } & Record<string, any>;

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
export interface PopoverToggle extends Choose {
  onRender(): void;
  onChildControlValueChange(): void;
  onChooseSelect(): void;
  updatePopoverVisibility(): void;
}

/**
 * Repeater control for dynamic content
 */
export interface Repeater extends ControlBaseDataView {
  childView?: any;
  templateHelpers(): {
    view: ControlBaseDataView;
    data: {
      _cid: string;
      controlValue?: any;
      [key: string]: any;
    };
  };
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
export interface RepeaterRow extends ControlBaseDataView {
  className?: string;
  tagName: string;
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
export interface Section extends ControlBaseView {
  onRender(): void;
}

/**
 * Select dropdown control with placeholder and option group support
 */
export interface Select extends ControlBaseDataView {
  // UI elements
  ui(): {
    select: JQuery;
  } & ControlUIElements;

  // Core functionality
  updatePlaceholder(): void;
  getControlPlaceholder(): string;
  onReady(): void;
  onInputChange(): void;
  onRender(): void;
  onSelectChange(): void;
  applySavedValue(): void;

  // Note: onPasteStyle is a static method on the constructor
}

/**
 * Select2 enhanced dropdown control
 */
export interface Select2 extends ControlBaseDataView {
  cache?: Record<string, any>;
  select2Instance?: Select2Instance;

  getSelect2Placeholder(): string;
  getSelect2Options(): Partial<Select2Options>;
  onRender(): void;
  onDestroy(): void;
  applySavedValue(): void;
  onSelect2Select(event: any): void;
  onSelect2Open(): void;
  onSelect2Close(): void;
}

// Export alias for compatibility
export type Select2Control = Select2;

/**
 * Slider control with units and multiple value support
 */
export interface Slider extends ControlBaseUnits {
  // UI elements
  ui(): {
    slider: JQuery;
  } & ControlUIElements;

  // Template helpers
  templateHelpers(): {
    isMultiple: boolean;
  } & {
    view: ControlBaseView;
    data: {
      _cid: string;
      controlValue?: any;
      [key: string]: any;
    };
  };

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
export interface Structure extends ControlBaseView {
  currentPreset?: any;
  onPresetSelected(event: Event): void;
  onRender(): void;
}

/**
 * Switcher control (toggle)
 */
export interface Switcher extends ControlBaseDataView {
  onSwitcherChange(): void;
  applySavedValue(): void;
}

/**
 * Tab control
 */
export interface Tab extends ControlBaseView {
  onRender(): void;
}

/**
 * URL control
 */
export interface URL extends ControlBaseMultiple {
  onRender(): void;
  onInputChange(): void;
  updateElementModel(value: any): void;
}

/**
 * Visual choice control
 */
export interface VisualChoice extends ControlBaseDataView {
  onChoiceSelect(event: Event): void;
  applySavedValue(): void;
}

/**
 * WordPress widget control
 */
export interface WpWidget extends ControlBaseDataView {
  onFormUpdate(): void;
  onRender(): void;
  applySavedValue(): void;
}

/**
 * WYSIWYG editor control
 */
export interface WYSIWYG extends ControlBaseDataView {
  editor?: any;
  onRender(): void;
  onDestroy(): void;
  applySavedValue(): void;
  getWysiwygValue(): string;
}

/**
 * Text shadow control (extends box shadow functionality)
 */
export interface TextShadow extends BoxShadow {
  // Inherits from BoxShadow with text-specific enhancements
  onTextShadowChange(): void;
  updateTextShadowPreview(): void;
}

/**
 * Border control for element borders
 */
export interface Border extends ControlBaseDataView {
  // Border style properties
  borderTypes: string[];
  currentBorderType: string;

  // Core functionality
  onBorderStyleChange(): void;
  onBorderWidthChange(): void;
  onBorderColorChange(): void;
  onBorderRadiusChange(): void;

  // Border utilities
  getBorderValue(): any;
  setBorderValue(border: any): void;
  updateBorderPreview(): void;

  // Individual border sides
  setTopBorder(value: any): void;
  setRightBorder(value: any): void;
  setBottomBorder(value: any): void;
  setLeftBorder(value: any): void;

  // Lifecycle
  onRender(): void;
  applySavedValue(): void;
}

/**
 * Typography control for text styling
 */
export interface Typography extends ControlBaseDataView {
  // Font management
  fonts: string[];
  googleFonts: string[];
  systemFonts: string[];
  customFonts: string[];

  // Typography properties
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  fontStyle: string;
  textTransform: string;
  textDecoration: string;
  lineHeight: string;
  letterSpacing: string;
  wordSpacing: string;

  // Core functionality
  onFontFamilyChange(): void;
  onFontSizeChange(): void;
  onFontWeightChange(): void;
  onFontStyleChange(): void;
  onTextTransformChange(): void;
  onTextDecorationChange(): void;
  onLineHeightChange(): void;
  onLetterSpacingChange(): void;
  onWordSpacingChange(): void;

  // Font loading
  loadGoogleFont(fontFamily: string): Promise<void>;
  loadCustomFont(fontData: any): Promise<void>;
  previewFont(fontFamily: string): void;

  // Typography utilities
  getTypographyValue(): any;
  setTypographyValue(typography: any): void;
  updateTypographyPreview(): void;

  // Font discovery
  discoverUsedFonts(): string[];
  optimizeFontLoading(): void;

  // Lifecycle
  onRender(): void;
  applySavedValue(): void;
  onDestroy(): void;
}

/**
 * Background control for element backgrounds
 */
export interface Background extends ControlBaseDataView {
  // Background types
  backgroundTypes: string[];
  currentBackgroundType: string;

  // Background properties
  backgroundColor: string;
  backgroundImage: string;
  backgroundPosition: string;
  backgroundSize: string;
  backgroundRepeat: string;
  backgroundAttachment: string;
  backgroundBlendMode: string;

  // Gradient properties
  gradientType: string;
  gradientAngle: number;
  gradientColors: string[];
  gradientStops: number[];

  // Video background
  videoUrl: string;
  videoPoster: string;
  videoLoop: boolean;
  videoMuted: boolean;

  // Core functionality
  onBackgroundTypeChange(): void;
  onBackgroundColorChange(): void;
  onBackgroundImageChange(): void;
  onBackgroundPositionChange(): void;
  onBackgroundSizeChange(): void;
  onBackgroundRepeatChange(): void;
  onBackgroundAttachmentChange(): void;

  // Gradient functionality
  onGradientTypeChange(): void;
  onGradientAngleChange(): void;
  onGradientColorChange(index: number, color: string): void;
  onGradientStopChange(index: number, stop: number): void;
  addGradientStop(): void;
  removeGradientStop(index: number): void;

  // Video functionality
  onVideoUrlChange(): void;
  onVideoPosterChange(): void;
  onVideoSettingsChange(): void;

  // Background utilities
  getBackgroundValue(): any;
  setBackgroundValue(background: any): void;
  updateBackgroundPreview(): void;
  generateGradientCSS(): string;

  // Media handling
  selectBackgroundImage(): void;
  selectVideoPoster(): void;
  validateVideoUrl(url: string): boolean;

  // Lifecycle
  onRender(): void;
  applySavedValue(): void;
}

/**
 * Animation control for element animations
 */
export interface Animation extends ControlBaseDataView {
  // Animation properties
  animationType: string;
  animationDuration: number;
  animationDelay: number;
  animationDirection: string;
  animationFillMode: string;
  animationIterationCount: number | string;
  animationTimingFunction: string;

  // Animation presets
  animationPresets: any[];
  customAnimations: any[];

  // Core functionality
  onAnimationTypeChange(): void;
  onAnimationDurationChange(): void;
  onAnimationDelayChange(): void;
  onAnimationDirectionChange(): void;
  onAnimationFillModeChange(): void;
  onAnimationIterationCountChange(): void;
  onAnimationTimingFunctionChange(): void;

  // Animation utilities
  getAnimationValue(): any;
  setAnimationValue(animation: any): void;
  previewAnimation(): void;
  stopAnimationPreview(): void;

  // Custom animations
  createCustomAnimation(keyframes: any[]): void;
  editCustomAnimation(id: string, keyframes: any[]): void;
  deleteCustomAnimation(id: string): void;

  // Animation management
  loadAnimationPresets(): void;
  saveAnimationPreset(animation: any, name: string): void;
  importAnimations(animations: any[]): void;
  exportAnimations(): any[];

  // Lifecycle
  onRender(): void;
  applySavedValue(): void;
}

/**
 * Transform control for CSS transforms
 */
export interface Transform extends ControlBaseDataView {
  // Transform properties
  translateX: number;
  translateY: number;
  translateZ: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  skewX: number;
  skewY: number;

  // Transform origin
  transformOriginX: string;
  transformOriginY: string;
  transformOriginZ: string;

  // Perspective
  perspective: number;
  perspectiveOriginX: string;
  perspectiveOriginY: string;

  // Core functionality
  onTranslateChange(): void;
  onRotateChange(): void;
  onScaleChange(): void;
  onSkewChange(): void;
  onTransformOriginChange(): void;
  onPerspectiveChange(): void;

  // Transform utilities
  getTransformValue(): any;
  setTransformValue(transform: any): void;
  generateTransformCSS(): string;
  updateTransformPreview(): void;

  // Transform presets
  applyTransformPreset(preset: string): void;
  saveTransformPreset(name: string): void;
  resetTransform(): void;

  // 3D utilities
  enable3D(): void;
  disable3D(): void;
  is3DEnabled(): boolean;

  // Lifecycle
  onRender(): void;
  applySavedValue(): void;
}

/**
 * Filter control for CSS filters
 */
export interface Filter extends ControlBaseDataView {
  // Filter properties
  blur: number;
  brightness: number;
  contrast: number;
  grayscale: number;
  hueRotate: number;
  invert: number;
  opacity: number;
  saturate: number;
  sepia: number;
  dropShadow: any;

  // Core functionality
  onBlurChange(): void;
  onBrightnessChange(): void;
  onContrastChange(): void;
  onGrayscaleChange(): void;
  onHueRotateChange(): void;
  onInvertChange(): void;
  onOpacityChange(): void;
  onSaturateChange(): void;
  onSepiaChange(): void;
  onDropShadowChange(): void;

  // Filter utilities
  getFilterValue(): any;
  setFilterValue(filter: any): void;
  generateFilterCSS(): string;
  updateFilterPreview(): void;

  // Filter presets
  applyFilterPreset(preset: string): void;
  saveFilterPreset(name: string): void;
  resetFilters(): void;

  // Advanced filters
  addCustomFilter(filter: string): void;
  removeCustomFilter(index: number): void;
  validateFilterValue(value: string): boolean;

  // Lifecycle
  onRender(): void;
  applySavedValue(): void;
}
