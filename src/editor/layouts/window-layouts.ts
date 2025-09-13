/**
 * Elementor Window Layouts
 *
 * TypeScript definitions for window.elementor.modules.layouts
 * Based on the actual JavaScript layout implementations
 */

/**
 * Panel Menu interface
 */
export interface PanelMenu {
  /** Groups collection */
  groups: any;

  /** Initialize panel menu */
  initialize(): void;

  /** Get arrow class for RTL/LTR */
  getArrowClass(): string;

  /** On render handler */
  onRender(): void;

  /** On destroy handler */
  onDestroy(): void;

  /** Initialize groups */
  initGroups(): void;

  /** Get groups collection */
  getGroups(): any;

  /** Add group to menu */
  addGroup(group: {
    name: string;
    title: string;
    items: any[];
  }): void;
}

/**
 * Panel Elements View interface
 */
export interface PanelElementsView {
  /** Child view constructor */
  childView: any;

  /** Element ID */
  id: string;

  /** CSS class name */
  className: string;

  /** Initialize elements view */
  initialize(): void;

  /** Filter child models */
  filter(childModel: any): boolean;

  /** On filter changed handler */
  onFilterChanged(): void;

  /** Get filter value */
  getFilterValue(): string;

  /** Show/hide elements based on filter */
  applyFilter(): void;
}

/**
 * Panel Elements Global View interface
 */
export interface PanelElementsGlobalView {
  /** Template ID */
  template: string;

  /** Element ID */
  id: string;

  /** Initialize global view */
  initialize(): void;

  /** Reset search */
  resetSearch(): void;
}

/**
 * Panel Element Item View interface
 */
export interface PanelElementItemView {
  /** Element model */
  model: any;

  /** Template for rendering */
  template: string;

  /** CSS class name */
  className: string;

  /** Tag name */
  tagName: string;

  /** UI elements */
  ui: {
    element: string;
    title: string;
    icon: string;
  };

  /** Event handlers */
  events: {
    'click': string;
    'keydown': string;
  };

  /** Initialize element item */
  initialize(): void;

  /** On click handler */
  onClick(): void;

  /** On keydown handler */
  onKeyDown(event: KeyboardEvent): void;
}

/**
 * Panel Elements Views interface
 */
export interface PanelElementsViews {
  /** Global elements view */
  Global: new (...args: any[]) => PanelElementsGlobalView;

  /** Elements collection view */
  Elements: new (...args: any[]) => PanelElementsView;

  /** Individual element item view */
  Element?: new (...args: any[]) => PanelElementItemView;

  /** Categories view */
  Categories?: any;
}

/**
 * Panel Elements Pages interface
 */
export interface PanelElementsPages {
  /** Elements page views */
  views: PanelElementsViews;

  /** Elements page models */
  models?: {
    Element: any;
    Category: any;
  };

  /** Elements page collections */
  collections?: {
    Elements: any;
    Categories: any;
  };

  /** Elements page component */
  component?: any;
}

/**
 * Panel Menu Pages interface
 */
export interface PanelMenuPages {
  /** Menu page class */
  Menu: new (...args: any[]) => PanelMenu;

  /** Menu base view */
  Base?: any;

  /** Menu items */
  items?: any;
}

/**
 * Panel Pages interface
 */
export interface PanelPages {
  /** Elements pages */
  elements: PanelElementsPages;

  /** Menu pages */
  menu: PanelMenuPages;

  /** Settings pages */
  settings?: any;

  /** History pages */
  history?: any;
}

/**
 * Panel Layout interface
 */
export interface PanelLayout {
  /** Panel pages */
  pages: PanelPages;

  /** Panel header */
  header?: any;

  /** Panel footer */
  footer?: any;

  /** Panel content */
  content?: any;
}

/**
 * Layout Modules interface
 */
export interface LayoutModules {
  /** Panel layout */
  panel: PanelLayout;

  /** Editor layout */
  editor?: any;

  /** Preview layout */
  preview?: any;

  /** Navigator layout */
  navigator?: any;
}

/**
 * Complete layouts interface for window.elementor.modules.layouts
 */
export interface ElementorWindowLayouts extends LayoutModules {}