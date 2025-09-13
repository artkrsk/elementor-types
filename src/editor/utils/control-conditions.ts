/**
 * Elementor Editor Control Conditions Utility
 *
 * Handles conditional visibility and logic for editor controls.
 * Works with the Conditions utility to manage control display logic.
 */

import type { ConditionSet, ConditionTerm } from "./conditions";
import { conditions } from "./conditions";

/**
 * Control condition configuration
 */
export interface ControlCondition {
  /** Control name that this condition applies to */
  controlName: string;
  /** Condition set to evaluate */
  conditions: ConditionSet;
  /** Whether to show or hide when conditions are met */
  action: "show" | "hide";
}

/**
 * Control state interface
 */
export interface ControlState {
  /** Whether the control is visible */
  visible: boolean;
  /** Whether the control is enabled */
  enabled: boolean;
  /** Additional state data */
  data?: Record<string, any>;
}

/**
 * Control visibility result
 */
export interface VisibilityResult {
  /** Whether control should be visible */
  visible: boolean;
  /** Reason for visibility state */
  reason?: string;
  /** Which condition triggered the result */
  triggerCondition?: string;
}

/**
 * Control Conditions Manager
 *
 * Manages conditional logic for editor controls including visibility,
 * enabled state, and dynamic behavior based on other control values.
 */
export class ControlConditions {
  /** Registered control conditions */
  private conditions: Map<string, ControlCondition[]> = new Map();

  /** Control state cache */
  private stateCache: Map<string, ControlState> = new Map();

  /** Settings object being evaluated */
  private currentSettings: Record<string, any> = {};

  /**
   * Register a condition for a control
   *
   * @param condition - Control condition configuration
   */
  registerCondition(condition: ControlCondition): void {
    const controlName = condition.controlName;

    if (!this.conditions.has(controlName)) {
      this.conditions.set(controlName, []);
    }

    this.conditions.get(controlName)!.push(condition);
  }

  /**
   * Remove all conditions for a control
   *
   * @param controlName - Control name
   */
  clearConditions(controlName: string): void {
    this.conditions.delete(controlName);
    this.stateCache.delete(controlName);
  }

  /**
   * Set current settings context for evaluation
   *
   * @param settings - Settings object
   */
  setSettings(settings: Record<string, any>): void {
    this.currentSettings = settings;
    // Clear cache when settings change
    this.stateCache.clear();
  }

  /**
   * Check if a control should be visible
   *
   * @param controlName - Control name
   * @param settings - Settings object (optional, uses current if not provided)
   * @returns Visibility result
   */
  checkVisibility(
    controlName: string,
    settings?: Record<string, any>
  ): VisibilityResult {
    const settingsToUse = settings || this.currentSettings;
    const controlConditions = this.conditions.get(controlName);

    // No conditions means always visible
    if (!controlConditions || controlConditions.length === 0) {
      return { visible: true, reason: "No conditions defined" };
    }

    // Evaluate each condition
    for (const condition of controlConditions) {
      const conditionMet = conditions.check(
        condition.conditions,
        settingsToUse
      );

      if (conditionMet) {
        const visible = condition.action === "show";
        return {
          visible,
          reason: `Condition "${condition.action}" triggered`,
          triggerCondition: JSON.stringify(condition.conditions),
        };
      }
    }

    // Default: visible if no conditions are met
    return {
      visible: true,
      reason: "No conditions matched, default visible",
    };
  }

  /**
   * Get control state including visibility and enabled status
   *
   * @param controlName - Control name
   * @param settings - Settings object (optional)
   * @returns Control state
   */
  getControlState(
    controlName: string,
    settings?: Record<string, any>
  ): ControlState {
    const cacheKey = `${controlName}_${JSON.stringify(
      settings || this.currentSettings
    )}`;

    // Check cache first
    if (this.stateCache.has(cacheKey)) {
      return this.stateCache.get(cacheKey)!;
    }

    const visibilityResult = this.checkVisibility(controlName, settings);

    const state: ControlState = {
      visible: visibilityResult.visible,
      enabled: visibilityResult.visible, // Disabled controls are typically not visible
      data: {
        reason: visibilityResult.reason,
        triggerCondition: visibilityResult.triggerCondition,
      },
    };

    // Cache the result
    this.stateCache.set(cacheKey, state);

    return state;
  }

  /**
   * Get all visible controls from a list
   *
   * @param controlNames - Array of control names to check
   * @param settings - Settings object (optional)
   * @returns Array of visible control names
   */
  getVisibleControls(
    controlNames: string[],
    settings?: Record<string, any>
  ): string[] {
    return controlNames.filter(
      (controlName) => this.checkVisibility(controlName, settings).visible
    );
  }

