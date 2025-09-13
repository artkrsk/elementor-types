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
 * Panel page options for initialization
 */
export interface PanelPageOptions {
  /** Auto-focus search on page show */
  autoFocusSearch?: boolean;
  /** Page-specific custom options */
  [key: string]: any;
}

/**
 * Panel page regions configuration
 */
export interface PanelPageRegions {
  /** Main content region */
  content?: string;
  /** Elements wrapper region */
  elements?: string;
  /** Search area region */
  search?: string;
  /** Notice area region */
  notice?: string;
  /** Navigation region */
  navigation?: string;
  /** Additional custom regions */
  [regionName: string]: string | undefined;
}

/**
 * Panel page region views configuration
 */
export interface PanelPageRegionViews {
  /** Region view mapping */
  [viewName: string]: {
    /** Target region */
    region: any;
    /** View class/constructor */
    view: any;
    /** View options */
    options?: any;
  };
}

/**
 * Panel page base interface
 * Common functionality for all panel pages
 */
export interface PanelPageBase {
  /** Page template selector */
  template: string;

  /** Page element ID */
  id: string;

  /** Page options */
  options: PanelPageOptions;

  /** Page regions */
  regions: PanelPageRegions;

  /** Region views configuration */
  regionViews: PanelPageRegionViews;

  /**
   * Initialize page
   */
  initialize(): void;

  /**
   * Show a specific view in a region
   * @param viewName - Name of the view to show
   */
  showView(viewName: string): void;

  /**
   * Get current page title
   */
  getTitle?(): string;

  /**
   * Handle page show event
   */
  onShow(): void;

  /**
   * Handle page destroy event
   */
  onDestroy(): void;
}

/**
 * Menu page group configuration
 */
export interface MenuPageGroup {
  /** Group name/identifier */
  name: string;
  /** Group title */
  title: string;
  /** Group items */
  items: MenuPageItem[];
}

/**
 * Menu page item configuration
 */
export interface MenuPageItem {
  /** Item name/identifier */
  name: string;
  /** Item icon class */
  icon: string;
  /** Item title */
  title: string;
  /** Item type (link, command, etc.) */
  type?: string;
  /** Link URL (for link type) */
  link?: string;
  /** Command to execute (for command type) */
  command?: string;
  /** Click callback */
  callback?: () => void;
}

/**
 * Panel Menu Page
 * Main menu page with navigation groups and items
 */
export interface PanelMenuPage extends PanelPageBase {
  /** Menu groups collection */
  collection: any;

  /**
   * Get arrow icon class based on RTL
   */
  getArrowClass(): string;
}

/**
 * Panel Menu Page Static Methods
 * Static functionality for menu page management
 */
export interface PanelMenuPageStatic {
  /**
   * Get menu groups
   */
  getGroups(): any;

  /**
   * Initialize menu groups
   */
  initGroups(): void;

  /**
   * Add admin menu items
   */
  addAdminMenu(): void;
}

/**
 * Editor page tab configuration
 */
export interface EditorPageTab {
  /** Tab title */
  title: string;
  /** Tab content view */
  view?: any;
  /** Tab is active */
  active?: boolean;
}

/**
 * Editor page tabs configuration
 */
export interface EditorPageTabs {
  /** Content tab */
  content: EditorPageTab;
  /** Style tab */
  style: EditorPageTab;
  /** Advanced tab */
  advanced: EditorPageTab;
  /** Layout tab */
  layout: EditorPageTab;
  /** Additional custom tabs */
  [tabName: string]: EditorPageTab;
}

/**
 * Editor page render arguments
 */
export interface EditorPageRenderArgs {
  /** Element model */
  model: any;
  /** Element view */
  view: any;
  /** Active control */
  activeControl?: any;
}

/**
 * Panel Editor Page
 * Element editing page with tabs and controls
 */
export interface PanelEditorPage extends PanelPageBase {
  /** Active tabs memory */
  activeTabs: { [modelId: string]: string };

  /** Currently active model ID */
  activeModelId: string | null;

  /**
   * Get default tabs configuration
   */
  defaultTabs(): EditorPageTabs;

  /**
   * Get tabs wrapper selector
   */
  getTabsWrapperSelector(): string;

  /**
   * Render a specific tab
   * @param tab - Tab name
   * @param args - Render arguments
   */
  renderTab(tab: string, args: EditorPageRenderArgs): void;

