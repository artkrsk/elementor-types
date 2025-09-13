/**
 * Control Groups System
 * System for grouping related controls and managing their collective behavior
 */

import type { ControlBaseView, ControlBaseDataView } from "./base";
import type { ValidationResult } from "./validation";

/**
 * Control group configuration
 */
export interface ControlGroupConfig {
  name: string;
  label?: string;
  description?: string;
  controls: string[];
  type?: "group" | "section" | "tab" | "accordion" | "popover";
  collapsible?: boolean;
  collapsed?: boolean;
  conditions?: ControlConditions;
  validation?: {
    validateAsGroup?: boolean;
    requiredCount?: number;
    dependencies?: string[];
  };
}

/**
 * Control conditions for conditional display
 */
export interface ControlConditions {
  relation?: "and" | "or";
  terms: ControlConditionTerm[];
}

/**
 * Individual condition term
 */
export interface ControlConditionTerm {
  name: string;
  operator?:
    | "=="
    | "!="
    | ">"
    | "<"
    | ">="
    | "<="
    | "in"
    | "!in"
    | "contains"
    | "!contains"
    | "empty"
    | "!empty";
  value?: any;
  terms?: ControlConditionTerm[]; // For nested conditions
}

/**
 * Responsive condition configuration
 */
export interface ResponsiveCondition {
  device?: string;
  condition: ControlConditionTerm;
}

/**
 * Base control group class
 */
export declare class ControlGroup {
  config: ControlGroupConfig;
  controls: Map<string, ControlBaseView>;
  isVisible: boolean;
  isCollapsed: boolean;

  constructor(config: ControlGroupConfig);

  // Control management
  addControl(name: string, control: ControlBaseView): void;
  removeControl(name: string): void;
  getControl(name: string): ControlBaseView | undefined;
  getControls(): ControlBaseView[];

  // Visibility management
  show(): void;
  hide(): void;
  toggle(): void;
  updateVisibility(settings: any): void;

  // Collapse/expand
  collapse(): void;
  expand(): void;
  toggleCollapse(): void;

  // Validation
  validate(): ValidationResult;
  getGroupValue(): Record<string, any>;
  setGroupValue(values: Record<string, any>): void;

  // Events
  onControlChange(controlName: string, value: any): void;
  onGroupShow(): void;
  onGroupHide(): void;
}

/**
 * Section group - visual grouping with optional header
 */
export declare class SectionGroup extends ControlGroup {
  header?: {
    title: string;
    description?: string;
    icon?: string;
  };

  // Section-specific methods
  setHeader(title: string, description?: string, icon?: string): void;
  updateSectionVisibility(): void;
}

/**
 * Tab group - tab-based organization
 */
export declare class TabGroup extends ControlGroup {
  isActive: boolean;
  tabIndex: number;

  // Tab-specific methods
  activate(): void;
  deactivate(): void;
  setTabIndex(index: number): void;
}

/**
 * Accordion group - collapsible sections
 */
export declare class AccordionGroup extends ControlGroup {
  // Accordion-specific methods
  toggle(): void;
  setCollapsed(collapsed: boolean): void;
}

/**
 * Popover group - controls displayed in popover
 */
export declare class PopoverGroup extends ControlGroup {
  isOpen: boolean;
  trigger?: ControlBaseView;

  // Popover-specific methods
  open(): void;
  close(): void;
  setTrigger(control: ControlBaseView): void;
  updatePosition(): void;
}

/**
 * Responsive group - device-specific control groups
 */
export declare class ResponsiveGroup extends ControlGroup {
  device: string;
  baseControls: string[];

  constructor(config: ControlGroupConfig, device: string);

  // Responsive-specific methods
  setDevice(device: string): void;
  getDeviceSuffix(): string;
  updateResponsiveVisibility(): void;
}

/**
 * Control condition evaluator
 */
export declare class ControlConditionEvaluator {
  // Condition evaluation
  static evaluate(
    conditions: ControlConditions,
    values: Record<string, any>,
    controls: Record<string, any>
  ): boolean;

