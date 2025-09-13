/**
 * Control Behaviors
 * Behavior classes for enhanced control functionality
 */

import type { Module } from "../../core/modules";
import type { ControlBaseView, ControlBaseDataView } from "./base";

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
      valueModifier?: () => number;
      enhancedNumber?: () => number;
      direction?: "horizontal" | "vertical" | "both";
      sensitivity?: number;
      precision?: number;
    };

    // Mouse interaction state
    isActive: boolean;
    startValue: number;
    startMousePosition: { x: number; y: number };
    currentValue: number;

    initialize(): void;
    onMouseDown(event: MouseEvent): void;
    onMouseMove(event: MouseEvent): void;
    onMouseUp(event: MouseEvent): void;
    onKeyDown(event: KeyboardEvent): void; // For keyboard scrubbing

    // Value calculation
    updateValue(delta: number): void;
    calculateDelta(currentPos: { x: number; y: number }): number;
    applyValueModifier(delta: number): number;

    // Visual feedback
    showScrubIndicator(): void;
    hideScrubIndicator(): void;
    updateCursor(): void;

    // Configuration
    setSensitivity(sensitivity: number): void;
    setPrecision(precision: number): void;
  }

  /**
   * Responsive behavior for device-specific controls
   */
  class Responsive extends Module {
    activeDevice: string;
    devices: string[];
    breakpoints: Record<string, number>;

    initialize(): void;
    onDeviceChange(device: string): void;
    updateDeviceSpecificControls(): void;

    // Device management
    setActiveDevice(device: string): void;
    getActiveDevice(): string;
    getDeviceBreakpoints(): Record<string, number>;

    // Control visibility
    showDeviceControls(device: string): void;
    hideDeviceControls(device: string): void;
    updateControlVisibility(): void;
  }

  /**
   * Units behavior for controls with measurement units
   */
  class Units extends Module {
    currentUnit: string;
    availableUnits: string[];
    conversionRates: Record<string, number>;

    initialize(): void;
    onUnitChange(unit: string): void;
    convertValue(value: number, fromUnit: string, toUnit: string): number;

    // Unit management
    setUnit(unit: string): void;
    getUnit(): string;
    getAvailableUnits(): string[];

    // Conversion utilities
    convertToPixels(value: number, unit: string): number;
    convertFromPixels(value: number, unit: string): number;
    updateConversionRates(): void;
  }

  /**
   * Linked behavior for synchronized controls (like dimensions)
   */
  class Linked extends Module {
    isLinked: boolean;
    linkedControls: string[];
    linkButton?: HTMLElement;

    initialize(): void;
    onLinkToggle(): void;
    onLinkedControlChange(controlName: string, value: any): void;

    // Link management
    setLinked(linked: boolean): void;
    isControlLinked(): boolean;
    syncLinkedControls(sourceControl: string, value: any): void;

    // Visual feedback
    updateLinkButtonState(): void;
    highlightLinkedControls(): void;
  }

  /**
   * Color picker behavior with advanced color management
   */
  class ColorPicker extends Module {
    picker?: any;
    colorFormat: "hex" | "rgb" | "rgba" | "hsl" | "hsla";
    hasAlpha: boolean;
    swatches: string[];

    initialize(): void;
    initializePicker(): void;
    onColorChange(color: string): void;
    onFormatChange(format: string): void;

    // Color utilities
    convertColor(color: string, toFormat: string): string;
    addToSwatches(color: string): void;
    removeFromSwatches(color: string): void;

    // Eyedropper support
    supportsEyedropper(): boolean;
    openEyedropper(): Promise<string>;

    // Global colors
    getGlobalColors(): string[];
    saveAsGlobal(color: string, name: string): void;
  }

  /**
   * Slider behavior with enhanced interaction
   */
  class Slider extends Module {
    slider?: any;
    isMultiple: boolean;
    handles: number;
    range: { min: number; max: number };
    step: number;

    initialize(): void;
    initializeSlider(): void;
    onSliderChange(values: number | number[]): void;
    onSliderSlide(values: number | number[]): void;

    // Configuration
    setRange(min: number, max: number): void;
    setStep(step: number): void;
    setValue(value: number | number[]): void;

    // Multiple handle support
    addHandle(): void;
    removeHandle(): void;
    getHandleCount(): number;

    // Visual enhancements
    showTooltips(): void;
    hideTooltips(): void;
    updateTooltipPosition(): void;
  }

  /**
   * Drag and drop behavior for file uploads and reordering
   */
  class DragDrop extends Module {
    dropZone?: HTMLElement;
    isDragging: boolean;
    dragData?: any;
    allowedTypes: string[];

    initialize(): void;
    onDragEnter(event: DragEvent): void;
    onDragOver(event: DragEvent): void;
    onDragLeave(event: DragEvent): void;
    onDrop(event: DragEvent): void;

    // File handling
    handleFileUpload(files: FileList): void;
    validateFile(file: File): boolean;
    uploadFile(file: File): Promise<any>;

    // Reordering
    initializeSortable(): void;
    onSortStart(event: any): void;
    onSortUpdate(event: any): void;
    onSortStop(event: any): void;

    // Visual feedback
    showDropZone(): void;
    hideDropZone(): void;
    highlightDropTarget(): void;
  }

  /**
   * Auto-save behavior for automatic value persistence
   */
  class AutoSave extends Module {
    saveInterval: number;
    isDirty: boolean;
    saveTimer?: number;
    lastSaveTime: Date;

    initialize(): void;
    onValueChange(): void;
    save(): Promise<void>;
    scheduleAutoSave(): void;

    // Save state management
    markDirty(): void;
    markClean(): void;
    hasUnsavedChanges(): boolean;

    // Configuration
    setSaveInterval(interval: number): void;
    enableAutoSave(): void;
    disableAutoSave(): void;

    // Events
    onSaveStart(): void;
    onSaveComplete(): void;
    onSaveError(error: any): void;
  }

  /**
   * Undo/Redo behavior for value history
   */
  class History extends Module {
    history: any[];
    currentIndex: number;
    maxHistorySize: number;

    initialize(): void;
    onValueChange(value: any): void;
    undo(): any;
    redo(): any;

    // History management
    addToHistory(value: any): void;
    clearHistory(): void;
    canUndo(): boolean;
    canRedo(): boolean;

    // Configuration
    setMaxHistorySize(size: number): void;
    enableHistory(): void;
    disableHistory(): void;
  }

  /**
   * Validation behavior for real-time validation
   */
  class Validation extends Module {
    validators: any[];
    validationResult?: any;
    validateOnChange: boolean;
    showErrors: boolean;

    initialize(): void;
    onValueChange(value: any): void;
    validate(value?: any): any;

    // Validator management
    addValidator(validator: any): void;
    removeValidator(validator: any): void;
    clearValidators(): void;

    // Error display
    showValidationErrors(errors: string[]): void;
    hideValidationErrors(): void;
    updateValidationState(isValid: boolean): void;

    // Configuration
    setValidateOnChange(validate: boolean): void;
    setShowErrors(show: boolean): void;
  }

  /**
   * Conditional behavior for dynamic control behavior
   */
  class Conditional extends Module {
    conditions?: any;
    isVisible: boolean;
    isEnabled: boolean;

    initialize(): void;
    onConditionChange(): void;
    evaluateConditions(): boolean;

    // Visibility control
    show(): void;
    hide(): void;
    toggle(): void;

    // Enable/disable control
    enable(): void;
    disable(): void;
    toggleEnabled(): void;

    // Condition management
    setConditions(conditions: any): void;
    getConditions(): any;
  }

  /**
   * Search behavior for searchable controls
   */
  class Search extends Module {
    searchTerm: string;
    searchResults: any[];
    isSearching: boolean;
    debounceTime: number;

    initialize(): void;
    onSearchInput(term: string): void;
    search(term: string): Promise<any[]>;
    clearSearch(): void;

    // Search configuration
    setDebounceTime(time: number): void;
    setSearchProvider(provider: (term: string) => Promise<any[]>): void;

    // Results management
    displayResults(results: any[]): void;
    selectResult(result: any): void;
    highlightResult(result: any): void;

    // Search state
    hasResults(): boolean;
    getResultCount(): number;
    getCurrentTerm(): string;
  }

  /**
   * Live preview behavior for real-time updates
   */
  class LivePreview extends Module {
    previewElement?: HTMLElement;
    isPreviewActive: boolean;
    updateDelay: number;

    initialize(): void;
    onValueChange(value: any): void;
    updatePreview(value: any): void;

    // Preview management
    enablePreview(): void;
    disablePreview(): void;
    refreshPreview(): void;

    // Preview element
    setPreviewElement(element: HTMLElement): void;
    getPreviewElement(): HTMLElement | undefined;

    // Configuration
    setUpdateDelay(delay: number): void;
    setPreviewRenderer(renderer: (value: any) => void): void;
  }
}

