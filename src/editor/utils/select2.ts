/**
 * Elementor Editor Select2 Integration Utility
 *
 * Provides wrapper and utility functions for Select2 dropdown components
 * used throughout the Elementor editor interface.
 */

/**
 * Select2 option configuration
 */
export interface Select2Option {
  /** Option ID/value */
  id: string | number;
  /** Display text */
  text: string;
  /** Whether option is selected */
  selected?: boolean;
  /** Whether option is disabled */
  disabled?: boolean;
  /** Additional data */
  data?: Record<string, any>;
  /** Child options for groups */
  children?: Select2Option[];
}

/**
 * Select2 configuration options
 */
export interface Select2Config {
  /** Placeholder text */
  placeholder?: string;
  /** Allow multiple selections */
  multiple?: boolean;
  /** Allow clear selection */
  allowClear?: boolean;
  /** Minimum input length for search */
  minimumInputLength?: number;
  /** Maximum selection length */
  maximumSelectionLength?: number;
  /** Dropdown parent element */
  dropdownParent?: JQuery | HTMLElement;
  /** Width setting */
  width?: string | number;
  /** Template for result rendering */
  templateResult?: (data: Select2Option) => string | JQuery;
  /** Template for selection rendering */
  templateSelection?: (data: Select2Option) => string | JQuery;
  /** AJAX configuration */
  ajax?: Select2AjaxConfig;
  /** Static data */
  data?: Select2Option[];
  /** Language configuration */
  language?: string | Record<string, any>;
  /** Custom matcher function */
  matcher?: (params: any, data: any) => any;
  /** Escape markup */
  escapeMarkup?: (markup: string) => string;
  /** Close on select */
  closeOnSelect?: boolean;
  /** Tags mode */
  tags?: boolean;
  /** Token separators for tags */
  tokenSeparators?: string[];
}

/**
 * Select2 AJAX configuration
 */
export interface Select2AjaxConfig {
  /** AJAX URL */
  url: string | ((params: any) => string);
  /** Data type */
  dataType?: string;
  /** Delay before request */
  delay?: number;
  /** Cache results */
  cache?: boolean;
  /** Data processor */
  data?: (params: any) => any;
  /** Process results */
  processResults?: (
    data: any,
    params: any
  ) => { results: Select2Option[]; pagination?: { more: boolean } };
  /** Transport function */
  transport?: (params: any, success: Function, failure: Function) => void;
}

/**
 * Select2 event data
 */
export interface Select2EventData {
  /** Selected option data */
  data?: Select2Option | Select2Option[];
  /** Event parameters */
  params?: {
    /** Original event */
    originalEvent?: Event;
    /** Additional data */
    data?: any;
  };
}

/**
 * Helper function to ensure jQuery element
 */
function ensureJQuery(element: JQuery | HTMLElement | string): JQuery {
  if (typeof element === "string") {
    return $(element) as JQuery;
  } else if (element instanceof HTMLElement) {
    return $(element) as JQuery;
  } else {
    return element;
  }
}

/**
 * Select2 integration utilities
 */
export class Select2Utils {
  /**
   * Initialize Select2 on element
   *
   * @param element - Target element
   * @param config - Select2 configuration
   * @returns jQuery element with Select2 initialized
   */
  static init(
    element: JQuery | HTMLElement | string,
    config: Select2Config = {}
  ): JQuery {
    const $element = ensureJQuery(element);

    // Destroy existing Select2 if present
    if ($element.hasClass("select2-hidden-accessible")) {
      ($element as any).select2("destroy");
    }

    // Apply default configuration
    const defaultConfig: Select2Config = {
      width: "100%",
      allowClear: true,
      escapeMarkup: (markup: string) => markup,
    };

    const finalConfig = { ...defaultConfig, ...config };

    // Initialize Select2
    ($element as any).select2(finalConfig as any);

    return $element;
  }

  /**
   * Destroy Select2 instance
   *
   * @param element - Target element
   */
  static destroy(element: JQuery | HTMLElement | string): void {
    const $element = ensureJQuery(element);
    if ($element.hasClass("select2-hidden-accessible")) {
      ($element as any).select2("destroy");
    }
  }

  /**
   * Get selected values
   *
   * @param element - Target element
   * @returns Selected value(s)
   */
  static getValue(
    element: JQuery | HTMLElement | string
  ): string | string[] | null {
    const $element = ensureJQuery(element);
    if (!$element.hasClass("select2-hidden-accessible")) {
      return null;
    }

    return $element.val() as string | string[];
  }

  /**
   * Set selected values
   *
   * @param element - Target element
   * @param value - Value(s) to select
   * @param triggerChange - Whether to trigger change event
   */
  static setValue(
    element: JQuery | HTMLElement | string,
    value: string | number | string[] | number[],
    triggerChange: boolean = true
  ): void {
    const $element = ensureJQuery(element);
    if (!$element.hasClass("select2-hidden-accessible")) {
      return;
    }

    $element.val(value as any);

    if (triggerChange) {
      $element.trigger("change");
    }
  }

