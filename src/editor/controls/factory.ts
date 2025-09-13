/**
 * Control Factory and Registration System
 * Comprehensive system for creating, registering, and managing Elementor controls
 */

import type {
  ControlBaseView,
  ControlBaseDataView,
  ControlBaseMultiple,
  ControlBaseUnits,
} from "./base";
import type { ValidationResult, ValidatorInterface } from "./validation";
import type { ControlGroup } from "./groups";
import type { AdvancedControlConditions } from "./conditions";
import type { Module } from "../../core/modules";

/**
 * Control type definitions
 */
export enum ControlType {
  // Basic controls
  TEXT = "text",
  TEXTAREA = "textarea",
  NUMBER = "number",
  SELECT = "select",
  SELECT2 = "select2",
  SWITCHER = "switcher",
  BUTTON = "button",
  HIDDEN = "hidden",

  // Layout controls
  SECTION = "section",
  TAB = "tab",
  STRUCTURE = "structure",
  DIVIDER = "divider",

  // Visual controls
  COLOR = "color",
  MEDIA = "media",
  GALLERY = "gallery",
  ICON = "icon",
  ICONS = "icons",
  FONT = "font",
  IMAGE_DIMENSIONS = "image_dimensions",

  // Measurement controls
  SLIDER = "slider",
  DIMENSIONS = "dimensions",
  GAPS = "gaps",
  BOX_SHADOW = "box_shadow",
  TEXT_SHADOW = "text_shadow",
  BORDER = "border",

  // Advanced controls
  CODE = "code",
  WYSIWYG = "wysiwyg",
  URL = "url",
  DATETIME = "datetime",
  CHOOSE = "choose",
  VISUAL_CHOICE = "visual_choice",
  POPOVER_TOGGLE = "popover_toggle",

  // Dynamic controls
  REPEATER = "repeater",
  WP_WIDGET = "wp_widget",
  NOTICE = "notice",

  // Custom controls
  CUSTOM = "custom",
}

/**
 * Control configuration interface
 */
export interface ControlConfig {
  // Basic properties
  type: ControlType | string;
  name: string;
  label?: string;
  description?: string;
  default?: any;

  // Visual properties
  placeholder?: string;
  help?: string;
  separator?: "before" | "after" | "both" | "none";
  label_block?: boolean;
  show_label?: boolean;

  // Behavior properties
  conditions?: any;
  responsive?: boolean;
  dynamic?: boolean;
  ai?: boolean;

  // Validation
  required?: boolean;
  validators?: ValidatorInterface[];
  validation_terms?: any;

  // Grouping
  group?: string;
  section?: string;
  tab?: string;

  // Custom properties
  options?: Record<string, any>;
  classes?: string[];
  attributes?: Record<string, any>;

  // Control-specific options
  [key: string]: any;
}

/**
 * Control instance interface
 */
export interface ControlInstance {
  config: ControlConfig;
  view: ControlBaseView;
  validators: ValidatorInterface[];
  conditions?: AdvancedControlConditions;
  group?: ControlGroup;
  behaviors: Module[];

  // State
  isVisible: boolean;
  isEnabled: boolean;
  isDirty: boolean;
  hasErrors: boolean;

  // Methods
  getValue(): any;
  setValue(value: any): void;
  validate(): ValidationResult;
  show(): void;
  hide(): void;
  enable(): void;
  disable(): void;
  destroy(): void;
}

/**
 * Control factory for creating control instances
 */
export declare class ControlFactory {
  static controlTypes: Map<string, typeof ControlBaseView>;
  static defaultConfigs: Map<string, Partial<ControlConfig>>;

  // Control type registration
  static registerControlType(
    type: string,
    controlClass: typeof ControlBaseView,
    defaultConfig?: Partial<ControlConfig>
  ): void;
  static unregisterControlType(type: string): void;
  static getControlType(type: string): typeof ControlBaseView | undefined;
  static getAvailableTypes(): string[];

  // Control creation
  static createControl(config: ControlConfig): ControlInstance;
  static createControls(configs: ControlConfig[]): ControlInstance[];
  static createControlView(config: ControlConfig): ControlBaseView;

