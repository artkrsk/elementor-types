/**
 * Control Conditions System
 * Advanced conditional display logic for Elementor controls
 */

import type { ControlBaseView } from "./base";
import type {
  ControlConditions,
  ControlConditionTerm,
  ResponsiveCondition,
} from "./groups";

/**
 * Condition operators enumeration
 */
export enum ConditionOperator {
  EQUALS = "==",
  NOT_EQUALS = "!=",
  GREATER_THAN = ">",
  LESS_THAN = "<",
  GREATER_THAN_OR_EQUAL = ">=",
  LESS_THAN_OR_EQUAL = "<=",
  IN = "in",
  NOT_IN = "!in",
  CONTAINS = "contains",
  NOT_CONTAINS = "!contains",
  EMPTY = "empty",
  NOT_EMPTY = "!empty",
  REGEX = "regex",
  NOT_REGEX = "!regex",
}

/**
 * Device-specific conditions
 */
export interface DeviceCondition {
  device: "desktop" | "tablet" | "mobile" | string;
  condition: ControlConditionTerm;
}

/**
 * Time-based conditions (for dynamic content)
 */
export interface TimeCondition {
  type: "date" | "time" | "datetime";
  operator: ConditionOperator;
  value: string | Date;
  timezone?: string;
}

/**
 * User role/capability conditions
 */
export interface UserCondition {
  type: "role" | "capability" | "user_id";
  operator: ConditionOperator;
  value: string | string[] | number;
}

/**
 * Advanced condition term with extended functionality
 */
export interface AdvancedConditionTerm extends ControlConditionTerm {
  // Extended condition types
  device?: DeviceCondition;
  time?: TimeCondition;
  user?: UserCondition;

  // Dynamic value resolution
  dynamicValue?: {
    source: "setting" | "global" | "function" | "constant";
    key: string;
    fallback?: any;
  };

  // Condition groups
  group?: string;
  weight?: number; // For prioritizing conditions

  // Caching
  cacheable?: boolean;
  cacheKey?: string;
}

/**
 * Condition evaluation context
 */
export interface ConditionContext {
  values: Record<string, any>;
  controls: Record<string, any>;
  globalValues?: Record<string, any>;
  device?: string;
  user?: {
    id: number;
    roles: string[];
    capabilities: string[];
  };
  timestamp?: Date;

  // Additional context
  element?: any;
  document?: any;
  container?: any;
}

/**
 * Condition evaluation result
 */
export interface ConditionResult {
  success: boolean;
  value?: any;
  matchedTerms: AdvancedConditionTerm[];
  failedTerms: AdvancedConditionTerm[];
  evaluationTime: number;
  cacheHit?: boolean;
}

/**
 * Advanced control conditions class
 */
export declare class AdvancedControlConditions {
  conditions: ControlConditions;
  context: ConditionContext;
  cache: Map<string, ConditionResult>;

  constructor(conditions: ControlConditions);

  // Main evaluation method
  evaluate(context: ConditionContext): ConditionResult;

  // Term evaluation
  evaluateTerm(term: AdvancedConditionTerm, context: ConditionContext): boolean;
  evaluateTerms(
    terms: AdvancedConditionTerm[],
    relation: "and" | "or",
    context: ConditionContext
  ): boolean;

  // Operator implementations
  evaluateComparison(
    value1: any,
    value2: any,
    operator: ConditionOperator
  ): boolean;
  evaluateArrayOperation(
    array: any[],
    value: any,
    operator: ConditionOperator
  ): boolean;
  evaluateStringOperation(
    str: string,
    pattern: string | RegExp,
    operator: ConditionOperator
  ): boolean;

  // Special condition types
  evaluateDeviceCondition(
    condition: DeviceCondition,
    context: ConditionContext
  ): boolean;
  evaluateTimeCondition(
    condition: TimeCondition,
    context: ConditionContext
  ): boolean;
  evaluateUserCondition(
    condition: UserCondition,
    context: ConditionContext
  ): boolean;

  // Dynamic value resolution
  resolveDynamicValue(dynamicValue: any, context: ConditionContext): any;

  // Caching
  getCachedResult(cacheKey: string): ConditionResult | undefined;
  setCachedResult(cacheKey: string, result: ConditionResult): void;
  clearCache(pattern?: string): void;

  // Utilities
  generateCacheKey(
    term: AdvancedConditionTerm,
    context: ConditionContext
  ): string;
  normalizeValue(value: any): any;
  getNestedValue(obj: any, path: string, fallback?: any): any;
}

/**
 * Responsive conditions manager
 */
export declare class ResponsiveConditionsManager {
  activeDevice: string;
  breakpoints: Record<string, number>;
  conditions: Map<string, Map<string, AdvancedControlConditions>>;

  // Device management
  setActiveDevice(device: string): void;
  getActiveDevice(): string;
  getDeviceBreakpoints(): Record<string, number>;

  // Condition management
  addCondition(
    controlName: string,
    device: string,
    conditions: ControlConditions
  ): void;
  removeCondition(controlName: string, device?: string): void;
  getConditions(
    controlName: string,
    device?: string
  ): AdvancedControlConditions[];

  // Evaluation
  evaluateForDevice(
    controlName: string,
    device: string,
    context: ConditionContext
  ): ConditionResult;
  evaluateForAllDevices(
    controlName: string,
    context: ConditionContext
  ): Record<string, ConditionResult>;

  // Device-specific utilities
  getResponsiveControlDeviceSuffix(controlName: string): string;
  isResponsiveControl(controlName: string): boolean;
  getBaseControlName(controlName: string): string;
}

/**
 * Control visibility manager
 */
