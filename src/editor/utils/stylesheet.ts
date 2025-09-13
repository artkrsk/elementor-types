/**
 * Elementor Editor Stylesheet Utility
 *
 * Handles dynamic CSS generation, management, and injection for the editor.
 * Provides utilities for creating responsive stylesheets and managing CSS rules.
 */

/**
 * CSS rule configuration
 */
export interface CSSRule {
  /** CSS selector */
  selector: string;
  /** CSS properties */
  properties: Record<string, string | number>;
  /** Media query for responsive rules */
  mediaQuery?: string;
  /** Rule priority */
  priority?: number;
}

/**
 * Stylesheet configuration
 */
export interface StylesheetConfig {
  /** Stylesheet ID */
  id: string;
  /** CSS rules */
  rules: CSSRule[];
  /** Whether to minify output */
  minify?: boolean;
  /** Target element for injection */
  target?: HTMLElement;
}

/**
 * Responsive breakpoint configuration
 */
export interface ResponsiveBreakpoint {
  /** Breakpoint name */
  name: string;
  /** Breakpoint value in pixels */
  value: number;
  /** Media query type */
  type: "max-width" | "min-width";
}

/**
 * CSS property with responsive values
 */
export interface ResponsiveProperty {
  /** Desktop value */
  desktop?: string | number;
  /** Tablet value */
  tablet?: string | number;
  /** Mobile value */
  mobile?: string | number;
}

/**
 * Stylesheet Manager Class
 *
 * Manages dynamic CSS generation and injection for Elementor editor components.
 */
export class Stylesheet {
  /** Generated CSS rules */
  private rules: Map<string, CSSRule> = new Map();

  /** Stylesheet ID */
  private id: string;

  /** Whether to minify CSS output */
  private minify: boolean = false;

  /** Target element for CSS injection */
  private target: HTMLElement;

  /** Default responsive breakpoints */
  private breakpoints: ResponsiveBreakpoint[] = [
    { name: "mobile", value: 767, type: "max-width" },
    { name: "tablet", value: 1024, type: "max-width" },
  ];

  /**
   * Constructor
   *
   * @param config - Stylesheet configuration
   */
  constructor(config: StylesheetConfig) {
    this.id = config.id;
    this.minify = config.minify || false;
    this.target = config.target || document.head;

    if (config.rules) {
      config.rules.forEach((rule) => this.addRule(rule));
    }
  }

  /**
   * Add a CSS rule
   *
   * @param rule - CSS rule configuration
   */
  addRule(rule: CSSRule): void {
    const ruleKey = `${rule.selector}_${rule.mediaQuery || "default"}`;
    this.rules.set(ruleKey, rule);
  }

  /**
   * Remove a CSS rule
   *
   * @param selector - CSS selector
   * @param mediaQuery - Media query (optional)
   */
  removeRule(selector: string, mediaQuery?: string): void {
    const ruleKey = `${selector}_${mediaQuery || "default"}`;
    this.rules.delete(ruleKey);
  }

  /**
   * Add responsive CSS rules
   *
   * @param selector - CSS selector
   * @param property - CSS property name
   * @param values - Responsive values
   */
  addResponsiveRule(
    selector: string,
    property: string,
    values: ResponsiveProperty
  ): void {
    // Desktop (default)
    if (values.desktop !== undefined) {
      this.addRule({
        selector,
        properties: { [property]: values.desktop },
      });
    }

    // Tablet
    if (values.tablet !== undefined) {
      const tabletBreakpoint = this.breakpoints.find(
        (bp) => bp.name === "tablet"
      );
      if (tabletBreakpoint) {
        this.addRule({
          selector,
          properties: { [property]: values.tablet },
          mediaQuery: `(max-width: ${tabletBreakpoint.value}px)`,
        });
      }
    }

    // Mobile
    if (values.mobile !== undefined) {
      const mobileBreakpoint = this.breakpoints.find(
        (bp) => bp.name === "mobile"
      );
      if (mobileBreakpoint) {
        this.addRule({
          selector,
          properties: { [property]: values.mobile },
          mediaQuery: `(max-width: ${mobileBreakpoint.value}px)`,
        });
      }
    }
  }

