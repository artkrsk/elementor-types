/**
 * Elementor Editor Color Picker Utility
 *
 * Provides color picker functionality and color manipulation utilities
 * for the Elementor editor interface.
 */

/**
 * RGB color values
 */
export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

/**
 * RGBA color values
 */
export interface RGBAColor extends RGBColor {
  a: number;
}

/**
 * HSL color values
 */
export interface HSLColor {
  h: number;
  s: number;
  l: number;
}

/**
 * HSV color values
 */
export interface HSVColor {
  h: number;
  s: number;
  v: number;
}

/**
 * Color picker configuration
 */
export interface ColorPickerConfig {
  /** Initial color value */
  color?: string;
  /** Show alpha channel control */
  alpha?: boolean;
  /** Color format preference */
  format?: "hex" | "rgb" | "rgba" | "hsl" | "hsla";
  /** Color palette */
  palette?: string[];
  /** Allow palette only selection */
  paletteOnly?: boolean;
  /** Show input field */
  showInput?: boolean;
  /** Show initial color */
  showInitial?: boolean;
  /** Show palette */
  showPalette?: boolean;
  /** Show selection palette */
  showSelectionPalette?: boolean;
  /** Clickout fires change */
  clickoutFiresChange?: boolean;
  /** Show buttons */
  showButtons?: boolean;
  /** Container class */
  containerClassName?: string;
  /** Replacement element */
  replacerClassName?: string;
  /** Preferred format */
  preferredFormat?: string;
  /** Maximum selection size */
  maxSelectionSize?: number;
  /** Local storage key */
  localStorageKey?: string;
  /** Callback functions */
  callbacks?: {
    beforeShow?: (color: any) => void;
    show?: (color: any) => void;
    hide?: (color: any) => void;
    change?: (color: any) => void;
    move?: (color: any) => void;
  };
}

/**
 * Color manipulation utilities
 */
