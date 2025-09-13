/**
 * Icons Manager Component
 * Types for icon management functionality
 */

/**
 * Icon library types
 */
export type IconLibrary =
  | "fa-solid"
  | "fa-regular"
  | "fa-brands"
  | "feather"
  | "custom";

/**
 * Icon data interface
 */
export interface Icon {
  name: string;
  library: IconLibrary;
  unicode?: string;
  svg?: string;
  tags: string[];
  categories: string[];
  aliases?: string[];
}

/**
 * Icon library configuration
 */
export interface IconLibraryConfig {
  name: string;
  label: string;
  prefix: string;
  url?: string;
  enqueue?: string[];
  fetchJson?: string;
  ver?: string;
  native?: boolean;
  custom?: boolean;
}

/**
 * Icons manager configuration
 */
export interface IconsManagerConfig {
  libraries: {
    [library: string]: IconLibraryConfig;
  };
  activeLibraries: IconLibrary[];
  fallbackLibrary: IconLibrary;
  customIconsEnabled: boolean;
}

/**
 * Icon search filter
 */
export interface IconFilter {
  library?: IconLibrary;
  category?: string;
  search?: string;
  favorites_only?: boolean;
}

/**
 * Icons manager interface
 */
export interface IconsManager {
  config: IconsManagerConfig;

  // Library management
  registerLibrary(library: IconLibraryConfig): void;
  unregisterLibrary(name: string): void;
  getLibraries(): IconLibraryConfig[];
  getLibrary(name: string): IconLibraryConfig | undefined;
  isLibraryActive(name: string): boolean;

  // Icon operations
  getIcons(filter?: IconFilter): Promise<Icon[]>;
  getIcon(name: string, library?: IconLibrary): Icon | undefined;
  searchIcons(query: string): Promise<Icon[]>;

  // Rendering
  renderIcon(icon: Icon): string;
  renderIconByName(name: string, library?: IconLibrary): string;
  getIconHTML(icon: Icon): string;
  getIconSVG(icon: Icon): string;

  // Font loading
  loadFont(library: IconLibrary): Promise<void>;
  isFontLoaded(library: IconLibrary): boolean;
  preloadFonts(): Promise<void>;

  // Custom icons
  uploadCustomIcon(file: File): Promise<Icon>;
  deleteCustomIcon(name: string): Promise<boolean>;
  getCustomIcons(): Promise<Icon[]>;

  // Favorites
  addToFavorites(icon: Icon): void;
  removeFromFavorites(icon: Icon): void;
  getFavorites(): Icon[];
  isFavorite(icon: Icon): boolean;

  // Categories and tags
  getCategories(library?: IconLibrary): string[];
  getTags(library?: IconLibrary): string[];
}

/**
 * Icons modal interface
 */
export interface IconsModal {
  // Modal control
  show(): void;
  hide(): void;
  isVisible(): boolean;

  // Content management
  setFilter(filter: IconFilter): void;
  getFilter(): IconFilter;
  refresh(): void;

  // Icon selection
  getSelectedIcon(): Icon | undefined;
  selectIcon(icon: Icon): void;
  clearSelection(): void;

  // Events
  onIconSelect(callback: (icon: Icon) => void): void;
  onFilterChange(callback: (filter: IconFilter) => void): void;
  onClose(callback: () => void): void;
}

/**
 * Icon picker interface
 */
export interface IconPicker {
  // Initialization
  init(element: HTMLElement): void;
  destroy(): void;

  // Value management
  getValue(): Icon | undefined;
  setValue(icon: Icon): void;
  clear(): void;

  // UI state
  enable(): void;
  disable(): void;
  isEnabled(): boolean;

  // Events
  onChange(callback: (icon: Icon) => void): void;
  onOpen(callback: () => void): void;
}
