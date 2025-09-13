/**
 * Elementor Editor Query Parameters Utility
 *
 * Handles URL query parameter parsing, manipulation, and management
 * for editor state, settings, and navigation.
 */

/**
 * Query parameter value types
 */
export type QueryParamValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | boolean[]
  | (string | number | boolean)[];

/**
 * Query parameters object
 */
export interface QueryParams {
  [key: string]: QueryParamValue | undefined;
}

/**
 * URL builder configuration
 */
export interface UrlBuilderConfig {
  /** Base URL */
  baseUrl?: string;
  /** Query parameters */
  params?: QueryParams;
  /** Hash fragment */
  hash?: string;
  /** Whether to encode parameters */
  encode?: boolean;
}

/**
 * Query parameter parsing options
 */
export interface ParseOptions {
  /** Parse arrays (param=val1,val2) */
  parseArrays?: boolean;
  /** Array separator */
  arraySeparator?: string;
  /** Parse booleans */
  parseBooleans?: boolean;
  /** Parse numbers */
  parseNumbers?: boolean;
  /** Decode URI components */
  decode?: boolean;
}

/**
 * Query Parameters Utility Class
 */
export class QueryParams {
  /**
   * Parse query string into object
   *
   * @param queryString - Query string to parse (with or without ?)
   * @param options - Parsing options
   * @returns Parsed query parameters
   */
  static parse(queryString: string, options: ParseOptions = {}): QueryParams {
    const defaultOptions: ParseOptions = {
      parseArrays: true,
      arraySeparator: ",",
      parseBooleans: true,
      parseNumbers: true,
      decode: true,
    };

    const opts = { ...defaultOptions, ...options };
    const params: QueryParams = {};

    // Remove leading ? if present
    const cleanQuery = queryString.replace(/^\?/, "");

    if (!cleanQuery) {
      return params;
    }

    // Split into parameter pairs
    const pairs = cleanQuery.split("&");

    pairs.forEach((pair) => {
      const [key, ...valueParts] = pair.split("=");
      if (!key) return;

      const rawValue = valueParts.join("=");
      const decodedKey = opts.decode ? decodeURIComponent(key) : key;
      const decodedValue = opts.decode
        ? decodeURIComponent(rawValue || "")
        : rawValue || "";

      // Parse value based on options
      let parsedValue: QueryParamValue = decodedValue;

      // Parse arrays
      if (opts.parseArrays && decodedValue.includes(opts.arraySeparator!)) {
        const arrayValues = decodedValue.split(opts.arraySeparator!);
        parsedValue = arrayValues.map((val) => this.parseValue(val, opts)) as (
          | string
          | number
          | boolean
        )[];
      } else {
        parsedValue = this.parseValue(decodedValue, opts);
      }

      // Handle multiple parameters with same key
      if (params[decodedKey] !== undefined) {
        const existing = params[decodedKey];
        if (Array.isArray(existing)) {
          if (Array.isArray(parsedValue)) {
            (existing as any[]).push(...parsedValue);
          } else {
            (existing as any[]).push(parsedValue);
          }
        } else {
          if (Array.isArray(parsedValue)) {
            params[decodedKey] = [existing, ...parsedValue] as any[];
          } else {
            params[decodedKey] = [existing, parsedValue] as any[];
          }
        }
      } else {
        params[decodedKey] = parsedValue;
      }
    });

    return params;
  }

  /**
   * Parse individual value
   */
  private static parseValue(
    value: string,
    options: ParseOptions
  ): string | number | boolean {
    if (!value) return value;

    // Parse booleans
    if (options.parseBooleans) {
      if (value.toLowerCase() === "true") return true;
      if (value.toLowerCase() === "false") return false;
    }

    // Parse numbers
    if (options.parseNumbers) {
      if (/^\d+$/.test(value)) {
        return parseInt(value, 10);
      }
      if (/^\d*\.\d+$/.test(value)) {
        return parseFloat(value);
      }
    }

    return value;
  }

