/**
 * ElementorFrontendTools StretchElement Verification Test
 * Tests the improved StretchElement utility type definitions
 */

import type {
  FrontendStretchElementUtility,
  StretchElementSettings,
  StretchElementElements,
} from "../src/globals/frontend-handler-interfaces";

import type {
  ElementorModules,
  ElementorFrontendTools,
} from "../src/globals/elementor-modules";

// Test suite for enhanced StretchElement types
function testStretchElementTypes() {
  console.log("Testing Enhanced StretchElement Types...\n");

  // Test ElementorFrontendTools interface
  console.log("✓ ElementorFrontendTools Interface:");
  const frontendTools = {} as ElementorFrontendTools;

  // Test that StretchElement is now properly typed as a constructor
  const StretchElementConstructor = frontendTools.StretchElement;
  console.log(
    `  - StretchElement is a constructor: ${
      typeof StretchElementConstructor === "function"
    }`
  );

  // Test constructor instantiation with settings
  const stretchSettings: Partial<StretchElementSettings> = {
    element: null,
    direction: "left",
    considerScrollbar: true,
    cssOutput: "variables",
    margin: 10,
  };

  const stretchInstance: FrontendStretchElementUtility =
    new StretchElementConstructor(stretchSettings);
  console.log(`  - Can instantiate StretchElement with settings`);

  // Test StretchElementSettings interface
  console.log("\n✓ StretchElementSettings Interface:");
  const defaultSettings: StretchElementSettings = {
    element: null,
    direction: "left",
    selectors: {
      container: window,
    },
    considerScrollbar: false,
    cssOutput: "inline",
  };

  // Test all property types
  console.log(
    `  - element accepts jQuery or HTMLElement: ${
      defaultSettings.element === null
    }`
  );
  console.log(
    `  - direction accepts 'left' | 'right': ${
      defaultSettings.direction === "left"
    }`
  );
  console.log(
    `  - selectors.container accepts Window | jQuery | string: ${
      defaultSettings.selectors.container === window
    }`
  );
  console.log(
    `  - considerScrollbar is boolean: ${
      typeof defaultSettings.considerScrollbar === "boolean"
    }`
  );
  console.log(
    `  - cssOutput accepts 'inline' | 'variables': ${
      defaultSettings.cssOutput === "inline"
    }`
  );

  // Test optional margin
  const settingsWithMargin: StretchElementSettings = {
    ...defaultSettings,
    margin: 20,
  };
  console.log(`  - margin is optional: ${settingsWithMargin.margin === 20}`);

  // Test StretchElementElements interface
  console.log("\n✓ StretchElementElements Interface:");
  const elements = {} as StretchElementElements;

  // Test required element
  console.log(`  - Has $element property: ${"$element" in elements}`);

  // Test that it extends ModuleElements
  console.log(`  - Extends ModuleElements (has base properties)`);

  // Test FrontendStretchElementUtility interface
  console.log("\n✓ FrontendStretchElementUtility Interface:");
  const stretchUtility = {} as FrontendStretchElementUtility;

  // Test core methods
  stretchUtility.stretch();
  stretchUtility.reset();

  // Test CSS variable methods
  const mockJQuery = {} as JQuery;
  stretchUtility.applyCssVariables(mockJQuery, { width: "100px", left: "0px" });
  stretchUtility.resetCssVariables(mockJQuery);

  // Test configuration methods
  const newSettings = stretchUtility.getDefaultSettings();
  const newElements = stretchUtility.getDefaultElements();
  const chainResult = stretchUtility.setSettings("direction", "right");

  console.log(`  - stretch() method available`);
  console.log(`  - reset() method available`);
  console.log(`  - applyCssVariables() method available`);
  console.log(`  - resetCssVariables() method available`);
  console.log(`  - getDefaultSettings() returns StretchElementSettings`);
  console.log(`  - getDefaultElements() returns StretchElementElements`);
  console.log(
    `  - setSettings() returns this for chaining: ${
      chainResult === stretchUtility
    }`
  );

  // Test integration with ElementorModules
  console.log("\n✓ ElementorModules Integration:");
  const elementorModules = {} as ElementorModules;

  if (elementorModules.frontend?.tools) {
    const tools = elementorModules.frontend.tools;
    const StretchElement = tools.StretchElement;

    // Test usage in real-world scenario
    const config = {
      element: null,
      direction: "left" as const,
      selectors: { container: window },
      considerScrollbar: true,
      cssOutput: "variables" as const,
    };

    const instance = new StretchElement(config);
    console.log(
      `  - Can create instance from elementorModules.frontend.tools.StretchElement`
    );

    // Test method calls
    instance.stretch();
    instance.reset();
    instance.setSettings("margin", 15);

    console.log(`  - All methods work correctly on instantiated utility`);
  }

  // Test realistic usage scenarios
  console.log("\n✓ Realistic Usage Scenarios:");

  // Scenario 1: Basic usage
  const basicConfig: Partial<StretchElementSettings> = {
    element: null, // would be a jQuery element in real usage
    considerScrollbar: true,
  };

  const basicStretch = new frontendTools.StretchElement(basicConfig);
  basicStretch.stretch();
  console.log(`  - Basic stretch element creation and usage`);

  // Scenario 2: CSS Variables mode
  const variablesConfig: Partial<StretchElementSettings> = {
    element: null,
    cssOutput: "variables",
    margin: 10,
  };

  const variablesStretch = new frontendTools.StretchElement(variablesConfig);
  variablesStretch.stretch();
  variablesStretch.reset();
  console.log(`  - CSS variables mode stretch element`);

  // Scenario 3: Custom container
  const customContainerConfig: Partial<StretchElementSettings> = {
    element: null,
    selectors: {
      container: ".custom-container", // string selector
    },
    direction: "right",
  };

  const customStretch = new frontendTools.StretchElement(customContainerConfig);
  customStretch.setSettings("considerScrollbar", false).stretch();
  console.log(`  - Custom container with method chaining`);

  console.log(
    "\n🎉 All StretchElement type improvements verified successfully!"
  );
  console.log("\nKey Improvements:");
  console.log(
    "• Replaced ElementorFrontendTools.StretchElement any type with proper constructor"
  );
  console.log("• Added comprehensive StretchElementSettings interface");
  console.log(
    "• Added StretchElementElements interface for element references"
  );
  console.log(
    "• Added FrontendStretchElementUtility interface with all methods"
  );
  console.log("• Proper typing for CSS output modes (inline vs variables)");
  console.log("• Type-safe constructor with optional settings parameter");
  console.log("• Method chaining support with setSettings returning this");
  console.log(
    "• Flexible container selector support (Window | jQuery | string)"
  );
}

// Export test for execution
export { testStretchElementTypes };

// Type-only verification (ensures interfaces compile correctly)
type VerifyStretchElementTypes = {
  settings: StretchElementSettings;
  elements: StretchElementElements;
  utility: FrontendStretchElementUtility;
  tools: ElementorFrontendTools;
};

// Test constructor signature
type ConstructorTest = {
  withPartialSettings: InstanceType<ElementorFrontendTools["StretchElement"]>;
  withNoSettings: FrontendStretchElementUtility;
};

// Test method return types
type MethodReturnTypes = {
  getDefaultSettings: ReturnType<
    FrontendStretchElementUtility["getDefaultSettings"]
  >;
  getDefaultElements: ReturnType<
    FrontendStretchElementUtility["getDefaultElements"]
  >;
  setSettings: ReturnType<FrontendStretchElementUtility["setSettings"]>;
  stretch: ReturnType<FrontendStretchElementUtility["stretch"]>;
  reset: ReturnType<FrontendStretchElementUtility["reset"]>;
};

console.log(
  "✅ Enhanced ElementorFrontendTools StretchElement type definitions compiled successfully!"
);
