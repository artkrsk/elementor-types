/**
 * Floating Elements Module Types
 * Types for floating elements (buttons, bars) functionality
 */

/**
 * Floating element types
 */
export type FloatingElementType = "button" | "bar" | "popup" | "widget";

/**
 * Floating elements settings
 */
export interface FloatingElementsSettings {
  selectors: {
    addButtonTopBar: string;
    addButtonAdminBar: string;
    addButtonEmptyTemplate: string;
  };
}

/**
 * Floating elements configuration
 */
export interface FloatingElementsConfig {
  enabled: boolean;
  types: FloatingElementType[];
  max_elements: number;
  default_position: string;
  animations: string[];
}

/**
 * Floating elements DOM elements
 */
export interface FloatingElementsElements {
  addButtonTopBar: HTMLElement | null;
  addButtonAdminBar: HTMLElement | null;
  addButtonEmptyTemplate: HTMLElement | null;
}

/**
 * Floating element data
 */
export interface FloatingElementData {
  id: string;
  type: FloatingElementType;
  title: string;
  position: {
    x: number;
    y: number;
    side: "left" | "right" | "top" | "bottom";
  };
  settings: {
    [key: string]: any;
  };
  triggers: {
    [event: string]: any;
  };
  conditions: {
    [rule: string]: any;
  };
}

/**
 * Floating elements layout interface
 */
export interface FloatingElementsLayout {
  // Modal methods
  showModal(): void;
  hideModal(): void;
  getModal(): JQuery<HTMLElement>;

  // Template methods
  getTemplates(): any[];
  selectTemplate(templateId: string): void;
  createFromTemplate(templateId: string): Promise<FloatingElementData>;

  // Form methods
  getForm(): JQuery<HTMLElement>;
  validateForm(): boolean;
  getFormData(): any;

  // Event handling
  onTemplateSelect(callback: Function): void;
  onCreate(callback: Function): void;
  onCancel(callback: Function): void;
}

/**
 * Main floating elements module interface
 */
export interface FloatingElementsModule {
  layout: FloatingElementsLayout;
  config: FloatingElementsConfig;
  elements: FloatingElementsElements;

  // Lifecycle methods
  onInit(): void;
  bindEvents(): void;

  // Settings and elements
  getDefaultSettings(): FloatingElementsSettings;
  getDefaultElements(): FloatingElementsElements;

  // Event handlers
  onAddButtonClick(event: Event): void;

  // Element management
  createElement(
    data: Partial<FloatingElementData>
  ): Promise<FloatingElementData>;
  updateElement(
    id: string,
    data: Partial<FloatingElementData>
  ): Promise<boolean>;
  deleteElement(id: string): Promise<boolean>;
  getElements(): FloatingElementData[];

  // State management
  isEnabled(): boolean;
  getMaxElements(): number;
  canCreateMore(): boolean;
}

/**
 * Floating element template interface
 */
export interface FloatingElementTemplate {
  id: string;
  title: string;
  type: FloatingElementType;
  thumbnail: string;
  preview_url?: string;
  data: Partial<FloatingElementData>;
  pro_required?: boolean;
  category: string;
  tags: string[];
}
