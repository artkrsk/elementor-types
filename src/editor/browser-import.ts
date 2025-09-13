/**
 * Browser Import System Types
 * File import, parsing, and browser component types
 */

/**
 * Browser import item representing imported content
 */
export interface BrowserImportItem {
  id: string;
  type: string;
  data: any;
  metadata?: Record<string, any>;
}

/**
 * Collection of browser import items
 */
export interface BrowserImportItemCollection {
  items: BrowserImportItem[];
  length: number;
  add(item: BrowserImportItem): void;
  remove(id: string): void;
  get(id: string): BrowserImportItem | undefined;
  toArray(): BrowserImportItem[];
}

/**
 * File reader constructor interface
 */
export interface FileReaderConstructor {
  new (file: File): FileReaderBase;
  getName(): string;
  isActive(): boolean;
  readonly mimeTypes: string[];
  resolve(input: any): Promise<string | false>;
}

/**
 * Base file reader interface
 */
export interface FileReaderBase {
  file: File;

  /**
   * Read the file and get data
   */
  getData(): Promise<any>;

  /**
   * Validate the file format
   */
  validate(): Promise<boolean>;
}

/**
 * File parser constructor interface
 */
export interface FileParserConstructor {
  new (reader: FileReaderBase): FileParserBase;
  getName(): string;
  getReaders(): string[];
}

/**
 * Base file parser interface
 */
export interface FileParserBase {
  reader: FileReaderBase;
  tasks: any[];

  /**
   * Parse the file content
   */
  parse(): Promise<any>;

  /**
   * Add task to be completed after parsing
   */
  addTask(task: any): void;

  /**
   * Execute all pending tasks
   */
  executeTasks(): Promise<void>;
}

/**
 * JSON file reader
 */
export interface JsonReader extends FileReaderBase {}

/**
 * JSON file reader constructor
 */
export interface JsonReaderConstructor extends FileReaderConstructor {
  getName(): "json";
  readonly mimeTypes: ["application/json"];
}

/**
 * Image file reader
 */
export interface ImageReader extends FileReaderBase {}

/**
 * Image file reader constructor
 */
export interface ImageReaderConstructor extends FileReaderConstructor {
  getName(): "image";
  readonly mimeTypes: string[];
}

/**
 * Video file reader
 */
export interface VideoReader extends FileReaderBase {}

/**
 * Video file reader constructor
 */
export interface VideoReaderConstructor extends FileReaderConstructor {
  getName(): "video";
  readonly mimeTypes: string[];
}

/**
 * Elements JSON parser
 */
export interface ElementsParser extends FileParserBase {}

/**
 * Elements parser constructor
 */
export interface ElementsParserConstructor extends FileParserConstructor {
  getName(): "elements";
  getReaders(): ["json"];
}

/**
 * Image parser
 */
export interface ImageParser extends FileParserBase {}

/**
 * Image parser constructor
 */
export interface ImageParserConstructor extends FileParserConstructor {
  getName(): "image";
  getReaders(): ["image"];
}

/**
 * Video parser
 */
export interface VideoParser extends FileParserBase {}

/**
 * Video parser constructor
 */
export interface VideoParserConstructor extends FileParserConstructor {
  getName(): "video";
  getReaders(): ["video"];
}

/**
 * Browser import normalizer
 */
export interface BrowserImportNormalizer {
  manager: BrowserImportManager;

  /**
   * Normalize input to ItemCollection
   */
  normalize(input: any): Promise<BrowserImportItemCollection>;

  /**
   * Normalize array of inputs
   */
  normalizeArray(inputs: any[]): Promise<BrowserImportItemCollection>;

  /**
   * Create item from data
   */
  createItem(data: any): BrowserImportItem;
}

/**
 * Browser import session
 */
export interface BrowserImportSession {
  id: string;
  items: BrowserImportItemCollection;
  status: "pending" | "processing" | "completed" | "error";
  startTime: Date;
  endTime?: Date;

  /**
   * Add items to session
   */
  addItems(items: BrowserImportItem[]): void;

  /**
   * Get session progress
   */
  getProgress(): number;

  /**
   * Complete the session
   */
  complete(): void;
}

/**
 * Browser import manager
 */
export interface BrowserImportManager {
  readers: Record<string, FileReaderConstructor>;
  parsers: Record<string, Record<string, FileParserConstructor>>;
  normalizer: BrowserImportNormalizer;

  /**
   * Register a file reader
   */
  registerReader(ReaderClass: FileReaderConstructor): void;

  /**
   * Register a file parser
   */
  registerParser(ParserClass: FileParserConstructor, readerName: string): void;

  /**
   * Get reader by mime type
   */
  getReaderByMimeType(mimeType: string): FileReaderConstructor | undefined;

  /**
   * Get parser by reader name
   */
  getParserByReader(
    readerName: string,
    parserName: string
  ): FileParserConstructor | undefined;

  /**
   * Import files
   */
  import(files: File[]): Promise<BrowserImportSession>;

  /**
   * Process import session
   */
  processSession(session: BrowserImportSession): Promise<void>;
}

/**
 * Browser import component
 */
export interface BrowserImportComponent {
  /**
   * Get component namespace
   */
  getNamespace(): "editor/browser-import";

  /**
   * Get default commands
   */
  defaultCommands(): Record<string, any>;

  /**
   * Get internal commands
   */
  defaultCommandsInternal(): Record<string, any>;

  /**
   * Import commands
   */
  importCommands(commands: Record<string, any>): Record<string, any>;
}

/**
 * Container factory for browser import
 */
export interface BrowserImportContainerFactory {
  /**
   * Create element container from data
   */
  createElementContainer(elementData: any): any;

  /**
   * Create document container from data
   */
  createDocumentContainer(documentData: any): any;

  /**
   * Validate container data
   */
  validateContainerData(data: any): boolean;
}

/**
 * Default configuration for browser import
 */
export interface BrowserImportDefaultConfig {
  maxFileSize: number;
  allowedMimeTypes: string[];
  maxFiles: number;
  supportedFormats: string[];
}

/**
 * Union type of all file readers
 */
export type AnyFileReader = JsonReader | ImageReader | VideoReader;

/**
 * Union type of all file parsers
 */
export type AnyFileParser = ElementsParser | ImageParser | VideoParser;

/**
 * Browser import file types
 */
export type BrowserImportFileType = "json" | "image" | "video";

/**
 * Browser import result
 */
export interface BrowserImportResult {
  session: BrowserImportSession;
  success: boolean;
  errors: string[];
  warnings: string[];
  imported: number;
  skipped: number;
}
