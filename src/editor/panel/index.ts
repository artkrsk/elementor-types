/**
 * Editor Panel System
 * Barrel export for all panel-related types and interfaces
 */

export * from "./panel";
export * from "./elements";

// Re-export for convenience
export type {
  BasePanel,
  PanelLayoutView,
  PanelStorage,
  PanelRegions,
  PanelPageConfig,
  PanelPages,
  PanelResizeConfig,
} from "./panel";

export type {
  ElementModel,
  CategoryModel,
  ElementsCollection,
  CategoriesCollection,
  ElementsPageView,
  ElementModelData,
  CategoryModelData,
  ElementsPageConfig,
} from "./elements";