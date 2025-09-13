/**
 * Element System Types
 * Core element classes and element management system
 */

/**
 * Base element type identifier
 */
export type ElementType =
  | "section"
  | "column"
  | "widget"
  | "container"
  | "document"
  | "inner-section";

/**
 * Base element interface that all element types must implement
 */
export interface ElementBase {
  /**
   * Get the element type
   */
  getType(): ElementType;

  /**
   * Get the Marionette view for this element
   */
  getView?(): any; // Marionette.View - making optional since Document doesn't have a view

  /**
   * Get the empty view component (React component)
   */
  getEmptyView?(): any; // React.Component

  /**
   * Get the Backbone model for this element
   */
  getModel(): any; // BaseElementModel
}

/**
 * Section element type
 */
export interface Section extends ElementBase {
  getType(): "section";
  getView(): any;
}

/**
 * Column element type
 */
export interface Column extends ElementBase {
  getType(): "column";
  getView(): any;
}

/**
 * Widget element type
 */
export interface Widget extends ElementBase {
  getType(): "widget";
  getView(): any;
}

/**
 * Container element type
 */
export interface Container extends ElementBase {
  getType(): "container";
  getView(): any;
  getEmptyView(): any; // EmptyComponent
}

/**
 * Document element type
 */
export interface Document extends ElementBase {
  getType(): "document";
  // Document doesn't have a view method
}

/**
 * Inner section element type
 */
export interface InnerSection extends ElementBase {
  getType(): "inner-section";
  getView(): any;
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
   * Registered element types
   */
  elementTypes: Record<ElementType, ElementBase>;

  /**
   * Get element type class by type name
   */
  getElementTypeClass(type: ElementType): ElementBase | undefined;

  /**
   * Register a new element type
   */
  registerElementType(element: ElementBase): void;

  /**
   * Register all base element types
   */
  registerElements(): void;
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
