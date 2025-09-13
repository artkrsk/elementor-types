/**
 * Frontend Document Management
 * Comprehensive document management system for Elementor frontend
 */

import type { ViewModule } from "../core";

/**
 * Document settings interface
 */
export interface DocumentSettings {
  selectors: {
    elements: string;
    nestedDocumentElements: string;
  };
  classes: {
    editMode: string;
  };
  [key: string]: any;
}

/**
 * Document elements interface
 */
export interface DocumentElements {
  $elements: JQuery<HTMLElement>;
  [key: string]: JQuery<HTMLElement>;
}

/**
 * Document data interface from DOM
 */
export interface DocumentData {
  elementorId: string | number;
  elementorType: string;
  elementorSettings?: Record<string, any>;
  elementorVersion?: string;
  [key: string]: any;
}

/**
 * Document initialization options
 */
export interface DocumentInitOptions {
  $element: JQuery<HTMLElement>;
  id: string | number;
  type?: string;
  settings?: Record<string, any>;
}

/**
 * Enhanced Frontend Document
 * Comprehensive document interface matching frontend document.js
 */
export declare class FrontendDocument extends ViewModule {
  $element: JQuery<HTMLElement>;
  isEdit: boolean;
  id: string | number;
  type: string;
  elements: DocumentElements;

  constructor(options: DocumentInitOptions);

  // Settings management
  getDefaultSettings(): DocumentSettings;
  getDocumentSettings(setting?: string): any;

  // Elements management
  getDefaultElements(): DocumentElements;
  refreshElements(): void;

  // Handler management
  runElementsHandlers(): void;
  bindElementsHandlers(): void;
  unbindElementsHandlers(): void;

  // Lifecycle
  onInit(): void;
  onDestroy(): void;

  // Settings change handling
  onSettingsChange(changedSettings?: Record<string, any>): void;

  // Edit mode detection
  isEditMode(): boolean;

  // Element queries
  getElements(selector?: string): JQuery<HTMLElement>;
  findElements(selector: string): JQuery<HTMLElement>;

  // Document state
  isReady(): boolean;
  getDocumentId(): string | number;
  getDocumentType(): string;

  // Performance
  optimizeHandlers(): void;
  throttleSettingsChange(): void;
}

/**
 * Documents manager settings
 */
export interface DocumentsManagerSettings {
  selectors: {
    document: string;
  };
  documentTypes: Record<string, string>;
  autoAttach: boolean;
  [key: string]: any;
}

/**
 * Documents manager elements
 */
export interface DocumentsManagerElements {
  $documents: JQuery<HTMLElement>;
  [key: string]: JQuery<HTMLElement>;
}

/**
 * Document class registry entry
 */
export interface DocumentClassEntry {
  class: typeof FrontendDocument;
  priority: number;
  conditions?: (documentData: DocumentData) => boolean;
}

/**
 * Enhanced Documents Manager
 * Comprehensive document management system
 */
export declare class FrontendDocumentsManager extends ViewModule {
  documents: Record<string | number, FrontendDocument>;
  documentClasses: Record<string, typeof FrontendDocument | DocumentClassEntry>;
  elements: DocumentsManagerElements;

  constructor(settings?: Partial<DocumentsManagerSettings>);

  // Settings management
  getDefaultSettings(): DocumentsManagerSettings;

  // Elements management
  getDefaultElements(): DocumentsManagerElements;

  // Document class management
  initDocumentClasses(): void;
  addDocumentClass(
    documentType: string,
    documentClass: typeof FrontendDocument,
    priority?: number,
    conditions?: (documentData: DocumentData) => boolean
  ): void;
  removeDocumentClass(documentType: string): boolean;
  getDocumentClass(documentType: string): typeof FrontendDocument;
  getRegisteredDocumentTypes(): string[];

  // Document instance management
  attachDocumentsClasses(): void;
  attachDocumentClass($document: JQuery<HTMLElement>): FrontendDocument | null;
  createDocument(
    documentData: DocumentData,
    $element: JQuery<HTMLElement>
  ): FrontendDocument | null;

  // Document queries
  getDocument(documentId: string | number): FrontendDocument | null;
  getDocuments(): Record<string | number, FrontendDocument>;
  getDocumentsByType(documentType: string): FrontendDocument[];
  hasDocument(documentId: string | number): boolean;

  // Document lifecycle
  initializeDocument(documentId: string | number): boolean;
  destroyDocument(documentId: string | number): boolean;
  refreshDocuments(): void;
  refreshDocument(documentId: string | number): boolean;

  // DOM utilities
  getDocumentData($document: JQuery<HTMLElement>): DocumentData;
  validateDocumentData(documentData: DocumentData): boolean;

  // Event handling
  onDocumentReady(callback: (document: FrontendDocument) => void): void;
  onDocumentDestroy(callback: (document: FrontendDocument) => void): void;

  // Performance
  batchAttachDocuments($documents: JQuery<HTMLElement>): void;
  optimizeDocumentHandlers(): void;

  // Debugging and development
  getDocumentInfo(documentId: string | number): DocumentInfo | null;
  validateDocuments(): DocumentValidationResult[];
}

/**
 * Document information for debugging
 */
