/**
 * Elementor Editor Types
 * Complete type definitions for the Elementor editor system
 */

// Core editor system
export * from "./main";
export * from "./managers";
export * from "./history";
export * from "./hooks";
export * from "./element-settings";
export * from "./channels";

// Editor namespace interfaces
export * from "./namespace";

// Component subsystems - use namespace to avoid conflicts
export * as Controls from "./controls";

// Panel system
export * as Panel from "./panel";

// View system
export * as Views from "./views";

// Model system
export * as Models from "./models";

// Data system
export * as Data from "./data";

// Command system
export * as Commands from "./commands";

// Component namespaces to avoid naming conflicts
export * as Elements from "./elements";
export * as Layouts from "./layouts";
export * as BrowserImport from "./browser-import";
export * as Components from "./components";
export * as Regions from "./regions";

// Command system base classes
export * as CommandBases from "./command-bases";

// Hook system - comprehensive editor hooks
export * as Hooks from "./hooks";

// Component base class
export * from "./component-base";

// Element types are available via: Editor.Elements.ElementModel, Editor.Elements.Models.ElementModel, etc.
// Direct re-exports would cause import conflicts due to namespace structure

// Re-export type guards for better accessibility
export {
  isPanelManager,
  isWidgetModel,
  isWidgetView,
} from "./main";

export {
  isChangedModel,
  isElementView,
  isDeviceChangeDetails,
  isDocumentChangeDetails,
  isElementChangeDetails,
} from "./channels/editor-channel";

// Command system - $e global
export { $e } from "./commands/base";

// Placeholder for additional editor types
export {};
