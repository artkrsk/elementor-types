/**
 * Elementor Editor Element Types Utility
 *
 * Manages element type definitions, registration, and validation
 * for all Elementor widgets, containers, and sections.
 */

import { Module } from "../../core/modules";

/**
 * Element category
 */
export type ElementCategory =
  | "basic"
  | "general"
  | "pro"
  | "theme"
  | "woocommerce"
  | "form"
  | "layout"
  | "media"
  | "content"
  | "social"
  | "wordpress";

/**
 * Element type
 */
export type ElementType =
  | "widget"
  | "section"
  | "column"
  | "container"
  | "inner-section";

/**
 * Element status
 */
export type ElementStatus =
  | "active"
  | "inactive"
  | "deprecated"
  | "experimental"
  | "coming-soon";

/**
 * Control type
 */
export type ControlType =
  | "text"
  | "textarea"
  | "number"
  | "select"
  | "choose"
  | "color"
  | "media"
  | "url"
  | "repeater"
  | "wysiwyg"
  | "code"
  | "hidden"
  | "heading"
  | "raw_html"
  | "section"
  | "tab"
  | "divider"
  | "slider"
  | "dimensions"
  | "typography"
  | "box_shadow"
  | "border"
  | "background"
  | "animation"
  | "hover_animation"
  | "css_filter"
  | "image_dimensions"
  | "wp_widget"
  | "icon"
  | "font"
  | "gallery"
  | "structure"
  | "select2"
  | "date_time"
  | "button"
  | "switcher"
  | "popover_toggle";

/**
 * Element control definition
 */
export interface ElementControl {
  /** Control type */
  type: ControlType;
  /** Control label */
  label?: string;
  /** Control description */
  description?: string;
  /** Default value */
  default?: any;
  /** Control options */
  options?: Record<string, string>;
  /** Control condition */
  condition?: Record<string, any>;
  /** Control selector */
  selector?: string;
  /** Control selectors for responsive */
  selectors?: Record<string, string>;
  /** Responsive control */
  responsive?: boolean;
  /** Dynamic control */
  dynamic?: boolean;
  /** AI control */
  ai?: boolean;
  /** Control classes */
  classes?: string;
  /** Control placeholder */
  placeholder?: string;
  /** Control rows (for textarea) */
  rows?: number;
  /** Control min/max (for number/slider) */
  min?: number;
  max?: number;
  step?: number;
  /** Control size units */
  size_units?: string[];
  /** Control range */
  range?: Record<string, { min: number; max: number; step?: number }>;
  /** Alpha channel for color control */
  alpha?: boolean;
  /** Multiple selection */
  multiple?: boolean;
  /** Label block */
  label_block?: boolean;
  /** Separator */
  separator?: "before" | "after" | "both" | "none";
  /** Show label */
  show_label?: boolean;
  /** Return value */
  return_value?: string;
  /** Toggle control */
  toggle?: boolean;
  /** Frontend available */
  frontend_available?: boolean;
  /** Additional attributes */
  attributes?: Record<string, string>;
  /** Control groups */
  groups?: string[];
  /** Control exclude */
  exclude?: string[];
  /** Control include */
  include?: string[];
}

/**
 * Element controls section
 */
export interface ElementControlsSection {
  /** Section label */
  label: string;
  /** Section tab */
  tab?: string;
  /** Section condition */
  condition?: Record<string, any>;
  /** Section controls */
  controls: Record<string, ElementControl>;
}

/**
 * Element definition
 */
