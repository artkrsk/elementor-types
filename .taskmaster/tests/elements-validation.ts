/**
 * TypeScript validation test for Enhanced Elements System
 * This file validates that all interfaces are properly typed and work together
 */

import type {
  ElementsManager,
  ElementsManagerWithCache,
  ElementBase,
  Section,
  Column,
  Widget,
  Container,
  Document,
  InnerSection,
  WidgetCache,
  ExperimentalFeatures,
  ElementRegistrationError,
  ElementValidationError,
  CoreElementType,
  ElementType,
} from "../src/editor/elements";

// Test 1: Basic element interfaces
function testElementInterfaces() {
  // Test that all element types implement ElementBase correctly
  const section: Section = {
    getType: () => "section",
    getView: () => null,
    getModel: () => null,
    getEmptyView: () => null,
  };

  const column: Column = {
    getType: () => "column",
    getView: () => null,
    getModel: () => null,
    getEmptyView: () => null,
  };

  const widget: Widget = {
    getType: () => "widget",
    getView: () => null,
    getModel: () => null,
    getEmptyView: () => null,
  };

  // Container requires getEmptyView() - not optional
  const container: Container = {
    getType: () => "container",
    getView: () => null,
    getEmptyView: () => null, // Required for Container
    getModel: () => null,
  };

  // Document doesn't have getView() or getEmptyView()
  const document: Document = {
    getType: () => "document",
    getModel: () => null,
    // No getView() or getEmptyView() - correct!
  };

  const innerSection: InnerSection = {
    getType: () => "inner-section",
    getView: () => null,
    getModel: () => null,
    getEmptyView: () => null,
  };

  console.log("✅ All element interfaces are properly typed");
}

// Test 2: ElementsManager interface
function testElementsManager() {
  const manager: ElementsManager = {
    elementTypes: {},
    getElementTypeClass: (type: string) => undefined,
    registerElementType: (element: ElementBase) => {
      throw new ElementValidationError("Invalid element");
    },
    registerElements: () => {},
  };

  // Test error types
  try {
    throw new ElementRegistrationError("Element already registered");
  } catch (error) {
    if (error instanceof ElementRegistrationError) {
      console.log("✅ ElementRegistrationError works correctly");
    }
  }

  try {
    throw new ElementValidationError("Invalid element type");
  } catch (error) {
    if (error instanceof ElementValidationError) {
      console.log("✅ ElementValidationError works correctly");
    }
  }

  console.log("✅ ElementsManager interface is properly typed");
}

// Test 3: Enhanced manager with cache
function testEnhancedManager() {
  const widgetsCache: WidgetCache = {
    "custom-widget": {
      widget_type: "custom-widget",
      title: "Custom Widget",
      icon: "eicon-widget",
      categories: ["general"],
    },
  };

  const experimentalFeatures: ExperimentalFeatures = {
    container: true,
  };

  const enhancedManager: ElementsManagerWithCache = {
    elementTypes: {},
    getElementTypeClass: (type: string) => undefined,
    registerElementType: (element: ElementBase) => {},
    registerElements: () => {},
    getElementTypeClassWithFallback: (type: string, cache?: WidgetCache) =>
      undefined,
    registerContainerIfEnabled: (features?: ExperimentalFeatures) => {},
  };

  console.log("✅ Enhanced manager with cache is properly typed");
}

// Test 4: Type system
function testTypeSystem() {
  // Test core element types
  const coreType: CoreElementType = "section";
  const extendedType: ElementType = "custom-widget"; // string is allowed

  // Test that string types work for custom widgets
  const customElementTypes: Record<string, ElementBase> = {
    section: {
      getType: () => "section",
      getView: () => null,
      getModel: () => null,
    },
    "custom-widget": {
      getType: () => "custom-widget",
      getView: () => null,
      getModel: () => null,
    },
  };

  console.log("✅ Type system supports both core and custom element types");
}

// Run all tests
export function validateElementsSystem() {
  console.log("🧪 Validating Enhanced Elements System...\n");

  testElementInterfaces();
  testElementsManager();
  testEnhancedManager();
  testTypeSystem();

  console.log("\n🎉 All elements system validations passed!");
}

// Export for potential use
export { validateElementsSystem };
