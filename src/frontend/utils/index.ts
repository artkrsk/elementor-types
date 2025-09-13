/**
 * Frontend Utilities
 * Barrel export for all frontend utility classes and interfaces
 */

export * from "./icons";
export * from "./assets-loader";
export * from "./anchors";
export * from "./url-actions";

// Re-export for convenience
export type {
  IconsManager,
  EIcons,
  SvgIconOptions,
  SvgNodeOptions,
  SvgIconElementOptions,
  SymbolElementOptions,
} from "./icons";

export type {
  AssetsLoader,
  AssetConfig,
  AssetsRegistry,
  ElementorAssets,
} from "./assets-loader";

export type {
  AnchorsHandler,
  AnchorSettings,
  AnchorElements,
} from "./anchors";

export type {
  UrlActions,
  UrlActionsSettings,
  ActionCallback,
  ActionsRegistry,
  LightboxActionSettings,
} from "./url-actions";