export interface ElementDefinition {
  /** Element name/ID */
  name: string;
  /** Element title */
  title: string;
  /** Element icon */
  icon: string;
  /** Element type */
  type: ElementType;
  /** Element category */
  category: ElementCategory;
  /** Element status */
  status: ElementStatus;
  /** Element description */
  description?: string;
  /** Element keywords for search */
  keywords?: string[];
  /** Element is pro feature */
  is_pro?: boolean;
  /** Element is deprecated */
  is_deprecated?: boolean;
  /** Element is experimental */
  is_experimental?: boolean;
  /** Element is dynamic */
  is_dynamic?: boolean;
  /** Element supports custom CSS */
  custom_css?: boolean;
  /** Element supports inline editing */
  inline_editing?: boolean;
  /** Element reload preview on change */
  reload_preview?: boolean;
  /** Element editor template */
  editor_template?: string;
  /** Element content template */
  content_template?: string;
  /** Element PHP class */
  php_class?: string;
  /** Element JS class */
  js_class?: string;
  /** Element controls */
  controls?: Record<string, ElementControlsSection>;
  /** Element default settings */
  defaults?: Record<string, any>;
  /** Element style depends */
  style_depends?: string[];
  /** Element script depends */
  script_depends?: string[];
  /** Element help URL */
  help_url?: string;
  /** Element promotion */
  promotion?: {
    title: string;
    description: string;
    url: string;
  };
}

/**
 * Widget configuration
 */
export interface WidgetConfig extends ElementDefinition {
  type: "widget";
  /** Widget wrapper type */
  widget_type?:
    | "text"
    | "image"
    | "button"
    | "icon"
    | "divider"
    | "spacer"
    | "heading";
  /** Widget show in panel */
  show_in_panel?: boolean;
  /** Widget panel position */
  panel_position?: number;
  /** Widget default width */
  default_width?: string;
  /** Widget supports global widget */
  support_global_widget?: boolean;
  /** Widget excludes */
  exclude?: string[];
  /** Widget includes */
  include?: string[];
}

/**
 * Container configuration
 */
export interface ContainerConfig extends ElementDefinition {
  type: "container";
  /** Container content width */
  content_width?: "boxed" | "full_width";
  /** Container gap */
  gap?: "default" | "no" | "narrow" | "extended" | "wide" | "wider";
  /** Container direction */
  direction?: "row" | "column";
  /** Container wrap */
  wrap?: "nowrap" | "wrap";
  /** Container align items */
  align_items?: "flex-start" | "center" | "flex-end" | "stretch";
  /** Container justify content */
  justify_content?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
}

/**
 * Element Types Manager
 */
export class ElementTypes extends Module {
  private elements: Map<string, ElementDefinition> = new Map();
  private categories: Map<
    ElementCategory,
    { label: string; icon: string; active: boolean }
  > = new Map();
  private deprecatedElements: Set<string> = new Set();
  private experimentalElements: Set<string> = new Set();

  /**
   * Initialize element types
   */
  initialize(): void {
    this.registerCategories();
    this.registerCoreElements();
    this.loadExternalElements();
  }

  /**
   * Register element categories
   */
  private registerCategories(): void {
    this.categories.set("basic", {
      label: "Basic",
      icon: "eicon-font",
      active: true,
    });
    this.categories.set("general", {
      label: "General",
      icon: "eicon-library-open",
      active: true,
    });
    this.categories.set("pro", {
      label: "Pro",
      icon: "eicon-pro-icon",
      active: true,
    });
    this.categories.set("theme", {
      label: "Theme Builder",
      icon: "eicon-theme-builder",
      active: true,
    });
    this.categories.set("woocommerce", {
      label: "WooCommerce",
      icon: "eicon-woocommerce",
      active: true,
    });
    this.categories.set("form", {
      label: "Form",
      icon: "eicon-form-horizontal",
      active: true,
    });
    this.categories.set("layout", {
      label: "Layout",
      icon: "eicon-columns",
      active: true,
    });
    this.categories.set("media", {
      label: "Media",
      icon: "eicon-gallery-grid",
      active: true,
    });
    this.categories.set("content", {
      label: "Content",
      icon: "eicon-document-file",
      active: true,
    });
    this.categories.set("social", {
      label: "Social",
      icon: "eicon-social-icons",
      active: true,
    });
    this.categories.set("wordpress", {
      label: "WordPress",
      icon: "eicon-wordpress",
      active: true,
    });
  }

