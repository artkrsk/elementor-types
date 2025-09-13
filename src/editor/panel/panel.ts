/**
 * Elementor Editor Panel System
 * Core panel types and interfaces for the Elementor editor
 */

/**
 * Panel UI elements interface
 */
export interface PanelUI {
  /** Header region */
  header: JQuery;
  /** Content region */
  content: JQuery;
  /** Footer region */
  footer: JQuery;
  /** Mode switcher region */
  modeSwitcher: JQuery;
}

/**
 * Panel storage configuration
 */
export interface PanelStorage {
  /** Panel size configuration */
  size: {
    /** Panel width (CSS value like '300px') */
    width: string;
  };
}

/**
 * Panel regions configuration
 */
export interface PanelRegions {
  /** Main content area */
  content: string;
  /** Panel header area */
  header: string;
  /** Panel footer area */
  footer: string;
  /** Mode switcher area */
  modeSwitcher: string;
}

/**
 * Panel header UI elements
 */
export interface PanelHeaderUI {
  /** Menu button */
  menuButton: string;
  /** Menu icon element */
  menuIcon: string;
  /** Title element */
  title: string;
  /** Add button */
  addButton: string;
}

/**
 * Panel header events configuration
 */
export interface PanelHeaderEvents {
  /** Add button click event */
  "click @ui.addButton": "onClickAdd";
  /** Menu button click event */
  "click @ui.menuButton": "onClickMenu";
}

/**
 * Panel Header Item View
 * Header component with menu and add functionality
 */
export declare class PanelHeaderItemView {
  /** Header template selector */
  template: string;

  /** Header element ID */
  id: string;

  /** Header UI elements */
  ui: PanelHeaderUI;

  /** Header events */
  events: PanelHeaderEvents;

  /**
   * Get behaviors for the header
   */
  behaviors(): any;

  /**
   * Set header title
   * @param title - HTML title content
   */
  setTitle(title: string): void;

  /**
   * Handle add button click
   */
  onClickAdd(): void;

  /**
   * Handle menu button click
   */
  onClickMenu(): void;
}

/**
 * Panel page configuration
 */
export interface PanelPageConfig {
  /** Page view class/constructor */
  view: any;
  /** Page title (can include HTML) */
  title?: string;
}

/**
 * Panel footer UI elements
 */
export interface PanelFooterUI {
  /** All menu buttons */
  menuButtons: string;
  /** Settings button */
  settings: string;
  /** Device mode icon */
  deviceModeIcon: string;
  /** Save template button */
  saveTemplate: string;
  /** History button */
  history: string;
  /** Navigator button */
  navigator: string;
}

/**
 * Panel footer events configuration
 */
export interface PanelFooterEvents {
  /** Menu buttons click event */
  "click @ui.menuButtons": "onMenuButtonsClick";
  /** Settings click event */
  "click @ui.settings": "onSettingsClick";
  /** Device mode icon click event */
  "click @ui.deviceModeIcon": "onDeviceModeIconClick";
  /** Save template click event */
  "click @ui.saveTemplate": "onSaveTemplateClick";
  /** History click event */
  "click @ui.history": "onHistoryClick";
  /** Navigator click event */
  "click @ui.navigator": "onNavigatorClick";
}

/**
 * Panel footer sub-menu item data
 */
export interface PanelFooterSubMenuItem {
  /** Item name/identifier */
  name: string;
  /** Item icon class */
  icon: string;
  /** Item title */
  title: string;
  /** Item description (optional) */
  description?: string;
  /** Click callback (optional) */
  callback?: () => void;
  /** Insert before this item (optional) */
  before?: string;
}

/**
 * Panel Footer View
 * Footer component with device modes, settings, and tools
 */
export declare class PanelFooterView {
  /** Footer template selector */
  template: string;

  /** Footer tag name */
  tagName: string;

  /** Footer element ID */
  id: string;

  /** Possible device rotation modes */
  possibleRotateModes: string[];

  /** Footer UI elements */
  ui: PanelFooterUI;

  /** Footer events */
  events: PanelFooterEvents;

  /**
   * Initialize footer view
   */
  initialize(): void;

  /**
   * Get behaviors for the footer
   */
  behaviors(): any;

  /**
   * Add a sub-menu item to a menu
   * @param subMenuName - Name of the sub-menu
   * @param itemData - Sub-menu item configuration
   */
  addSubMenuItem(subMenuName: string, itemData: PanelFooterSubMenuItem): JQuery;