  /**
   * Stringify parameters into query string
   *
   * @param params - Parameters to stringify
   * @param options - Stringify options
   * @returns Query string (without leading ?)
   */
  static stringify(
    params: QueryParams,
    options: { encode?: boolean; arraySeparator?: string } = {}
  ): string {
    const { encode = true, arraySeparator = "," } = options;
    const pairs: string[] = [];

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      const encodedKey = encode ? encodeURIComponent(key) : key;

      if (Array.isArray(value)) {
        // Handle arrays
        if (value.length === 0) return;

        const encodedValue = value
          .map((v) => (encode ? encodeURIComponent(String(v)) : String(v)))
          .join(arraySeparator);
        pairs.push(`${encodedKey}=${encodedValue}`);
      } else {
        // Handle single values
        const encodedValue = encode
          ? encodeURIComponent(String(value))
          : String(value);
        pairs.push(`${encodedKey}=${encodedValue}`);
      }
    });

    return pairs.join("&");
  }

  /**
   * Get current page query parameters
   *
   * @param options - Parsing options
   * @returns Current query parameters
   */
  static getCurrent(options?: ParseOptions): QueryParams {
    return this.parse(window.location.search, options);
  }

  /**
   * Get specific parameter from current URL
   *
   * @param key - Parameter key
   * @param defaultValue - Default value if not found
   * @returns Parameter value
   */
  static get(
    key: string,
    defaultValue?: QueryParamValue
  ): QueryParamValue | undefined {
    const params = this.getCurrent();
    return params[key] !== undefined ? params[key] : defaultValue;
  }

  /**
   * Set query parameter in current URL
   *
   * @param key - Parameter key
   * @param value - Parameter value
   * @param replaceState - Whether to replace current state
   */
  static set(
    key: string,
    value: QueryParamValue,
    replaceState: boolean = false
  ): void {
    const params = this.getCurrent();
    params[key] = value;
    this.updateUrl(params, replaceState);
  }

  /**
   * Set multiple query parameters
   *
   * @param newParams - Parameters to set
   * @param replaceState - Whether to replace current state
   */
  static setMultiple(
    newParams: QueryParams,
    replaceState: boolean = false
  ): void {
    const params = { ...this.getCurrent(), ...newParams };
    this.updateUrl(params, replaceState);
  }

  /**
   * Remove query parameter from current URL
   *
   * @param key - Parameter key to remove
   * @param replaceState - Whether to replace current state
   */
  static remove(key: string, replaceState: boolean = false): void {
    const params = this.getCurrent();
    delete params[key];
    this.updateUrl(params, replaceState);
  }

  /**
   * Remove multiple query parameters
   *
   * @param keys - Parameter keys to remove
   * @param replaceState - Whether to replace current state
   */
  static removeMultiple(keys: string[], replaceState: boolean = false): void {
    const params = this.getCurrent();
    keys.forEach((key) => delete params[key]);
    this.updateUrl(params, replaceState);
  }

  /**
   * Clear all query parameters
   *
   * @param replaceState - Whether to replace current state
   */
  static clear(replaceState: boolean = false): void {
    this.updateUrl({}, replaceState);
  }

  /**
   * Update URL with new parameters
   *
   * @param params - New parameters
   * @param replaceState - Whether to replace current state
   */
  private static updateUrl(
    params: QueryParams,
    replaceState: boolean = false
  ): void {
    const url = new URL(window.location.href);
    const queryString = this.stringify(params);

    url.search = queryString ? `?${queryString}` : "";

    if (replaceState) {
      window.history.replaceState(null, "", url.toString());
    } else {
      window.history.pushState(null, "", url.toString());
    }
  }

  /**
   * Build URL from components
   *
   * @param config - URL configuration
   * @returns Complete URL string
   */
  static buildUrl(config: UrlBuilderConfig): string {
    const { baseUrl = "", params = {}, hash = "", encode = true } = config;

    let url = baseUrl;

    // Add query parameters
    const queryString = this.stringify(params, { encode });
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }

    // Add hash
    if (hash) {
      url += "#" + (encode ? encodeURIComponent(hash) : hash);
    }

    return url;
  }

  /**
   * Check if parameter exists
   *
   * @param key - Parameter key
   * @returns Whether parameter exists
   */
  static has(key: string): boolean {
    const params = this.getCurrent();
    return params[key] !== undefined;
  }

  /**
   * Get parameter keys
   *
   * @returns Array of parameter keys
   */
  static keys(): string[] {
    const params = this.getCurrent();
    return Object.keys(params);
  }

  /**
   * Get parameter values
   *
   * @returns Array of parameter values
   */
  static values(): QueryParamValue[] {
    const params = this.getCurrent();
    return Object.values(params).filter(
      (v) => v !== undefined
    ) as QueryParamValue[];
  }

  /**
   * Get parameter entries
   *
   * @returns Array of [key, value] pairs
   */
  static entries(): [string, QueryParamValue][] {
    const params = this.getCurrent();
    return Object.entries(params).filter(
      ([, value]) => value !== undefined
    ) as [string, QueryParamValue][];
  }

  /**
   * Filter parameters by predicate
   *
   * @param predicate - Filter function
   * @returns Filtered parameters
   */
  static filter(
    predicate: (key: string, value: QueryParamValue) => boolean
  ): QueryParams {
    const params = this.getCurrent();
    const filtered: QueryParams = {};

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && predicate(key, value)) {
        filtered[key] = value;
      }
    });

    return filtered;
  }

  /**
   * Map parameters to new values
   *
   * @param mapper - Mapping function
   * @returns Mapped parameters
   */
  static map(
    mapper: (key: string, value: QueryParamValue) => QueryParamValue
  ): QueryParams {
    const params = this.getCurrent();
    const mapped: QueryParams = {};

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        mapped[key] = mapper(key, value);
      }
    });

    return mapped;
  }

  /**
   * Merge parameters with current URL
   *
   * @param newParams - Parameters to merge
   * @param replaceState - Whether to replace current state
   */
  static merge(newParams: QueryParams, replaceState: boolean = false): void {
    const current = this.getCurrent();
    const merged = { ...current, ...newParams };
    this.updateUrl(merged, replaceState);
  }

  /**
   * Toggle boolean parameter
   *
   * @param key - Parameter key
   * @param replaceState - Whether to replace current state
   */
  static toggle(key: string, replaceState: boolean = false): void {
    const current = this.get(key);
    const newValue = current === true ? false : true;
    this.set(key, newValue, replaceState);
  }

  /**
   * Get parameters matching prefix
   *
   * @param prefix - Parameter key prefix
   * @returns Parameters with matching prefix
   */
  static getByPrefix(prefix: string): QueryParams {
    return this.filter((key) => key.startsWith(prefix));
  }

  /**
   * Remove parameters matching prefix
   *
   * @param prefix - Parameter key prefix
   * @param replaceState - Whether to replace current state
   */
  static removeByPrefix(prefix: string, replaceState: boolean = false): void {
    const params = this.getCurrent();
    const filtered: QueryParams = {};

    Object.entries(params).forEach(([key, value]) => {
      if (!key.startsWith(prefix) && value !== undefined) {
        filtered[key] = value;
      }
    });

    this.updateUrl(filtered, replaceState);
  }

  /**
   * Watch for parameter changes
   *
   * @param callback - Callback function
   * @returns Cleanup function
   */
  static watch(callback: (params: QueryParams) => void): () => void {
    let lastParams = this.stringify(this.getCurrent());

    const checkChanges = () => {
      const currentParams = this.stringify(this.getCurrent());
      if (currentParams !== lastParams) {
        lastParams = currentParams;
        callback(this.getCurrent());
      }
    };

    // Listen for popstate events (back/forward navigation)
    window.addEventListener("popstate", checkChanges);

    // Also check periodically for programmatic changes
    const interval = setInterval(checkChanges, 100);

    return () => {
      window.removeEventListener("popstate", checkChanges);
      clearInterval(interval);
    };
  }

  /**
   * Create URL-safe object from parameters
   *
   * @param obj - Object to encode
   * @returns URL-safe string
   */
  static encodeObject(obj: any): string {
    try {
      return encodeURIComponent(JSON.stringify(obj));
    } catch {
      return "";
    }
  }

  /**
   * Decode URL-safe object from parameter
   *
   * @param encoded - Encoded string
   * @returns Decoded object
   */
  static decodeObject<T = any>(encoded: string): T | null {
    try {
      return JSON.parse(decodeURIComponent(encoded));
    } catch {
      return null;
    }
  }

  /**
   * Get Elementor-specific parameters
   *
   * @returns Elementor editor parameters
   */
  static getElementorParams(): {
    postId?: number;
    action?: string;
    tab?: string;
    mode?: string;
    [key: string]: QueryParamValue | undefined;
  } {
    const params = this.getCurrent();
    return {
      postId: params.post as number,
      action: params.action as string,
      tab: params.tab as string,
      mode: params.mode as string,
      ...this.getByPrefix("elementor_"),
    };
  }

  /**
   * Set Elementor editor state in URL
   *
   * @param state - Editor state
   * @param replaceState - Whether to replace current state
   */
  static setElementorState(
    state: {
      tab?: string;
      mode?: string;
      panel?: string;
      [key: string]: any;
    },
    replaceState: boolean = true
  ): void {
    this.setMultiple(state, replaceState);
  }
}