export class ColorUtils {
  /**
   * Convert hex color to RGB
   *
   * @param hex - Hex color string
   * @returns RGB color object
   */
  static hexToRgb(hex: string): RGBColor | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  /**
   * Convert RGB color to hex
   *
   * @param rgb - RGB color object
   * @returns Hex color string
   */
  static rgbToHex(rgb: RGBColor): string {
    const componentToHex = (c: number): string => {
      const hex = Math.round(c).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${componentToHex(rgb.r)}${componentToHex(rgb.g)}${componentToHex(
      rgb.b
    )}`;
  }

  /**
   * Convert RGB to HSL
   *
   * @param rgb - RGB color object
   * @returns HSL color object
   */
  static rgbToHsl(rgb: RGBColor): HSLColor {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h: number, s: number;
    const l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          h = 0;
      }

      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }

  /**
   * Convert HSL to RGB
   *
   * @param hsl - HSL color object
   * @returns RGB color object
   */
  static hslToRgb(hsl: HSLColor): RGBColor {
    const h = hsl.h / 360;
    const s = hsl.s / 100;
    const l = hsl.l / 100;

    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    let r: number, g: number, b: number;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  }

  /**
   * Lighten a color by percentage
   *
   * @param color - Color in any supported format
   * @param percent - Percentage to lighten (0-100)
   * @returns Lightened color in hex format
   */
  static lighten(color: string, percent: number): string {
    const rgb = this.parseColor(color);
    if (!rgb) return color;

    const hsl = this.rgbToHsl(rgb);
    hsl.l = Math.min(100, hsl.l + percent);

    const newRgb = this.hslToRgb(hsl);
    return this.rgbToHex(newRgb);
  }

  /**
   * Darken a color by percentage
   *
   * @param color - Color in any supported format
   * @param percent - Percentage to darken (0-100)
   * @returns Darkened color in hex format
   */
  static darken(color: string, percent: number): string {
    const rgb = this.parseColor(color);
    if (!rgb) return color;

    const hsl = this.rgbToHsl(rgb);
    hsl.l = Math.max(0, hsl.l - percent);

    const newRgb = this.hslToRgb(hsl);
    return this.rgbToHex(newRgb);
  }

  /**
   * Get color contrast ratio
   *
   * @param color1 - First color
   * @param color2 - Second color
   * @returns Contrast ratio
   */
  static getContrastRatio(color1: string, color2: string): number {
    const luminance1 = this.getLuminance(color1);
    const luminance2 = this.getLuminance(color2);

    const brightest = Math.max(luminance1, luminance2);
    const darkest = Math.min(luminance1, luminance2);

    return (brightest + 0.05) / (darkest + 0.05);
  }

  /**
   * Get color luminance
   *
   * @param color - Color string
   * @returns Luminance value (0-1)
   */
  static getLuminance(color: string): number {
    const rgb = this.parseColor(color);
    if (!rgb) return 0;

    const rsRGB = rgb.r / 255;
    const gsRGB = rgb.g / 255;
    const bsRGB = rgb.b / 255;

    const r =
      rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
    const g =
      gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
    const b =
      bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  /**
   * Check if color meets WCAG contrast requirements
   *
   * @param foreground - Foreground color
   * @param background - Background color
   * @param level - WCAG level ('AA' or 'AAA')
   * @returns Whether contrast requirement is met
   */
  static meetsContrastRequirement(
    foreground: string,
    background: string,
    level: "AA" | "AAA" = "AA"
  ): boolean {
    const ratio = this.getContrastRatio(foreground, background);
    return level === "AA" ? ratio >= 4.5 : ratio >= 7;
  }

  /**
   * Parse color string to RGB
   *
   * @param color - Color string in various formats
   * @returns RGB color object or null
   */
  static parseColor(color: string): RGBColor | null {
    // Hex format
    if (color.startsWith("#")) {
      return this.hexToRgb(color);
    }

    // RGB format
    const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatch) {
      return {
        r: parseInt(rgbMatch[1], 10),
        g: parseInt(rgbMatch[2], 10),
        b: parseInt(rgbMatch[3], 10),
      };
    }

    // RGBA format
    const rgbaMatch = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/);
    if (rgbaMatch) {
      return {
        r: parseInt(rgbaMatch[1], 10),
        g: parseInt(rgbaMatch[2], 10),
        b: parseInt(rgbaMatch[3], 10),
      };
    }

    // Named colors
    const namedColors: Record<string, RGBColor> = {
      white: { r: 255, g: 255, b: 255 },
      black: { r: 0, g: 0, b: 0 },
      red: { r: 255, g: 0, b: 0 },
      green: { r: 0, g: 128, b: 0 },
      blue: { r: 0, g: 0, b: 255 },
      yellow: { r: 255, g: 255, b: 0 },
      cyan: { r: 0, g: 255, b: 255 },
      magenta: { r: 255, g: 0, b: 255 },
      transparent: { r: 0, g: 0, b: 0 },
    };

    return namedColors[color.toLowerCase()] || null;
  }

  /**
   * Format color as string
   *
   * @param rgb - RGB color object
   * @param format - Output format
   * @param alpha - Alpha value for rgba/hsla
   * @returns Formatted color string
   */
  static formatColor(
    rgb: RGBColor,
    format: string = "hex",
    alpha?: number
  ): string {
    switch (format.toLowerCase()) {
      case "hex":
        return this.rgbToHex(rgb);
      case "rgb":
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      case "rgba":
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha || 1})`;
      case "hsl":
        const hsl = this.rgbToHsl(rgb);
        return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      case "hsla":
        const hsla = this.rgbToHsl(rgb);
        return `hsla(${hsla.h}, ${hsla.s}%, ${hsla.l}%, ${alpha || 1})`;
      default:
        return this.rgbToHex(rgb);
    }
  }

  /**
   * Generate color palette
   *
   * @param baseColor - Base color for palette
   * @param count - Number of colors to generate
   * @returns Array of color strings
   */
  static generatePalette(baseColor: string, count: number = 5): string[] {
    const colors: string[] = [];
    const rgb = this.parseColor(baseColor);

    if (!rgb) {
      return [baseColor];
    }

    const hsl = this.rgbToHsl(rgb);

    for (let i = 0; i < count; i++) {
      const lightness = (i / (count - 1)) * 100;
      const newHsl = { ...hsl, l: lightness };
      const newRgb = this.hslToRgb(newHsl);
      colors.push(this.rgbToHex(newRgb));
    }

    return colors;
  }

  /**
   * Get complementary color
   *
   * @param color - Base color
   * @returns Complementary color
   */
  static getComplementary(color: string): string {
    const rgb = this.parseColor(color);
    if (!rgb) return color;

    const hsl = this.rgbToHsl(rgb);
    hsl.h = (hsl.h + 180) % 360;

    const newRgb = this.hslToRgb(hsl);
    return this.rgbToHex(newRgb);
  }

  /**
   * Get analogous colors
   *
   * @param color - Base color
   * @param count - Number of analogous colors
   * @returns Array of analogous colors
   */
  static getAnalogous(color: string, count: number = 3): string[] {
    const colors: string[] = [];
    const rgb = this.parseColor(color);

    if (!rgb) {
      return [color];
    }

    const hsl = this.rgbToHsl(rgb);
    const step = 30; // 30 degrees apart

    for (let i = 0; i < count; i++) {
      const hue = (hsl.h + i * step) % 360;
      const newHsl = { ...hsl, h: hue };
      const newRgb = this.hslToRgb(newHsl);
      colors.push(this.rgbToHex(newRgb));
    }

    return colors;
  }

