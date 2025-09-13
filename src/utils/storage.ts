/**
 * Storage Utilities
 * Advanced storage management for Elementor with support for multiple storage types
 */

import { Module } from "../core";

/**
 * Storage configuration options
 */
export interface StorageConfig {
  prefix?: string;
  encrypt?: boolean;
  compress?: boolean;
  ttl?: number; // Time to live in milliseconds
  serializer?: StorageSerializer;
  storage?: StorageAdapter;
}

/**
 * Storage adapter interface
 */
export interface StorageAdapter {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
  keys(): Promise<string[]>;
  size(): Promise<number>;
}

/**
 * Storage serializer interface
 */
export interface StorageSerializer {
  serialize(value: any): string;
  deserialize(value: string): any;
}

/**
 * Storage item with metadata
 */
export interface StorageItem<T = any> {
  value: T;
  createdAt: number;
  updatedAt: number;
  expiresAt?: number;
  version?: string;
  metadata?: Record<string, any>;
}

/**
 * Storage event data
 */
export interface StorageEventData<T = any> {
  key: string;
  oldValue?: T;
  newValue?: T;
  storageArea: string;
}

/**
 * Storage statistics
 */
export interface StorageStats {
  totalItems: number;
  totalSize: number;
  availableSpace?: number;
  oldestItem?: string;
  newestItem?: string;
  expiredItems: number;
}

/**
 * Advanced storage management utility
 */
export declare class Storage extends Module {
  /** Storage configuration */
  private config: StorageConfig;

  /** Storage adapter */
  private adapter: StorageAdapter;

  /** Event listeners */
  private listeners: Map<string, Function[]>;

  /** Cache for frequently accessed items */
  private cache: Map<string, StorageItem>;

  /**
   * Initialize storage with configuration
   */
  init(config?: StorageConfig): void;

  /**
   * Set item in storage
   */
  set<T>(
    key: string,
    value: T,
    options?: {
      ttl?: number;
      version?: string;
      metadata?: Record<string, any>;
    }
  ): Promise<void>;

  /**
   * Get item from storage
   */
  get<T>(key: string, defaultValue?: T): Promise<T | undefined>;

  /**
   * Check if item exists
   */
  has(key: string): Promise<boolean>;

  /**
   * Remove item from storage
   */
  remove(key: string): Promise<boolean>;

  /**
   * Clear all items
   */
  clear(): Promise<void>;

  /**
   * Get all keys
   */
  keys(): Promise<string[]>;

  /**
   * Get storage size
   */
  size(): Promise<number>;

  /**
   * Get multiple items
   */
  getMultiple<T>(keys: string[]): Promise<Record<string, T>>;

  /**
   * Set multiple items
   */
  setMultiple(items: Record<string, any>): Promise<void>;

  /**
   * Remove multiple items
   */
  removeMultiple(keys: string[]): Promise<number>;

  /**
   * Clean expired items
   */
  cleanExpired(): Promise<number>;

  /**
   * Get storage statistics
   */
  getStats(): Promise<StorageStats>;

  /**
   * Event handling
   */
  addEventListener(
    event: "change" | "error" | "quota",
    callback: Function
  ): void;
  removeEventListener(
    event: "change" | "error" | "quota",
    callback?: Function
  ): void;
  emit(event: string, data?: any): void;

  /**
   * Cache management
   */
  enableCache(maxSize?: number): void;
  disableCache(): void;
  clearCache(): void;

  /**
   * Backup and restore
   */
  backup(): Promise<string>;
  restore(backup: string): Promise<void>;

  /**
   * Storage adapters
   */
  static createLocalStorageAdapter(): StorageAdapter;
  static createSessionStorageAdapter(): StorageAdapter;
  static createIndexedDBAdapter(
    dbName: string,
    version?: number
  ): StorageAdapter;
  static createMemoryAdapter(): StorageAdapter;
}

/**
 * LocalStorage adapter implementation
 */
export declare class LocalStorageAdapter implements StorageAdapter {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
  keys(): Promise<string[]>;
  size(): Promise<number>;
}

/**
 * SessionStorage adapter implementation
 */
export declare class SessionStorageAdapter implements StorageAdapter {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
  keys(): Promise<string[]>;
  size(): Promise<number>;
}

/**
 * IndexedDB adapter implementation
 */
export declare class IndexedDBAdapter implements StorageAdapter {
  constructor(dbName: string, version?: number);

  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
  keys(): Promise<string[]>;
  size(): Promise<number>;

  // IndexedDB specific methods
  transaction<T>(
    mode: "readonly" | "readwrite",
    operation: (store: IDBObjectStore) => Promise<T>
  ): Promise<T>;
}

/**
 * Memory adapter implementation (for testing/temporary storage)
 */
export declare class MemoryAdapter implements StorageAdapter {
  private data: Map<string, string>;

  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
  keys(): Promise<string[]>;
  size(): Promise<number>;
}

/**
 * JSON serializer implementation
 */
export declare class JSONSerializer implements StorageSerializer {
  serialize(value: any): string;
  deserialize(value: string): any;
}

/**
 * Compressed JSON serializer
 */
export declare class CompressedJSONSerializer implements StorageSerializer {
  serialize(value: any): string;
  deserialize(value: string): any;
}

/**
 * Storage quota manager
 */
export declare class StorageQuotaManager extends Module {
  /**
   * Check available storage space
   */
  getQuota(): Promise<{
    quota: number;
    usage: number;
    available: number;
  }>;

  /**
   * Estimate storage usage for value
   */
  estimateSize(value: any): number;

  /**
   * Check if operation would exceed quota
   */
  wouldExceedQuota(
    operation: "set" | "setMultiple",
    data: any
  ): Promise<boolean>;

  /**
   * Free up storage space
   */
  freeSpace(
    targetSize: number,
    strategy?: "lru" | "fifo" | "size"
  ): Promise<number>;

  /**
   * Set quota warning threshold
   */
  setWarningThreshold(percentage: number): void;

  /**
   * Enable automatic cleanup
   */
  enableAutoCleanup(enabled: boolean): void;
}

/**
 * Storage migration utility
 */
export declare class StorageMigration extends Module {
  /**
   * Migrate data between storage types
   */
  migrate(
    from: StorageAdapter,
    to: StorageAdapter,
    options?: {
      filter?: (key: string, value: any) => boolean;
      transform?: (key: string, value: any) => { key: string; value: any };
      batchSize?: number;
    }
  ): Promise<{
    migrated: number;
    skipped: number;
    errors: Array<{ key: string; error: string }>;
  }>;

  /**
   * Validate storage integrity
   */
  validate(adapter: StorageAdapter): Promise<{
    isValid: boolean;
    errors: string[];
    corruptedKeys: string[];
  }>;

  /**
   * Repair corrupted storage
   */
  repair(adapter: StorageAdapter): Promise<{
    repaired: number;
    removed: number;
  }>;
}

/**
 * Storage sync utility for multi-tab applications
 */
export declare class StorageSync extends Module {
  /**
   * Enable cross-tab synchronization
   */
  enable(): void;

  /**
   * Disable cross-tab synchronization
   */
  disable(): void;

  /**
   * Broadcast storage change to other tabs
   */
  broadcast(key: string, value: any): void;

  /**
   * Listen for storage changes from other tabs
   */
  onSync(callback: (event: StorageEventData) => void): void;

  /**
   * Remove sync listener
   */
  offSync(callback: Function): void;

  /**
   * Resolve conflicts when same key is modified in multiple tabs
   */
  setConflictResolver(resolver: (local: any, remote: any) => any): void;
}