  /**
   * Check if page should be rendered
   * @param tab - Tab name
   * @param modelId - Model ID
   */
  shouldRenderPage(tab: string, modelId: string): boolean;
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
  /** Page settings page */
  "page-settings": PanelPageConfig;
  /** History page */
  history: PanelPageConfig;
  /** Global widgets page */
  global: PanelPageConfig;
  /** Additional custom pages */
  [pageName: string]: PanelPageConfig;
}

/**
 * Panel page state management
 */
export interface PanelPageState {
  /** Current active page */
  currentPage: string | null;
  /** Page history stack */
  history: string[];
  /** Page-specific data storage */
  pageData: { [pageName: string]: any };
  /** Page loading states */
  loading: { [pageName: string]: boolean };
  /** Page error states */
  errors: { [pageName: string]: string | null };
}

/**
 * Panel page manager
 * Centralized page state and lifecycle management
 */
export interface PanelPageManager {
  /** Current page state */
  state: PanelPageState;

  /** Registered pages */
  pages: PanelPages;

  /**
   * Register a new page
   * @param pageName - Name of the page
   * @param pageConfig - Page configuration
   */
  registerPage(pageName: string, pageConfig: PanelPageConfig): void;

  /**
   * Unregister a page
   * @param pageName - Name of the page to remove
   */
  unregisterPage(pageName: string): void;

  /**
   * Check if page exists
   * @param pageName - Name of the page
   */
  hasPage(pageName: string): boolean;

  /**
   * Get page configuration
   * @param pageName - Name of the page
   */
  getPage(pageName: string): PanelPageConfig | null;

  /**
   * Set page data
   * @param pageName - Name of the page
   * @param data - Data to store
   */
  setPageData(pageName: string, data: any): void;

  /**
   * Get page data
   * @param pageName - Name of the page
   */
  getPageData(pageName: string): any;

  /**
   * Set page loading state
   * @param pageName - Name of the page
   * @param loading - Loading state
   */
  setPageLoading(pageName: string, loading: boolean): void;

  /**
   * Set page error state
   * @param pageName - Name of the page
   * @param error - Error message or null
   */
  setPageError(pageName: string, error: string | null): void;

  /**
   * Clear page state
   * @param pageName - Name of the page
   */
  clearPageState(pageName: string): void;
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

  /** Page history for back navigation */
  pageHistory: string[];

  /** Page routing configuration */
  routes: { [route: string]: string };

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
   * Initialize routing system
   */
  initRoutes(): void;

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
   * Remove page from panel
   * @param pageName - Name of the page to remove
   */
  removePage(pageName: string): void;

  /**
   * Show a specific page
   * @param pageName - Name of the page to show
   * @param viewOptions - Options for the page view
   */
  showPage(pageName: string, viewOptions?: any): void;

  /**
   * Navigate to a specific page with history tracking
   * @param pageName - Name of the page to navigate to
   * @param viewOptions - Options for the page view
   * @param trackHistory - Whether to track in history
   */
  navigateToPage(
    pageName: string,
    viewOptions?: any,
    trackHistory?: boolean
  ): void;

  /**
   * Go back to previous page
   */
  goBack(): void;

  /**
   * Check if can go back
   */
  canGoBack(): boolean;

  /**
   * Get current page view
   */
  getCurrentPageView(): any;

  /**
   * Get current page name
   */
  getCurrentPageName(): string | null;

  /**
   * Handle page routing events
   * @param route - Route path
   * @param args - Route arguments
   */
  onRoute(route: string, ...args: any[]): void;

  /**
   * Handle page change events
   * @param oldPage - Previous page name
   * @param newPage - New page name
   */
  onPageChange(oldPage: string | null, newPage: string): void;

  /**
   * Update scrollbar for current content
   */
  updateScrollbar(): void;

  /**
   * Refresh current page
   */
  refreshCurrentPage(): void;

  /**
   * Close current page and return to default
   */
  closeCurrentPage(): void;
}

/**
 * Edit mode types
 */
export type EditMode = "edit" | "preview" | "select";

/**
 * Edit mode change event detail
 */
export interface EditModeChangeDetail {
  /** The new active mode */
  activeMode: EditMode;
  /** The previous mode (if available) */
  previousMode?: EditMode;
}

/**
 * Edit mode channel interface
 * Communication channel for edit mode state
 */
export interface EditModeChannel {
  /**
   * Get current active mode
   * @param request - Request type
   */
  request(request: "activeMode"): EditMode;

