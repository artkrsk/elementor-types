/**
 * Frontend Icons Utilities
 * SVG icon creation and management for Elementor frontend
 */

/**
 * SVG creation options for icons
 */
export interface SvgIconOptions {
  /** SVG path data */
  path: string;
  /** Icon width */
  width: number;
  /** Icon height */  
  height: number;
}

/**
 * SVG node creation options
 */
export interface SvgNodeOptions {
  /** Properties to set on the node */
  props?: { [key: string]: any };
  /** Attributes to set on the node */
  attrs?: { [key: string]: string | number };
}

/**
 * SVG icon element creation options
 */
export interface SvgIconElementOptions {
  /** Icon name with prefix */
  iconName: string;
  /** CSS selector for the icon */
  iconSelector: string;
}

/**
 * Symbol element creation options
 */
export interface SymbolElementOptions {
  /** Symbol ID */
  id: string;
  /** SVG path data */
  path: string;
  /** Symbol width */
  width: number;
  /** Symbol height */
  height: number;
}

/**
 * Icons Manager for creating and managing SVG icons
 * Handles SVG symbol containers and icon creation
 */
export declare class IconsManager {
  /** Global SVG symbols container */
  static symbolsContainer: SVGElement | null;
  
  /** List of icons that have been used/created */
  static iconsUsageList: string[];

  /** Icon prefix for this manager instance */
  prefix: string;

  /**
   * Create new IconsManager instance
   * @param elementsPrefix - Prefix to use for icon names
   */
  constructor(elementsPrefix: string);

  /**
   * Create SVG element with symbol reference
   * @param name - Icon name (without prefix)
   * @param options - Icon configuration (path, width, height)
   * @returns SVG element ready for DOM insertion
   */
  createSvgElement(name: string, options: SvgIconOptions): SVGElement;

  /**
   * Create SVG node with specified tag and attributes
   * @param tag - SVG tag name (svg, symbol, path, etc.)
   * @param options - Node properties and attributes
   * @returns Created SVG element
   */
  createSvgNode(tag: string, options: SvgNodeOptions): SVGElement;

  /**
   * Create SVG icon element that references a symbol
   * @param options - Icon name and selector
   * @returns SVG element with use tag
   */
  createSvgIconElement(options: SvgIconElementOptions): SVGElement;

  /**
   * Create or ensure SVG symbols container exists in DOM
   * Sets up the global symbols container if not already present
   */
  createSvgSymbolsContainer(): void;

  /**
   * Create symbol element for reuse
   * @param options - Symbol configuration
   * @returns Symbol element for symbols container
   */
  createSymbolElement(options: SymbolElementOptions): SVGElement;
}

/**
 * E-Icons utility for Elementor-specific icon handling
 */
export declare class EIcons {
  // E-Icons specific functionality would be defined here
  // Based on e-icons.js implementation
}