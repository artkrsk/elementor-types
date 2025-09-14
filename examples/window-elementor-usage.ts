/**
 * Window Elementor Usage Examples
 *
 * Examples demonstrating how to properly type and use window.elementor
 * in different contexts (frontend vs editor)
 */

// Import the types you need
import type { ElementorMain } from "@arts/elementor-types";
// Note: isElementorEditor needs to be imported as a value, not a type
// import { isElementorEditor } from '@arts/elementor-types';

/**
 * Example 1: Basic window.elementor usage
 */
declare global {
  interface Window {
    elementor: ElementorMain;
  }
}

/**
 * Type guard function to detect editor vs frontend
 */
function isElementorEditor(elementor: ElementorMain): boolean {
  return (
    "channels" in elementor &&
    typeof elementor.channels === "object" &&
    "editor" in elementor.channels
  );
}

/**
 * Example 2: Using the type guard to detect editor vs frontend
 */
function handleElementorContext() {
  if (isElementorEditor(window.elementor)) {
    // TypeScript knows this is editor context with channels available
    window.elementor.channels.editor.trigger("myCustomEvent", {
      data: "example",
    });
    window.elementor.channels.data.request("document:ready");

    // Editor-specific properties are available
    if (window.elementor.panel) {
      const currentPage = window.elementor.panel.getCurrentPageName();
      console.log("Current editor page:", currentPage);
    }
  } else {
    // This is frontend context
    window.elementor.utils.anchors?.init();
    window.elementor.elementsHandler.runReadyTrigger(
      document.querySelector(".elementor")
    );
  }
}

/**
 * Example 3: Accessing specific channels in editor mode
 */
function workWithEditorChannels() {
  const elementor = window.elementor;

  if (isElementorEditor(elementor)) {
    // Editor channel - main communication hub
    elementor.channels.editor.on("change:editSettings", (model, view) => {
      console.log("Edit settings changed:", model, view);
    });

    // Data channel - for data management
    const documentReady = elementor.channels.data.request("document:ready");
    console.log("Document ready state:", documentReady);

    // Panel elements channel
    elementor.channels.panelElements.trigger("element:selected", {
      elementId: "my-element",
    });

    // Device mode channel
    const currentDevice = elementor.channels.deviceMode.request("currentMode");
    console.log("Current device mode:", currentDevice);

    // Templates channel
    elementor.channels.templates.on("quota:updated", () => {
      console.log("Template quota updated");
    });
  }
}

/**
 * Example 4: Working with frontend functionality
 */
function frontendExample() {
  const elementor = window.elementor;

  // These work in both frontend and editor contexts
  const isEdit = elementor.isEditMode();
  const currentDevice = elementor.getCurrentDeviceMode();
  const kitSettings = elementor.getKitSettings();

  console.log({
    isEditMode: isEdit,
    device: currentDevice,
    kitSettings: kitSettings,
  });

  // Frontend-specific functionality
  if (elementor.utils.lightbox) {
    elementor.utils.lightbox.then((lightbox) => {
      // Use lightbox
    });
  }

  // Breakpoints
  const breakpoints = elementor.breakpoints;
  const isTablet = breakpoints.getActiveBreakpointsList().includes("tablet");

  // Elements handler
  elementor.elementsHandler.addHandler("myWidget", {
    onInit() {
      console.log("My widget handler initialized");
    },
  });
}

/**
 * Example 5: Creating a custom widget that works with the editor
 */
class MyCustomWidget {
  constructor(private element: HTMLElement) {
    this.init();
  }

  private init() {
    if (isElementorEditor(window.elementor)) {
      // In editor mode - set up editor-specific functionality
      window.elementor.channels.editor.on(
        "change:editSettings",
        (model, view) => {
          if (view.model.get("widgetType") === "my-custom-widget") {
            this.updateFromEditor(model);
          }
        }
      );
    } else {
      // In frontend mode - set up frontend functionality
      this.setupFrontendBehavior();
    }
  }

  private updateFromEditor(model: any) {
    // Handle editor changes
    const settings = model.get("settings");
    this.applySettings(settings);
  }

  private setupFrontendBehavior() {
    // Setup frontend interactivity
    this.element.addEventListener("click", () => {
      console.log("Widget clicked in frontend");
    });
  }

  private applySettings(settings: any) {
    // Apply settings from editor
    if (settings.background_color) {
      this.element.style.backgroundColor = settings.background_color;
    }
  }
}

/**
 * Example 6: Using modules and controls
 */
function accessControls() {
  const elementor = window.elementor;

  if ("modules" in elementor && elementor.modules) {
    // Access controls (both editor and frontend contexts may have modules)
    if ("controls" in elementor.modules) {
      const UrlControl = elementor.modules.controls.Url;
      if (UrlControl) {
        console.log("URL control available:", UrlControl);
      }
    }
  }
}

/**
 * Example 7: Hook into Elementor events
 */
function setupElementorHooks() {
  const elementor = window.elementor;

  // Frontend hooks
  elementor.hooks.addAction("frontend/element_ready/widget", (element, $) => {
    console.log("Widget ready:", element);
  });

  // Editor-specific hooks (if in editor)
  if (isElementorEditor(elementor)) {
    elementor.hooks?.addAction(
      "panel/open_editor/widget",
      (panel, model, view) => {
        console.log("Widget panel opened:", panel, model, view);
      }
    );
  }
}

export {
  handleElementorContext,
  workWithEditorChannels,
  frontendExample,
  MyCustomWidget,
  accessControls,
  setupElementorHooks,
};