  /**
   * Set active mode response
   * @param request - Request type
   * @param mode - Mode to set
   */
  reply(request: "activeMode", mode: EditMode): void;

  /**
   * Trigger mode switch event
   * @param event - Event type
   * @param mode - New mode
   */
  trigger(event: "switch", mode: EditMode): void;
}

/**
 * Edit mode manager
 * Manages edit mode state and transitions
 */
export interface EditModeManager {
  /** Current active edit mode */
  activeMode: EditMode;

  /** Edit mode communication channel */
  channel: EditModeChannel;

  /** Edit mode state history */
  modeHistory: EditMode[];

  /**
   * Change edit mode
   * @param newMode - New mode to activate
   */
  changeEditMode(newMode: EditMode): void;

  /**
   * Get current active mode
   */
  getActiveMode(): EditMode;

  /**
   * Check if currently in edit mode
   */
  isEditMode(): boolean;

  /**
   * Check if currently in preview mode
   */
  isPreviewMode(): boolean;

  /**
   * Check if currently in select mode
   */
  isSelectMode(): boolean;

  /**
   * Enter edit mode
   */
  enterEditMode(): void;

  /**
   * Enter preview mode
   * @param fullPreview - Whether to enter full preview mode
   */
  enterPreviewMode(fullPreview?: boolean): void;

  /**
   * Enter select mode
   */
  enterSelectMode(): void;

  /**
   * Exit current mode and return to edit
   */
  exitCurrentMode(): void;

  /**
   * Handle mode switch events
   * @param newMode - New active mode
   */
  onEditModeSwitched(newMode: EditMode): void;

  /**
   * Add mode change listener
   * @param callback - Callback function
   */
  onModeChange(
    callback: (mode: EditMode, previousMode?: EditMode) => void
  ): void;

  /**
   * Remove mode change listener
   * @param callback - Callback function to remove
   */
  offModeChange(
    callback: (mode: EditMode, previousMode?: EditMode) => void
  ): void;
}

/**
 * Edit mode behavior interface
 * For components that respond to edit mode changes
 */
export interface EditModeBehavior {
  /**
   * Handle edit mode switch
   * @param activeMode - New active mode
   */
  onEditModeSwitched(activeMode: EditMode): void;

  /**
   * Handle entering edit mode
   */
  onEnterEditMode?(): void;

  /**
   * Handle entering preview mode
   */
  onEnterPreviewMode?(): void;

  /**
   * Handle entering select mode
   */
  onEnterSelectMode?(): void;

  /**
   * Handle exiting current mode
   */
  onExitMode?(): void;
}

/**
 * Panel edit mode integration
 * Panel-specific edit mode functionality
 */
export interface PanelEditModeIntegration {
  /**
   * Handle panel mode changes
   * @param activeMode - New active edit mode
   */
  onPanelEditModeSwitched(activeMode: EditMode): void;

  /**
   * Show panel for edit mode
   */
  showPanelForEdit(): void;

  /**
   * Hide panel for preview mode
   */
  hidePanelForPreview(): void;

  /**
   * Adjust panel for select mode
   */
  adjustPanelForSelect(): void;

  /**
   * Update panel visibility based on mode
   * @param mode - Current edit mode
   */
  updatePanelVisibility(mode: EditMode): void;

  /**
   * Update panel interactions based on mode
   * @param mode - Current edit mode
   */
  updatePanelInteractions(mode: EditMode): void;
}

/**
 * Edit mode context
 * Context information for edit mode operations
 */
export interface EditModeContext {
  /** Current edit mode */
  mode: EditMode;
  /** Whether edit mode allows interactions */
  allowInteractions: boolean;
  /** Whether edit mode allows selections */
  allowSelections: boolean;
  /** Whether edit mode shows editing tools */
  showEditingTools: boolean;
  /** Whether edit mode allows drag and drop */
  allowDragDrop: boolean;
  /** Context menu context */
  contextMenuContext: "panel" | "preview";
}

/**
 * Edit mode configuration
 */
export interface EditModeConfig {
  /** Default edit mode */
  defaultMode: EditMode;
  /** Allowed modes */
  allowedModes: EditMode[];
  /** Mode transition animations */
  animations: boolean;
  /** Auto-save on mode change */
  autoSave: boolean;
  /** Mode change confirmation */
  confirmModeChange: boolean;
}
