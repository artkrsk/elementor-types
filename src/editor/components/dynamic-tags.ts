/**
 * Dynamic Tags Component
 * Types for dynamic content tag functionality
 */

/**
 * Dynamic tag categories
 */
export type DynamicTagCategory =
  | "text"
  | "url"
  | "image"
  | "media"
  | "number"
  | "color"
  | "post"
  | "site"
  | "author"
  | "archive"
  | "action";

/**
 * Dynamic tag data interface
 */
export interface DynamicTag {
  name: string;
  title: string;
  categories: DynamicTagCategory[];
  group?: string;
  settings?: {
    [key: string]: any;
  };
  controls?: any[];
  returnType?: string;
  editable?: boolean;
}

/**
 * Dynamic tag configuration
 */
export interface DynamicTagConfig {
  name: string;
  title: string;
  categories: DynamicTagCategory[];
  group: string;
  settings?: {
    [key: string]: any;
  };
  controlsMap?: {
    [control: string]: any;
  };
}

/**
 * Dynamic tag value interface
 */
export interface DynamicTagValue {
  id: string;
  name: string;
  settings: {
    [key: string]: any;
  };
  returnType?: string;
  fallback?: string;
}

/**
 * Dynamic tags manager interface
 */
export interface DynamicTagsManager {
  // Tag registration
  registerTag(config: DynamicTagConfig): void;
  unregisterTag(name: string): void;
  getTag(name: string): DynamicTag | undefined;
  getTags(): DynamicTag[];
  getTagsByCategory(category: DynamicTagCategory): DynamicTag[];

  // Tag processing
  parseTag(content: string): DynamicTagValue[];
  renderTag(tag: DynamicTagValue): Promise<string>;
  renderContent(content: string): Promise<string>;

  // Validation
  validateTag(tag: DynamicTagValue): boolean;
  getValidationErrors(tag: DynamicTagValue): string[];

  // Categories and groups
  getCategories(): DynamicTagCategory[];
  getGroups(): string[];
  getTagsByGroup(group: string): DynamicTag[];

  // Settings
  getTagSettings(name: string): any;
  updateTagSettings(name: string, settings: any): void;

  // Cache management
  clearCache(): void;
  getCachedValue(tag: DynamicTagValue): string | undefined;
  setCachedValue(tag: DynamicTagValue, value: string): void;
}

/**
 * Dynamic tags modal interface
 */
export interface DynamicTagsModal {
  // Modal control
  show(categories?: DynamicTagCategory[]): void;
  hide(): void;
  isVisible(): boolean;

  // Content management
  setCategories(categories: DynamicTagCategory[]): void;
  getCategories(): DynamicTagCategory[];
  refresh(): void;

  // Tag selection
  getSelectedTag(): DynamicTag | undefined;
  selectTag(tag: DynamicTag): void;
  clearSelection(): void;

  // Settings
  showSettings(tag: DynamicTag): void;
  hideSettings(): void;
  getSettings(): any;

  // Events
  onTagSelect(callback: (tag: DynamicTag) => void): void;
  onSettingsChange(callback: (settings: any) => void): void;
  onClose(callback: () => void): void;
}

/**
 * Dynamic tag control interface
 */
export interface DynamicTagControl {
  // Initialization
  init(element: HTMLElement, categories: DynamicTagCategory[]): void;
  destroy(): void;

  // Value management
  getValue(): DynamicTagValue | undefined;
  setValue(tag: DynamicTagValue): void;
  clear(): void;

  // UI state
  enable(): void;
  disable(): void;
  isEnabled(): boolean;

  // Categories
  setCategories(categories: DynamicTagCategory[]): void;
  getCategories(): DynamicTagCategory[];

  // Events
  onChange(callback: (tag: DynamicTagValue) => void): void;
  onOpen(callback: () => void): void;
}

/**
 * Dynamic tag parser interface
 */
export interface DynamicTagParser {
  // Parsing
  parse(content: string): DynamicTagValue[];
  parseTag(tagString: string): DynamicTagValue | undefined;

  // Rendering
  render(content: string): Promise<string>;
  renderTag(tag: DynamicTagValue): Promise<string>;

  // Validation
  isValidTag(tagString: string): boolean;
  extractSettings(tagString: string): any;

  // Formatting
  formatTag(tag: DynamicTagValue): string;
  formatContent(content: string, tags: DynamicTagValue[]): string;
}