  /**
   * Register core Elementor elements
   */
  private registerCoreElements(): void {
    // Section
    this.register({
      name: "section",
      title: "Section",
      icon: "eicon-columns",
      type: "section",
      category: "layout",
      status: "active",
      description: "Create rows and columns layout",
      keywords: ["section", "row", "columns", "layout"],
      is_pro: false,
    });

    // Column
    this.register({
      name: "column",
      title: "Column",
      icon: "eicon-column",
      type: "column",
      category: "layout",
      status: "active",
      description: "Column container for widgets",
      keywords: ["column", "container"],
      is_pro: false,
    });

    // Container
    this.register({
      name: "container",
      title: "Container",
      icon: "eicon-container",
      type: "container",
      category: "layout",
      status: "active",
      description: "Flexbox container for modern layouts",
      keywords: ["container", "flexbox", "grid"],
      is_pro: false,
    });

    // Basic widgets
    this.registerBasicWidgets();
    this.registerGeneralWidgets();
    this.registerProWidgets();
  }

  /**
   * Register basic widgets
   */
  private registerBasicWidgets(): void {
    const basicWidgets: Partial<WidgetConfig>[] = [
      {
        name: "heading",
        title: "Heading",
        icon: "eicon-t-letter",
        category: "basic",
        description: "Add attention-grabbing headlines",
        keywords: ["heading", "title", "text"],
        widget_type: "heading",
      },
      {
        name: "image",
        title: "Image",
        icon: "eicon-image",
        category: "basic",
        description: "Choose an image from the media library",
        keywords: ["image", "photo", "picture"],
        widget_type: "image",
      },
      {
        name: "text-editor",
        title: "Text Editor",
        icon: "eicon-text",
        category: "basic",
        description: "A rich text editor",
        keywords: ["text", "editor", "content"],
        widget_type: "text",
      },
      {
        name: "video",
        title: "Video",
        icon: "eicon-youtube",
        category: "basic",
        description: "Embed YouTube, Vimeo, or other videos",
        keywords: ["video", "youtube", "vimeo", "embed"],
      },
      {
        name: "button",
        title: "Button",
        icon: "eicon-button",
        category: "basic",
        description: "Create call-to-action buttons",
        keywords: ["button", "link", "cta"],
        widget_type: "button",
      },
      {
        name: "divider",
        title: "Divider",
        icon: "eicon-divider",
        category: "basic",
        description: "Create a line divider",
        keywords: ["divider", "separator", "line"],
        widget_type: "divider",
      },
      {
        name: "spacer",
        title: "Spacer",
        icon: "eicon-spacer",
        category: "basic",
        description: "Add space between elements",
        keywords: ["spacer", "space", "gap"],
        widget_type: "spacer",
      },
    ];

    basicWidgets.forEach((widget) => {
      this.register({
        type: "widget",
        status: "active",
        is_pro: false,
        show_in_panel: true,
        ...widget,
      } as WidgetConfig);
    });
  }

  /**
   * Register general widgets
   */
  private registerGeneralWidgets(): void {
    const generalWidgets: Partial<WidgetConfig>[] = [
      {
        name: "image-box",
        title: "Image Box",
        icon: "eicon-image-box",
        category: "general",
        description: "Image with content box",
        keywords: ["image", "box", "content"],
      },
      {
        name: "icon",
        title: "Icon",
        icon: "eicon-star",
        category: "general",
        description: "Choose from hundreds of icons",
        keywords: ["icon", "symbol"],
      },
      {
        name: "icon-box",
        title: "Icon Box",
        icon: "eicon-icon-box",
        category: "general",
        description: "Icon with content box",
        keywords: ["icon", "box", "content"],
      },
      {
        name: "star-rating",
        title: "Star Rating",
        icon: "eicon-rating",
        category: "general",
        description: "Display star ratings",
        keywords: ["star", "rating", "review"],
      },
      {
        name: "image-carousel",
        title: "Image Carousel",
        icon: "eicon-slider-push",
        category: "general",
        description: "Rotating carousel of images",
        keywords: ["carousel", "slider", "gallery"],
      },
      {
        name: "image-gallery",
        title: "Image Gallery",
        icon: "eicon-gallery-grid",
        category: "general",
        description: "Grid gallery of images",
        keywords: ["gallery", "grid", "images"],
      },
    ];

    generalWidgets.forEach((widget) => {
      this.register({
        type: "widget",
        status: "active",
        is_pro: false,
        show_in_panel: true,
        ...widget,
      } as WidgetConfig);
    });
  }