  /**
   * Add multiple properties for a selector
   *
   * @param selector - CSS selector
   * @param properties - CSS properties
   * @param mediaQuery - Media query (optional)
   */
  addProperties(
    selector: string,
    properties: Record<string, string | number>,
    mediaQuery?: string
  ): void {
    this.addRule({
      selector,
      properties,
      mediaQuery,
    });
  }

  /**
   * Generate CSS string from rules
   *
   * @returns Generated CSS string
   */
  generateCSS(): string {
    const cssBlocks: string[] = [];
    const mediaQueryBlocks: Map<string, string[]> = new Map();

    // Sort rules by priority
    const sortedRules = Array.from(this.rules.values()).sort(
      (a, b) => (a.priority || 0) - (b.priority || 0)
    );

    sortedRules.forEach((rule) => {
      const cssProperties = Object.entries(rule.properties)
        .map(([property, value]) => {
          const cssProperty = this.kebabCase(property);
          return this.minify
            ? `${cssProperty}:${value}`
            : `  ${cssProperty}: ${value};`;
        })
        .join(this.minify ? ";" : "\n");

      const cssRule = this.minify
        ? `${rule.selector}{${cssProperties}}`
        : `${rule.selector} {\n${cssProperties}\n}`;

      if (rule.mediaQuery) {
        if (!mediaQueryBlocks.has(rule.mediaQuery)) {
          mediaQueryBlocks.set(rule.mediaQuery, []);
        }
        mediaQueryBlocks.get(rule.mediaQuery)!.push(cssRule);
      } else {
        cssBlocks.push(cssRule);
      }
    });

    // Add media query blocks
    mediaQueryBlocks.forEach((rules, mediaQuery) => {
      const mediaBlock = this.minify
        ? `@media ${mediaQuery}{${rules.join("")}}`
        : `@media ${mediaQuery} {\n${rules.join("\n\n")}\n}`;

      cssBlocks.push(mediaBlock);
    });

    const separator = this.minify ? "" : "\n\n";
    return cssBlocks.join(separator);
  }

  /**
   * Inject CSS into the DOM
   */
  inject(): void {
    // Remove existing stylesheet
    this.remove();

    const css = this.generateCSS();
    if (!css) return;

    const styleElement = document.createElement("style");
    styleElement.id = this.id;
    styleElement.textContent = css;

    this.target.appendChild(styleElement);
  }

  /**
   * Remove stylesheet from DOM
   */
  remove(): void {
    const existingElement = document.getElementById(this.id);
    if (existingElement) {
      existingElement.remove();
    }
  }

  /**
   * Clear all rules
   */
  clear(): void {
    this.rules.clear();
  }

  /**
   * Set responsive breakpoints
   *
   * @param breakpoints - Breakpoint configurations
   */
  setBreakpoints(breakpoints: ResponsiveBreakpoint[]): void {
    this.breakpoints = breakpoints;
  }

  /**
   * Get current breakpoints
   *
   * @returns Current breakpoints
   */
  getBreakpoints(): ResponsiveBreakpoint[] {
    return [...this.breakpoints];
  }

  /**
   * Convert camelCase to kebab-case
   *
   * @param str - Input string
   * @returns Kebab-case string
   */
  private kebabCase(str: string): string {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
  }

  /**
   * Create CSS selector for element
   *
   * @param elementId - Element ID
   * @param suffix - Additional selector suffix
   * @returns CSS selector
   */
  static createElementSelector(elementId: string, suffix?: string): string {
    const baseSelector = `.elementor-element-${elementId}`;
    return suffix ? `${baseSelector} ${suffix}` : baseSelector;
  }

  /**
   * Create media query string
   *
   * @param breakpoint - Breakpoint configuration
   * @returns Media query string
   */
  static createMediaQuery(breakpoint: ResponsiveBreakpoint): string {
    return `(${breakpoint.type}: ${breakpoint.value}px)`;
  }

  /**
   * Parse responsive value object
   *
   * @param value - Value that might be responsive
   * @returns Responsive property object
   */
  static parseResponsiveValue(value: any): ResponsiveProperty {
    if (typeof value === "object" && value !== null) {
      return {
        desktop: value.desktop || value.size,
        tablet: value.tablet || value.size_tablet,
        mobile: value.mobile || value.size_mobile,
      };
    }

    return { desktop: value };
  }

