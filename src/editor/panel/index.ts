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
  EditMode,
  EditModeChangeDetail,
  EditModeChannel,
  EditModeManager,
  EditModeBehavior,
  PanelEditModeIntegration,
  EditModeContext,
  EditModeConfig,
} from "./panel";

export type {
  ElementModel,
  CategoryModel,
  ElementsCollection,
  CategoriesCollection,
  ElementModelData,
  CategoryModelData,
  ElementsPageConfig,
  ElementSearchFilters,
  ElementsBrowserUI,
  ElementsBrowserEvents,
  ElementSearchView,
  ElementCategoryView,
  ElementCategoriesView,
  ElementItemView,
  ElementsListView,
  ElementsPageLayoutView,
} from "./elements";
