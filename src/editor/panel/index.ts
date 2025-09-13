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
  PanelUI,
  PanelHeaderItemView,
  PanelHeaderUI,
  PanelHeaderEvents,
  PanelFooterView,
  PanelFooterUI,
  PanelFooterEvents,
  PanelFooterSubMenuItem,
  PanelPageOptions,
  PanelPageRegions,
  PanelPageRegionViews,
  PanelPageBase,
  PanelMenuPage,
  PanelMenuPageStatic,
  MenuPageGroup,
  MenuPageItem,
  PanelEditorPage,
  EditorPageTab,
  EditorPageTabs,
  EditorPageRenderArgs,
  PanelPageState,
  PanelPageManager,
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
