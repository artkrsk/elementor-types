/**
 * Elementor Window Components
 *
 * TypeScript definitions for window.elementor.modules.components
 * Based on the actual JavaScript component implementations
 */

/**
 * Footer Saver Behavior interface
 */
export interface FooterSaverBehavior {
  /** Preview window reference */
  previewWindow: Window | null;

  /** UI elements */
  ui(): {
    buttonPreview: string;
    buttonPublish: string;
    buttonSaveOptions: string;
    buttonPublishLabel: string;
    menuSaveDraft: string;
    lastEditedWrapper: string;
    copyAndShareLink: string;
  };

  /** Event handlers */
  events(): {
    'click @ui.buttonPreview': string;
    'click @ui.buttonPublish': string;
    'click @ui.menuSaveDraft': string;
    'click @ui.copyAndShareLink': string;
  };

  /** Initialize behavior */
  initialize(options: { document?: any }): void;

  /** Document reference */
  document: any;

  /** Event handler methods */
  onClickButtonPreview(): void;
  onClickButtonPublish(): void;
  onClickMenuSaveDraft(): void;
  onCopyAndShareLinkClick(): void;

  /** Set menu items */
  setMenuItems(document: any): void;

  /** Set last edited time */
  setLastEdited(lastEdited: string): void;
}

/**
 * Template Library Import View interface
 */
export interface TemplateLibraryImportView {
  /** Template ID */
  template: string;

  /** Element ID */
  id: string;

  /** UI elements */
  ui: {
    uploadForm: string;
    fileInput: string;
    icon: string;
  };

  /** Event handlers */
  events: {
    'change @ui.fileInput': string;
  };

  /** Dropped files */
  droppedFiles: File[] | null;

  /** Submit form */
  submitForm(): void;

  /** File input change handler */
  onFileInputChange(): void;

  /** File upload handler */
  filesUploadHandler?: any;
}

/**
 * Base Modal Layout interface
 */
export interface BaseModalLayout {
  /** Modal ID */
  id: string;

  /** Modal class name */
  className: string;

  /** Modal template */
  template: string;

  /** Show modal */
  show(): void;

  /** Hide modal */
  hide(): void;

  /** Get header */
  getHeaderView(): any;

  /** Get content */
  getContentView(): any;

  /** Initialize modal */
  initialize(options?: any): void;

  /** Render modal */
  render(): this;
}

/**
 * Template Library Views interface
 */
export interface TemplateLibraryViews {
  /** Base modal layout */
  BaseModalLayout: new (...args: any[]) => BaseModalLayout;

  /** Import view */
  Import?: new (...args: any[]) => TemplateLibraryImportView;

  /** Templates list view */
  Templates?: any;

  /** Template item view */
  Template?: any;
}

/**
 * Template Library Component interface
 */
export interface TemplateLibraryComponent {
  /** Template library views */
  views: TemplateLibraryViews;

  /** Template library models */
  models?: {
    Template: any;
    Templates: any;
  };

  /** Template library collections */
  collections?: {
    Templates: any;
  };

  /** Template library manager */
  manager?: any;
}

/**
 * Saver Behaviors interface
 */
export interface SaverBehaviors {
  /** Footer saver behavior */
  FooterSaver: new (...args: any[]) => FooterSaverBehavior;
}

/**
 * Saver Component interface
 */
export interface SaverComponent {
  /** Saver behaviors */
  behaviors: SaverBehaviors;

  /** Document saver */
  documentSaver?: any;

  /** Auto save manager */
  autoSave?: any;
}

/**
 * Component Modules interface
 */
export interface ComponentModules {
  /** Template library component */
  templateLibrary: TemplateLibraryComponent;

  /** Saver component */
  saver: SaverComponent;

  /** Settings component */
  settings?: {
    page?: any;
    base?: any;
    editorPreferences?: any;
  };

  /** Documents component */
  documents?: any;

  /** Preview component */
  preview?: any;

  /** Navigator component */
  navigator?: any;

  /** Icons manager component */
  iconsManager?: any;

  /** Selection component */
  selection?: any;
}

/**
 * Complete components interface for window.elementor.modules.components
 */
export interface ElementorWindowComponents extends ComponentModules {}