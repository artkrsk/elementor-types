/**
 * Template Library Component
 * Types for template library functionality
 */

/**
 * Template types
 */
export type TemplateType =
  | "page"
  | "section"
  | "widget"
  | "header"
  | "footer"
  | "single"
  | "archive"
  | "search"
  | "404"
  | "popup";

/**
 * Template source types
 */
export type TemplateSource = "local" | "remote" | "elementor" | "kit" | "user";

/**
 * Template data interface
 */
export interface Template {
  id: string | number;
  title: string;
  type: TemplateType;
  source: TemplateSource;
  content: any;
  thumbnail?: string;
  preview_url?: string;
  author?: string;
  date: string;
  tags: string[];
  categories: string[];
  pro_required?: boolean;
  favorite?: boolean;
  conditions?: any;
  settings?: {
    [key: string]: any;
  };
}

/**
 * Template filter interface
 */
export interface TemplateFilter {
  type?: TemplateType;
  source?: TemplateSource;
  category?: string;
  tag?: string;
  search?: string;
  pro_only?: boolean;
  favorites_only?: boolean;
}

/**
 * Template library configuration
 */
export interface TemplateLibraryConfig {
  sources: {
    [source: string]: {
      enabled: boolean;
      url?: string;
      api_key?: string;
    };
  };
  categories: {
    [category: string]: {
      title: string;
      icon: string;
    };
  };
  default_type: TemplateType;
  per_page: number;
  cache_enabled: boolean;
}

/**
 * Template library manager interface
 */
export interface TemplateLibraryManager {
  config: TemplateLibraryConfig;

  // Template operations
  getTemplates(filter?: TemplateFilter): Promise<Template[]>;
  getTemplate(id: string | number): Promise<Template>;
  saveTemplate(template: Partial<Template>): Promise<Template>;
  deleteTemplate(id: string | number): Promise<boolean>;
  duplicateTemplate(id: string | number): Promise<Template>;

  // Import/Export
  importTemplate(file: File): Promise<Template>;
  exportTemplate(id: string | number): Promise<Blob>;
  importFromURL(url: string): Promise<Template>;

  // Library management
  updateLibrary(): Promise<void>;
  clearCache(): void;
  syncWithServer(): Promise<void>;

  // Favorites
  addToFavorites(id: string | number): Promise<boolean>;
  removeFromFavorites(id: string | number): Promise<boolean>;
  getFavorites(): Promise<Template[]>;

  // Search and filter
  search(query: string): Promise<Template[]>;
  filter(filter: TemplateFilter): Promise<Template[]>;
  getCategories(): string[];
  getTags(): string[];
}

/**
 * Template library modal interface
 */
export interface TemplateLibraryModal {
  // Modal control
  show(): void;
  hide(): void;
  isVisible(): boolean;

  // Content management
  setFilter(filter: TemplateFilter): void;
  getFilter(): TemplateFilter;
  refresh(): void;

  // Template actions
  insertTemplate(id: string | number): Promise<void>;
  previewTemplate(id: string | number): void;

  // Events
  onTemplateInsert(callback: (template: Template) => void): void;
  onTemplatePreview(callback: (template: Template) => void): void;
  onClose(callback: () => void): void;
}

/**
 * Template library view interface
 */
export interface TemplateLibraryView {
  // Rendering
  render(): void;
  renderTemplates(templates: Template[]): void;
  renderTemplate(template: Template): HTMLElement;

  // UI state
  showLoading(): void;
  hideLoading(): void;
  showError(message: string): void;
  clearError(): void;

  // Filters and search
  updateFilters(filter: TemplateFilter): void;
  updateSearch(query: string): void;

  // Events
  bindEvents(): void;
  onTemplateClick(callback: (template: Template) => void): void;
  onFilterChange(callback: (filter: TemplateFilter) => void): void;
}