export interface DocumentInfo {
  id: string | number;
  type: string;
  className: string;
  isEdit: boolean;
  isReady: boolean;
  elementCount: number;
  handlerCount: number;
  settings: Record<string, any>;
  errors: Error[];
}

/**
 * Document validation result
 */
export interface DocumentValidationResult {
  documentId: string | number;
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

/**
 * Document event types
 */
export interface DocumentEvents {
  "document:ready": (document: FrontendDocument) => void;
  "document:destroy": (document: FrontendDocument) => void;
  "document:settings:change": (
    document: FrontendDocument,
    settings: Record<string, any>
  ) => void;
  "document:elements:change": (document: FrontendDocument) => void;
  "documents:refresh": (documents: FrontendDocument[]) => void;
  "document:error": (document: FrontendDocument, error: Error) => void;
}

/**
 * Document factory for creating specialized document instances
 */
export declare class DocumentFactory {
  private static documentClasses: Map<string, typeof FrontendDocument>;

  static register(
    documentType: string,
    documentClass: typeof FrontendDocument
  ): void;
  static create(
    documentData: DocumentData,
    $element: JQuery<HTMLElement>
  ): FrontendDocument | null;
  static getAvailableTypes(): string[];
  static hasType(documentType: string): boolean;
}

/**
 * Document collection for managing multiple documents
 */
export interface DocumentCollection {
  documents: Map<string | number, FrontendDocument>;

  add(document: FrontendDocument): void;
  remove(documentId: string | number): boolean;
  get(documentId: string | number): FrontendDocument | undefined;
  has(documentId: string | number): boolean;
  clear(): void;
  size(): number;

  // Query methods
  findByType(documentType: string): FrontendDocument[];
  findBySelector(selector: string): FrontendDocument[];
  filter(
    predicate: (document: FrontendDocument) => boolean
  ): FrontendDocument[];

  // Batch operations
  forEach(
    callback: (document: FrontendDocument, id: string | number) => void
  ): void;
  map<T>(callback: (document: FrontendDocument, id: string | number) => T): T[];

  // Lifecycle operations
  initializeAll(): Promise<void>;
  destroyAll(): Promise<void>;
  refreshAll(): Promise<void>;
}

/**
 * Document observer for watching DOM changes
 */
export interface DocumentObserver {
  isObserving: boolean;

  start(): void;
  stop(): void;
  observe(callback: (mutations: MutationRecord[]) => void): void;

  // Document-specific observations
  onDocumentAdded(callback: ($document: JQuery<HTMLElement>) => void): void;
  onDocumentRemoved(callback: (documentId: string | number) => void): void;
  onDocumentChanged(callback: ($document: JQuery<HTMLElement>) => void): void;
}

/**
 * Document utilities
 */
export interface DocumentUtilsInterface {
  /**
   * Extract document data from DOM element
   */
  extractDocumentData($element: JQuery<HTMLElement>): DocumentData | null;

  /**
   * Validate document element
   */
  isValidDocumentElement($element: JQuery<HTMLElement>): boolean;

  /**
   * Get all document elements in scope
   */
  findDocumentElements($scope?: JQuery<HTMLElement>): JQuery<HTMLElement>;

  /**
   * Generate unique document ID
   */
  generateDocumentId(): string;

  /**
   * Check if element is in edit mode
   */
  isEditMode($element: JQuery<HTMLElement>): boolean;

  /**
   * Get document settings from element
   */
  getDocumentSettings($element: JQuery<HTMLElement>): Record<string, any>;

  /**
   * Create document instance
   */
  createDocumentInstance(
    documentData: DocumentData,
    $element: JQuery<HTMLElement>,
    DocumentClass?: typeof FrontendDocument
  ): FrontendDocument | null;
}

/**
 * Document utilities implementation
 */
export declare const DocumentUtils: DocumentUtilsInterface;

/**
 * Document performance monitor
 */
export interface DocumentPerformanceMonitor {
  metrics: {
    documentCreationTime: number;
    handlerInitializationTime: number;
    settingsChangeTime: number;
    totalDocuments: number;
    activeDocuments: number;
  };

  startTiming(operation: string): void;
  endTiming(operation: string): number;
  recordMetric(name: string, value: number): void;
  getMetrics(): Record<string, number>;
  reset(): void;
}

/**
 * Global document management interface
 */
export interface GlobalDocumentManager {
  manager: FrontendDocumentsManager;
  collection: DocumentCollection;
  observer: DocumentObserver;
  factory: typeof DocumentFactory;
  utils: DocumentUtilsInterface;
  monitor: DocumentPerformanceMonitor;

  // Convenience methods
  init(): void;
  getDocument(id: string | number): FrontendDocument | null;
  createDocument(
    data: DocumentData,
    $element: JQuery<HTMLElement>
  ): FrontendDocument | null;
  destroyDocument(id: string | number): boolean;
  refreshDocuments(): void;

  // Event system
  on<K extends keyof DocumentEvents>(
    event: K,
    callback: DocumentEvents[K]
  ): void;
  off<K extends keyof DocumentEvents>(
    event: K,
    callback: DocumentEvents[K]
  ): void;
  emit<K extends keyof DocumentEvents>(
    event: K,
    ...args: Parameters<DocumentEvents[K]>
  ): void;
}