  static evaluateTerm(
    term: ControlConditionTerm,
    values: Record<string, any>,
    controls: Record<string, any>
  ): boolean;

  // Operator implementations
  static compareValues(value1: any, value2: any, operator: string): boolean;

  // Responsive condition handling
  static evaluateResponsiveCondition(
    condition: ResponsiveCondition,
    values: Record<string, any>,
    controls: Record<string, any>,
    currentDevice: string
  ): boolean;

  // Utility methods
  static getNestedValue(obj: any, path: string): any;
  static isEmptyValue(value: any): boolean;
  static normalizeValue(value: any): any;
}

/**
 * Control groups manager
 */
export declare class ControlGroupsManager {
  groups: Map<string, ControlGroup>;
  controls: Map<string, ControlBaseView>;
  settings: Record<string, any>;

  // Group management
  addGroup(group: ControlGroup): void;
  removeGroup(name: string): void;
  getGroup(name: string): ControlGroup | undefined;
  getGroups(): ControlGroup[];

  // Control registration
  registerControl(
    name: string,
    control: ControlBaseView,
    groupName?: string
  ): void;
  unregisterControl(name: string): void;

  // Visibility updates
  updateAllVisibility(settings: Record<string, any>): void;
  updateGroupVisibility(groupName: string, settings: Record<string, any>): void;

  // Event handling
  onControlChange(controlName: string, value: any): void;
  onDeviceChange(device: string): void;
  onSettingsChange(settings: Record<string, any>): void;

  // Validation
  validateGroups(): Record<string, ValidationResult>;
  validateGroup(groupName: string): ValidationResult;

  // Utilities
  findControlGroup(controlName: string): ControlGroup | undefined;
  getVisibleControls(): ControlBaseView[];
  getActiveGroups(): ControlGroup[];
}

/**
 * Control dependency manager for inter-control dependencies
 */
export declare class ControlDependencyManager {
  dependencies: Map<string, string[]>;
  reverseDependencies: Map<string, string[]>;

  // Dependency management
  addDependency(control: string, dependsOn: string): void;
  removeDependency(control: string, dependsOn: string): void;
  getDependencies(control: string): string[];
  getDependents(control: string): string[];

  // Dependency resolution
  resolveDependencies(controls: string[]): string[];
  validateDependencies(): {
    isValid: boolean;
    circularDependencies: string[][];
    missingDependencies: string[];
  };

  // Evaluation
  evaluateControlAvailability(
    control: string,
    values: Record<string, any>
  ): boolean;

  updateDependentControls(
    changedControl: string,
    newValue: any,
    allValues: Record<string, any>
  ): string[];
}

/**
 * Factory for creating control groups
 */
export declare class ControlGroupFactory {
  static groupTypes: Map<string, typeof ControlGroup>;

  // Group type registration
  static registerGroupType(type: string, groupClass: typeof ControlGroup): void;
  static getGroupType(type: string): typeof ControlGroup | undefined;

  // Group creation
  static createGroup(config: ControlGroupConfig): ControlGroup;
  static createFromConfig(configs: ControlGroupConfig[]): ControlGroup[];

  // Predefined group creators
  static createSection(
    name: string,
    controls: string[],
    options?: Partial<ControlGroupConfig>
  ): SectionGroup;
  static createTab(
    name: string,
    controls: string[],
    options?: Partial<ControlGroupConfig>
  ): TabGroup;
  static createAccordion(
    name: string,
    controls: string[],
    options?: Partial<ControlGroupConfig>
  ): AccordionGroup;
  static createPopover(
    name: string,
    controls: string[],
    trigger?: ControlBaseView,
    options?: Partial<ControlGroupConfig>
  ): PopoverGroup;
}

/**
 * Mixin for controls that can be grouped
 */
export declare interface GroupableControlMixin {
  group?: ControlGroup;
  groupName?: string;

  // Group integration
  setGroup(group: ControlGroup): void;
  getGroup(): ControlGroup | undefined;
  updateGroupVisibility(): void;

  // Group events
  onGroupChange(): void;
  onGroupShow(): void;
  onGroupHide(): void;
}
