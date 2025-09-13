/**
 * Elementor Editor Font Variables Utility
 *
 * Manages font families, weights, and CSS custom properties for typography
 * controls in the Elementor editor.
 */

/**
 * Font weight configuration
 */
export interface FontWeight {
  /** Weight value (100-900) */
  value: number;
  /** Display label */
  label: string;
  /** Whether weight is available */
  available?: boolean;
}

/**
 * Font family configuration
 */
export interface FontFamily {
  /** Font family name */
  name: string;
  /** Display label */
  label: string;
  /** Font category */
  category:
    | "serif"
    | "sans-serif"
    | "monospace"
    | "cursive"
    | "fantasy"
    | "system";
  /** Available weights */
  weights?: FontWeight[];
  /** CSS font-family value */
  cssValue?: string;
  /** Whether font is web safe */
  webSafe?: boolean;
  /** Google Fonts family name */
  googleFamily?: string;
  /** Font variants */
  variants?: string[];
  /** Font subsets */
  subsets?: string[];
}

/**
 * Typography configuration
 */
export interface TypographyConfig {
  /** Font family */
  fontFamily?: string;
  /** Font size */
  fontSize?: {
    size: number;
    unit: "px" | "em" | "rem" | "%" | "vw" | "vh";
  };
  /** Font weight */
  fontWeight?: number | string;
  /** Line height */
  lineHeight?: {
    size: number;
    unit: "px" | "em" | "" | "%";
  };
  /** Letter spacing */
  letterSpacing?: {
    size: number;
    unit: "px" | "em";
  };
  /** Text decoration */
  textDecoration?: "none" | "underline" | "line-through" | "overline";
  /** Text transform */
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
  /** Font style */
  fontStyle?: "normal" | "italic" | "oblique";
  /** Text align */
  textAlign?: "left" | "center" | "right" | "justify";
}

/**
 * Font loading status
 */
export interface FontLoadStatus {
  /** Font family name */
  family: string;
  /** Loading state */
  status: "loading" | "loaded" | "error" | "timeout";
  /** Error message if failed */
  error?: string;
}

/**
 * Font Variables Manager
 */
export class FontVariables {
  /** Available font families */
  private static fontFamilies: Map<string, FontFamily> = new Map();

  /** Loaded fonts tracking */
  private static loadedFonts: Set<string> = new Set();

  /** Font loading promises */
  private static loadingPromises: Map<string, Promise<void>> = new Map();

  /** Default font weights */
  private static readonly DEFAULT_WEIGHTS: FontWeight[] = [
    { value: 100, label: "Thin" },
    { value: 200, label: "Extra Light" },
    { value: 300, label: "Light" },
    { value: 400, label: "Regular" },
    { value: 500, label: "Medium" },
    { value: 600, label: "Semi Bold" },
    { value: 700, label: "Bold" },
    { value: 800, label: "Extra Bold" },
    { value: 900, label: "Black" },
  ];

  /** System font families */
  private static readonly SYSTEM_FONTS: FontFamily[] = [
    {
      name: "default",
      label: "Default",
      category: "system",
      webSafe: true,
      cssValue: "inherit",
    },
    {
      name: "Arial",
      label: "Arial",
      category: "sans-serif",
      webSafe: true,
      cssValue: "Arial, sans-serif",
    },
    {
      name: "Helvetica",
      label: "Helvetica",
      category: "sans-serif",
      webSafe: true,
      cssValue: "Helvetica, Arial, sans-serif",
    },
    {
      name: "Times New Roman",
      label: "Times New Roman",
      category: "serif",
      webSafe: true,
      cssValue: '"Times New Roman", Times, serif',
    },
    {
      name: "Georgia",
      label: "Georgia",
      category: "serif",
      webSafe: true,
      cssValue: "Georgia, serif",
    },
    {
      name: "Courier New",
      label: "Courier New",
      category: "monospace",
      webSafe: true,
      cssValue: '"Courier New", Courier, monospace',
    },
    {
      name: "Verdana",
      label: "Verdana",
      category: "sans-serif",
      webSafe: true,
      cssValue: "Verdana, Geneva, sans-serif",
    },
  ];

  /**
   * Initialize font families with system fonts
   */
  static init(): void {
    // Register system fonts
    this.SYSTEM_FONTS.forEach((font) => {
      this.registerFont(font);
    });

    // Load Elementor global fonts if available
    this.loadElementorFonts();
  }

  /**
   * Register a font family
   *
   * @param font - Font family configuration
   */
  static registerFont(font: FontFamily): void {
    // Set default weights if not provided
    if (!font.weights) {
      font.weights = this.DEFAULT_WEIGHTS;
    }

    // Set CSS value if not provided
    if (!font.cssValue) {
      font.cssValue = this.generateCssValue(font);
    }

    this.fontFamilies.set(font.name, font);
  }

  /**
   * Get font family by name
   *
   * @param name - Font family name
   * @returns Font family configuration
   */
  static getFont(name: string): FontFamily | undefined {
    return this.fontFamilies.get(name);
  }