  /**
   * Register pro widgets
   */
  private registerProWidgets(): void {
    const proWidgets: Partial<WidgetConfig>[] = [
      {
        name: "posts",
        title: "Posts",
        icon: "eicon-posts-grid",
        category: "pro",
        description: "Display blog posts in various layouts",
        keywords: ["posts", "blog", "grid"],
        is_pro: true,
      },
      {
        name: "portfolio",
        title: "Portfolio",
        icon: "eicon-gallery-grid",
        category: "pro",
        description: "Showcase your work",
        keywords: ["portfolio", "gallery", "work"],
        is_pro: true,
      },
      {
        name: "form",
        title: "Form",
        icon: "eicon-form-horizontal",
        category: "pro",
        description: "Create contact and other forms",
        keywords: ["form", "contact", "fields"],
        is_pro: true,
      },
      {
        name: "login",
        title: "Login",
        icon: "eicon-lock-user",
        category: "pro",
        description: "User login form",
        keywords: ["login", "user", "authentication"],
        is_pro: true,
      },
      {
        name: "menu-anchor",
        title: "Menu Anchor",
        icon: "eicon-anchor",
        category: "pro",
        description: "Create anchor links for navigation",
        keywords: ["anchor", "menu", "navigation"],
        is_pro: true,
      },
    ];

    proWidgets.forEach((widget) => {
      this.register({
        type: "widget",
        status: "active",
        show_in_panel: true,
        ...widget,
      } as WidgetConfig);
    });
  }

  /**
   * Load external elements from plugins
   */
  private loadExternalElements(): void {
    // Trigger action for external plugins to register elements
    jQuery(document).trigger("elementor/elements/types/load", [this]);

    // Load from global registry if available
    const globalElements = (globalThis as any).elementorCustomElements;
    if (globalElements && Array.isArray(globalElements)) {
      globalElements.forEach((element) => {
        if (this.isValidElement(element)) {
          this.register(element);
        }
      });
    }
  }

  /**
   * Register an element
   */
  register(element: ElementDefinition | WidgetConfig | ContainerConfig): void {
    // Validate element
    if (!this.isValidElement(element)) {
      console.warn("Invalid element definition:", element);
      return;
    }

    // Set defaults
    const defaults: Partial<ElementDefinition> = {
      status: "active",
      is_pro: false,
      is_deprecated: false,
      is_experimental: false,
      is_dynamic: false,
      custom_css: true,
      inline_editing: false,
      reload_preview: false,
    };

    const fullElement = { ...defaults, ...element };

    // Store element
    this.elements.set(element.name, fullElement);

    // Track special statuses
    if (fullElement.is_deprecated) {
      this.deprecatedElements.add(element.name);
    }

    if (fullElement.is_experimental) {
      this.experimentalElements.add(element.name);
    }

    // Emit registration event
    jQuery(document).trigger("elementor:element:registered", [fullElement]);
  }

  /**
   * Unregister an element
   */
  unregister(name: string): boolean {
    const success = this.elements.delete(name);

    if (success) {
      this.deprecatedElements.delete(name);
      this.experimentalElements.delete(name);
      jQuery(document).trigger("elementor:element:unregistered", [{ name }]);
    }

    return success;
  }

  /**
   * Get element by name
   */
  get(name: string): ElementDefinition | undefined {
    return this.elements.get(name);
  }

  /**
   * Get all elements
   */
  getAll(): ElementDefinition[] {
    return Array.from(this.elements.values());
  }

  /**
   * Get elements by category
   */
  getByCategory(category: ElementCategory): ElementDefinition[] {
    return this.getAll().filter((element) => element.category === category);
  }

  /**
   * Get elements by type
   */
  getByType(type: ElementType): ElementDefinition[] {
    return this.getAll().filter((element) => element.type === type);
  }

  /**
   * Get elements by status
   */
  getByStatus(status: ElementStatus): ElementDefinition[] {
    return this.getAll().filter((element) => element.status === status);
  }

  /**
   * Get widgets only
   */
  getWidgets(): WidgetConfig[] {
    return this.getByType("widget") as WidgetConfig[];
  }

  /**
   * Get pro elements
   */
  getProElements(): ElementDefinition[] {
    return this.getAll().filter((element) => element.is_pro);
  }