  // Validation
  static validateConfig(config: ControlConfig): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  };

  // Default configurations
  static setDefaultConfig(type: string, config: Partial<ControlConfig>): void;
  static getDefaultConfig(type: string): Partial<ControlConfig>;
  static mergeWithDefaults(config: ControlConfig): ControlConfig;

  // Helper methods
  static inferControlType(config: Partial<ControlConfig>): ControlType;
  static normalizeConfig(config: Partial<ControlConfig>): ControlConfig;
}

/**
 * Control registry for managing registered controls
 */
export declare class ControlRegistry {
  private controls: Map<string, ControlInstance>;
  private groups: Map<string, ControlGroup>;
  private dependencies: Map<string, Set<string>>;

  // Control management
  register(control: ControlInstance): void;
  unregister(name: string): void;
  get(name: string): ControlInstance | undefined;
  getAll(): ControlInstance[];
  has(name: string): boolean;

  // Group management
  registerGroup(group: ControlGroup): void;
  unregisterGroup(name: string): void;
  getGroup(name: string): ControlGroup | undefined;
  getGroups(): ControlGroup[];

  // Dependency management
  addDependency(control: string, dependsOn: string): void;
  removeDependency(control: string, dependsOn: string): void;
  getDependencies(control: string): string[];
  resolveDependencies(controls: string[]): string[];

  // Batch operations
  registerMany(controls: ControlInstance[]): void;
  unregisterMany(names: string[]): void;
  clear(): void;

  // Querying
  findByType(type: ControlType | string): ControlInstance[];
  findByGroup(group: string): ControlInstance[];
  findVisible(): ControlInstance[];
  findEnabled(): ControlInstance[];
  findWithErrors(): ControlInstance[];

  // Validation
  validateAll(): Record<string, ValidationResult>;
  validateGroup(groupName: string): ValidationResult;

  // Events
  onControlRegistered(control: ControlInstance): void;
  onControlUnregistered(name: string): void;
  onGroupRegistered(group: ControlGroup): void;
}

/**
 * Control builder for fluent control creation
 */
export declare class ControlBuilder {
  private config: Partial<ControlConfig>;

  constructor(type: ControlType | string, name: string);

  // Basic properties
  label(label: string): ControlBuilder;
  description(description: string): ControlBuilder;
  default(value: any): ControlBuilder;
  placeholder(placeholder: string): ControlBuilder;
  help(help: string): ControlBuilder;

  // Visual properties
  separator(separator: "before" | "after" | "both" | "none"): ControlBuilder;
  labelBlock(labelBlock?: boolean): ControlBuilder;
  showLabel(showLabel?: boolean): ControlBuilder;
  classes(...classes: string[]): ControlBuilder;
  attributes(attributes: Record<string, any>): ControlBuilder;

  // Behavior properties
  required(required?: boolean): ControlBuilder;
  responsive(responsive?: boolean): ControlBuilder;
  dynamic(dynamic?: boolean): ControlBuilder;
  ai(ai?: boolean): ControlBuilder;

  // Grouping
  group(group: string): ControlBuilder;
  section(section: string): ControlBuilder;
  tab(tab: string): ControlBuilder;

  // Conditions
  conditions(conditions: any): ControlBuilder;
  when(field: string, operator: string, value: any): ControlBuilder;
  unless(field: string, operator: string, value: any): ControlBuilder;

  // Validation
  validator(validator: ValidatorInterface): ControlBuilder;
  min(min: number): ControlBuilder;
  max(max: number): ControlBuilder;
  pattern(pattern: RegExp): ControlBuilder;

  // Type-specific methods
  options(options: Record<string, any>): ControlBuilder;
  multiple(multiple?: boolean): ControlBuilder;
  units(units: string[]): ControlBuilder;
  step(step: number): ControlBuilder;

  // Building
  build(): ControlConfig;
  create(): ControlInstance;
  register(registry?: ControlRegistry): ControlInstance;
}

/**
 * Control schema for defining control structures
 */