  /**
   * Get all registered fonts
   *
   * @param category - Filter by category
   * @returns Array of font families
   */
  static getFonts(category?: string): FontFamily[] {
    const fonts = Array.from(this.fontFamilies.values());
    return category
      ? fonts.filter((font) => font.category === category)
      : fonts;
  }

  /**
   * Get font weights for a family
   *
   * @param fontFamily - Font family name
   * @returns Available font weights
   */
  static getFontWeights(fontFamily: string): FontWeight[] {
    const font = this.getFont(fontFamily);
    return font?.weights || this.DEFAULT_WEIGHTS;
  }

  /**
   * Load Google Font
   *
   * @param family - Google Font family name
   * @param weights - Font weights to load
   * @param subsets - Font subsets to load
   * @returns Promise that resolves when font is loaded
   */
  static async loadGoogleFont(
    family: string,
    weights: number[] = [400],
    subsets: string[] = ["latin"]
  ): Promise<void> {
    const fontKey = `${family}:${weights.join(",")},${subsets.join(",")}`;

    // Return existing promise if already loading
    if (this.loadingPromises.has(fontKey)) {
      return this.loadingPromises.get(fontKey);
    }

    // Return immediately if already loaded
    if (this.loadedFonts.has(fontKey)) {
      return Promise.resolve();
    }

    const loadPromise = this.doLoadGoogleFont(family, weights, subsets);
    this.loadingPromises.set(fontKey, loadPromise);

    try {
      await loadPromise;
      this.loadedFonts.add(fontKey);
    } catch (error) {
      console.error("Failed to load Google Font:", family, error);
    } finally {
      this.loadingPromises.delete(fontKey);
    }

    return loadPromise;
  }

