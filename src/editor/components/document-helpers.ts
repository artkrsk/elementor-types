/**
 * Document Utilities and Helpers
 * Utility functions and helpers for document management
 */

import type { Document, DocumentConfig } from "./documents";
import type {
  DocumentElement,
  DocumentElementModel,
} from "./document-elements";

/**
 * Document utilities interface
 */
export interface DocumentUtils {
  // Document creation utilities
  createDefaultConfig(type: string): DocumentConfig;
  mergeConfigs(
    base: DocumentConfig,
    override: Partial<DocumentConfig>
  ): DocumentConfig;
  validateConfig(config: DocumentConfig): boolean;

  // Element utilities
  generateElementId(): string;
  createElementFromType(elType: string, settings?: any): DocumentElement;
  cloneElement(element: DocumentElement): DocumentElement;
  flattenElements(elements: DocumentElement[]): DocumentElement[];

  // Document conversion utilities
  convertToJSON(document: Document): any;
  convertFromJSON(json: any): DocumentConfig;
  exportDocument(document: Document): string;
  importDocument(data: string): DocumentConfig;

  // Comparison utilities
  compareDocuments(doc1: Document, doc2: Document): boolean;
  getDocumentDiff(doc1: Document, doc2: Document): any[];
  hasUnsavedChanges(document: Document): boolean;

  // Search utilities
  searchElements(document: Document, query: string): DocumentElementModel[];
  findElementsByType(
    document: Document,
    elType: string
  ): DocumentElementModel[];
  findElementsByWidget(
    document: Document,
    widgetType: string
  ): DocumentElementModel[];
}

/**
 * Document state utilities
 */
export interface DocumentStateUtils {
  // State management
  saveState(document: Document): any;
  restoreState(document: Document, state: any): void;
  clearState(document: Document): void;

  // Dirty tracking
  markDirty(document: Document): void;
  markClean(document: Document): void;
  isDirty(document: Document): boolean;

  // Auto-save management
  scheduleAutoSave(document: Document): void;
  cancelAutoSave(document: Document): void;
  forceAutoSave(document: Document): Promise<void>;
}

/**
 * Document template utilities
 */
export interface DocumentTemplateUtils {
  // Template operations
  createTemplate(document: Document, name: string): any;
  applyTemplate(document: Document, templateId: string): void;
  listTemplates(): any[];
  deleteTemplate(templateId: string): boolean;

  // Template validation
  validateTemplate(template: any): boolean;
  getTemplatePreview(templateId: string): string;

  // Template import/export
  exportTemplate(templateId: string): string;
  importTemplate(data: string): any;
}

/**
 * Document performance utilities
 */
export interface DocumentPerformanceUtils {
  // Performance optimization
  optimizeElementsData(elements: DocumentElement[]): DocumentElement[];
  cleanupUnusedElements(document: Document): void;
  compressDocument(document: Document): any;
  decompressDocument(data: any): DocumentConfig;

  // Caching utilities
  cacheDocument(document: Document): void;
  getCachedDocument(id: string): Document | undefined;
  clearDocumentCache(id?: string): void;

  // Memory management
  garbageCollect(): void;
  getMemoryUsage(): number;
}

/**
 * Document validation utilities
 */
export interface DocumentValidationUtils {
  // Schema validation
  validateAgainstSchema(document: Document): boolean;
  getSchemaErrors(document: Document): string[];
  fixSchemaErrors(document: Document): Document;

  // Content validation
  validateContent(document: Document): boolean;
  validateSettings(document: Document): boolean;
  validateElements(document: Document): boolean;

  // Integrity validation
  validateIntegrity(document: Document): boolean;
  checkMissingAssets(document: Document): string[];
  checkBrokenReferences(document: Document): string[];
}

/**
 * Document migration utilities
 */
export interface DocumentMigrationUtils {
  // Version migration
  migrateToLatestVersion(document: Document): Document;
  migrateFromVersion(document: Document, fromVersion: string): Document;
  getRequiredMigrations(document: Document): string[];

  // Data migration
  migrateElementsData(elements: DocumentElement[]): DocumentElement[];
  migrateSettings(settings: any): any;

  // Compatibility
  isCompatible(document: Document, version: string): boolean;
  getCompatibilityIssues(document: Document): string[];
}

/**
 * Main document helpers export
 */
export interface DocumentHelpers {
  utils: DocumentUtils;
  state: DocumentStateUtils;
  template: DocumentTemplateUtils;
  performance: DocumentPerformanceUtils;
  validation: DocumentValidationUtils;
  migration: DocumentMigrationUtils;
}
