/**
 * Settings Model Types
 * Model classes for element settings and configurations
 */

/**
 * Base settings attributes
 */
export interface BaseSettingsAttributes {
  /** Element type */
  elType: string;
  /** Element settings */
  [settingKey: string]: any;
}

/**
 * Column settings attributes
 */
export interface ColumnSettingsAttributes extends BaseSettingsAttributes {
  /** Column element type */
  elType: 'column';
  /** Column width */
  _column_size: number;
  /** Column order on tablet */
  _column_order_tablet?: string;
  /** Column order on mobile */
  _column_order_mobile?: string;
}

/**
 * Widget settings attributes
 */
export interface WidgetSettingsAttributes extends BaseSettingsAttributes {
  /** Widget element type */
  elType: 'widget';
  /** Widget type */
  widgetType: string;
  /** Widget specific settings */
  [settingKey: string]: any;
}

/**
 * Section settings attributes
 */
export interface SectionSettingsAttributes extends BaseSettingsAttributes {
  /** Section element type */
  elType: 'section';
  /** Section layout type */
  layout?: 'boxed' | 'full_width';
  /** Section content width */
  content_width?: 'boxed' | 'full_width';
  /** Section height */
  height?: 'default' | 'min-height' | 'fit-to-screen';
  /** Section structure preset */
  structure?: string;
}

/**
 * Control definition interface
 */
export interface ControlDefinition {
  /** Control type */
  type: string;
  /** Control label */
  label: string;
  /** Control default value */
  default?: any;
  /** Control options */
  options?: any;
  /** Control conditions */
  conditions?: any;
  /** Control responsive settings */
  responsive?: boolean;
  /** Control separator */
  separator?: 'before' | 'after' | 'none';
  /** Control classes */
  classes?: string;
}

/**
 * Controls registry interface
 */
export interface ControlsRegistry {
  /** Available controls */
  [controlName: string]: ControlDefinition;
}

/**
 * Base Settings Model
 * Foundation model for element settings
 */
export declare class BaseSettingsModel {
  /** Model attributes */
  attributes: BaseSettingsAttributes;

  /** Controls registry */
  controls: ControlsRegistry;

  /**
   * Initialize settings model
   * @param attributes - Settings attributes
   * @param options - Model options
   */
  initialize(attributes?: BaseSettingsAttributes, options?: any): void;

  /**
   * Get setting value
   * @param settingKey - Setting key
   */
  get(settingKey: string): any;

  /**
   * Set setting value
   * @param settingKey - Setting key or object
   * @param value - Setting value
   */
  set(settingKey: string | object, value?: any): this;

  /**
   * Get controls for this settings model
   */
  getControls(): ControlsRegistry;

  /**
   * Get control definition
   * @param controlName - Control name
   */
  getControl(controlName: string): ControlDefinition | undefined;

  /**
   * Validate setting value
   * @param settingKey - Setting key
   * @param value - Setting value
   */
  validateSetting(settingKey: string, value: any): boolean;

  /**
   * Get responsive setting value
   * @param settingKey - Setting key
   * @param device - Device name (desktop, tablet, mobile)
   */
  getResponsiveSetting(settingKey: string, device?: string): any;

  /**
   * Set responsive setting value
   * @param settingKey - Setting key
   * @param value - Setting value
   * @param device - Device name
   */
  setResponsiveSetting(settingKey: string, value: any, device?: string): this;

  /**
   * Get CSS selector for this element
   */
  getCSSSelector(): string;

  /**
   * Convert model to JSON
   */
  toJSON(): BaseSettingsAttributes;

  /**
   * Clone the settings model
   */
  clone(): BaseSettingsModel;
}

/**
 * Column Settings Model
 * Settings model specific to column elements
 */
export declare class ColumnSettingsModel extends BaseSettingsModel {
  /** Column-specific attributes */
  attributes: ColumnSettingsAttributes;

  /**
   * Get column width
   */
  getColumnSize(): number;

  /**
   * Set column width
   * @param size - Column width percentage
   */
  setColumnSize(size: number): this;

  /**
   * Get column order for device
   * @param device - Device name
   */
  getColumnOrder(device: string): string;

  /**
   * Set column order for device
   * @param device - Device name
   * @param order - Column order
   */
  setColumnOrder(device: string, order: string): this;

  /**
   * Reset column order for all devices
   */
  resetColumnOrder(): this;
}

/**
 * Widget Settings Model
 * Settings model specific to widget elements
 */
export declare class WidgetSettingsModel extends BaseSettingsModel {
  /** Widget-specific attributes */
  attributes: WidgetSettingsAttributes;

  /**
   * Get widget type
   */
  getWidgetType(): string;

  /**
   * Get widget-specific controls
   */
  getControls(): ControlsRegistry;

  /**
   * Check if control exists for this widget
   * @param controlName - Control name
   */
  hasControl(controlName: string): boolean;

  /**
   * Get control groups for widget
   */
  getControlGroups(): any;

  /**
   * Get control tabs for widget
   */
  getControlTabs(): any;
}

/**
 * Section Settings Model
 * Settings model specific to section elements
 */
export declare class SectionSettingsModel extends BaseSettingsModel {
  /** Section-specific attributes */
  attributes: SectionSettingsAttributes;

  /**
   * Get section layout
   */
  getLayout(): 'boxed' | 'full_width';

  /**
   * Set section layout
   * @param layout - Section layout
   */
  setLayout(layout: 'boxed' | 'full_width'): this;

  /**
   * Get section content width
   */
  getContentWidth(): 'boxed' | 'full_width';

  /**
   * Set section content width
   * @param width - Content width
   */
  setContentWidth(width: 'boxed' | 'full_width'): this;

  /**
   * Get section height setting
   */
  getHeight(): 'default' | 'min-height' | 'fit-to-screen';

  /**
   * Set section height
   * @param height - Height setting
   */
  setHeight(height: 'default' | 'min-height' | 'fit-to-screen'): this;

  /**
   * Get section structure preset
   */
  getStructure(): string;

  /**
   * Set section structure
   * @param structure - Structure preset
   */
  setStructure(structure: string): this;
}