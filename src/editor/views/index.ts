/**
 * Editor View System
 * Barrel export for all editor view types and interfaces
 */

export * from "./base";
export * from "./elements";
export * from "./behaviors";
export * from "./panel";
export * from "./navigator";

// Re-export for convenience
export type {
  BaseElementView,
  BaseWidgetView,
  ElementUISelectors,
  ElementRenderAttributes,
  ContextMenuGroup,
  ContextMenuAction,
  ElementBehaviors,
  ElementViewEvents,
  DataBinding,
  ViewManager,
  ViewRenderer,
  ViewState,
  ViewStateManager,
} from "./base";

export type {
  WidgetView,
  SectionView,
  ColumnView,
  ColumnEmptyView,
  ContainerView,
  ContainerEmptyView,
  ContainerEmptyComponent,
  ElementViewFactory,
  PreviewManager,
  ElementHierarchyManager,
} from "./elements";

export type {
  ContextMenuBehavior,
  InlineEditingBehavior,
  WidgetDraggableBehavior,
  WidgetResizableBehavior,
  ColumnResizableBehavior,
  SortableBehavior,
  InnerTabsBehavior,
} from "./behaviors";

export type {
  PanelElementView,
  PanelCategoryView,
  PanelCategoriesView,
  PanelElementsView,
  PanelSearchView,
} from "./panel";

export type {
  NavigatorRegion,
  NavigatorLayoutView,
  NavigatorElementView,
  NavigatorStorage,
  NavigatorIndicator,
  NavigatorDraggableOptions,
  NavigatorResizableOptions,
  NavigatorSearch,
  NavigatorTreeManager,
  NavigatorContextMenu,
  NavigatorDragDrop,
} from "./navigator";

export * from "./window-views";