/**
 * TypeScript Verification Tests
 * These tests verify that our type definitions work correctly
 * and can be used in real development scenarios.
 */

// Import types
import type {
  ElementorFrontend,
  ElementorEditor,
  HandlerBase,
  HandlerSettings,
  HandlerElements,
  EditorListener,
  Module,
  Breakpoints,
  ResponsiveValue,
  MediaValue,
} from "../src";

// Import runtime utilities
import {
  isResponsiveValue,
  isMediaValue,
  hasId,
  isBoxShadowValue,
  isColorValue,
} from "../src";

// Global type declarations
declare const elementor: ElementorEditor;
declare const elementorFrontend: ElementorFrontend;
declare const jQuery: JQueryStatic;
declare global {
  interface Window {
    jQuery: JQueryStatic;
  }
}

/**
 * Test 1: Frontend Handler Development
 * Common scenario: Creating a custom frontend handler
 */
class CustomWidgetHandler implements HandlerBase {
  $element: JQuery;
  editorListeners: EditorListener[] | null = null;
  isEdit: boolean | null = null;
  elements?: HandlerElements;

  constructor($element: JQuery) {
    this.$element = $element;
    this.init();
  }

  init() {
    this.bindEvents();
  }

  getDefaultSettings(): HandlerSettings {
    return {
      $element: this.$element,
      selectors: {
        container: ".my-widget-container",
      },
    };
  }

  getDefaultElements(): HandlerElements {
    return {
      $element: this.$element,
      $container: this.$element.find(".my-widget-container"),
    };
  }

  bindEvents() {
    this.elements = this.getDefaultElements();
    this.elements.$container?.on("click", this.handleClick.bind(this));
  }

  handleClick(event: Event) {
    console.log("Widget clicked:", event.target);
  }

  isActive(settings?: HandlerSettings): boolean {
    return true;
  }

  isElementInTheCurrentDocument(): boolean {
    return true;
  }

  findElement(selector: string): JQuery {
    return this.$element.find(selector);
  }

  getUniqueHandlerID(cid?: string, $element?: JQuery): string {
    return "handler-" + Math.random().toString(36).substr(2, 9);
  }

  initEditorListeners(): void {}
  addEditorListeners(): void {}
  removeEditorListeners(): void {}
  getModelCID(): string {
    return "model-cid";
  }
  getWidgetType(): string {
    return "custom-widget";
  }
  getElementType(): string {
    return "widget";
  }
  getConstructorID(): string {
    return "custom-handler";
  }
  getElementSettings(setting?: string): any {
    return {};
  }
  getCurrentDeviceSetting(setting: string): any {
    return null;
  }
  getEditSettings(setting?: string): any {
    return {};
  }
  onDestroy(): void {}
}

/**
 * Test 2: Element Management
 * Testing element system types
 */
function testElementSystem() {
  // Test with editor globals when available
  if (typeof elementor !== "undefined") {
    // Test element operations
    console.log("Editor available");
  }
}

/**
 * Test 3: Core Module System
 * Testing module creation and extension
 */
class CustomModule implements Module {
  constructor() {
    this.onInit();
  }

  onInit() {
    console.log("Custom module initialized");
  }

  getDefaultSettings() {
    return {
      message: "Hello from custom module",
    };
  }
}

/**
 * Test 4: Frontend Configuration
 * Testing frontend config and breakpoints
 */
function testFrontendConfig() {
  // Test breakpoint usage
  const breakpoints: Breakpoints = {} as any;

  // Test responsive values
  const responsiveMargin: ResponsiveValue<string> = {
    desktop: "20px",
    tablet: "15px",
    mobile: "10px",
  };

  // Test media values
  const mediaValue: MediaValue = {
    url: "https://example.com/image.jpg",
    id: 123,
    alt: "Example image",
  };
}

/**
 * Test 5: Event System & Hooks
 * Testing hooks and events when available
 */
function testEventSystem() {
  // Test event registration
  if (typeof elementorFrontend !== "undefined" && elementorFrontend.hooks) {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/global",
      (scope: JQuery) => {
        console.log("Element ready:", scope);
      }
    );
  }
}

/**
 * Test 6: Utility Functions and Type Guards
 * Testing type guards and utilities
 */
function testUtilities() {
  // Test responsive value checking
  const value: unknown = { desktop: "10px", tablet: "8px", mobile: "6px" };

  if (isResponsiveValue(value)) {
    // TypeScript should know this is ResponsiveValue
    const desktopValue = value.desktop;
    const tabletValue = value.tablet;
    const mobileValue = value.mobile;
    console.log("Responsive values:", {
      desktopValue,
      tabletValue,
      mobileValue,
    });
  }

  // Test media value checking
  const mediaValue: unknown = { url: "image.jpg", id: 123 };
  if (isMediaValue(mediaValue)) {
    // TypeScript should know this is MediaValue
    const imageUrl = mediaValue.url;
    const imageId = mediaValue.id;
    console.log("Media value:", { imageUrl, imageId });
  }

  // Test other type guards
  const colorValue: unknown = "#ff0000";
  if (isColorValue(colorValue)) {
    console.log("Valid color:", colorValue);
  }

  // Test box shadow
  const shadowValue: unknown = {
    horizontal: 5,
    vertical: 5,
    blur: 10,
    spread: 0,
    color: "#000000",
  };
  if (isBoxShadowValue(shadowValue)) {
    console.log("Valid box shadow:", shadowValue);
  }
}