  /**
   * Actually load Google Font
   */
  private static async doLoadGoogleFont(
    family: string,
    weights: number[],
    subsets: string[]
  ): Promise<void> {
    // Create font family string for Google Fonts
    const weightStr =
      weights.length > 1
        ? `:${weights.join(",")}`
        : weights[0] !== 400
        ? `:${weights[0]}`
        : "";
    const familyParam = `${family.replace(/\s+/g, "+")}${weightStr}`;
    const subsetsParam =
      subsets.length > 1 ? `&subset=${subsets.join(",")}` : "";

    const url = `https://fonts.googleapis.com/css?family=${familyParam}${subsetsParam}&display=swap`;

    // Load via link element
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;

    return new Promise((resolve, reject) => {
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to load font: ${family}`));
      document.head.appendChild(link);
    });
  }

  /**
   * Check if font is loaded
   *
   * @param fontFamily - Font family name
   * @returns Whether font is loaded
   */
  static isFontLoaded(fontFamily: string): boolean {
    // Check if it's a web safe font
    const font = this.getFont(fontFamily);
    if (font?.webSafe) {
      return true;
    }

    // Check if custom font is loaded
    try {
      return document.fonts
        ? document.fonts.check(`12px "${fontFamily}"`)
        : false;
    } catch {
      return false;
    }
  }

  /**
   * Generate CSS font-family value
   *
   * @param font - Font family configuration
   * @returns CSS font-family string
   */
  private static generateCssValue(font: FontFamily): string {
    if (font.cssValue) {
      return font.cssValue;
    }

    // Quote font names with spaces
    const quotedName = font.name.includes(" ") ? `"${font.name}"` : font.name;

    // Add fallback based on category
    const fallbacks: Record<string, string> = {
      serif: "serif",
      "sans-serif": "sans-serif",
      monospace: "monospace",
      cursive: "cursive",
      fantasy: "fantasy",
      system: "system-ui, -apple-system, sans-serif",
    };

    const fallback = fallbacks[font.category] || "sans-serif";
    return `${quotedName}, ${fallback}`;
  }

  /**
   * Create CSS custom properties from typography config
   *
   * @param config - Typography configuration
   * @param prefix - CSS variable prefix
   * @returns CSS custom properties object
   */
  static createCssVariables(
    config: TypographyConfig,
    prefix: string = "--elementor"
  ): Record<string, string> {
    const variables: Record<string, string> = {};

    if (config.fontFamily) {
      const font = this.getFont(config.fontFamily);
      variables[`${prefix}-font-family`] = font?.cssValue || config.fontFamily;
    }

    if (config.fontSize) {
      variables[
        `${prefix}-font-size`
      ] = `${config.fontSize.size}${config.fontSize.unit}`;
    }

    if (config.fontWeight) {
      variables[`${prefix}-font-weight`] = config.fontWeight.toString();
    }

    if (config.lineHeight) {
      variables[
        `${prefix}-line-height`
      ] = `${config.lineHeight.size}${config.lineHeight.unit}`;
    }

    if (config.letterSpacing) {
      variables[
        `${prefix}-letter-spacing`
      ] = `${config.letterSpacing.size}${config.letterSpacing.unit}`;
    }

    if (config.textDecoration) {
      variables[`${prefix}-text-decoration`] = config.textDecoration;
    }

    if (config.textTransform) {
      variables[`${prefix}-text-transform`] = config.textTransform;
    }

    if (config.fontStyle) {
      variables[`${prefix}-font-style`] = config.fontStyle;
    }

    if (config.textAlign) {
      variables[`${prefix}-text-align`] = config.textAlign;
    }

    return variables;
  }

  /**
   * Apply CSS variables to element
   *
   * @param element - Target element
   * @param variables - CSS variables to apply
   */
  static applyCssVariables(
    element: HTMLElement,
    variables: Record<string, string>
  ): void {
    Object.entries(variables).forEach(([property, value]) => {
      element.style.setProperty(property, value);
    });
  }

  /**
   * Load Elementor global fonts
   */
  private static loadElementorFonts(): void {
    const elementor = (globalThis as any).elementor;
    if (!elementor?.config?.settings?.fonts) {
      return;
    }

    const fonts = elementor.config.settings.fonts;

    // Process each font
    Object.entries(fonts).forEach(([key, fontData]: [string, any]) => {
      if (fontData.font_family) {
        const font: FontFamily = {
          name: fontData.font_family,
          label: fontData.font_family,
          category: fontData.generic_family || "sans-serif",
          googleFamily: fontData.font_family,
          weights:
            fontData.variants?.map((variant: any) => ({
              value: parseInt(variant.replace(/\D/g, "")) || 400,
              label: variant,
              available: true,
            })) || this.DEFAULT_WEIGHTS,
        };

        this.registerFont(font);
      }
    });
  }

  /**
   * Preload font for better performance
   *
   * @param fontFamily - Font family to preload
   * @param weight - Font weight to preload
   */
  static preloadFont(fontFamily: string, weight: number = 400): void {
    const font = this.getFont(fontFamily);
    if (!font || font.webSafe) {
      return;
    }

    // Create preload link
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "font";
    link.type = "font/woff2";
    link.crossOrigin = "anonymous";

    if (font.googleFamily) {
      // For Google Fonts, we need to construct the font URL
      const familyName = font.googleFamily.replace(/\s+/g, "+");
      link.href = `https://fonts.gstatic.com/s/font-family-name/${weight}.woff2`;
    }

    document.head.appendChild(link);
  }

  /**
   * Get font loading status
   *
   * @param fontFamily - Font family name
   * @returns Font loading status
   */
  static getFontLoadStatus(fontFamily: string): FontLoadStatus {
    const font = this.getFont(fontFamily);

    if (!font) {
      return { family: fontFamily, status: "error", error: "Font not found" };
    }

    if (font.webSafe) {
      return { family: fontFamily, status: "loaded" };
    }

    const fontKey = `${fontFamily}:400,latin`;

    if (this.loadedFonts.has(fontKey)) {
      return { family: fontFamily, status: "loaded" };
    }

    if (this.loadingPromises.has(fontKey)) {
      return { family: fontFamily, status: "loading" };
    }

    return { family: fontFamily, status: "error", error: "Font not loaded" };
  }

  /**
   * Create typography CSS string from config
   *
   * @param config - Typography configuration
   * @returns CSS string
   */
  static createTypographyCSS(config: TypographyConfig): string {
    const styles: string[] = [];

    if (config.fontFamily) {
      const font = this.getFont(config.fontFamily);
      styles.push(`font-family: ${font?.cssValue || config.fontFamily}`);
    }

    if (config.fontSize) {
      styles.push(`font-size: ${config.fontSize.size}${config.fontSize.unit}`);
    }

    if (config.fontWeight) {
      styles.push(`font-weight: ${config.fontWeight}`);
    }

    if (config.lineHeight) {
      styles.push(
        `line-height: ${config.lineHeight.size}${config.lineHeight.unit}`
      );
    }

    if (config.letterSpacing) {
      styles.push(
        `letter-spacing: ${config.letterSpacing.size}${config.letterSpacing.unit}`
      );
    }

    if (config.textDecoration) {
      styles.push(`text-decoration: ${config.textDecoration}`);
    }

    if (config.textTransform) {
      styles.push(`text-transform: ${config.textTransform}`);
    }

    if (config.fontStyle) {
      styles.push(`font-style: ${config.fontStyle}`);
    }

    if (config.textAlign) {
      styles.push(`text-align: ${config.textAlign}`);
    }

    return styles.join("; ");
  }

  /**
   * Clear font cache
   */
  static clearCache(): void {
    this.loadedFonts.clear();
    this.loadingPromises.clear();
  }

  /**
   * Get fonts grouped by category
   *
   * @returns Fonts grouped by category
   */
  static getFontsGrouped(): Record<string, FontFamily[]> {
    const grouped: Record<string, FontFamily[]> = {};

    this.fontFamilies.forEach((font) => {
      if (!grouped[font.category]) {
        grouped[font.category] = [];
      }
      grouped[font.category].push(font);
    });

    return grouped;
  }
}

// Initialize font variables on load
if (typeof window !== "undefined") {
  FontVariables.init();
}
