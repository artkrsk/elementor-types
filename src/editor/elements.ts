/**
 * Element System Types
 * Core element classes and element management system
 */

/**
 * Widget cache interface for elementor.widgetsCache integration
 */
export interface WidgetCache {
  [widgetType: string]: {
    widget_type?: string;
    title?: string;
    icon?: string;
    categories?: string[];
    [key: string]: any;
  };
}

/**
 * Experimental features configuration
 */
export interface ExperimentalFeatures {
  container?: boolean;
  [feature: string]: boolean | undefined;
}

/**
 * Base element type identifier
 * Core element types that are always available
 */
export type CoreElementType =
  | "section"
  | "column"
  | "widget"
  | "container"
  | "document"
  | "inner-section";

/**
 * Extended element type that includes custom widget types
 * Allows any string for dynamic widget registration
 */
export type ElementType = CoreElementType | string;

/**
 * Element registration errors
 */
export class ElementRegistrationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ElementRegistrationError";
  }
}

export class ElementValidationError extends TypeError {
  constructor(message: string) {
    super(message);
    this.name = "ElementValidationError";
  }
}

/**
 * Base element interface that all element types must implement
 * Matches the JavaScript ElementBase class structure
 */
export interface ElementBase {
  /**
   * Get the element type
   * @returns Element type string
   */
  getType(): string;

  /**
   * Get the Marionette view for this element
   * Note: Document elements don't implement this method
   */
  getView?(): any; // Marionette.View

  /**
   * Get the empty view component (React component)
   * Note: Document elements don't implement this method
   */
  getEmptyView?(): any; // React.Component

  /**
   * Get the Backbone model for this element
   * @returns Element model class/constructor
   */
  getModel(): any; // BaseElementModel constructor
}

/**
 * Section element type
 */
export interface Section extends ElementBase {
  getType(): "section";
  getView(): any; // SectionView
  getEmptyView?(): any; // React component
  getModel(): any; // SectionModel
}

/**
 * Column element type
 */
export interface Column extends ElementBase {
  getType(): "column";
  getView(): any; // ColumnView
  getEmptyView?(): any; // React component
  getModel(): any; // ColumnModel
}

/**
 * Widget element type
 */
export interface Widget extends ElementBase {
  getType(): "widget";
  getView(): any; // WidgetView
  getEmptyView?(): any; // React component
  getModel(): any; // WidgetModel
}

/**
 * Container element type (experimental feature)
 */
export interface Container extends ElementBase {
  getType(): "container";
  getView(): any; // ContainerView
  getEmptyView(): any; // EmptyComponent - required for Container
  getModel(): any; // ContainerModel
}

/**
 * Document element type
 * Note: Document elements don't have view or empty view methods
 */
export interface Document extends ElementBase {
  getType(): "document";
  getModel(): any; // DocumentModel
  // Document doesn't have getView() or getEmptyView() methods
}

/**
 * Inner section element type
 */
export interface InnerSection extends ElementBase {
  getType(): "inner-section";
  getView(): any; // InnerSectionView
  getEmptyView?(): any; // React component
  getModel(): any; // InnerSectionModel
}

/**
 * Union type of all element types
 */
export type AnyElement =
  | Section
  | Column
  | Widget
  | Container
  | Document
  | InnerSection;

/**
 * Elements manager interface
 */
export interface ElementsManager {
  /**
   * Registered element types - allows any string key for custom widget types
   */
  elementTypes: Record<string, ElementBase>;

  /**
   * Get element type class by type name
   * Includes widget fallback logic for unregistered widgets
   * @param type - Element type name
   * @returns Element type class or undefined if not found
   */
  getElementTypeClass(type: string): ElementBase | undefined;

  /**
   * Register a new element type
   * @param element - Element instance to register
   * @throws {TypeError} When element is not an instance of ElementBase
   * @throws {Error} When element type is already registered
   */
  registerElementType(element: ElementBase): void;

  /**
   * Register all base element types
   * Automatically registers all elements from types and handles conditional container registration
   */
  registerElements(): void;
}

/**
 * Enhanced Elements manager with widget cache integration
 * This interface extends the basic ElementsManager to include widget fallback logic
 */
export interface ElementsManagerWithCache extends ElementsManager {
  /**
   * Get element type class with widget cache fallback
   * If the exact widget type isn't registered but exists in elementor.widgetsCache,
   * returns the base widget element type
   * @param type - Element type name
   * @param widgetsCache - Widget cache from elementor.widgetsCache
   * @returns Element type class or undefined if not found
   */
  getElementTypeClassWithFallback(
    type: string,
    widgetsCache?: WidgetCache
  ): ElementBase | undefined;

  /**
   * Register container element conditionally based on experimental features
   * @param experimentalFeatures - Experimental features configuration
   */
  registerContainerIfEnabled(experimentalFeatures?: ExperimentalFeatures): void;
}

/**
 * Element constructors interface
 */
export interface ElementConstructors {
  Section: new () => Section;
  Column: new () => Column;
  Widget: new () => Widget;
  Container: new () => Container;
  Document: new () => Document;
  InnerSection: new () => InnerSection;
}

/**
 * Element type registry for typed access
 */
export interface ElementTypeRegistry {
  section: Section;
  column: Column;
  widget: Widget;
  container: Container;
  document: Document;
  "inner-section": InnerSection;
}
