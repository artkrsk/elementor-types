/**
 * Elementor Window Views
 *
 * TypeScript definitions for window.elementor.modules.views
 * Based on the actual JavaScript view implementations
 */

/**
 * Controls Stack View interface
 */
export interface ControlsStackView {
  /** CSS classes */
  classes: {
    popover: string;
  };

  /** Active tab */
  activeTab: string | null;

  /** Active section */
  activeSection: string | null;

  /** Element model */
  model: any;

  /** CSS class name */
  className(): string;

  /** Template helpers */
  templateHelpers(): {
    elementData: any;
  };

  /** Child view options */
  childViewOptions(): {
    elementSettingsModel: any;
  };

  /** Initialize controls stack */
  initialize(options?: any): void;

  /** Render controls stack */
  render(): this;

  /** Show controls */
  showControls(): void;

  /** Hide controls */
  hideControls(): void;

  /** Get control view by name */
  getControlView(name: string): any;

  /** Add control view */
  addControlView(name: string, view: any): void;

  /** Remove control view */
  removeControlView(name: string): void;

  /** On tab change */
  onTabChange(tab: string): void;

  /** On section change */
  onSectionChange(section: string): void;

  /** Activate tab */
  activateTab(tab: string): void;

  /** Activate section */
  activateSection(section: string): void;
}

/**
 * Controls Popover View interface
 */
export interface ControlsPopoverView {
  /** Popover element */
  $el: any;

  /** Is visible */
  isVisible: boolean;

  /** Target element */
  target: HTMLElement | null;

  /** Show popover */
  show(target: HTMLElement, options?: any): void;

  /** Hide popover */
  hide(): void;

  /** Toggle popover */
  toggle(target: HTMLElement): void;

  /** Position popover */
  position(): void;

  /** Render popover */
  render(): this;

  /** Initialize popover */
  initialize(options?: any): void;
}

/**
 * Base Element View interface
 */
export interface BaseElementView {
  /** Element model */
  model: any;

  /** Element type */
  elType: string;

  /** Tag name */
  tagName: string;

  /** CSS class name */
  className(): string;

  /** Template for rendering */
  template: string;

  /** UI elements */
  ui: Record<string, string>;

  /** Event handlers */
  events: Record<string, string>;

  /** Initialize element view */
  initialize(options?: any): void;

  /** Render element */
  render(): this;

  /** On render handler */
  onRender(): void;

  /** On destroy handler */
  onDestroy(): void;

  /** Get element data */
  getElementData(): any;

  /** Get element settings */
  getSettings(key?: string): any;

  /** Set element settings */
  setSettings(key: string | Record<string, any>, value?: any): void;
}

/**
 * Base Widget View interface
 */
export interface BaseWidgetView extends BaseElementView {
  /** Widget type */
  widgetType: string;

  /** Widget model */
  model: any;

  /** On widget ready */
  onElementReady(): void;

  /** On settings change */
  onSettingsChange(changedModel?: any): void;

  /** Get default settings */
  getDefaultSettings(): Record<string, any>;

  /** Get widget controls */
  getControls(): Record<string, any>;

  /** Bind widget events */
  bindEvents(): void;

  /** Unbind widget events */
  unbindEvents(): void;
}

/**
 * Widget View interface
 */
export interface WidgetView extends BaseWidgetView {
  /** Initialize widget */
  onInit(): void;

  /** Widget ready callback */
  onReady(): void;

  /** Before destroy callback */
  onBeforeDestroy(): void;

  /** Get repeater setting */
  getRepeaterSetting(settingKey: string, repeaterKey: string): any;

  /** Get responsive setting */
  getResponsiveSetting(setting: string): any;

  /** Is editing mode */
  isEditingMode(): boolean;

  /** Get edit model */
  getEditModel(): any;
}

/**
 * Add Section Base View interface
 */
export interface AddSectionBaseView {
  /** Template for add section */
  template: string;

  /** CSS class name */
  className: string;

  /** UI elements */
  ui: {
    addSection: string;
    selectPreset: string;
    presets: string;
  };

  /** Event handlers */
  events: {
    'click @ui.addSection': string;
    'click @ui.selectPreset': string;
  };

  /** Initialize add section */
  initialize(): void;

  /** On add section click */
  onAddSectionClick(): void;

  /** On select preset click */
  onSelectPresetClick(): void;

  /** Get presets */
  getPresets(): any[];
}

/**
 * View Modules interface
 */
export interface ViewModules {
  /** Controls stack view */
  ControlsStack: new (...args: any[]) => ControlsStackView;

  /** Controls popover view */
  ControlsPopover?: new (...args: any[]) => ControlsPopoverView;

  /** Base element view */
  BaseElement?: new (...args: any[]) => BaseElementView;

  /** Base widget view */
  BaseWidget?: new (...args: any[]) => BaseWidgetView;

  /** Widget view */
  Widget?: new (...args: any[]) => WidgetView;

  /** Add section base view */
  AddSectionBase?: new (...args: any[]) => AddSectionBaseView;

  /** Modal views */
  Modal?: {
    Layout: any;
    Base: any;
  };

  /** Panel views */
  Panel?: {
    Page: any;
    Base: any;
  };
}

/**
 * Complete views interface for window.elementor.modules.views
 */
export interface ElementorWindowViews extends ViewModules {}