  /**
   * Generate CSS for box model properties
   *
   * @param values - Box model values
   * @param property - CSS property prefix (margin, padding, border)
   * @returns CSS properties object
   */
  static generateBoxModel(
    values: { top?: any; right?: any; bottom?: any; left?: any },
    property: "margin" | "padding" | "border"
  ): Record<string, string> {
    const properties: Record<string, string> = {};

    Object.entries(values).forEach(([direction, value]) => {
      if (value !== undefined && value !== "") {
        const cssProperty = `${property}-${direction}`;
        properties[cssProperty] =
          typeof value === "number" ? `${value}px` : value;
      }
    });

    return properties;
  }

  /**
   * Generate CSS for typography properties
   *
   * @param typography - Typography configuration
   * @returns CSS properties object
   */
  static generateTypography(typography: {
    fontFamily?: string;
    fontSize?: any;
    fontWeight?: string | number;
    lineHeight?: any;
    letterSpacing?: any;
    textAlign?: string;
    textDecoration?: string;
    textTransform?: string;
  }): Record<string, string> {
    const properties: Record<string, string> = {};

    if (typography.fontFamily) {
      properties.fontFamily = typography.fontFamily;
    }

    if (typography.fontSize) {
      const fontSize =
        typeof typography.fontSize === "object"
          ? typography.fontSize.size
          : typography.fontSize;
      const unit =
        typeof typography.fontSize === "object"
          ? typography.fontSize.unit || "px"
          : "px";
      properties.fontSize = `${fontSize}${unit}`;
    }

    if (typography.fontWeight) {
      properties.fontWeight = typography.fontWeight.toString();
    }

    if (typography.lineHeight) {
      const lineHeight =
        typeof typography.lineHeight === "object"
          ? typography.lineHeight.size
          : typography.lineHeight;
      const unit =
        typeof typography.lineHeight === "object"
          ? typography.lineHeight.unit || ""
          : "";
      properties.lineHeight = `${lineHeight}${unit}`;
    }

    if (typography.letterSpacing) {
      const letterSpacing =
        typeof typography.letterSpacing === "object"
          ? typography.letterSpacing.size
          : typography.letterSpacing;
      const unit =
        typeof typography.letterSpacing === "object"
          ? typography.letterSpacing.unit || "px"
          : "px";
      properties.letterSpacing = `${letterSpacing}${unit}`;
    }

    if (typography.textAlign) {
      properties.textAlign = typography.textAlign;
    }

    if (typography.textDecoration) {
      properties.textDecoration = typography.textDecoration;
    }

    if (typography.textTransform) {
      properties.textTransform = typography.textTransform;
    }

    return properties;
  }
}

/**
 * Create a new stylesheet instance
 *
 * @param config - Stylesheet configuration
 * @returns Stylesheet instance
 */
export function createStylesheet(config: StylesheetConfig): Stylesheet {
  return new Stylesheet(config);
}

/**
 * Global stylesheet registry for managing multiple stylesheets
 */
export class StylesheetRegistry {
  private static stylesheets: Map<string, Stylesheet> = new Map();

  /**
   * Register a stylesheet
   *
   * @param stylesheet - Stylesheet instance
   */
  static register(stylesheet: Stylesheet): void {
    this.stylesheets.set((stylesheet as any).id, stylesheet);
  }

  /**
   * Get stylesheet by ID
   *
   * @param id - Stylesheet ID
   * @returns Stylesheet instance or undefined
   */
  static get(id: string): Stylesheet | undefined {
    return this.stylesheets.get(id);
  }

  /**
   * Remove stylesheet
   *
   * @param id - Stylesheet ID
   */
  static remove(id: string): void {
    const stylesheet = this.stylesheets.get(id);
    if (stylesheet) {
      stylesheet.remove();
      this.stylesheets.delete(id);
    }
  }

  /**
   * Clear all stylesheets
   */
  static clear(): void {
    this.stylesheets.forEach((stylesheet) => stylesheet.remove());
    this.stylesheets.clear();
  }

  /**
   * Get all registered stylesheets
   *
   * @returns Array of stylesheet instances
   */
  static getAll(): Stylesheet[] {
    return Array.from(this.stylesheets.values());
  }
}
