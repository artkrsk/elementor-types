/**
 * Controls Validation System
 * Comprehensive validation framework for Elementor controls
 */

import type { Module } from "../../core/modules";

/**
 * Base validator interface
 */
export interface ValidatorInterface {
  errors: string[];
  isValid(...args: any[]): boolean;
  validationMethod(newValue: any): string[];
}

/**
 * Validation terms for different validator types
 */
export interface ValidationTerms {
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  pattern?: RegExp;
  customValidationMethod?: (value: any) => string[];
}

/**
 * Base validator class
 */
export declare class BaseValidator
  extends Module
  implements ValidatorInterface
{
  errors: string[];

  constructor(settings?: {
    validationTerms?: ValidationTerms;
    customValidationMethod?: (value: any) => string[];
  });

  // Core validation
  isValid(...args: any[]): boolean;
  validationMethod(newValue: any): string[];

  // Settings management
  getDefaultSettings(): {
    validationTerms: ValidationTerms;
  };
}

/**
 * Number validator with min/max validation
 */
export declare class NumberValidator extends BaseValidator {
  validationMethod(newValue: any): string[];
}

/**
 * Breakpoint validator for responsive controls
 */
export declare class BreakpointValidator extends NumberValidator {
  breakpointIndex: number;
  topBreakpoint?: number;
  bottomBreakpoint?: number;

  // Breakpoint management
  getPanelActiveBreakpoints(): Record<string, any>;
  initBreakpointProperties(): void;
  validateMinMaxForBreakpoint(
    value: any,
    validationTerms: ValidationTerms
  ): boolean;

  // Validation override
  validationMethod(newValue: any): string[];
}

/**
 * String validator with pattern matching
 */
export declare class StringValidator extends BaseValidator {
  validationMethod(newValue: any): string[];
}

/**
 * URL validator
 */
export declare class URLValidator extends StringValidator {
  validationMethod(newValue: any): string[];
}

/**
 * Email validator
 */
export declare class EmailValidator extends StringValidator {
  validationMethod(newValue: any): string[];
}

/**
 * Color validator for color picker controls
 */
export declare class ColorValidator extends BaseValidator {
  validationMethod(newValue: any): string[];

  // Color format validation
  isValidHex(color: string): boolean;
  isValidRgb(color: string): boolean;
  isValidRgba(color: string): boolean;
  isValidHsl(color: string): boolean;
}

/**
 * File validator for media controls
 */
export declare class FileValidator extends BaseValidator {
  allowedTypes: string[];
  maxSize?: number;

  validationMethod(file: File): string[];

  // File validation helpers
  isValidType(file: File): boolean;
  isValidSize(file: File): boolean;
}

/**
 * Repeater validator for repeater controls
 */
export declare class RepeaterValidator extends BaseValidator {
  minItems?: number;
  maxItems?: number;

  validationMethod(items: any[]): string[];

  // Repeater-specific validation
  validateItemCount(items: any[]): string[];
  validateItemFields(items: any[]): string[];
}

/**
 * Dimension validator for spacing controls
 */
export declare class DimensionValidator extends BaseValidator {
  units: string[];

  validationMethod(dimension: any): string[];

  // Dimension validation helpers
  isValidUnit(unit: string): boolean;
  isValidValue(value: string, unit: string): boolean;
}

/**
 * Conditional validator that applies validation based on conditions
 */
export declare class ConditionalValidator extends BaseValidator {
  condition: (settings: any) => boolean;
  conditionalValidator: ValidatorInterface;

  validationMethod(newValue: any, settings?: any): string[];
}

/**
 * Composite validator that combines multiple validators
 */
export declare class CompositeValidator extends BaseValidator {
  validators: ValidatorInterface[];

  constructor(validators: ValidatorInterface[]);
  validationMethod(newValue: any): string[];
}

/**
 * Validation factory for creating validators
 */
export declare class ValidationFactory {
  static validators: Map<string, typeof BaseValidator>;

  // Validator registration
  static registerValidator(
    name: string,
    validatorClass: typeof BaseValidator
  ): void;
  static getValidator(name: string): typeof BaseValidator | undefined;

  // Validator creation
  static create(type: string, settings?: any): ValidatorInterface;
  static createFromTerms(
    validationTerms: ValidationTerms
  ): ValidatorInterface[];
}

/**
 * Validation manager for handling control validation
 */
export declare class ValidationManager {
  controlValidators: Map<string, ValidatorInterface[]>;

  // Validator management
  addValidator(controlName: string, validator: ValidatorInterface): void;
  removeValidator(controlName: string, validator: ValidatorInterface): void;
  getValidators(controlName: string): ValidatorInterface[];

  // Validation execution
  validateControl(
    controlName: string,
    value: any,
    settings?: any
  ): {
    isValid: boolean;
    errors: string[];
  };

  validateAll(
    values: Record<string, any>,
    settings?: any
  ): {
    isValid: boolean;
    errors: Record<string, string[]>;
  };

  // Batch operations
  clearValidators(controlName?: string): void;
  hasValidators(controlName: string): boolean;
}

/**
 * Validation error types
 */
export interface ValidationError {
  field: string;
  value: any;
  errors: string[];
  timestamp: Date;
}

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings?: ValidationError[];
}

/**
 * Advanced validation options
 */
export interface ValidationOptions {
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  debounceMs?: number;
  stopOnFirstError?: boolean;
  showWarnings?: boolean;
}

/**
 * Control validation mixin for adding validation to controls
 */
export declare interface ControlValidationMixin {
  validators: ValidatorInterface[];
  validationOptions: ValidationOptions;
  lastValidationResult?: ValidationResult;

  // Validation methods
  addValidator(validator: ValidatorInterface): void;
  removeValidator(validator: ValidatorInterface): void;
  validate(value?: any): ValidationResult;

  // Event handlers
  onValidationChange(result: ValidationResult): void;
  onValidationError(errors: ValidationError[]): void;

  // UI methods
  showValidationErrors(errors: ValidationError[]): void;
  hideValidationErrors(): void;
  updateValidationState(isValid: boolean): void;
}