/**
 * Test 7: Third-party Integration
 * Testing jQuery and other integrations
 */
function testThirdParty() {
  // Test jQuery integration
  if (typeof window !== "undefined" && window.jQuery) {
    const $element = window.jQuery(".my-element");
    $element.addClass("custom-class");
  }
}

/**
 * Test 8: Real-world Usage Example
 * Complete example showing how types would be used in practice
 */
class RealWorldExample {
  private frontend: ElementorFrontend;
  private customHandlers: Map<string, HandlerBase> = new Map();

  constructor(frontend: ElementorFrontend) {
    this.frontend = frontend;
    this.init();
  }

  init() {
    // Register custom handlers
    this.registerHandler("my-custom-widget", CustomWidgetHandler);

    // Listen for frontend events
    if (this.frontend.hooks) {
      this.frontend.hooks.addAction(
        "frontend/element_ready/global",
        (scope: JQuery) => {
          this.initializeCustomElements(scope);
        }
      );
    }
  }

  registerHandler(
    widgetType: string,
    HandlerClass: typeof CustomWidgetHandler
  ) {
    // Register handler for later use
    console.log(`Registered handler for ${widgetType}`);
  }

  initializeCustomElements(scope: JQuery) {
    scope.find(".elementor-widget").each((index, element) => {
      if (typeof window !== "undefined" && window.jQuery) {
        const $element = window.jQuery(element);
        const widgetType = $element.data("widget_type");

        if (this.customHandlers.has(widgetType)) {
          const handler = this.customHandlers.get(widgetType);
          console.log("Initializing handler for:", widgetType);
        }
      }
    });
  }
}

/**
 * Test 9: Type Checking Example
 * Show how to use types for validation and development
 */
function testTypeChecking() {
  // Example of using types for widget settings validation
  interface MyWidgetSettings {
    title: string;
    color: string;
    margin: ResponsiveValue<string>;
    backgroundImage: MediaValue;
  }

  function validateWidgetSettings(
    settings: unknown
  ): settings is MyWidgetSettings {
    const s = settings as MyWidgetSettings;
    return (
      typeof s.title === "string" &&
      typeof s.color === "string" &&
      isResponsiveValue(s.margin) &&
      isMediaValue(s.backgroundImage)
    );
  }

  // Usage example
  const userSettings: unknown = {
    title: "My Widget",
    color: "#ff0000",
    margin: { desktop: "20px", tablet: "15px", mobile: "10px" },
    backgroundImage: { url: "bg.jpg", id: 456 },
  };

  if (validateWidgetSettings(userSettings)) {
    // Now TypeScript knows userSettings is MyWidgetSettings
    console.log("Widget title:", userSettings.title);
    console.log("Desktop margin:", userSettings.margin.desktop);
  }
}

// Export test functions for potential runtime testing
export {
  CustomWidgetHandler,
  testElementSystem,
  CustomModule,
  testFrontendConfig,
  testEventSystem,
  testUtilities,
  testThirdParty,
  RealWorldExample,
  testTypeChecking,
};

/**
 * Test 2: Element Management
 * Testing element system types
 */
function testElementSystem() {
  // Test element manager
  const elementsManager: Editor.Elements.ElementsManager = {} as any;

  // Test getting element types
  const widgetElement: Editor.Elements.Widget | undefined =
    elementsManager.getElementTypeClass("widget") as Editor.Elements.Widget;

  const sectionElement: Editor.Elements.Section | undefined =
    elementsManager.getElementTypeClass("section") as Editor.Elements.Section;

  // Test element methods
  if (widgetElement) {
    const type: "widget" = widgetElement.getType();
    const view = widgetElement.getView();
  }

  if (sectionElement) {
    const type: "section" = sectionElement.getType();
    const view = sectionElement.getView();
  }
}

/**
 * Test 3: Core Module System
 * Testing module creation and extension
 */
class CustomModule extends Core.Module {
  onInit() {
    console.log("Custom module initialized");
  }

  getDefaultSettings() {
    return {
      message: "Hello from custom module",
    };
  }
}

/**
 * Test 4: Frontend Configuration
 * Testing frontend config and breakpoints
 */
