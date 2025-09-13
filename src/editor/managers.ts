/**
 * Editor Managers
 * Various manager interfaces for editor functionality
 */

/**
 * Template library interface
 */
export interface TemplateLibrary {
  getFilter(name: string): any;
  setFilter(name: string, value: any): void;
}

/**
 * Dynamic tags interface
 */
export interface DynamicTags {
  parseTagsText(text: string, settings: object): string;
  getTagDataContent(id: string, name: string, settings: object): any;
  tagTextToTagData(tagText: string): object;
  tagDataToTagText(tagData: object): string;
}

/**
 * Notifications interface
 */
export interface Notifications {
  showToast(options: {
    message: string;
    type?: "info" | "success" | "warning" | "error";
    duration?: number;
    buttons?: Array<{
      text: string;
      callback: Function;
      type?: string;
    }>;
  }): void;
}

/**
 * Introduction tooltips interface
 */
export interface IntroductionTooltips {
  show(id: string): void;
  hide(id: string): void;
  register(id: string, config: object): void;
  hasViewed(id: string): boolean;
  markAsViewed(id: string): void;
  getTooltips(): object;
}

/**
 * Validator interface
 */
export interface Validator {
  validate(value: any, validationTerms: object): boolean;
  getErrorMessage(): string;
  normalizeValidationTerms(validationTerms: any): object;
  addValidationMethod(methodName: string, method: Function): void;
}

/**
 * Elementor globals interface
 */
export interface ElementorGlobals {
  typography: object;
  colors: object;

  get(id: string): any;
  set(id: string, value: any): void;
  getAll(): object;
  update(id: string, value: any): void;
}

/**
 * Icons manager base interface
 */
export interface IconsManager {
  prefix: string;
  createSvgElement(
    name: string,
    options: { path: string; width: number; height: number }
  ): SVGElement;
  createSvgNode(
    tag: string,
    options: { props?: object; attrs?: object }
  ): SVGElement;
  createSvgIconElement(options: {
    iconName: string;
    iconSelector: string;
  }): SVGElement;
  createSvgSymbolsContainer(): void;
  createSymbolElement(options: {
    id: string;
    path: string;
    width: number;
    height: number;
  }): SVGElement;
}

/**
 * Extended Elementor icons manager interface
 */
export interface ElementorIconsManager extends IconsManager {
  enqueueIconFonts(iconType: string): void;
  getIconLibraries(): object;
  registerIconLibrary(libraryName: string, config: object): void;
  renderIcon(icon: object, attributes?: object, tag?: string): string;
  renderUploadedSVG(value: object, attributes?: object, tag?: string): string;
  isIconLibraryLoaded(libraryName: string): boolean;
  loadIconLibrary(libraryName: string): Promise<void>;
}