export declare class ControlVisibilityManager {
  visibilityRules: Map<string, AdvancedControlConditions>;
  visibilityState: Map<string, boolean>;
  controls: Map<string, ControlBaseView>;

  // Rule management
  addVisibilityRule(controlName: string, conditions: ControlConditions): void;
  removeVisibilityRule(controlName: string): void;
  getVisibilityRule(controlName: string): AdvancedControlConditions | undefined;

  // Control registration
  registerControl(name: string, control: ControlBaseView): void;
  unregisterControl(name: string): void;

  // Visibility evaluation
  updateControlVisibility(
    controlName: string,
    context: ConditionContext
  ): boolean;
  updateAllVisibility(context: ConditionContext): Record<string, boolean>;

  // Visibility state
  isControlVisible(controlName: string): boolean;
  getVisibleControls(): string[];
  getHiddenControls(): string[];

  // Events
  onVisibilityChange(controlName: string, isVisible: boolean): void;
  onContextChange(context: ConditionContext): void;

  // Batch operations
  showControls(controlNames: string[]): void;
  hideControls(controlNames: string[]): void;
  toggleControls(controlNames: string[]): void;
}

/**
 * Condition builder for programmatic condition creation
 */
export declare class ConditionBuilder {
  private conditions: AdvancedConditionTerm[];
  private relation: "and" | "or";

  constructor(relation?: "and" | "or");

  // Basic conditions
  equals(field: string, value: any): ConditionBuilder;
  notEquals(field: string, value: any): ConditionBuilder;
  greaterThan(field: string, value: number): ConditionBuilder;
  lessThan(field: string, value: number): ConditionBuilder;
  greaterThanOrEqual(field: string, value: number): ConditionBuilder;
  lessThanOrEqual(field: string, value: number): ConditionBuilder;

  // Array conditions
  in(field: string, values: any[]): ConditionBuilder;
  notIn(field: string, values: any[]): ConditionBuilder;
  contains(field: string, value: any): ConditionBuilder;
  notContains(field: string, value: any): ConditionBuilder;

  // Existence conditions
  empty(field: string): ConditionBuilder;
  notEmpty(field: string): ConditionBuilder;

  // Pattern conditions
  matches(field: string, pattern: string | RegExp): ConditionBuilder;
  notMatches(field: string, pattern: string | RegExp): ConditionBuilder;

  // Device conditions
  onDevice(device: string): ConditionBuilder;
  notOnDevice(device: string): ConditionBuilder;

  // User conditions
  hasRole(role: string): ConditionBuilder;
  hasCapability(capability: string): ConditionBuilder;
  isUser(userId: number): ConditionBuilder;

  // Time conditions
  beforeDate(date: Date | string): ConditionBuilder;
  afterDate(date: Date | string): ConditionBuilder;
  betweenDates(start: Date | string, end: Date | string): ConditionBuilder;

  // Grouping and logic
  and(): ConditionBuilder;
  or(): ConditionBuilder;
  group(builder: (builder: ConditionBuilder) => void): ConditionBuilder;

  // Custom conditions
  custom(evaluator: (context: ConditionContext) => boolean): ConditionBuilder;

  // Building
  build(): ControlConditions;
  buildTerm(): AdvancedConditionTerm;
}

/**
 * Condition validator for checking condition integrity
 */
export declare class ConditionValidator {
  // Validation methods
  static validate(conditions: ControlConditions): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  };

  static validateTerm(term: AdvancedConditionTerm): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  };

  // Specific validations
  static validateFieldReference(
    fieldName: string,
    availableFields: string[]
  ): boolean;
  static validateOperatorUsage(
    operator: ConditionOperator,
    valueType: string
  ): boolean;
  static validateCircularReferences(
    conditions: ControlConditions,
    allConditions: Map<string, ControlConditions>
  ): boolean;

  // Performance validations
  static validatePerformance(conditions: ControlConditions): {
    complexity: number;
    suggestions: string[];
  };
}

/**
 * Factory for creating common condition patterns
 */
export declare class ConditionFactory {
  // Simple conditions
  static when(
    field: string,
    operator: ConditionOperator,
    value: any
  ): ConditionBuilder;
  static unless(
    field: string,
    operator: ConditionOperator,
    value: any
  ): ConditionBuilder;

  // Device conditions
  static onDesktop(): ConditionBuilder;
  static onTablet(): ConditionBuilder;
  static onMobile(): ConditionBuilder;
  static onDevice(device: string): ConditionBuilder;

  // User conditions
  static forAdmins(): ConditionBuilder;
  static forRole(role: string): ConditionBuilder;
  static forCapability(capability: string): ConditionBuilder;

  // Content conditions
  static whenEmpty(field: string): ConditionBuilder;
  static whenNotEmpty(field: string): ConditionBuilder;
  static whenSelected(field: string, value: any): ConditionBuilder;

  // Complex patterns
  static dependsOn(field: string): ConditionBuilder;
  static excludes(field: string, values: any[]): ConditionBuilder;
  static requiresAll(fields: string[]): ConditionBuilder;
  static requiresAny(fields: string[]): ConditionBuilder;
}

/**
 * Mixin for controls with conditional display
 */
export declare interface ConditionalControlMixin {
  conditions?: AdvancedControlConditions;
  isVisible: boolean;

  // Condition management
  setConditions(conditions: ControlConditions): void;
  getConditions(): AdvancedControlConditions | undefined;
  evaluateConditions(context: ConditionContext): ConditionResult;

  // Visibility control
  updateVisibility(context: ConditionContext): void;
  show(): void;
  hide(): void;

  // Events
  onConditionChange(result: ConditionResult): void;
  onVisibilityChange(isVisible: boolean): void;
}