/**
 * URL Search Parameters wrapper with enhanced functionality
 */
export class ElementorURLSearchParams extends URLSearchParams {
  /**
   * Get parameter as number
   *
   * @param key - Parameter key
   * @param defaultValue - Default value
   * @returns Number value
   */
  getNumber(key: string, defaultValue: number = 0): number {
    const value = this.get(key);
    return value ? parseFloat(value) || defaultValue : defaultValue;
  }

  /**
   * Get parameter as boolean
   *
   * @param key - Parameter key
   * @param defaultValue - Default value
   * @returns Boolean value
   */
  getBoolean(key: string, defaultValue: boolean = false): boolean {
    const value = this.get(key);
    if (!value) return defaultValue;
    return value.toLowerCase() === "true" || value === "1";
  }

  /**
   * Get parameter as array
   *
   * @param key - Parameter key
   * @param separator - Array separator
   * @returns Array value
   */
  getArray(key: string, separator: string = ","): string[] {
    const value = this.get(key);
    return value ? value.split(separator) : [];
  }

  /**
   * Set array parameter
   *
   * @param key - Parameter key
   * @param value - Array value
   * @param separator - Array separator
   */
  setArray(
    key: string,
    value: (string | number | boolean)[],
    separator: string = ","
  ): void {
    this.set(key, value.map(String).join(separator));
  }

  /**
   * Toggle boolean parameter
   *
   * @param key - Parameter key
   */
  toggle(key: string): void {
    const current = this.getBoolean(key);
    this.set(key, String(!current));
  }

  /**
   * Increment number parameter
   *
   * @param key - Parameter key
   * @param step - Increment step
   */
  increment(key: string, step: number = 1): void {
    const current = this.getNumber(key);
    this.set(key, String(current + step));
  }

  /**
   * Decrement number parameter
   *
   * @param key - Parameter key
   * @param step - Decrement step
   */
  decrement(key: string, step: number = 1): void {
    this.increment(key, -step);
  }
}
