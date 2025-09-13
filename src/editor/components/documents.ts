/**
 * Documents Component System
 * Main documents component and document class definitions
 */

import type { HistoryManager } from "../history";

/**
 * Base component interface (simplified for document system)
 */
interface ComponentBase {
  getNamespace(): string;
}

/**
 * Document configuration interface
 */
export interface DocumentConfig {
  id: string | number;
  type: string;
  container: string;
  title?: string;
  revisions: {
    current_id: string | number;
    enabled: boolean;
  };
  settings?: {
    [key: string]: any;
  };
  elements_data?: any[];
  version?: string;
  status?: string;
}

/**
 * Document class interface
 */
export interface Document {
  id: string | number;
  config: DocumentConfig;
  history: HistoryManager;
  revisions: any; // RevisionsManager
  container: any; // Container
  editor: any; // Editor model

  // Methods
  isDraft(): boolean;
  getSettings(key?: string): any;
  setSettings(key: string, value: any): void;
  save(options?: any): Promise<any>;
  load(): Promise<any>;
  clone(): Document;
  delete(): Promise<any>;
}

/**
 * Documents Component interface
 */
export interface DocumentsComponent extends ComponentBase {
  documents: { [id: string]: Document };
  currentDocument: Document | null;

  // Core methods
  getNamespace(): string;
  add(document: Document): void;
  get(id: string): Document | undefined;
  getCurrent(): Document | null;
  setCurrent(document: Document): void;
  create(config: DocumentConfig): Document;
  delete(id: string): Promise<boolean>;

  // Document operations
  switch(id: string): Promise<Document>;
  duplicate(id: string): Promise<Document>;
  import(data: any): Promise<Document>;
  export(id: string): any;

  // Cache and state management
  saveInitialDocumentToCache(): void;
  clearCache(): void;
  getFromCache(id: string): Document | undefined;

  // Event handling
  onDocumentChange(callback: (document: Document) => void): void;
  onDocumentSave(callback: (document: Document) => void): void;
}

/**
 * Document factory interface
 */
export interface DocumentFactory {
  create(config: DocumentConfig): Document;
  createFromTemplate(
    templateId: string,
    config: Partial<DocumentConfig>
  ): Document;
  createBlank(config: Partial<DocumentConfig>): Document;
}

/**
 * Document validator interface
 */
export interface DocumentValidator {
  validate(document: Document): boolean;
  validateConfig(config: DocumentConfig): boolean;
  getErrors(): string[];
}

/**
 * Document state interface
 */
export interface DocumentState {
  id: string | number;
  isModified: boolean;
  isSaving: boolean;
  isLoading: boolean;
  lastSaved: Date | null;
  autoSaveEnabled: boolean;
}

/**
 * Document manager interface
 */
export interface DocumentManager {
  documents: DocumentsComponent;
  factory: DocumentFactory;
  validator: DocumentValidator;

  // State management
  getState(id: string): DocumentState;
  setState(id: string, state: Partial<DocumentState>): void;

  // Auto-save functionality
  enableAutoSave(id: string): void;
  disableAutoSave(id: string): void;
  triggerAutoSave(id: string): Promise<void>;

  // Document lifecycle
  beforeSave(document: Document): Promise<boolean>;
  afterSave(document: Document): Promise<void>;
  beforeLoad(id: string): Promise<boolean>;
  afterLoad(document: Document): Promise<void>;
}