  /**
   * Remove a sub-menu item from a menu
   * @param subMenuName - Name of the sub-menu
   * @param itemData - Sub-menu item to remove
   */
  removeSubMenuItem(
    subMenuName: string,
    itemData: Pick<PanelFooterSubMenuItem, "name">
  ): JQuery;

  /**
   * Show settings page
   */
  showSettingsPage(): void;

  /**
   * Handle menu button clicks
   * @param event - Click event
   */
  onMenuButtonsClick(event: JQuery.Event): void;

  /**
   * Handle settings button click
   */
  onSettingsClick(): void;

  /**
   * Handle device mode icon click
   */
  onDeviceModeIconClick(): void;

  /**
   * Handle save template button click
   */
  onSaveTemplateClick(): void;

  /**
   * Handle history button click
   */
  onHistoryClick(): void;

  /**
   * Handle navigator button click
   */
  onNavigatorClick(): void;

  /**
   * Handle device mode change events
   */
  onDeviceModeChange(): void;
}

/**
 * Panel pages registry
 */
export interface PanelPages {
  /** Elements browser page */
  elements: PanelPageConfig;
  /** Element editor page */
  editor: PanelPageConfig;
  /** Main menu page */
  menu: PanelPageConfig;
  /** Additional custom pages */
  [pageName: string]: PanelPageConfig;
}

/**
 * Panel resize configuration
 */
export interface PanelResizeConfig {
  /** Resize handles (e for east, w for west) */
  handles: "e" | "w";
  /** Minimum panel width */
  minWidth: number;
  /** Maximum panel width */
  maxWidth: number;
}

/**
 * Base Panel Region
 * Foundation class for panel regions with storage and resize capabilities
 */
export declare class BasePanel {
  /** Panel DOM element selector */
  el: string;

  /** Panel UI elements */
  ui: PanelUI;

  /** Panel storage instance */
  storage: PanelStorage;

  /** Current panel page name */
  currentPageName: string | null;

  /** Current panel page view */
  currentPageView: any | null;

  /** Panel resize configuration */
  resizeConfig?: PanelResizeConfig;

  /**
   * Initialize panel
   */
  initialize(): void;

  /**
   * Get storage key for this panel
   */
  getStorageKey(): string;

  /**
   * Get default storage configuration
   */
  getDefaultStorage(): PanelStorage;

  /**
   * Set panel size from storage
   */
  setSize(): void;

  /**
   * Make panel resizable with constraints
   */
  resizable(): void;

  /**
   * Save panel size to storage
   * @param size - Size configuration to save
   */
  saveSize(size: Partial<PanelStorage["size"]>): void;

  /**
   * Handle edit mode switch events
   * @param activeMode - The new active mode
   */
  onEditModeSwitched(activeMode: string): void;

  /**
   * Handle panel ready event
   */
  onReady(): void;
}

/**
 * Panel Layout View
 * Main panel layout manager with regions and page management
 */
export declare class PanelLayoutView {
  /** Panel template selector */
  template: string;

  /** Panel element ID */
  id: string;

  /** Panel regions configuration */
  regions: PanelRegions;

  /** Available pages registry */
  pages: PanelPages;

  /** Current page name */
  currentPageName: string | null;

  /** Current page view instance */
  currentPageView: any | null;

  /** Perfect scrollbar instance */
  perfectScrollbar: any | null;

  /**
   * Initialize panel layout
   */
  initialize(): void;

  /**
   * Build available pages configuration
   */
  buildPages(): PanelPages;

  /**
   * Initialize pages system
   */
  initPages(): void;

  /**
   * Get page configuration(s)
   * @param page - Specific page name (optional)
   */
  getPages(page?: string): PanelPages | PanelPageConfig;

  /**
   * Add new page to panel
   * @param pageName - Name of the page
   * @param pageData - Page configuration
   */
  addPage(pageName: string, pageData: PanelPageConfig): void;

  /**
   * Show a specific page
   * @param pageName - Name of the page to show
   * @param viewOptions - Options for the page view
   */
  showPage(pageName: string, viewOptions?: any): void;

  /**
   * Get current page view
   */
  getCurrentPageView(): any;

  /**
   * Update scrollbar for current content
   */
  updateScrollbar(): void;
}
