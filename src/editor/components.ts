/**
 * Elementor Editor Components Types
 *
 * Complete type definitions for all Elementor editor components including:
 * - Template library system
 * - Dynamic tags management
 * - Hotkeys/shortcuts system
 * - Icons manager
 * - Preview components
 * - Selection system
 * - Settings components
 * - Validator component
 * - Component base classes and registration
 */

import { Module } from "../core";
import { CommandBase } from "./commands";
import { Container } from "./elements";

/**
 * Base component interface
 */
export interface ComponentBase extends Module {
  /** Component namespace */
  namespace?: string;

  /** Default commands for the component */
  defaultCommands?: () => Record<string, any>;

  /** Default shortcuts for the component */
  defaultShortcuts?: () => Record<string, any>;

  /** Default tabs for the component */
  defaultTabs?: () => Record<string, any>;

  /**
   * Get component namespace
   */
  getNamespace(): string;

  /**
   * Import commands from module
   */
  importCommands(commands: any): Record<string, any>;

  /**
   * Register component commands
   */
  registerCommands(): void;

  /**
   * Register component shortcuts
   */
  registerShortcuts(): void;
}

/**
 * Modal-based component interface
 */
export interface ComponentModalBase extends ComponentBase {
  /** Modal layout instance */
  layout?: any;

  /**
   * Get modal layout class
   */
  getModalLayout(): any;

  /**
   * Show modal
   */
  show(): void;

  /**
   * Hide modal
   */
  hide(): void;

  /**
   * Toggle modal visibility
   */
  toggle(): void;
}

/**
 * Template library component interface
 */
export interface TemplateLibraryComponent extends ComponentModalBase {
  /** Save contexts constants */
  SAVE_CONTEXTS?: Record<string, string>;

  /**
   * Handle document loaded event
   */
  onDocumentLoaded(): void;

  /**
   * Get template data
   */
  getTemplateData(id: string): Promise<any>;

  /**
   * Insert template
   */
  insertTemplate(template: any): void;

  /**
   * Save template
   */
  saveTemplate(data: any): Promise<any>;

  /**
   * Delete template
   */
  deleteTemplate(id: string): Promise<void>;

  /**
   * Import template
   */
  importTemplate(data: any): Promise<any>;
}

/**
 * Template data interface
 */
export interface TemplateData {
  /** Template ID */
  id: string;

  /** Template title */
  title: string;

  /** Template type */
  type: string;

  /** Template subtype */
  subtype?: string;

  /** Template source */
  source: string;

  /** Template content */
  content: any;

  /** Template metadata */
  metadata?: Record<string, any>;

  /** Template thumbnail */
  thumbnail?: string;

  /** Template preview URL */
  preview_url?: string;
}

/**
 * Template library tab configuration
 */
export interface TemplateTab {
  /** Tab title */
  title: string;

  /** Static filter configuration */
  filter?: Record<string, any>;

  /** Dynamic filter function */
  getFilter?: () => Record<string, any>;

  /** Tab view component */
  view?: any;
}

/**
 * Dynamic tags manager interface
 */
export interface DynamicTagsManager extends Module {
  /** Cache key not found error constant */
  CACHE_KEY_NOT_FOUND_ERROR: string;

  /** Available tags registry */
  tags: Record<string, any>;

  /** Tag data cache */
  cache: Record<string, any>;

  /** Pending cache requests */
  cacheRequests: Record<string, boolean>;

  /** Cache callbacks */
  cacheCallbacks: Array<(...args: any[]) => void>;

  /**
   * Add cache request for tag
   */
  addCacheRequest(tag: DynamicTag): void;

  /**
   * Create cache key for tag
   */
  createCacheKey(tag: DynamicTag): string;

  /**
   * Load tag data from cache
   */
  loadTagDataFromCache(tag: DynamicTag): any;

  /**
   * Load all pending cache requests
   */
  loadCacheRequests(): void;

  /**
   * Register dynamic tag
   */
  registerTag(name: string, tag: DynamicTagConstructor): void;

  /**
   * Get registered tag
   */
  getTag(name: string): DynamicTagConstructor | undefined;

  /**
   * Parse tag content
   */
  parseTagsText(text: string): string;

  /**
   * Get tag controls
   */
  getTagControls(tag: DynamicTag): any[];
}

/**
 * Dynamic tag base interface
 */
export interface DynamicTag {
  /** Tag model */
  model: any;

  /** Tag options */
  options: Record<string, any>;

  /**
   * Get tag option
   */
  getOption(key: string): any;

  /**
   * Set tag option
   */
  setOption(key: string, value: any): void;

  /**
   * Get tag name
   */
  getName(): string;

  /**
   * Get tag title
   */
  getTitle(): string;

  /**
   * Get tag content
   */
  getContent(): string;

  /**
   * Render tag
   */
  render(): string;

  /**
   * Get tag controls
   */
  getControls(): any[];
}

/**
 * Dynamic tag constructor
 */