function testFrontendConfig() {
  const config: Frontend.Config = {
    breakpoints: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1440,
      xxl: 1600,
    },
    version: "3.0.0",
    is_rtl: false,
    experimentalFeatures: {},
    urls: {
      assets: "https://example.com/assets/",
      rest: "https://example.com/wp-json/",
    },
    settings: {},
    kit: {
      active_breakpoints: ["mobile", "tablet", "desktop"],
      global_image_lightbox: "yes",
      ga_tracking: "no",
    },
    post: {
      id: 123,
      title: "Test Post",
      excerpt: "Test excerpt",
    },
  };

  // Test breakpoint usage
  const breakpoints: Utils.Breakpoints = {} as any;
  const isMobile = breakpoints.getCurrentDeviceMode() === "mobile";
}

/**
 * Test 5: Controls System (when implemented)
 * Testing control definitions and validation
 */
/*
interface TestWidgetControls {
  title: Editor.Controls.Text;
  color: Editor.Controls.Color;
  image: Editor.Controls.Media;
  margin: Editor.Controls.Dimensions;
  typography: Editor.Controls.Typography;
}

function testControls() {
  const controls: TestWidgetControls = {
    title: {
      type: 'text',
      label: 'Title',
      default: 'My Widget'
    },
    color: {
      type: 'color',
      label: 'Text Color',
      default: '#000000'
    },
    image: {
      type: 'media',
      label: 'Background Image',
      media_type: 'image'
    },
    margin: {
      type: 'dimensions',
      label: 'Margin',
      size_units: ['px', 'em', '%'],
      default: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        unit: 'px'
      }
    },
    typography: {
      type: 'typography',
      label: 'Typography',
      selector: '{{WRAPPER}} .title'
    }
  };
}
*/

/**
 * Test 6: Event System
 * Testing hooks and events
 */
function testEventSystem() {
  const hooks: Utils.Hooks = {} as any;

  // Test adding hooks
  hooks.addAction("elementor/frontend/init", () => {
    console.log("Frontend initialized");
  });

  hooks.addFilter("elementor/widget/render_content", (content: string) => {
    return content + "<div>Custom addition</div>";
  });
}

/**
 * Test 7: Utility Functions
 * Testing type guards and utilities
 */
function testUtilities() {
  const value: unknown = { desktop: "10px", tablet: "8px", mobile: "6px" };

  if (Utils.isResponsiveValue(value)) {
    // TypeScript should know this is ResponsiveValue
    const desktopValue = value.desktop;
    const tabletValue = value.tablet;
    const mobileValue = value.mobile;
  }

  const mediaValue: unknown = { url: "image.jpg", id: 123 };
  if (Utils.isMediaValue(mediaValue)) {
    // TypeScript should know this is MediaValue
    const imageUrl = mediaValue.url;
    const imageId = mediaValue.id;
  }
}

/**
 * Test 8: Third-party Integration
 * Testing jQuery and other third-party types
 */
function testThirdParty() {
  // Test jQuery integration
  const $element = window.jQuery(".my-element");

  // Test Swiper integration (if available)
  // const swiper = new Swiper('.swiper-container', {
  //   slidesPerView: 1,
  //   spaceBetween: 30
  // });
}

/**
 * Test 9: Editor Components (when available)
 * Testing editor UI components
 */
/*
function testEditorComponents() {
  const panelComponent: Editor.Components.Panel = {} as any;
  
  // Test panel interactions
  panelComponent.show();
  panelComponent.hide();
  
  const browserImport: Editor.Components.BrowserImport = {} as any;
  browserImport.init();
}
*/

/**
 * Test 10: Real-world Usage Example
 * Complete example showing how types would be used in practice
 */
class RealWorldExample {
  private frontend: ElementorFrontend;
  private customHandlers: Map<string, Frontend.Handlers.Base> = new Map();

  constructor(frontend: ElementorFrontend) {
    this.frontend = frontend;
    this.init();
  }

  init() {
    // Register custom handlers
    this.registerHandler("my-custom-widget", CustomWidgetHandler);

    // Listen for frontend events
    this.frontend.hooks.addAction(
      "frontend/element_ready/global",
      (scope: JQuery) => {
        this.initializeCustomElements(scope);
      }
    );
  }

  registerHandler(
    widgetType: string,
    handlerClass: typeof Frontend.Handlers.Base
  ) {
    const handler = new handlerClass();
    this.customHandlers.set(widgetType, handler);
  }

  initializeCustomElements(scope: JQuery) {
    scope.find(".elementor-widget").each((index, element) => {
      const $element = window.jQuery(element);
      const widgetType = $element.data("widget_type");

      if (this.customHandlers.has(widgetType)) {
        const handler = this.customHandlers.get(widgetType);
        // Initialize handler for this element
      }
    });
  }
}

// Export test functions for potential runtime testing
export {
  CustomWidgetHandler,
  testElementSystem,
  CustomModule,
  testFrontendConfig,
  testEventSystem,
  testUtilities,
  testThirdParty,
  RealWorldExample,
};
