/**
 * Specific Element Model Types
 * Widget, Section, Column, Container, and Document model classes
 */

import type { BaseElementModel, ElementModel, ElementModelDefaults } from "./base";

/**
 * Widget model specific attributes
 */
export interface WidgetModelDefaults extends ElementModelDefaults {
  /** Widget type identifier */
  widgetType: string;
  /** Widget element type */
  elType: 'widget';
}

/**
 * Section model specific attributes
 */
export interface SectionModelDefaults extends ElementModelDefaults {
  /** Section element type */
  elType: 'section';
  /** Section columns */
  elements: any[];
}

/**
 * Column model specific attributes
 */
export interface ColumnModelDefaults extends ElementModelDefaults {
  /** Column element type */
  elType: 'column';
  /** Column width percentage */
  _column_size?: number;
  /** Column elements */
  elements: any[];
}

/**
 * Container model specific attributes
 */
export interface ContainerModelDefaults extends ElementModelDefaults {
  /** Container element type */
  elType: 'container';
  /** Container elements */
  elements: any[];
}

/**
 * Document model specific attributes
 */
export interface DocumentModelDefaults extends ElementModelDefaults {
  /** Document element type */
  elType: 'document';
  /** Document title */
  post_title: string;
  /** Document status */
  post_status: string;
  /** Document type */
  document_type: string;
  /** Document elements */
  elements: any[];
}

/**
 * Widget Model
 * Model class for widget elements
 */
export declare class WidgetModel extends ElementModel {
  /** Widget-specific defaults */
  defaults: WidgetModelDefaults;

  /** Remote rendering enabled for widgets */
  remoteRender: true;

  /**
   * Get widget type
   */
  getWidgetType(): string;

  /**
   * Check if widget is editable
   */
  isEditable(): boolean;

  /**
   * Get widget controls
   */
  getControls(): any;

  /**
   * Render widget remotely
   */
  renderRemoteServer(): Promise<string>;

  /**
   * Get widget HTML cache
   */
  getHtmlCache(): string | null;

  /**
   * Set widget HTML cache
   * @param htmlCache - Widget HTML
   */
  setHtmlCache(htmlCache: string): void;

  /**
   * Get widget preview settings
   */
  getPreviewSettings(): any;

  /**
   * Clone widget with new settings
   * @param newSettings - New widget settings
   */
  cloneWithSettings(newSettings: any): WidgetModel;
}

/**
 * Section Model
 * Model class for section elements
 */
export declare class SectionModel extends ElementModel {
  /** Section-specific defaults */
  defaults: SectionModelDefaults;

  /**
   * Validate child (must be column)
   * @param childModel - Child model to validate
   */
  isValidChild(childModel: BaseElementModel): boolean;

  /**
   * Get section structure preset
   */
  getStructurePreset(): string;

  /**
   * Set section structure
   * @param structure - Section structure preset
   */
  setStructure(structure: string): void;

  /**
   * Add column to section
   * @param columnModel - Column model to add
   * @param index - Position to insert at
   */
  addColumn(columnModel: ColumnModel, index?: number): void;

  /**
   * Remove column from section
   * @param columnModel - Column model to remove
   */
  removeColumn(columnModel: ColumnModel): void;

  /**
   * Get section columns
   */
  getColumns(): ColumnModel[];

  /**
   * Duplicate section
   */
  duplicate(): SectionModel;
}

/**
 * Column Model
 * Model class for column elements
 */
export declare class ColumnModel extends ElementModel {
  /** Column-specific defaults */
  defaults: ColumnModelDefaults;

  /**
   * Validate child (can be widget or inner section)
   * @param childModel - Child model to validate
   */
  isValidChild(childModel: BaseElementModel): boolean;

  /**
   * Get column size (width percentage)
   */
  getSize(): number;

  /**
   * Set column size
   * @param size - Width percentage (1-100)
   */
  setSize(size: number): void;

  /**
   * Check if column is empty
   */
  isEmpty(): boolean;

  /**
   * Get column elements
   */
  getElements(): ElementModel[];

  /**
   * Add element to column
   * @param elementModel - Element model to add
   * @param index - Position to insert at
   */
  addElement(elementModel: ElementModel, index?: number): void;

  /**
   * Remove element from column
   * @param elementModel - Element model to remove
   */
  removeElement(elementModel: ElementModel): void;
}

/**
 * Container Model
 * Model class for container elements (experimental feature)
 */
export declare class ContainerModel extends ElementModel {
  /** Container-specific defaults */
  defaults: ContainerModelDefaults;

  /**
   * Validate child (can be any element type)
   * @param childModel - Child model to validate
   */
  isValidChild(childModel: BaseElementModel): boolean;

  /**
   * Check if container is empty
   */
  isEmpty(): boolean;

  /**
   * Get container elements
   */
  getElements(): ElementModel[];

  /**
   * Add element to container
   * @param elementModel - Element model to add
   * @param index - Position to insert at
   */
  addElement(elementModel: ElementModel, index?: number): void;

  /**
   * Remove element from container
   * @param elementModel - Element model to remove
   */
  removeElement(elementModel: ElementModel): void;

  /**
   * Get container flexbox settings
   */
  getFlexboxSettings(): any;

  /**
   * Check if container has flexbox enabled
   */
  isFlexbox(): boolean;
}

/**
 * Document Model
 * Model class for document (page/template) elements
 */
export declare class DocumentModel extends ElementModel {
  /** Document-specific defaults */
  defaults: DocumentModelDefaults;

  /**
   * Validate child (can be section or container)
   * @param childModel - Child model to validate
   */
  isValidChild(childModel: BaseElementModel): boolean;

  /**
   * Get document title
   */
  getTitle(): string;

  /**
   * Set document title
   * @param title - Document title
   */
  setTitle(title: string): void;

  /**
   * Get document status
   */
  getStatus(): string;

  /**
   * Get document type
   */
  getDocumentType(): string;

  /**
   * Save document
   */
  save(): Promise<any>;

  /**
   * Get document elements
   */
  getElements(): ElementModel[];

  /**
   * Check if document is empty
   */
  isEmpty(): boolean;

  /**
   * Clear document (remove all elements)
   */
  clear(): this;

  /**
   * Import document from JSON
   * @param data - Document data
   */
  importFromJSON(data: any): void;

  /**
   * Export document to JSON
   */
  exportToJSON(): any;
}