export interface DynamicTagConstructor {
  new (options: any): DynamicTag;
}

/**
 * Dynamic tag controls stack interface
 */
export interface TagControlsStack {
  /** Tag instance */
  tag: DynamicTag;

  /** Controls collection */
  controls: any[];

  /**
   * Initialize controls
   */
  initControls(): void;

  /**
   * Add control
   */
  addControl(id: string, control: any): void;

  /**
   * Remove control
   */
  removeControl(id: string): void;

  /**
   * Get control
   */
  getControl(id: string): any;

  /**
   * Render controls
   */
  renderControls(): void;
}

/**
 * Hotkeys/shortcuts component interface
 */
export interface HotkeysComponent extends ComponentModalBase {
  /** Registered shortcuts */
  shortcuts: Record<string, ShortcutConfig>;

  /**
   * Register shortcut
   */
  register(keys: string, callback: () => void, options?: ShortcutOptions): void;

  /**
   * Unregister shortcut
   */
  unregister(keys: string): void;

  /**
   * Check if shortcut exists
   */
  has(keys: string): boolean;

  /**
   * Handle keydown event
   */
  handleKeydown(event: KeyboardEvent): void;

  /**
   * Parse key combination
   */
  parseKeys(keys: string): string[];
}

/**
 * Shortcut configuration interface
 */
export interface ShortcutConfig {
  /** Key combination */
  keys: string;

  /** Callback function */
  callback: () => void;

  /** Elements to exclude */
  exclude?: string[];

  /** Elements to include */
  include?: string[];

  /** Shortcut description */
  description?: string;

  /** Shortcut category */
  category?: string;
}

/**
 * Shortcut options interface
 */
export interface ShortcutOptions {
  /** Elements to exclude */
  exclude?: string[];

  /** Elements to include */
  include?: string[];

  /** Shortcut description */
  description?: string;

  /** Shortcut category */
  category?: string;

  /** Whether shortcut is global */
  global?: boolean;
}

/**
 * Icons manager interface
 */
export interface IconsModalManager extends Module {
  /** Icon library helper */
  library: IconLibrary;

  /** Icon storage helper */
  store: IconStore;

  /** Icon cache */
  cache: Record<string, any>;

  /** Modal layout */
  layout?: any;

  /** Currently selected icon */
  selectedIcon: IconData;

  /**
   * Get modal layout
   */
  getLayout(): any;

  /**
   * Show icon picker
   */
  showIconPicker(options: IconPickerOptions): void;

  /**
   * Hide icon picker
   */
  hideIconPicker(): void;

  /**
   * Update control value with selected icon
   */
  updateControlValue(): void;

  /**
   * Load icon libraries
   */
  loadIconLibraries(): Promise<any>;

  /**
   * Search icons
   */
  searchIcons(query: string, library?: string): IconData[];

  /**
   * Get icon categories
   */
  getIconCategories(library: string): string[];

  /**
   * Get icon by name
   */
  getIcon(name: string, library: string): IconData | null;
}

/**
 * Icon data interface
 */
export interface IconData {
  /** Icon name/ID */
  name: string;

  /** Icon library */
  library: string;

  /** Icon unicode value */
  unicode?: string;

  /** Icon SVG content */
  svg?: string;

  /** Icon CSS class */
  class?: string;

  /** Icon categories */
  categories?: string[];

  /** Icon tags for search */
  tags?: string[];
}

/**
 * Icon library interface
 */
export interface IconLibrary {
  /** Library name */
  name: string;

  /** Library display name */
  displayName: string;

  /** Library prefix */
  prefix: string;

  /** Library version */
  version: string;

  /** Library icons */
  icons: Record<string, IconData>;

  /**
   * Load library data
   */
  load(): Promise<void>;

  /**
   * Get all icons
   */
  getIcons(): IconData[];

  /**
   * Search library icons
   */
  search(query: string): IconData[];

  /**
   * Get icon by name
   */
  getIcon(name: string): IconData | null;
}

/**
 * Icon store interface
 */
export interface IconStore {
  /** Stored icons data */
  data: Record<string, any>;

  /**
   * Save icon data
   */
  save(key: string, data: any): void;

  /**
   * Load icon data
   */
  load(key: string): any;

  /**
   * Check if key exists
   */
  has(key: string): boolean;

  /**
   * Remove icon data
   */
  remove(key: string): void;

  /**
   * Clear all data
   */
  clear(): void;
}

/**
 * Icon picker options interface
 */
export interface IconPickerOptions {
  /** Current selected icon */
  selectedIcon?: IconData;

  /** Allowed libraries */
  libraries?: string[];

  /** Default library */
  defaultLibrary?: string;

  /** Callback on icon select */
  onSelect?: (icon: IconData) => void;

  /** Callback on close */
  onClose?: () => void;
}

/**
 * Preview component interface
 */
export interface PreviewComponent extends ComponentBase {
  /** Preview iframe element */
  iframe?: HTMLIFrameElement;

