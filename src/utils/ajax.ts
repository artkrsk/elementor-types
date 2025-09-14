/**
 * AJAX System Types
 * Comprehensive type definitions for Elementor's AJAX functionality
 */

/**
 * HTTP Methods supported by Elementor AJAX
 */
export type AjaxMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * AJAX Request Configuration
 */
export interface AjaxRequestConfig {
  /** Request data payload */
  data?: Record<string, any>;

  /** Success callback function */
  success?: (response: any, textStatus: string, jqXHR: JQuery.jqXHR) => void;

  /** Error callback function */
  error?: (jqXHR: JQuery.jqXHR, textStatus: string, errorThrown: string) => void;

  /** Complete callback function (called regardless of success/error) */
  complete?: (jqXHR: JQuery.jqXHR, textStatus: string) => void;

  /** Before send callback */
  beforeSend?: (jqXHR: JQuery.jqXHR, settings: JQuery.AjaxSettings) => void;

  /** HTTP method */
  method?: AjaxMethod;

  /** Request timeout in milliseconds */
  timeout?: number;

  /** Whether to process data */
  processData?: boolean;

  /** Content type for the request */
  contentType?: string | false;

  /** Data type expected from server */
  dataType?: 'xml' | 'html' | 'text' | 'json' | 'jsonp' | 'script';

  /** Whether to cache the request */
  cache?: boolean;

  /** Additional headers */
  headers?: Record<string, string>;

  /** Whether request is asynchronous */
  async?: boolean;

  /** Cross-domain request settings */
  crossDomain?: boolean;

  /** Custom context for callbacks */
  context?: any;
}

/**
 * AJAX Response Interface
 */
export interface AjaxResponse<T = any> {
  /** Response data */
  data: T;

  /** Success status */
  success: boolean;

  /** Response message */
  message?: string;

  /** Error information (if applicable) */
  error?: {
    code: string | number;
    message: string;
    details?: any;
  };

  /** Additional response metadata */
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    [key: string]: any;
  };
}

/**
 * AJAX Request Queue Item
 */
export interface AjaxQueueItem {
  /** Unique request ID */
  id: string;

  /** Action/endpoint name */
  action: string;

  /** Request configuration */
  config: AjaxRequestConfig;

  /** Request priority */
  priority?: 'low' | 'normal' | 'high';

  /** Retry configuration */
  retry?: {
    attempts: number;
    maxAttempts: number;
    delay: number;
  };

  /** Request status */
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';

  /** Creation timestamp */
  created: number;

  /** Last update timestamp */
  updated: number;
}

/**
 * AJAX Error Types
 */
export interface AjaxError {
  /** Error type */
  type: 'network' | 'timeout' | 'abort' | 'parsererror' | 'server' | 'unknown';

  /** Error message */
  message: string;

  /** HTTP status code (if applicable) */
  status?: number;

  /** Response text */
  responseText?: string;

  /** Original error object */
  originalError?: any;

  /** Request that caused the error */
  request?: AjaxQueueItem;
}

/**
 * AJAX Retry Configuration
 */
export interface AjaxRetryConfig {
  /** Maximum number of retry attempts */
  maxAttempts: number;

  /** Base delay between retries in milliseconds */
  delay: number;

  /** Exponential backoff multiplier */
  backoffMultiplier?: number;

  /** Maximum delay cap in milliseconds */
  maxDelay?: number;

  /** Conditions that should trigger a retry */
  retryCondition?: (error: AjaxError) => boolean;
}

/**
 * Main AJAX Interface
 * Complete interface for window.elementor.ajax functionality
 */
export interface ElementorAjax {
  /**
   * Add a new AJAX request to the queue
   *
   * This method queues an AJAX request for execution. The request will be processed
   * according to the current queue settings and retry configuration.
   *
   * @param action - The action/endpoint name (e.g., 'save_builder', 'get_template_data')
   * @param config - Optional request configuration including data, callbacks, and options
   * @returns Unique request ID for tracking the request status
   *
   * @example
   * ```typescript
   * // Basic request
   * const requestId = elementor.ajax.addRequest('save_builder', {
   *   data: { post_id: 123 },
   *   success: (response) => console.log('Saved!', response),
   *   error: (error) => console.error('Save failed:', error)
   * });
   *
   * // Advanced request with retry and timeout
   * const requestId = elementor.ajax.addRequest('get_template_data', {
   *   data: { template_id: 'header-1' },
   *   timeout: 10000,
   *   success: (response) => this.loadTemplate(response.data),
   *   error: (error) => this.handleLoadError(error)
   * });
   * ```
   */
  addRequest(action: string, config?: AjaxRequestConfig): string;

