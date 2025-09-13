/**
 * Elementor Window Elements
 *
 * TypeScript definitions for window.elementor.modules.elements
 * Based on the actual JavaScript element implementations
 */

import type { Module } from '../../core/modules';

/**
 * Base Element Model interface
 */
export interface BaseElementModel {
  /** Element ID */
  id: string;

  /** Element type */
  elType: string;

  /** Whether element is inner element */
  isInner: boolean;

  /** Whether element is locked */
  isLocked: boolean;

  /** Element settings */
  settings: Record<string, any>;

  /** Default edit settings */
  defaultEditSettings: {
    defaultEditRoute: string;
  };

  /** Get attribute value */
  get(key: string): any;

  /** Set attribute value */
  set(key: string | Record<string, any>, value?: any): void;

  /** Convert to JSON */
  toJSON(): Record<string, any>;

  /** Initialize model */
  initialize(options?: any): void;

  /** Save model */
  save(attributes?: any, options?: any): void;

  /** Destroy model */
  destroy(options?: any): void;
}

/**
 * Element Model interface
 */
export interface ElementModel extends BaseElementModel {
  /** Remote render flag */
  remoteRender: boolean;

  /** HTML cache */
  _htmlCache: string | null;

  /** jQuery XHR reference */
  _jqueryXhr: any;

  /** Render on leave flag */
  renderOnLeave: boolean;

  /** Elements collection */
  elements?: any;

  /** Set HTML cache */
  setHtmlCache(html: string): void;

  /** Get HTML cache */
  getHtmlCache(): string | null;

  /** Render on remote server */
  renderRemoteServer(): void;

  /** Initialize settings */
  initSettings(): void;

  /** Initialize edit settings */
  initEditSettings(): void;
}

/**
 * Base Element interface - foundation for all element types
 */
export interface ElementBase {
  /** Get element type */
  getType(): string;

  /** Get element view */
  getView(): any;

  /** Get empty view */
  getEmptyView(): any;

  /** Get element model */
  getModel(): BaseElementModel;
}

/**
 * Base Widget interface
 */
export interface BaseWidget extends ElementBase {
  /** Widget type */
  widgetType: string;

  /** Get widget controls */
  getControls(): Record<string, any>;

  /** Get widget settings */
  getSettings(key?: string): any;

  /** Set widget settings */
  setSettings(key: string | Record<string, any>, value?: any): void;

  /** Render widget */
  render(): void;
}

/**
 * Widget Element interface
 */
export interface WidgetElement extends BaseWidget {
  /** Initialize widget */
  onInit(): void;

  /** On element ready */
  onElementReady(): void;

  /** On settings change */
  onSettingsChange(): void;

  /** Get default settings */
  getDefaultSettings(): Record<string, any>;

  /** Get default elements */
  getDefaultElements(): Record<string, any>;

  /** Bind events */
  bindEvents(): void;
}

/**
 * Section Element interface
 */
export interface SectionElement extends ElementBase {
  /** Section layout type */
  layoutType: string;

  /** Get section columns */
  getColumns(): any[];

  /** Add column */
  addColumn(options?: any): void;

  /** Remove column */
  removeColumn(index: number): void;
}

/**
 * Column Element interface
 */
export interface ColumnElement extends ElementBase {
  /** Column width */
  width: number;

  /** Get column widgets */
  getWidgets(): any[];

  /** Add widget */
  addWidget(widgetType: string, options?: any): void;

  /** Remove widget */
  removeWidget(index: number): void;
}

/**
 * Container Element interface
 */
export interface ContainerElement extends ElementBase {
  /** Container type */
  containerType: string;

  /** Get child elements */
  getChildren(): ElementBase[];

  /** Add child element */
  addChild(element: ElementBase, options?: any): void;

  /** Remove child element */
  removeChild(element: ElementBase): void;
}

/**
 * Element Types interface - constructors for element types
 */
export interface ElementTypes {
  /** Base element class */
  Base: new (...args: any[]) => ElementBase;

  /** Widget element class */
  Widget: new (...args: any[]) => WidgetElement;

  /** Section element class */
  Section: new (...args: any[]) => SectionElement;

  /** Column element class */
  Column: new (...args: any[]) => ColumnElement;

  /** Container element class */
  Container: new (...args: any[]) => ContainerElement;

  /** Dynamic element types */
  [elementType: string]: any;
}

/**
 * Element Models interface - model constructors
 */
export interface ElementModels {
  /** Base settings model */
  BaseSettings: any;

  /** Element model */
  Element: new (...args: any[]) => ElementModel;

  /** Column settings model */
  ColumnSettings?: any;

  /** Widget settings model */
  WidgetSettings?: any;
}

/**
 * Element Views interface - view constructors
 */
export interface ElementViews {
  /** Base element view */
  BaseElement: any;

  /** Base widget view */
  BaseWidget: any;

  /** Widget view */
  Widget: any;

  /** Section view */
  Section?: any;

  /** Column view */
  Column?: any;

  /** Container view */
  Container?: any;
}

/**
 * Element Components interface
 */
export interface ElementComponents {
  /** Add section view */
  AddSectionView: any;

  /** Add widget button */
  AddWidgetButton?: any;

  /** Element toolbar */
  ElementToolbar?: any;
}

/**
 * Complete elements interface for window.elementor.modules.elements
 */
export interface ElementorWindowElements {
  /** Element types */
  types: ElementTypes;

  /** Element models */
  models: ElementModels;

  /** Element views */
  views: ElementViews;

  /** Element components */
  components: ElementComponents;
}