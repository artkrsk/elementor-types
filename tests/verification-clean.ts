/**
 * TypeScript // Imp// Import specific handler types  
import type { 
  FrontendHandlerBase,
  FrontendHandlerSettings,
  FrontendHandlerElements,
  FrontendEditorListener 
} from '../src/globals';cific handler types
import type { 
  FrontendHandlerBase,
  FrontendHandlerSettings,
  FrontendHandlerElements,
  FrontendEditorListener 
} from '../src/globals/frontend-handler-interfaces';ation Tests
 * These tests verify that our type definitions work correctly
 * and can be used in real development scenarios.
 */

// Import available types
import type { ElementorFrontend, ElementorEditor, Module } from "../src";

// Import runtime utilities
import {
  isResponsiveValue,
  isMediaValue,
  hasId,
  isBoxShadowValue,
  isColorValue,
} from "../src";

// Import specific handler types
import type {
  HandlerBase,
  HandlerSettings,
  HandlerElements,
  EditorListener,
} from "../src/frontend/handlers";

// Import responsive and media types
import type { ResponsiveValue, MediaValue } from "../src/utils";

// Global type declarations
declare const elementor: ElementorEditor;
declare const elementorFrontend: ElementorFrontend;
declare global {
  interface Window {
    jQuery: JQueryStatic;
  }
}

/**
 * Test 1: Frontend Handler Development
 * Common scenario: Creating a custom frontend handler
 */
class CustomWidgetHandler implements FrontendHandlerBase {
  $element: JQuery;
  editorListeners: FrontendEditorListener[] | null = null;
  isEdit: boolean | null = null;
  elements: FrontendHandlerElements | null = null;

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
 * Test 2: Utility Functions and Type Guards
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
 * Test 3: Real-world Usage Example
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
    this.registerHandler("my-custom-widget");

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

  registerHandler(widgetType: string) {
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
 * Test 4: Type Checking Example
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

    // Handle responsive value properly
    if (
      typeof userSettings.margin === "object" &&
      userSettings.margin !== null
    ) {
      const margin = userSettings.margin as {
        desktop?: string;
        tablet?: string;
        mobile?: string;
      };
      console.log("Desktop margin:", margin.desktop);
    } else {
      console.log("Simple margin:", userSettings.margin);
    }
  }
}

/**
 * Test 5: Event System Testing
 */
function testEventSystem() {
  // Test event registration when available
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
 * Test 6: Third-party Integration
 */
function testThirdParty() {
  // Test jQuery integration
  if (typeof window !== "undefined" && window.jQuery) {
    const $element = window.jQuery(".my-element");
    $element.addClass("custom-class");
  }
}

// Export test functions for potential runtime testing
export {
  CustomWidgetHandler,
  testUtilities,
  RealWorldExample,
  testTypeChecking,
  testEventSystem,
  testThirdParty,
};

// Additional verification: Check that imports work correctly
console.log("✅ TypeScript verification tests compiled successfully");
console.log("Available type guards:", {
  isResponsiveValue: typeof isResponsiveValue,
  isMediaValue: typeof isMediaValue,
  isColorValue: typeof isColorValue,
  isBoxShadowValue: typeof isBoxShadowValue,
  hasId: typeof hasId,
});
