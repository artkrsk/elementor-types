/**
 * Elementor Editor Presets Factory Utility
 *
 * Handles creation and management of element presets, particularly for columns and grid layouts.
 * Provides preset calculations and structure parsing for the editor.
 */

/**
 * Preset values dictionary for common layout ratios
 */
export interface PresetsDictionary {
  [key: number]: number;
}

/**
 * Parsed structure information
 */
export interface ParsedStructure {
  /** Number of columns */
  columnsCount: number;
  /** Preset index */
  presetIndex: number;
  /** Number of rows (for grid layouts) */
  rowsCount?: number;
}

/**
 * Preset configuration for a layout
 */
export interface PresetConfig {
  /** Preset values array */
  preset: number[];
  /** Preset key/name */
  key?: string;
  /** Whether preset is for grid layout */
  isGrid?: boolean;
}

/**
 * Grid structure configuration
 */
export interface GridStructure {
  /** Number of rows */
  rows: number;
  /** Number of columns */
  columns: number;
  /** Grid template areas (optional) */
  areas?: string[][];
}

/**
 * Presets Factory Class
 *
 * Provides utilities for creating and managing layout presets in the Elementor editor.
 */
export class PresetsFactory {
  /**
   * Get presets dictionary with common layout ratios
   *
   * @returns Dictionary of preset values
   */
  static getPresetsDictionary(): PresetsDictionary {
    return {
      11: 100 / 9, // ~11.11%
      12: 100 / 8, // 12.5%
      14: 100 / 7, // ~14.29%
      16: 100 / 6, // ~16.67%
      33: 100 / 3, // ~33.33%
      66: (2 / 3) * 100, // ~66.67%
      83: (5 / 6) * 100, // ~83.33%
    };
  }

  /**
   * Convert relative preset values to absolute percentages
   *
   * @param preset - Preset array with potential dictionary keys
   * @returns Preset array with absolute percentage values
   */
  static getAbsolutePresetValues(preset: number[]): number[] {
    const clonedPreset = [...preset];
    const presetDictionary = this.getPresetsDictionary();

    clonedPreset.forEach((unitValue, unitIndex) => {
      if (presetDictionary[unitValue]) {
        clonedPreset[unitIndex] = presetDictionary[unitValue];
      }
    });

    return clonedPreset;
  }

  /**
   * Get presets from Elementor configuration
   *
   * @param columnsCount - Number of columns to filter by
   * @param presetIndex - Specific preset index to get
   * @returns Presets configuration
   */
  static getPresets(columnsCount?: number, presetIndex?: number): any {
    const presets = structuredClone(
      (elementor as any)?.config?.elements?.section?.presets || {}
    );

    if (columnsCount && presets[columnsCount]) {
      const columnPresets = presets[columnsCount];

      if (presetIndex !== undefined && columnPresets[presetIndex]) {
        return columnPresets[presetIndex];
      }

      return columnPresets;
    }

    return presets;
  }

  /**
   * Get preset by structure string
   *
   * @param structure - Structure string (e.g., "50,25,25" or "1-2" for grid)
   * @returns Preset configuration
   */
  static getPresetByStructure(structure: string): any {
    const parsedStructure = this.getParsedStructure(structure);
    return this.getPresets(
      parsedStructure.columnsCount,
      parsedStructure.presetIndex
    );
  }

  /**
   * Parse structure string to extract layout information
   *
   * @param structure - Structure string
   * @returns Parsed structure information
   */
  static getParsedStructure(structure: string): ParsedStructure {
    // Handle grid structure (e.g., "1-2" = 1 row, 2 columns)
    if (structure.includes("-")) {
      const [rows, columns] = structure.split("-").map(Number);
      return {
        columnsCount: columns,
        presetIndex: 0,
        rowsCount: rows,
      };
    }

    // Handle comma-separated percentage structure
    if (structure.includes(",")) {
      const parts = structure.split(",");
      return {
        columnsCount: parts.length,
        presetIndex: 0,
      };
    }

    // Handle numeric structure
    const columnsCount = parseInt(structure, 10);
    return {
      columnsCount: isNaN(columnsCount) ? 1 : columnsCount,
      presetIndex: 0,
    };
  }