  /** Preview document */
  document?: Document;

  /** Preview window */
  window?: Window;

  /**
   * Initialize preview
   */
  initPreview(): void;

  /**
   * Refresh preview
   */
  refresh(): void;

  /**
   * Get preview URL
   */
  getPreviewURL(): string;

  /**
   * Handle preview loaded
   */
  onPreviewLoaded(): void;

  /**
   * Execute in preview context
   */
  execute(callback: (previewWindow: Window) => void): void;
}

/**
 * Selection manager interface
 */
export interface SelectionManager {
  /** Selected elements collection */
  elements: Record<string, Container>;

  /** Common type of selected elements */
  type: string | false;

  /**
   * Add element(s) to selection
   */
  add(containers: Container | Container[], append?: boolean): void;

  /**
   * Remove element(s) from selection
   */
  remove(containers: Container | Container[]): void;

  /**
   * Clear all selection
   */
  clear(): void;

  /**
   * Check if element is selected
   */
  has(container: Container): boolean;

  /**
   * Get selected elements
   */
  getElements(): Container[];

  /**
   * Get first selected element
   */
  getFirst(): Container | null;

  /**
   * Get selection count
   */
  getCount(): number;

  /**
   * Check if selection is allowed
   */
  isAllowed(): boolean;

  /**
   * Update selection type
   */
  updateType(): void;

  /**
   * Update sortable elements
   */
  updateSortable(): void;

  /**
   * Update panel page
   */
  updatePanelPage(): void;

  /**
   * Update navigator
   */
  updateNavigator(): void;
}

/**
 * Settings component interface
 */
export interface SettingsComponent extends ComponentBase {
  /** Settings data */
  settings: Record<string, any>;

  /**
   * Get setting value
   */
  get(key: string): any;

  /**
   * Set setting value
   */
  set(key: string, value: any): void;

  /**
   * Check if setting exists
   */
  has(key: string): boolean;

  /**
   * Remove setting
   */
  remove(key: string): void;

  /**
   * Get all settings
   */
  getAll(): Record<string, any>;

  /**
   * Save settings
   */
  save(): Promise<void>;

  /**
   * Load settings
   */
  load(): Promise<void>;

  /**
   * Reset settings to defaults
   */
  reset(): void;
}

/**
 * Validator component interface
 */
export interface ValidatorComponent extends ComponentBase {
  /** Validation rules */
  rules: Record<string, ValidationRule>;

  /**
   * Register validation rule
   */
  registerRule(name: string, rule: ValidationRule): void;

  /**
   * Validate value against rule
   */
  validate(value: any, rule: string, options?: any): ValidationResult;

  /**
   * Validate multiple values
   */
  validateMultiple(
    data: Record<string, any>,
    rules: Record<string, string>
  ): ValidationResults;

  /**
   * Check if value is valid
   */
  isValid(value: any, rule: string, options?: any): boolean;

  /**
   * Get validation error message
   */
  getErrorMessage(rule: string, value: any, options?: any): string;
}

/**
 * Validation rule interface
 */
export interface ValidationRule {
  /** Rule name */
  name: string;

  /** Validation function */
  validate: (value: any, options?: any) => boolean;

  /** Error message template */
  message: string;

  /** Rule options */
  options?: any;
}

/**
 * Validation result interface
 */
export interface ValidationResult {
  /** Whether validation passed */
  valid: boolean;

  /** Error message if validation failed */
  message?: string;

  /** Rule that was applied */
  rule: string;

  /** Value that was validated */
  value: any;
}

/**
 * Multiple validation results interface
 */
export interface ValidationResults {
  /** Overall validity */
  valid: boolean;

  /** Individual field results */
  results: Record<string, ValidationResult>;

  /** List of error messages */
  errors: string[];
}

/**
 * Component registry interface
 */
export interface ComponentRegistry {
  /** Registered components */
  components: Map<string, ComponentBase>;

  /**
   * Register component
   */
  register(namespace: string, component: ComponentBase): void;

  /**
   * Get component by namespace
   */
  get(namespace: string): ComponentBase | undefined;

  /**
   * Check if component exists
   */
  has(namespace: string): boolean;

  /**
   * Unregister component
   */
  unregister(namespace: string): void;

  /**
   * Get all components
   */
  getAll(): ComponentBase[];

  /**
   * Initialize all components
   */
  init(): void;
}

/**
 * Editor components namespace
 */
export namespace Components {
  export type Base = ComponentBase;
  export type ModalBase = ComponentModalBase;
  export type TemplateLibrary = TemplateLibraryComponent;
  export type DynamicTags = DynamicTagsManager;
  export type Hotkeys = HotkeysComponent;
  export type IconsModal = IconsModalManager;
  export type Preview = PreviewComponent;
  export type Selection = SelectionManager;
  export type Settings = SettingsComponent;
  export type Validator = ValidatorComponent;
  export type Registry = ComponentRegistry;
}

// Default export for convenience
export default Components;
