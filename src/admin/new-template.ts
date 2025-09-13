/**
 * New Template Module Types
 * Types for new template creation functionality
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
  | "404";

/**
 * New template settings
 */
export interface NewTemplateSettings {
  selectors: {
    addButton: string;
    templateForm: string;
    typeSelect: string;
    titleInput: string;
  };
}

/**
 * Template data interface
 */
export interface TemplateData {
  title: string;
  type: TemplateType;
  content?: any;
  settings?: any;
  conditions?: any;
  status: "publish" | "draft" | "private";
}

/**
 * New template layout interface
 */
export interface NewTemplateLayout {
  showModal(): void;
  hideModal(): void;
  getForm(): JQuery<HTMLElement>;
  validateForm(): boolean;
  getFormData(): TemplateData;
  onSubmit(callback: Function): void;
}

/**
 * Template controls interface
 */
export interface TemplateControls {
  getTypes(): TemplateType[];
  getTypeLabel(type: TemplateType): string;
  validateTitle(title: string): boolean;
  validateType(type: TemplateType): boolean;
}

/**
 * Main new template module interface
 */
export interface NewTemplateModule {
  layout: NewTemplateLayout;
  controls: TemplateControls;

  onInit(): void;
  bindEvents(): void;
  getDefaultSettings(): NewTemplateSettings;

  // Template operations
  createTemplate(data: TemplateData): Promise<any>;
  duplicateTemplate(templateId: string): Promise<any>;
  deleteTemplate(templateId: string): Promise<boolean>;

  // Event handlers
  onAddButtonClick(event: Event): void;
  onFormSubmit(event: Event): void;
}
