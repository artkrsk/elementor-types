/**
 * Elementor Editor Conditions Utility
 *
 * Provides conditional logic comparison for editor controls and elements.
 * Used throughout the editor for conditional visibility and logic.
 */

/**
 * Conditional comparison operator types
 */
export type ConditionOperator =
  | "=="
  | "!="
  | "!=="
  | "in"
  | "!in"
  | "contains"
  | "!contains"
  | "<"
  | "<="
  | ">"
  | ">="
  | "===";

/**
 * Individual condition term
 */
export interface ConditionTerm {
  /** Condition name (can include sub-key syntax like 'image_overlay[url]') */
  name: string;
  /** Expected value to compare against */
  value: any;
  /** Comparison operator */
  operator: ConditionOperator;
  /** Nested condition terms for complex logic */
  terms?: ConditionTerm[];
}

/**
 * Condition set with relation logic
 */
export interface ConditionSet {
  /** Logical relation between terms ('and' | 'or') */
  relation: "and" | "or";
  /** Array of condition terms */
  terms: ConditionTerm[];
}

/**
 * Comparison object type - typically element settings
 */
export type ComparisonObject = Record<string, any>;

/**
 * Elementor Editor Conditions Utility Class
 *
 * Handles conditional logic for editor controls, elements, and UI components.
 * Supports complex nested conditions with AND/OR logic.
 */
export default class Conditions {
  /**
   * Compare two values using the specified operator
   *
   * @param leftValue - Left side value
   * @param rightValue - Right side value
   * @param operator - Comparison operator
   * @returns Comparison result
   */
  compare(
    leftValue: any,
    rightValue: any,
    operator: ConditionOperator
  ): boolean {
    switch (operator) {
      /* eslint-disable eqeqeq */
      case "==":
        return leftValue == rightValue;
      case "!=":
        return leftValue != rightValue;
      /* eslint-enable eqeqeq */
      case "!==":
        return leftValue !== rightValue;
      case "in":
        return (
          Array.isArray(rightValue) && rightValue.indexOf(leftValue) !== -1
        );
      case "!in":
        return (
          Array.isArray(rightValue) && rightValue.indexOf(leftValue) === -1
        );
      case "contains":
        return Array.isArray(leftValue) && leftValue.indexOf(rightValue) !== -1;
      case "!contains":
        return Array.isArray(leftValue) && leftValue.indexOf(rightValue) === -1;
      case "<":
        return leftValue < rightValue;
      case "<=":
        return leftValue <= rightValue;
      case ">":
        return leftValue > rightValue;
      case ">=":
        return leftValue >= rightValue;
      default:
        return leftValue === rightValue;
    }
  }

  /**
   * Get the appropriate operator based on condition and current values
   *
   * Determines the comparison operator according to the structure of the
   * condition and item values.
   *
   * @param conditionValue - The value to compare against
   * @param isNegativeCondition - Whether this is a negative condition
   * @param currentValue - The current value being evaluated
   * @returns The operator to use
   */
  getOperator(
    conditionValue: any,
    isNegativeCondition: boolean,
    currentValue: any
  ): ConditionOperator {
    let operator: ConditionOperator;

    if (Array.isArray(conditionValue) && conditionValue.length) {
      operator = isNegativeCondition ? "!in" : "in";
    } else if (Array.isArray(currentValue) && currentValue.length) {
      operator = isNegativeCondition ? "!contains" : "contains";
    } else if (isNegativeCondition) {
      operator = "!==";
    } else {
      operator = "===";
    }

    return operator;
  }

  /**
   * Get the value from a comparison object for a specific condition
   *
   * Retrieves a condition's value, supporting nested object access via
   * sub-condition names (e.g., 'image_overlay[url]').
   *
   * @param comparisonObject - Object containing values to compare (e.g., element settings)
   * @param conditionName - The conditioning item's name
   * @param subConditionName - Property name if the conditioning item's value is an object
   * @returns The condition value
   */
  getConditionValue(
    comparisonObject: ComparisonObject,
    conditionName: string,
    subConditionName?: string
  ): any {
    let value: any;

    if (
      typeof comparisonObject[conditionName] === "object" &&
      subConditionName
    ) {
      value = comparisonObject[conditionName][subConditionName];
    } else {
      value = comparisonObject[conditionName];
    }

    return value;
  }

  /**
   * Check if a set of conditions is met
   *
   * Evaluates a condition set against a comparison object, supporting
   * nested conditions with AND/OR logic.
   *
   * @param conditions - The condition set to evaluate
   * @param comparisonObject - Object to evaluate conditions against
   * @returns Whether all conditions are met
   */
  check(conditions: ConditionSet, comparisonObject: ComparisonObject): boolean {
    const isOrCondition = conditions.relation === "or";
    let conditionSucceed = !isOrCondition;

    for (const term of conditions.terms) {
      let comparisonResult: boolean;

      if (term.terms) {
        // Nested condition - convert term to condition set
        const nestedConditionSet: ConditionSet = {
          relation: "and", // Default relation for nested terms
          terms: term.terms,
        };
        comparisonResult = this.check(nestedConditionSet, comparisonObject);
      } else {
        // Parse condition name to extract sub-key
        // Format: 'image_overlay[url]' -> conditionRealName: 'image_overlay', conditionSubKey: 'url'
        const parsedName = term.name.match(/([\w-]+)(?:\[([\w-]+)])?/);
        const conditionRealName = parsedName?.[1] || term.name;
        const conditionSubKey = parsedName?.[2];

        const value = this.getConditionValue(
          comparisonObject,
          conditionRealName,
          conditionSubKey
        );

        comparisonResult =
          value !== undefined && this.compare(value, term.value, term.operator);
      }

      if (isOrCondition) {
        if (comparisonResult) {
          conditionSucceed = true;
        }
        // In OR conditions, continue until we find a true result
        if (!comparisonResult) {
          continue;
        } else {
          break;
        }
      } else {
        // In AND conditions, fail fast on first false result
        if (!comparisonResult) {
          conditionSucceed = false;
          break;
        }
      }
    }

    return conditionSucceed;
  }
}

/**
 * Export singleton instance for global use
 */
export const conditions = new Conditions();