  /**
   * Send a request immediately (bypassing queue)
   * @param action - The action/endpoint name
   * @param config - Request configuration
   * @returns Promise that resolves with the response
   */
  sendRequest<T = any>(action: string, config?: AjaxRequestConfig): Promise<AjaxResponse<T>>;

  /**
   * Cancel a queued or active request
   * @param requestId - ID of the request to cancel
   * @returns True if request was cancelled successfully
   */
  cancelRequest(requestId: string): boolean;

  /**
   * Get the status of a request
   * @param requestId - ID of the request
   * @returns Request queue item or null if not found
   */
  getRequestStatus(requestId: string): AjaxQueueItem | null;

  /**
   * Get all requests with optional filtering
   * @param status - Filter by request status
   * @returns Array of matching requests
   */
  getRequests(status?: AjaxQueueItem['status']): AjaxQueueItem[];

  /**
   * Clear all requests from the queue
   * @param status - Only clear requests with this status
   */
  clearQueue(status?: AjaxQueueItem['status']): void;

  /**
   * Set global AJAX defaults
   * @param defaults - Default configuration
   */
  setDefaults(defaults: Partial<AjaxRequestConfig>): void;

  /**
   * Get current global defaults
   * @returns Current default configuration
   */
  getDefaults(): Partial<AjaxRequestConfig>;

  /**
   * Set retry configuration for failed requests
   * @param config - Retry configuration
   */
  setRetryConfig(config: Partial<AjaxRetryConfig>): void;

  /**
   * Get current retry configuration
   * @returns Current retry settings
   */
  getRetryConfig(): AjaxRetryConfig;

  /**
   * Enable or disable request queueing
   * @param enabled - Whether to enable queueing
   */
  setQueueEnabled(enabled: boolean): void;

  /**
   * Check if request queueing is enabled
   * @returns True if queueing is enabled
   */
  isQueueEnabled(): boolean;

  /**
   * Get statistics about AJAX usage
   * @returns Usage statistics
   */
  getStats(): {
    total: number;
    pending: number;
    completed: number;
    failed: number;
    averageResponseTime: number;
    errorRate: number;
  };

  /**
   * Register a global request interceptor
   * @param interceptor - Function to modify requests before sending
   */
  addRequestInterceptor(
    interceptor: (config: AjaxRequestConfig, action: string) => AjaxRequestConfig
  ): void;

  /**
   * Register a global response interceptor
   * @param interceptor - Function to modify responses after receiving
   */
  addResponseInterceptor(
    interceptor: (response: AjaxResponse, config: AjaxRequestConfig) => AjaxResponse
  ): void;

  /**
   * Register an error handler
   * @param handler - Function to handle AJAX errors
   */
  addErrorHandler(handler: (error: AjaxError) => void): void;

  /**
   * Remove all registered interceptors and handlers
   */
  clearInterceptors(): void;
}

/**
 * Type guard to check if an object is an AJAX response
 */
export function isAjaxResponse(obj: any): obj is AjaxResponse {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    'success' in obj &&
    typeof obj.success === 'boolean' &&
    'data' in obj
  );
}

/**
 * Type guard to check if an error is an AJAX error
 */
export function isAjaxError(obj: any): obj is AjaxError {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    'type' in obj &&
    'message' in obj &&
    typeof obj.message === 'string'
  );
}

/**
 * Common AJAX action types used by Elementor
 */
export type ElementorAjaxActions =
  | 'save_builder'
  | 'get_template_data'
  | 'save_template'
  | 'get_library_data'
  | 'get_taxonomy'
  | 'panel_posts_control_filter_autocomplete'
  | 'query_control_value_titles'
  | 'render_widget'
  | 'editor_get_wp_widget_form'
  | 'save_editor'
  | 'get_inline_editing_config'
  | 'introduction_viewed'
  | 'set_edit_mode'
  | 'get_revision_data'
  | 'apply_revision'
  | 'save_revision'
  | 'discard_changes'
  | 'exit_to_dashboard';