  /**
   * Generate preset from column count
   *
   * @param columnsCount - Number of columns
   * @param distribution - Distribution type ('equal', 'golden', 'custom')
   * @param customValues - Custom percentage values
   * @returns Generated preset array
   */
  static generatePreset(
    columnsCount: number,
    distribution: "equal" | "golden" | "custom" = "equal",
    customValues?: number[]
  ): number[] {
    if (distribution === "custom" && customValues) {
      return this.normalizePreset(customValues);
    }

    if (distribution === "golden" && columnsCount === 2) {
      // Golden ratio distribution
      return [61.8, 38.2];
    }

    // Equal distribution
    const equalWidth = 100 / columnsCount;
    return new Array(columnsCount).fill(equalWidth);
  }

  /**
   * Normalize preset values to sum to 100%
   *
   * @param preset - Preset array
   * @returns Normalized preset array
   */
  static normalizePreset(preset: number[]): number[] {
    const total = preset.reduce((sum, value) => sum + value, 0);

    if (total === 0) {
      return preset;
    }

    return preset.map((value) => (value / total) * 100);
  }

  /**
   * Create grid preset configuration
   *
   * @param rows - Number of rows
   * @param columns - Number of columns
   * @param areas - Optional grid template areas
   * @returns Grid structure configuration
   */
  static createGridPreset(
    rows: number,
    columns: number,
    areas?: string[][]
  ): GridStructure {
    return {
      rows,
      columns,
      areas,
    };
  }

  /**
   * Get common grid presets
   *
   * @returns Array of common grid configurations
   */
  static getCommonGridPresets(): GridStructure[] {
    return [
      { rows: 1, columns: 2 },
      { rows: 1, columns: 3 },
      { rows: 1, columns: 4 },
      { rows: 2, columns: 2 },
      { rows: 2, columns: 3 },
      { rows: 3, columns: 3 },
    ];
  }

  /**
   * Convert preset to CSS grid template columns
   *
   * @param preset - Preset array
   * @param unit - CSS unit ('fr', '%', 'px')
   * @returns CSS grid-template-columns value
   */
  static presetToGridColumns(
    preset: number[],
    unit: "fr" | "%" | "px" = "fr"
  ): string {
    if (unit === "fr") {
      // Convert to fractional units
      const minValue = Math.min(...preset);
      const fractions = preset.map(
        (value) => Math.round((value / minValue) * 100) / 100
      );
      return fractions.map((fr) => `${fr}fr`).join(" ");
    }

    if (unit === "%") {
      const normalized = this.normalizePreset(preset);
      return normalized.map((percent) => `${percent.toFixed(2)}%`).join(" ");
    }

    // For px unit, use preset values as-is
    return preset.map((px) => `${px}px`).join(" ");
  }

  /**
   * Calculate responsive preset adjustments
   *
   * @param preset - Base preset
   * @param deviceType - Device type ('desktop', 'tablet', 'mobile')
   * @returns Adjusted preset for device
   */
  static getResponsivePreset(
    preset: number[],
    deviceType: "desktop" | "tablet" | "mobile"
  ): number[] {
    switch (deviceType) {
      case "mobile":
        // Stack columns on mobile
        return [100];

      case "tablet":
        // Simplify complex layouts on tablet
        if (preset.length > 3) {
          return [50, 50];
        }
        break;

      case "desktop":
      default:
        break;
    }

    return preset;
  }

  /**
   * Validate preset configuration
   *
   * @param preset - Preset to validate
   * @returns Validation result with errors
   */
  static validatePreset(preset: number[]): {
    valid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check if preset is empty
    if (!preset || preset.length === 0) {
      errors.push("Preset cannot be empty");
    }

    // Check for negative values
    preset.forEach((value, index) => {
      if (value < 0) {
        errors.push(`Column ${index + 1} has negative width: ${value}`);
      }
    });

    // Check total percentage
    const total = preset.reduce((sum, value) => sum + value, 0);
    if (Math.abs(total - 100) > 0.01) {
      warnings.push(`Total width is ${total.toFixed(2)}%, expected 100%`);
    }

    // Check for very small columns
    preset.forEach((value, index) => {
      if (value > 0 && value < 5) {
        warnings.push(
          `Column ${index + 1} is very small: ${value.toFixed(2)}%`
        );
      }
    });

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }
}

// Global declaration for elementor
declare const elementor: any;