  /**
   * Check if any control in a group is visible
   *
   * @param controlNames - Array of control names
   * @param settings - Settings object (optional)
   * @returns Whether any control is visible
   */
  hasVisibleControls(
    controlNames: string[],
    settings?: Record<string, any>
  ): boolean {
    return controlNames.some(
      (controlName) => this.checkVisibility(controlName, settings).visible
    );
  }

  /**
   * Create a simple condition for common cases
   *
   * @param conditionName - Setting name to check
   * @param expectedValue - Expected value
   * @param operator - Comparison operator
   * @returns Condition set
   */
  static createSimpleCondition(
    conditionName: string,
    expectedValue: any,
    operator: string = "==="
  ): ConditionSet {
    return {
      relation: "and",
      terms: [
        {
          name: conditionName,
          value: expectedValue,
          operator: operator as any,
        },
      ],
    };
  }

  /**
   * Create a condition that checks multiple values (OR logic)
   *
   * @param conditionName - Setting name to check
   * @param expectedValues - Array of possible values
   * @returns Condition set
   */
  static createMultiValueCondition(
    conditionName: string,
    expectedValues: any[]
  ): ConditionSet {
    return {
      relation: "or",
      terms: expectedValues.map((value) => ({
        name: conditionName,
        value: value,
        operator: "===" as any,
      })),
    };
  }

  /**
   * Create a condition for responsive settings
   *
   * @param baseName - Base setting name
   * @param deviceSuffix - Device suffix ('_tablet', '_mobile')
   * @param expectedValue - Expected value
   * @returns Condition set
   */
  static createResponsiveCondition(
    baseName: string,
    deviceSuffix: string,
    expectedValue: any
  ): ConditionSet {
    return {
      relation: "or",
      terms: [
        {
          name: baseName + deviceSuffix,
          value: expectedValue,
          operator: "===" as any,
        },
        {
          name: baseName,
          value: expectedValue,
          operator: "===" as any,
        },
      ],
    };
  }

  /**
   * Bulk register conditions from configuration object
   *
   * @param conditionsConfig - Configuration object mapping control names to conditions
   */
  bulkRegisterConditions(
    conditionsConfig: Record<string, Omit<ControlCondition, "controlName">>
  ): void {
    Object.entries(conditionsConfig).forEach(([controlName, config]) => {
      this.registerCondition({
        controlName,
        ...config,
      });
    });
  }

  /**
   * Get dependency tree for controls
   *
   * @returns Map of control dependencies
   */
  getDependencyTree(): Map<string, string[]> {
    const dependencies = new Map<string, string[]>();

    this.conditions.forEach((conditionList, controlName) => {
      const deps: string[] = [];

      conditionList.forEach((condition) => {
        this.extractDependencies(condition.conditions.terms, deps);
      });

      if (deps.length > 0) {
        dependencies.set(controlName, [...new Set(deps)]);
      }
    });

    return dependencies;
  }

  /**
   * Extract dependency control names from condition terms
   *
   * @param terms - Condition terms
   * @param dependencies - Array to collect dependencies
   */
  private extractDependencies(
    terms: ConditionTerm[],
    dependencies: string[]
  ): void {
    terms.forEach((term) => {
      if (term.terms) {
        // Recursive for nested conditions
        this.extractDependencies(term.terms, dependencies);
      } else {
        // Extract control name from term name (handle sub-keys like 'image[url]')
        const match = term.name.match(/^([^[]+)/);
        if (match) {
          dependencies.push(match[1]);
        }
      }
    });
  }

  /**
   * Clear all conditions and cache
   */
  reset(): void {
    this.conditions.clear();
    this.stateCache.clear();
    this.currentSettings = {};
  }

  /**
   * Get statistics about registered conditions
   *
   * @returns Statistics object
   */
  getStats(): {
    totalControls: number;
    totalConditions: number;
    cacheSize: number;
    averageConditionsPerControl: number;
  } {
    const totalControls = this.conditions.size;
    const totalConditions = Array.from(this.conditions.values()).reduce(
      (sum, conditions) => sum + conditions.length,
      0
    );

    return {
      totalControls,
      totalConditions,
      cacheSize: this.stateCache.size,
      averageConditionsPerControl:
        totalControls > 0 ? totalConditions / totalControls : 0,
    };
  }
}

/**
 * Export singleton instance for global use
 */
export const controlConditions = new ControlConditions();