/**
 * Behavior factory for creating and registering behaviors
 */
export declare class BehaviorFactory {
  static behaviors: Map<string, typeof Module>;

  // Behavior registration
  static registerBehavior(name: string, behaviorClass: typeof Module): void;
  static getBehavior(name: string): typeof Module | undefined;
  static getAvailableBehaviors(): string[];

  // Behavior creation
  static createBehavior(name: string, options?: any): Module | undefined;
  static createBehaviors(
    configs: Array<{ name: string; options?: any }>
  ): Module[];

  // Predefined behavior configurations
  static createScrubbing(options?: any): behaviors.Scrubbing;
  static createResponsive(options?: any): behaviors.Responsive;
  static createColorPicker(options?: any): behaviors.ColorPicker;
  static createLinked(options?: any): behaviors.Linked;
}

/**
 * Behavior manager for control behavior lifecycle
 */
export declare class BehaviorManager {
  controlBehaviors: Map<ControlBaseView, Module[]>;
  globalBehaviors: Module[];

  // Behavior management
  addBehavior(control: ControlBaseView, behavior: Module): void;
  removeBehavior(control: ControlBaseView, behavior: Module): void;
  getBehaviors(control: ControlBaseView): Module[];
  clearBehaviors(control: ControlBaseView): void;

  // Global behaviors
  addGlobalBehavior(behavior: Module): void;
  removeGlobalBehavior(behavior: Module): void;
  getGlobalBehaviors(): Module[];

  // Lifecycle management
  initializeBehaviors(control: ControlBaseView): void;
  destroyBehaviors(control: ControlBaseView): void;
  updateBehaviors(control: ControlBaseView): void;

  // Event delegation
  delegateEvent(
    control: ControlBaseView,
    eventName: string,
    ...args: any[]
  ): void;
  broadcastEvent(eventName: string, ...args: any[]): void;
}

/**
 * Mixin for controls with behaviors
 */
export declare interface BehaviorMixin {
  behaviors: Module[];
  behaviorManager?: BehaviorManager;

  // Behavior management
  addBehavior(behavior: Module): void;
  removeBehavior(behavior: Module): void;
  getBehaviors(): Module[];
  hasBehavior(behaviorType: string): boolean;

  // Behavior events
  onBehaviorAdded(behavior: Module): void;
  onBehaviorRemoved(behavior: Module): void;
  onBehaviorEvent(eventName: string, ...args: any[]): void;
}
