/**
 * Elementor Editor Panel System
 * Core panel types and interfaces for the Elementor editor
 */

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
 * Panel page configuration
 */
export interface PanelPageConfig {
  /** Page view class/constructor */
  view: any;
  /** Page title (can include HTML) */
  title?: string;
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
  handles: 'e' | 'w';
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

  /** Panel storage instance */
  storage: PanelStorage;

  /** Current panel page name */
  currentPageName: string | null;

  /** Current panel page view */
  currentPageView: any | null;

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
  saveSize(size: Partial<PanelStorage['size']>): void;

  /**
   * Handle edit mode switch events
   * @param activeMode - The new active mode
   */
  onEditModeSwitched(activeMode: string): void;
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