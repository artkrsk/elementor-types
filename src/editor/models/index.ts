/**
 * Editor Model System
 * Barrel export for all editor model types and interfaces
 */

export * from "./base";
export * from "./elements";
export * from "./settings";
export * from "./collections";

// Re-export for convenience
export type {
  BaseElementModel,
  ElementModel,
  ElementModelDefaults,
  ModelInitializeOptions,
  SettingsModelConfig,
} from "./base";

export type {
  WidgetModel,
  SectionModel,
  ColumnModel,
  ContainerModel,
  DocumentModel,
  WidgetModelDefaults,
  SectionModelDefaults,
  ColumnModelDefaults,
  ContainerModelDefaults,
  DocumentModelDefaults,
} from "./elements";

export type {
  BaseSettingsModel,
  ColumnSettingsModel,
  WidgetSettingsModel,
  SectionSettingsModel,
  BaseSettingsAttributes,
  ColumnSettingsAttributes,
  WidgetSettingsAttributes,
  SectionSettingsAttributes,
  ControlDefinition,
  ControlsRegistry,
} from "./settings";

export type {
  BaseCollection,
  ElementsCollection,
  CategoriesCollection,
  PanelElementsCollection,
  HistoryCollection,
  CollectionAddOptions,
  CollectionOptions,
} from "./collections";