  /**
   * Add option to Select2
   *
   * @param element - Target element
   * @param option - Option to add
   * @param select - Whether to select the new option
   */
  static addOption(
    element: JQuery | HTMLElement | string,
    option: Select2Option,
    select: boolean = false
  ): void {
    const $element = ensureJQuery(element);

    // Create option element
    const $option = new Option(
      option.text,
      option.id.toString(),
      false,
      select
    );

    // Add data attributes
    if (option.data) {
      Object.entries(option.data).forEach(([key, value]) => {
        $option.dataset[key] = value;
      });
    }

    // Append option
    $element.append($option);

    if (select) {
      $element.trigger("change");
    }
  }

  /**
   * Remove option from Select2
   *
   * @param element - Target element
   * @param value - Option value to remove
   */
  static removeOption(
    element: JQuery | HTMLElement | string,
    value: string | number
  ): void {
    const $element = ensureJQuery(element);
    $element.find(`option[value="${value}"]`).remove();
  }

  /**
   * Clear all options
   *
   * @param element - Target element
   * @param keepEmpty - Whether to keep empty option
   */
  static clearOptions(
    element: JQuery | HTMLElement | string,
    keepEmpty: boolean = true
  ): void {
    const $element = ensureJQuery(element);

    if (keepEmpty) {
      $element.find('option:not([value=""])').remove();
    } else {
      $element.empty();
    }
  }

  /**
   * Update options data
   *
   * @param element - Target element
   * @param options - New options data
   */
  static updateOptions(
    element: JQuery | HTMLElement | string,
    options: Select2Option[]
  ): void {
    const $element = ensureJQuery(element);

    // Clear existing options
    this.clearOptions($element, false);

    // Add new options
    options.forEach((option) => {
      this.addOption($element, option, option.selected);
    });
  }

  /**
   * Open Select2 dropdown
   *
   * @param element - Target element
   */
  static open(element: JQuery | HTMLElement | string): void {
    const $element = ensureJQuery(element);
    if ($element.hasClass("select2-hidden-accessible")) {
      ($element as any).select2("open");
    }
  }

  /**
   * Close Select2 dropdown
   *
   * @param element - Target element
   */
  static close(element: JQuery | HTMLElement | string): void {
    const $element = ensureJQuery(element);
    if ($element.hasClass("select2-hidden-accessible")) {
      ($element as any).select2("close");
    }
  }

  /**
   * Focus Select2 element
   *
   * @param element - Target element
   */
  static focus(element: JQuery | HTMLElement | string): void {
    const $element = ensureJQuery(element);
    if ($element.hasClass("select2-hidden-accessible")) {
      ($element as any).select2("focus");
    }
  }

  /**
   * Check if Select2 is initialized
   *
   * @param element - Target element
   * @returns Whether Select2 is initialized
   */
  static isInitialized(element: JQuery | HTMLElement | string): boolean {
    const $element = ensureJQuery(element);
    return $element.hasClass("select2-hidden-accessible");
  }

  /**
   * Create AJAX data processor for Elementor API
   *
   * @param endpoint - API endpoint
   * @param searchParam - Search parameter name
   * @returns AJAX configuration
   */
  static createElementorAjax(
    endpoint: string,
    searchParam: string = "q"
  ): Select2AjaxConfig {
    return {
      url:
        (globalThis as any).elementor?.config?.ajaxurl ||
        "/wp-admin/admin-ajax.php",
      dataType: "json",
      delay: 250,
      cache: true,
      data: (params: any) => ({
        action: endpoint,
        [searchParam]: params.term,
        _nonce: (globalThis as any).elementor?.config?.nonce || "",
      }),
      processResults: (data: any) => ({
        results: data.data || [],
      }),
    };
  }

  /**
   * Create template function for icon options
   *
   * @returns Template function
   */
  static createIconTemplate(): (data: Select2Option) => string {
    return (data: Select2Option): string => {
      if (!data.id || data.id === "") {
        return data.text;
      }

      const iconClass = data.data?.iconClass || data.id;
      return `<i class="${iconClass}"></i> ${data.text}`;
    };
  }

  /**
   * Create template function for color options
   *
   * @returns Template function
   */
  static createColorTemplate(): (data: Select2Option) => string {
    return (data: Select2Option): string => {
      if (!data.id || data.id === "") {
        return data.text;
      }

      const color = data.data?.color || data.id;
      return `<span class="select2-color-option">
				<span class="select2-color-swatch" style="background-color: ${color}"></span>
				${data.text}
			</span>`;
    };
  }

  /**
   * Create template function for font options
   *
   * @returns Template function
   */
  static createFontTemplate(): (data: Select2Option) => string {
    return (data: Select2Option): string => {
      if (!data.id || data.id === "") {
        return data.text;
      }

      const fontFamily = data.data?.fontFamily || data.id;
      return `<span style="font-family: ${fontFamily}">${data.text}</span>`;
    };
  }

