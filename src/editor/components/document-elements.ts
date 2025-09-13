/**
 * Document Element Types
 * Types for document elements and their relationships
 */

/**
 * Document element base interface
 */
export interface DocumentElement {
  id: string;
  elType: string;
  settings: {
    [key: string]: any;
  };
  elements?: DocumentElement[];
  isInner?: boolean;
  widgetType?: string;
}

/**
 * Document element model interface
 */
export interface DocumentElementModel {
  id: string;
  attributes: DocumentElement;

  // Backbone model methods
  get(key: string): any;
  set(key: string, value: any): void;
  has(key: string): boolean;
  toJSON(): DocumentElement;

  // Element-specific methods
  getTitle(): string;
  getIcon(): string;
  getType(): string;
  isEditable(): boolean;
  clone(): DocumentElementModel;
}

/**
 * Document element collection interface
 */
export interface DocumentElementCollection {
  models: DocumentElementModel[];
  length: number;

  // Collection methods
  add(model: DocumentElementModel | DocumentElement): void;
  remove(model: DocumentElementModel): void;
  get(id: string): DocumentElementModel | undefined;
  at(index: number): DocumentElementModel | undefined;
  findWhere(
    attributes: Partial<DocumentElement>
  ): DocumentElementModel | undefined;
  toJSON(): DocumentElement[];

  // Element-specific methods
  getElementsData(): DocumentElement[];
  findByType(elType: string): DocumentElementModel[];
}

/**
 * Document structure interface
 */
export interface DocumentStructure {
  elements: DocumentElementCollection;
  containers: any[]; // Container references
  settings: {
    [key: string]: any;
  };

  // Structure methods
  addElement(element: DocumentElement, at?: number): DocumentElementModel;
  removeElement(id: string): boolean;
  moveElement(id: string, newIndex: number): boolean;
  duplicateElement(id: string): DocumentElementModel;

  // Query methods
  findElement(id: string): DocumentElementModel | undefined;
  findElements(criteria: Partial<DocumentElement>): DocumentElementModel[];
  getElementPath(id: string): string[];
  getParentElement(id: string): DocumentElementModel | undefined;
  getChildElements(id: string): DocumentElementModel[];

  // Validation
  validateStructure(): boolean;
  getValidationErrors(): string[];
}

/**
 * Document schema interface
 */
export interface DocumentSchema {
  version: string;
  type: string;
  elements: {
    [elType: string]: {
      title: string;
      icon: string;
      categories: string[];
      keywords: string[];
      controls: any;
    };
  };

  // Schema methods
  validateElement(element: DocumentElement): boolean;
  getElementSchema(elType: string): any;
  getAllowedChildren(elType: string): string[];
  isValidParent(parentType: string, childType: string): boolean;
}