export interface ControlSchema {
  version: string;
  controls: ControlConfig[];
  groups?: any[];
  dependencies?: Array<{
    control: string;
    dependsOn: string[];
  }>;
  validation?: {
    rules: any[];
    messages: Record<string, string>;
  };
  metadata?: Record<string, any>;
}

/**
 * Schema validator for control schemas
 */
export declare class ControlSchemaValidator {
  // Schema validation
  static validate(schema: ControlSchema): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  };

  static validateVersion(version: string): boolean;
  static validateControls(controls: ControlConfig[]): string[];
  static validateDependencies(
    dependencies: any[],
    controlNames: string[]
  ): string[];

  // Migration support
  static migrate(schema: ControlSchema, targetVersion: string): ControlSchema;
  static getLatestVersion(): string;
  static getSupportedVersions(): string[];
}

/**
 * Control loader for loading controls from various sources
 */
export declare class ControlLoader {
  private registry: ControlRegistry;

  constructor(registry: ControlRegistry);

  // Loading methods
  loadFromSchema(schema: ControlSchema): Promise<ControlInstance[]>;
  loadFromFile(path: string): Promise<ControlInstance[]>;
  loadFromUrl(url: string): Promise<ControlInstance[]>;
  loadFromJson(json: string): Promise<ControlInstance[]>;

  // Validation during loading
  validateBeforeLoad(schema: ControlSchema): boolean;

  // Error handling
  onLoadError(error: Error, source: string): void;
  onValidationError(errors: string[], source: string): void;

  // Progress tracking
  onLoadProgress(loaded: number, total: number): void;
  onLoadComplete(controls: ControlInstance[]): void;
}

/**
 * Control serializer for saving/loading control configurations
 */
export declare class ControlSerializer {
  // Serialization
  static serialize(controls: ControlInstance[]): ControlSchema;
  static serializeControl(control: ControlInstance): ControlConfig;
  static serializeToJson(controls: ControlInstance[]): string;

  // Deserialization
  static deserialize(schema: ControlSchema): ControlConfig[];
  static deserializeControl(config: ControlConfig): ControlConfig;
  static deserializeFromJson(json: string): ControlConfig[];

  // Export/Import
  static exportToFile(controls: ControlInstance[], filename: string): void;
  static importFromFile(file: File): Promise<ControlConfig[]>;

  // Utilities
  static minify(schema: ControlSchema): ControlSchema;
  static beautify(schema: ControlSchema): ControlSchema;
  static compare(
    schema1: ControlSchema,
    schema2: ControlSchema
  ): {
    added: ControlConfig[];
    removed: ControlConfig[];
    modified: ControlConfig[];
  };
}

/**
 * Control template system for reusable control patterns
 */
export declare class ControlTemplate {
  name: string;
  description?: string;
  parameters: Record<string, any>;
  controls: ControlConfig[];

  constructor(
    name: string,
    controls: ControlConfig[],
    parameters?: Record<string, any>
  );

  // Template methods
  render(parameters: Record<string, any>): ControlConfig[];
  validate(parameters: Record<string, any>): boolean;
  getRequiredParameters(): string[];
  getOptionalParameters(): string[];

  // Utility methods
  clone(): ControlTemplate;
  merge(other: ControlTemplate): ControlTemplate;
}

/**
 * Template registry for managing control templates
 */
export declare class ControlTemplateRegistry {
  private templates: Map<string, ControlTemplate>;

  // Template management
  register(template: ControlTemplate): void;
  unregister(name: string): void;
  get(name: string): ControlTemplate | undefined;
  getAll(): ControlTemplate[];
  has(name: string): boolean;

  // Template usage
  render(name: string, parameters: Record<string, any>): ControlConfig[];
  renderMany(
    templates: Array<{ name: string; parameters: Record<string, any> }>
  ): ControlConfig[];

  // Built-in templates
  static createCommonTemplates(): ControlTemplate[];
  static getSpacingTemplate(): ControlTemplate;
  static getTypographyTemplate(): ControlTemplate;
  static getBorderTemplate(): ControlTemplate;
  static getBackgroundTemplate(): ControlTemplate;
}