  /**
   * Bind Select2 events
   *
   * @param element - Target element
   * @param events - Event handlers
   */
  static bindEvents(
    element: JQuery | HTMLElement | string,
    events: {
      select?: (event: any, data: Select2EventData) => void;
      unselect?: (event: any, data: Select2EventData) => void;
      change?: (event: any) => void;
      open?: (event: any) => void;
      close?: (event: any) => void;
      clear?: (event: any) => void;
    }
  ): void {
    const $element = ensureJQuery(element);

    if (events.select) {
      $element.on("select2:select", events.select);
    }

    if (events.unselect) {
      $element.on("select2:unselect", events.unselect);
    }

    if (events.change) {
      $element.on("change", events.change);
    }

    if (events.open) {
      $element.on("select2:open", events.open);
    }

    if (events.close) {
      $element.on("select2:close", events.close);
    }

    if (events.clear) {
      $element.on("select2:clear", events.clear);
    }
  }

  /**
   * Create grouped options
   *
   * @param groups - Group data
   * @returns Grouped options array
   */
  static createGroupedOptions(
    groups: Record<string, Select2Option[]>
  ): Select2Option[] {
    return Object.entries(groups).map(([groupName, options]) => ({
      id: groupName,
      text: groupName,
      children: options,
    }));
  }

  /**
   * Convert flat array to Select2 options
   *
   * @param items - Flat array of items
   * @param idKey - Key to use for ID
   * @param textKey - Key to use for text
   * @returns Select2 options array
   */
  static fromArray<T extends Record<string, any>>(
    items: T[],
    idKey: keyof T = "id",
    textKey: keyof T = "title"
  ): Select2Option[] {
    return items.map((item) => ({
      id: item[idKey],
      text: item[textKey],
      data: item,
    }));
  }

  /**
   * Create Select2 for post type selection
   *
   * @param element - Target element
   * @param postType - Post type to search
   * @param config - Additional configuration
   * @returns jQuery element
   */
  static createPostSelector(
    element: JQuery | HTMLElement | string,
    postType: string = "post",
    config: Partial<Select2Config> = {}
  ): JQuery {
    const ajaxConfig = this.createElementorAjax(
      "elementor_panel_posts_control_filter_autocomplete"
    );
    ajaxConfig.data = (params: any) => ({
      action: "elementor_panel_posts_control_filter_autocomplete",
      q: params.term,
      post_type: postType,
      _nonce: (globalThis as any).elementor?.config?.nonce || "",
    });

    const finalConfig: Select2Config = {
      placeholder: "Search...",
      minimumInputLength: 2,
      ajax: ajaxConfig,
      ...config,
    };

    return this.init(element, finalConfig);
  }

  /**
   * Create Select2 for taxonomy selection
   *
   * @param element - Target element
   * @param taxonomy - Taxonomy to search
   * @param config - Additional configuration
   * @returns jQuery element
   */
  static createTaxonomySelector(
    element: JQuery | HTMLElement | string,
    taxonomy: string = "category",
    config: Partial<Select2Config> = {}
  ): JQuery {
    const ajaxConfig = this.createElementorAjax(
      "elementor_panel_posts_control_filter_autocomplete"
    );
    ajaxConfig.data = (params: any) => ({
      action: "elementor_panel_posts_control_filter_autocomplete",
      q: params.term,
      taxonomy: taxonomy,
      _nonce: (globalThis as any).elementor?.config?.nonce || "",
    });

    const finalConfig: Select2Config = {
      placeholder: "Search...",
      minimumInputLength: 1,
      ajax: ajaxConfig,
      ...config,
    };

    return this.init(element, finalConfig);
  }
}

/**
 * Global Select2 instances registry
 */
export class Select2Registry {
  private static instances: Map<string, JQuery> = new Map();

  /**
   * Register Select2 instance
   *
   * @param id - Instance ID
   * @param element - jQuery element
   */
  static register(id: string, element: JQuery): void {
    this.instances.set(id, element);
  }

  /**
   * Get Select2 instance
   *
   * @param id - Instance ID
   * @returns jQuery element or undefined
   */
  static get(id: string): JQuery | undefined {
    return this.instances.get(id);
  }

  /**
   * Destroy and unregister instance
   *
   * @param id - Instance ID
   */
  static destroy(id: string): void {
    const instance = this.instances.get(id);
    if (instance) {
      Select2Utils.destroy(instance);
      this.instances.delete(id);
    }
  }

  /**
   * Destroy all instances
   */
  static destroyAll(): void {
    this.instances.forEach((instance, id) => {
      Select2Utils.destroy(instance);
    });
    this.instances.clear();
  }

  /**
   * Get all registered instances
   *
   * @returns Array of instance IDs
   */
  static getAll(): string[] {
    return Array.from(this.instances.keys());
  }
}

// Export types for external use - no global declarations
export interface Select2jQuery {
  select2(options?: any): Select2jQuery;
  select2(method: string, ...args: any[]): any;
}

// Local jQuery declaration for internal use
declare const $: any;
