/**
 * Base Handler Classes
 * Foundation handler classes for Elementor frontend
 */

import type { ViewModule, ModuleElements } from "../../core";

/**
 * Base handler class for all Elementor frontend handlers
 */
export declare class Base extends ViewModule {
  $element: JQuery<HTMLElement>;
  isEdit: boolean;
  editorListeners: any[] | null;

  constructor(settings: { $element: JQuery<HTMLElement> });

  /**
   * Check if handler is active based on settings
   */
  isActive(settings?: any): boolean;

  /**
   * Check if element is in the current document
   */
  isElementInTheCurrentDocument(): boolean;

  /**
   * Get unique handler ID
   */
  getUniqueHandlerID(cid?: string, $element?: JQuery<HTMLElement>): string;

  /**
   * Editor listeners management
   */
  initEditorListeners(): void;
  getEditorListeners(): any[];
  addEditorListeners(): void;
  removeEditorListeners(): void;

  /**
   * Element information getters
   */
  getElementType(): string;
  getWidgetType(): string | undefined;
  getID(): string;
  getModelCID(): string;

  /**
   * Settings management
   */
  getElementSettings(setting?: string): any;
  getEditSettings(setting?: string): any;
  getCurrentDeviceSetting(settingKey: string): any;

  /**
   * Event handlers (optional)
   */
  onElementChange?(propertyName: string): void;
  onEditSettingsChange?(propertyName: string): void;
  onPageSettingsChange?(propertyName: string): void;
  onDestroy(): void;
}

/**
 * Extended base for elements that support stretching
 */
export declare class StretchedElement extends Base {
  stretchElement: any; // ElementorModules.frontend.tools.StretchElement

  getStretchedClass(): string;
  getStretchSettingName(): string;
  getStretchActiveValue(): string;
  stretch(): void;
  initStretch(): void;
  getStretchContainer(): Window | string;
  isStretchSettingEnabled(): boolean;
  onKitChangeStretchContainerChange(): void;
  getStretchElementForConfig(
    childSelector?: string | null
  ): JQuery<HTMLElement>;
  getStretchElementConfig(): object;
}