  /**
   * Get triadic colors
   *
   * @param color - Base color
   * @returns Array of triadic colors
   */
  static getTriadic(color: string): string[] {
    const rgb = this.parseColor(color);
    if (!rgb) return [color];

    const hsl = this.rgbToHsl(rgb);
    const colors = [color];

    // Add colors 120 degrees apart
    for (let i = 1; i < 3; i++) {
      const hue = (hsl.h + i * 120) % 360;
      const newHsl = { ...hsl, h: hue };
      const newRgb = this.hslToRgb(newHsl);
      colors.push(this.rgbToHex(newRgb));
    }

    return colors;
  }
}

/**
 * Color picker wrapper utilities
 */
export class ColorPicker {
  private element: JQuery;
  private config: ColorPickerConfig;
  private currentColor: string;

  /**
   * Constructor
   *
   * @param element - Target element
   * @param config - Color picker configuration
   */
  constructor(
    element: JQuery | HTMLElement | string,
    config: ColorPickerConfig = {}
  ) {
    this.element =
      typeof element === "string"
        ? ($(element) as JQuery)
        : element instanceof HTMLElement
        ? ($(element) as JQuery)
        : element;
    this.config = config;
    this.currentColor = config.color || "#ffffff";

    this.init();
  }

  /**
   * Initialize color picker
   */
  private init(): void {
    // Default configuration
    const defaultConfig = {
      showInput: true,
      showPalette: true,
      showSelectionPalette: true,
      showInitial: true,
      showButtons: false,
      clickoutFiresChange: true,
      preferredFormat: "hex",
      palette: [
        ["#000000", "#ffffff", "#ff0000", "#00ff00", "#0000ff"],
        ["#ffff00", "#ff00ff", "#00ffff", "#888888", "#444444"],
      ],
    };

    const finalConfig = { ...defaultConfig, ...this.config };

    // Initialize spectrum color picker if available
    if (typeof (this.element as any).spectrum === "function") {
      (this.element as any).spectrum({
        ...finalConfig,
        change: (color: any) => {
          this.currentColor = color.toString();
          this.config.callbacks?.change?.(color);
        },
        move: (color: any) => {
          this.config.callbacks?.move?.(color);
        },
        show: (color: any) => {
          this.config.callbacks?.show?.(color);
        },
        hide: (color: any) => {
          this.config.callbacks?.hide?.(color);
        },
        beforeShow: (color: any) => {
          this.config.callbacks?.beforeShow?.(color);
        },
      });
    }
  }

  /**
   * Get current color
   *
   * @returns Current color value
   */
  getColor(): string {
    return this.currentColor;
  }

  /**
   * Set color
   *
   * @param color - Color to set
   */
  setColor(color: string): void {
    this.currentColor = color;
    if (typeof (this.element as any).spectrum === "function") {
      (this.element as any).spectrum("set", color);
    }
  }

  /**
   * Show color picker
   */
  show(): void {
    if (typeof (this.element as any).spectrum === "function") {
      (this.element as any).spectrum("show");
    }
  }

  /**
   * Hide color picker
   */
  hide(): void {
    if (typeof (this.element as any).spectrum === "function") {
      (this.element as any).spectrum("hide");
    }
  }

  /**
   * Destroy color picker
   */
  destroy(): void {
    if (typeof (this.element as any).spectrum === "function") {
      (this.element as any).spectrum("destroy");
    }
  }

  /**
   * Create simple color picker instance
   *
   * @param element - Target element
   * @param config - Configuration options
   * @returns ColorPicker instance
   */
  static create(
    element: JQuery | HTMLElement | string,
    config: ColorPickerConfig = {}
  ): ColorPicker {
    return new ColorPicker(element, config);
  }

  /**
   * Create Elementor global color picker
   *
   * @param element - Target element
   * @param config - Additional configuration
   * @returns ColorPicker instance
   */
  static createElementorPicker(
    element: JQuery | HTMLElement | string,
    config: ColorPickerConfig = {}
  ): ColorPicker {
    // Get Elementor global colors
    const elementorColors =
      (globalThis as any).elementor?.config?.settings?.colors || [];

    const elementorConfig: ColorPickerConfig = {
      showPalette: true,
      showSelectionPalette: true,
      palette: [elementorColors],
      localStorageKey: "elementor-color-picker",
      ...config,
    };

    return new ColorPicker(element, elementorConfig);
  }
}

// Export types for external use - no global declarations
export interface SpectrumJQuery {
  spectrum(options?: any): SpectrumJQuery;
  spectrum(method: string, ...args: any[]): any;
}

// Local jQuery declaration for internal use
declare const $: any;
