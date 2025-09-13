/**
 * Validator Component
 * Types for validation functionality
 */

/**
 * Validation rule types
 */
export type ValidationRuleType =
  | "required"
  | "min"
  | "max"
  | "minLength"
  | "maxLength"
  | "pattern"
  | "email"
  | "url"
  | "number"
  | "custom";

/**
 * Validation severity levels
 */
export type ValidationSeverity = "error" | "warning" | "info";

/**
 * Validation rule interface
 */
export interface ValidationRule {
  type: ValidationRuleType;
  value?: any;
  message?: string;
  severity?: ValidationSeverity;
  condition?: (data: any) => boolean;
}

/**
 * Validation result interface
 */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
  infos: ValidationError[];
}

/**
 * Validation error interface
 */
export interface ValidationError {
  field: string;
  rule: ValidationRuleType;
  message: string;
  severity: ValidationSeverity;
  value?: any;
}

/**
 * Field validator interface
 */
export interface FieldValidator {
  field: string;
  rules: ValidationRule[];

  validate(value: any, context?: any): ValidationResult;
  addRule(rule: ValidationRule): void;
  removeRule(type: ValidationRuleType): void;
  hasRule(type: ValidationRuleType): boolean;
}

/**
 * Validator manager interface
 */
export interface ValidatorManager {
  // Validator registration
  registerValidator(field: string, validator: FieldValidator): void;
  unregisterValidator(field: string): void;
  getValidator(field: string): FieldValidator | undefined;

  // Validation operations
  validate(data: any): ValidationResult;
  validateField(field: string, value: any, context?: any): ValidationResult;
  isValid(data: any): boolean;

  // Rule management
  addRule(field: string, rule: ValidationRule): void;
  removeRule(field: string, ruleType: ValidationRuleType): void;

  // Custom validators
  registerCustomValidator(
    name: string,
    validator: (value: any, rule: ValidationRule, context?: any) => boolean
  ): void;
  unregisterCustomValidator(name: string): void;

  // Error handling
  getErrors(): ValidationError[];
  getErrorsByField(field: string): ValidationError[];
  getErrorsBySeverity(severity: ValidationSeverity): ValidationError[];
  clearErrors(): void;

  // Events
  onValidation(callback: (result: ValidationResult) => void): void;
  onError(callback: (error: ValidationError) => void): void;
}
