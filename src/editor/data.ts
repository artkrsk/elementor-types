/**
 * Elementor Data System Types
 *
 * Complete type definitions for Elementor's data management system including:
 * - Data components and endpoints
 * - Cache management
 * - Request/response handling
 * - Data validation and transformation
 */

import { Module } from "../core";
import { CommandBase } from "../editor/commands";

/**
 * Data endpoint configuration
 */
export interface DataEndpoint {
  /** Endpoint URL pattern */
  url: string;

  /** HTTP method */
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

  /** Endpoint namespace */
  namespace?: string;

  /** Endpoint version */
  version?: string;

  /** Request data transformation */
  transformRequest?: (data: any) => any;

  /** Response data transformation */
  transformResponse?: (data: any) => any;

  /** Cache configuration */
  cache?: {
    /** Cache duration in milliseconds */
    duration?: number;

    /** Cache key generator */
    keyGenerator?: (args: any) => string;

    /** Enable cache */
    enabled?: boolean;
  };
}

/**
 * Data component base interface
 */
export interface DataComponent extends Module {
  /** Component namespace */
  namespace: string;

  /** Component endpoints */
  endpoints: Record<string, DataEndpoint>;

  /** Component cache */
  cache: Map<string, any>;

  /**
   * Get component namespace
   */
  getNamespace(): string;

  /**
   * Register endpoint
   */
  registerEndpoint(name: string, endpoint: DataEndpoint): void;

  /**
   * Get endpoint configuration
   */
  getEndpoint(name: string): DataEndpoint | undefined;

  /**
   * Make request to endpoint
   */
  request(endpoint: string, args?: any): Promise<any>;

  /**
   * Get cached data
   */
  getCache(key: string): any;

  /**
   * Set cached data
   */
  setCache(key: string, data: any, duration?: number): void;

  /**
   * Clear cache
   */
  clearCache(pattern?: string): void;
}

/**
 * Data manager interface
 */
export interface DataManager extends Module {
  /** Registered components */
  components: Map<string, DataComponent>;

  /** Global cache */
  cache: Map<string, any>;

  /**
   * Register data component
   */
  registerComponent(component: DataComponent): void;

  /**
   * Get component by namespace
   */
  getComponent(namespace: string): DataComponent | undefined;

  /**
   * Make request through component
   */
  request(component: string, endpoint: string, args?: any): Promise<any>;

  /**
   * Delete cache for component
   */
  deleteCache(component: DataComponent | string, pattern?: string): void;

  /**
   * Clear all cache
   */
  clearAllCache(): void;
}

/**
 * Request options interface
 */
export interface RequestOptions {
  /** Request data */
  data?: any;

  /** Request headers */
  headers?: Record<string, string>;

  /** Request timeout */
  timeout?: number;

  /** Success callback */
  success?: (data: any) => void;

  /** Error callback */
  error?: (error: any) => void;

  /** Complete callback */
  complete?: () => void;

  /** Before send callback */
  beforeSend?: (xhr: any) => void;

  /** Cache options */
  cache?:
    | boolean
    | {
        duration?: number;
        key?: string;
      };
}

/**
 * Response interface
 */
export interface ApiResponse<T = any> {
  /** Response data */
  data: T;

  /** Response status */
  status: number;

  /** Response message */
  message?: string;

  /** Response metadata */
  meta?: {
    /** Pagination info */
    pagination?: {
      total: number;
      page: number;
      perPage: number;
      totalPages: number;
    };

    /** Additional metadata */
    [key: string]: any;
  };

  /** Error information */
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

/**
 * Cache entry interface
 */
export interface CacheEntry {
  /** Cached data */
  data: any;

  /** Cache timestamp */
  timestamp: number;

  /** Cache duration in milliseconds */
  duration: number;

  /** Cache key */
  key: string;

  /**
   * Check if cache entry is expired
   */
  isExpired(): boolean;
}

/**
 * Cache manager interface
 */
export interface CacheManager extends Module {
  /** Cache storage */
  storage: Map<string, CacheEntry>;

  /** Default cache duration */
  defaultDuration: number;

  /**
   * Set cache entry
   */
  set(key: string, data: any, duration?: number): void;

  /**
   * Get cache entry
   */
  get(key: string): any;

  /**
   * Check if cache has key
   */
  has(key: string): boolean;

  /**
   * Delete cache entry
   */
  delete(key: string): boolean;

  /**
   * Clear cache by pattern
   */
  clear(pattern?: string): void;

  /**
   * Clear expired entries
   */
  clearExpired(): void;

  /**
   * Get cache statistics
   */
  getStats(): {
    totalEntries: number;
    totalSize: number;
    expiredEntries: number;
  };
}

/**
 * Data validation interface
 */
export interface DataValidator {
  /**
   * Validate data against schema
   */
  validate(
    data: any,
    schema: any
  ): {
    valid: boolean;
    errors: Array<{
      field: string;
      message: string;
      code: string;
    }>;
  };

  /**
   * Sanitize data
   */
  sanitize(data: any, rules: any): any;

  /**
   * Transform data
   */
  transform(data: any, transformers: any): any;
}

/**
 * Data command base for data operations
 */
export interface DataCommandBase extends CommandBase {
  /** Data component reference */
  component: DataComponent;

  /** Data endpoint name */
  endpoint?: string;

  /**
   * Get data from component endpoint
   */
  getData(args?: any): Promise<any>;

  /**
   * Update data through component endpoint
   */
  updateData(data: any, args?: any): Promise<any>;

  /**
   * Delete data through component endpoint
   */
  deleteData(args?: any): Promise<any>;
}

/**
 * Data system types namespace
 */
export namespace Data {
  export type Component = DataComponent;
  export type Manager = DataManager;
  export type Endpoint = DataEndpoint;
  export type Request = RequestOptions;
  export type Response<T = any> = ApiResponse<T>;
  export type Cache = CacheEntry;
  export type CacheManagerType = CacheManager;
  export type Validator = DataValidator;
  export type CommandBase = DataCommandBase;
}

// Default export for convenience
export default Data;
