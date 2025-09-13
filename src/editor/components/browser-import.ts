/**
 * Browser Import Component
 * Types for importing content from external sources
 */

/**
 * Import source types
 */
export type ImportSource = "url" | "file" | "text" | "kit" | "template";

/**
 * Import data types
 */
export type ImportDataType =
  | "elementor"
  | "wordpress"
  | "html"
  | "css"
  | "json"
  | "xml";

/**
 * Import configuration
 */
export interface ImportConfig {
  source: ImportSource;
  type: ImportDataType;
  url?: string;
  file?: File;
  content?: string;
  options?: {
    [key: string]: any;
  };
}

/**
 * Import result interface
 */
export interface ImportResult {
  success: boolean;
  data?: any;
  errors?: string[];
  warnings?: string[];
  imported_items?: {
    elements: number;
    settings: number;
    assets: number;
  };
}

/**
 * Browser import manager interface
 */
export interface BrowserImportManager {
  // Import operations
  import(config: ImportConfig): Promise<ImportResult>;
  importFromURL(url: string, type: ImportDataType): Promise<ImportResult>;
  importFromFile(file: File, type: ImportDataType): Promise<ImportResult>;
  importFromText(content: string, type: ImportDataType): Promise<ImportResult>;

  // Validation
  validateImport(config: ImportConfig): boolean;
  getValidationErrors(config: ImportConfig): string[];
  getSupportedFormats(): ImportDataType[];

  // Parsing
  parseContent(content: string, type: ImportDataType): any;
  convertToElementor(data: any, sourceType: ImportDataType): any;

  // Asset handling
  downloadAssets(data: any): Promise<{ [url: string]: string }>;
  replaceAssetURLs(data: any, assetMap: { [url: string]: string }): any;

  // Preview
  generatePreview(config: ImportConfig): Promise<string>;

  // History
  getImportHistory(): ImportResult[];
  clearImportHistory(): void;
}

/**
 * Browser import modal interface
 */
export interface BrowserImportModal {
  show(): void;
  hide(): void;
  isVisible(): boolean;

  setSource(source: ImportSource): void;
  getSource(): ImportSource;

  setType(type: ImportDataType): void;
  getType(): ImportDataType;

  showPreview(preview: string): void;
  hidePreview(): void;

  onImport(callback: (result: ImportResult) => void): void;
  onCancel(callback: () => void): void;
}

/**
 * File parser interface
 */
export interface FileParser {
  getSupportedTypes(): ImportDataType[];
  canParse(file: File): boolean;
  parse(file: File): Promise<any>;
  validate(data: any): boolean;
  convert(data: any): any;
}