  /**
   * Get deprecated elements
   */
  getDeprecatedElements(): ElementDefinition[] {
    return this.getAll().filter((element) => element.is_deprecated);
  }

  /**
   * Get experimental elements
   */
  getExperimentalElements(): ElementDefinition[] {
    return this.getAll().filter((element) => element.is_experimental);
  }

  /**
   * Search elements
   */
  search(query: string): ElementDefinition[] {
    const searchTerm = query.toLowerCase();

    return this.getAll().filter((element) => {
      return (
        element.title.toLowerCase().includes(searchTerm) ||
        element.name.toLowerCase().includes(searchTerm) ||
        (element.description &&
          element.description.toLowerCase().includes(searchTerm)) ||
        (element.keywords &&
          element.keywords.some((keyword) =>
            keyword.toLowerCase().includes(searchTerm)
          ))
      );
    });
  }

  /**
   * Check if element exists
   */
  exists(name: string): boolean {
    return this.elements.has(name);
  }

  /**
   * Check if element is available for current user
   */
  isAvailable(name: string): boolean {
    const element = this.get(name);
    if (!element) {
      return false;
    }

    // Check if element is active
    if (element.status !== "active") {
      return false;
    }

    // Check pro status
    if (element.is_pro && !this.isProUser()) {
      return false;
    }

    // Check experimental features
    if (element.is_experimental && !this.isExperimentalEnabled()) {
      return false;
    }

    return true;
  }

  /**
   * Check if user has pro license
   */
  private isProUser(): boolean {
    return (globalThis as any).elementor?.config?.pro_license === true;
  }

  /**
   * Check if experimental features are enabled
   */
  private isExperimentalEnabled(): boolean {
    return (globalThis as any).elementor?.config?.experimental?.enable === true;
  }

  /**
   * Validate element definition
   */
  private isValidElement(element: any): element is ElementDefinition {
    return (
      element &&
      typeof element === "object" &&
      typeof element.name === "string" &&
      typeof element.title === "string" &&
      typeof element.icon === "string" &&
      typeof element.type === "string" &&
      typeof element.category === "string"
    );
  }

  /**
   * Get categories
   */
  getCategories(): Map<
    ElementCategory,
    { label: string; icon: string; active: boolean }
  > {
    return this.categories;
  }

  /**
   * Add category
   */
  addCategory(
    name: ElementCategory,
    config: { label: string; icon: string; active?: boolean }
  ): void {
    this.categories.set(name, {
      active: true,
      ...config,
    });
  }

  /**
   * Remove category
   */
  removeCategory(name: ElementCategory): void {
    this.categories.delete(name);
  }

  /**
   * Get element statistics
   */
  getStats(): {
    total: number;
    widgets: number;
    containers: number;
    sections: number;
    pro: number;
    deprecated: number;
    experimental: number;
    byCategory: Record<string, number>;
    byStatus: Record<string, number>;
  } {
    const all = this.getAll();
    const byCategory: Record<string, number> = {};
    const byStatus: Record<string, number> = {};

    all.forEach((element) => {
      byCategory[element.category] = (byCategory[element.category] || 0) + 1;
      byStatus[element.status] = (byStatus[element.status] || 0) + 1;
    });

    return {
      total: all.length,
      widgets: this.getByType("widget").length,
      containers: this.getByType("container").length,
      sections: this.getByType("section").length,
      pro: this.getProElements().length,
      deprecated: this.getDeprecatedElements().length,
      experimental: this.getExperimentalElements().length,
      byCategory,
      byStatus,
    };
  }

  /**
   * Export elements configuration
   */
  export(): Record<string, ElementDefinition> {
    const exported: Record<string, ElementDefinition> = {};
    this.elements.forEach((element, name) => {
      exported[name] = element;
    });
    return exported;
  }

  /**
   * Import elements configuration
   */
  import(elements: Record<string, ElementDefinition>): void {
    Object.values(elements).forEach((element) => {
      this.register(element);
    });
  }
}

// Global interface extensions
declare global {
  interface Window {
    elementorCustomElements?: ElementDefinition[];
  }
}
