/**
 * Control Registration System Types
 * Type definitions for custom control view registration and management
 */

import type { ControlBaseView, ControlBaseDataView } from "../editor/controls/base";

/**
 * Control View Constructor Interface
 * Defines the structure for control view constructors
 */
export interface ControlViewConstructor<T = ControlBaseView> {
  new(...args: any[]): T;
  prototype: T;
}

/**
 * Control Registration Options
 */
export interface ControlRegistrationOptions {
  /** Control type identifier */
  type: string;

  /** Control view constructor */
  view: ControlViewConstructor;

  /** Default control configuration */
  defaultConfig?: {
    /** Default control value */
    default?: any;

    /** Control title/label */
    title?: string;

    /** Control description */
    description?: string;

    /** Whether control is required */
    required?: boolean;

    /** Control placeholder text */
    placeholder?: string;

    /** CSS classes to apply */
    classes?: string | string[];

    /** Control wrapper attributes */
    wrapper_class?: string;

    /** Custom control settings */
    settings?: Record<string, any>;
  };

  /** Control validation rules */
  validation?: {
    /** Required field validation */
    required?: boolean;

    /** Minimum value (for numeric controls) */
    min?: number;

    /** Maximum value (for numeric controls) */
    max?: number;

    /** Pattern validation (regex) */
    pattern?: string | RegExp;

    /** Custom validation function */
    custom?: (value: any) => boolean | string;
  };

  /** Control dependencies */
  dependencies?: {
    /** Other controls this control depends on */
    requires?: string[];

    /** Controls that depend on this control */
    affects?: string[];

    /** Conditional display logic */
    conditions?: Record<string, any>;
  };

  /** Control group information */
  group?: {
    /** Group this control belongs to */
    name: string;

    /** Position within the group */
    priority?: number;
  };
}

/**
 * Custom Control View Interface
 * Extended interface for custom control implementations
 */
export interface CustomControlView extends ControlBaseView {
  /** Control type identifier */
  getType(): string;

  /** Get control configuration schema */
  getConfigSchema?(): Record<string, any>;

  /** Validate control value */
  validateValue?(value: any): boolean | string;

  /** Format value for display */
  formatValue?(value: any): string;

  /** Parse value from input */
  parseValue?(input: string): any;

  /** Handle control-specific events */
  bindControlEvents?(): void;

  /** Cleanup control resources */
  cleanupControl?(): void;

  /** Control initialization after render */
  initControl?(): void;

  /** Control value change handler */
  onControlChange?(newValue: any, oldValue: any): void;
}

/**
 * Control Registry Interface
 * Manages registered control types and their metadata
 */
export interface ControlRegistry {
  /**
   * Register a new control view
   * @param controlId - Unique control identifier
   * @param viewClass - Control view constructor
   * @param options - Registration options
   */
  register(
    controlId: string,
    viewClass: ControlViewConstructor,
    options?: Partial<ControlRegistrationOptions>
  ): void;

  /**
   * Unregister a control view
   * @param controlId - Control identifier to remove
   */
  unregister(controlId: string): boolean;

  /**
   * Get registered control view
   * @param controlId - Control identifier
   * @returns Control view constructor or null
   */
  get(controlId: string): ControlViewConstructor | null;

  /**
   * Check if control is registered
   * @param controlId - Control identifier
   */
  has(controlId: string): boolean;

  /**
   * Get all registered control identifiers
   * @returns Array of control IDs
   */
  getRegisteredControls(): string[];

  /**
   * Get control metadata
   * @param controlId - Control identifier
   */
  getMetadata(controlId: string): ControlRegistrationOptions | null;

  /**
   * Clear all registered controls
   */
  clear(): void;
}

/**
 * Control View Factory Interface
 * Creates control view instances
 */
export interface ControlViewFactory {
  /**
   * Create control view instance
   * @param controlId - Control type identifier
   * @param options - Control options
   * @returns Control view instance
   */
  create(controlId: string, options: any): ControlBaseView | null;

  /**
   * Check if control type can be created
   * @param controlId - Control type identifier
   */
  canCreate(controlId: string): boolean;

  /**
   * Get available control types
   * @returns Array of available control type IDs
   */
  getAvailableTypes(): string[];
}

/**
 * Enhanced Add Control View Function Type
 * More comprehensive type for the addControlView function
 */
export type AddControlViewFunction = {
  /**
   * Register a simple control view
   * @param controlID - Control type identifier
   * @param ControlViewClass - Control view constructor
   */
  (controlID: string, ControlViewClass: ControlViewConstructor): void;

  /**
   * Register a control view with options
   * @param controlID - Control type identifier
   * @param ControlViewClass - Control view constructor
   * @param options - Registration options
   */
  (
    controlID: string,
    ControlViewClass: ControlViewConstructor,
    options: Partial<ControlRegistrationOptions>
  ): void;
};

/**
 * Type guards for control view instances
 */

/**
 * Check if an object is a control base view
 */
export function isControlBaseView(obj: any): obj is ControlBaseView {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    'getControlValue' in obj &&
    'setValue' in obj &&
    'onRender' in obj &&
    typeof obj.getControlValue === 'function' &&
    typeof obj.setValue === 'function' &&
    typeof obj.onRender === 'function'
  );
}

/**
 * Check if an object is a control data view
 */
export function isControlDataView(obj: any): obj is ControlBaseDataView {
  return (
    isControlBaseView(obj) &&
    'validatorTypes' in obj &&
    typeof obj.validatorTypes === 'object'
  );
}

/**
 * Check if an object is a custom control view
 */
export function isCustomControlView(obj: any): obj is CustomControlView {
  return (
    isControlBaseView(obj) &&
    'getType' in obj &&
    typeof obj.getType === 'function'
  );
}

/**
 * Common control type identifiers used in Elementor
 */
export type ElementorControlTypes =
  | 'text'
  | 'textarea'
  | 'number'
  | 'select'
  | 'select2'
  | 'switcher'
  | 'button'
  | 'hidden'
  | 'color'
  | 'media'
  | 'slider'
  | 'dimensions'
  | 'choose'
  | 'wysiwyg'
  | 'code'
  | 'font'
  | 'image_dimensions'
  | 'wp_widget'
  | 'section'
  | 'tab'
  | 'divider'
  | 'raw_html'
  | 'icon'
  | 'gallery'
  | 'structure'
  | 'select2_custom'
  | 'repeater'
  | 'url'
  | 'datetime'
  | 'box_shadow'
  | 'text_shadow'
  | 'animation'
  | 'hover_animation'
  | 'border'
  | 'typography'
  | 'background'
  | 'image_size'
  | 'gaps';