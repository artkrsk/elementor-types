/**
 * Command System Index
 * Barrel export for all command system types
 */

export * from "./base";
export * from "./base/index";
export * from "./panel";

// Document Commands (exported under namespace to avoid conflicts)
export * as DocumentElementsCommands from "./document/elements";
export * as DocumentSaveCommands from "./document/save";
export * as DocumentHistoryCommands from "./document/history";
export * as DocumentUICommands from "./document/ui";

// Region Commands (exported under namespace to avoid conflicts)
export * as PanelRegionCommands from "./regions/panel";
export * as NavigatorRegionCommands from "./regions/navigator";

// Component Commands
export * as DocumentsComponentCommands from "./components/documents";

// Re-export for convenience
export type { CommandBase, editor } from "./base";

// Re-export namespaces
export type { DocumentElements } from "./document/elements";
export type { DocumentSave } from "./document/save";
export type { DocumentHistory } from "./document/history";
export type { DocumentUI } from "./document/ui";
export type { PanelCommands } from "./regions/panel";
export type { NavigatorCommands } from "./regions/navigator";
export type { DocumentsCommands } from "./components/documents";
