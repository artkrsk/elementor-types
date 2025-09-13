/**
 * Elementor Types Library
 *
 * A comprehensive TypeScript definitions package for Elementor WordPress page builder.
 * This package provides type definitions for frontend handlers, editor interfaces,
 * core modules, and utility functions.
 *
 * @example Basic Usage
 * ```typescript
 * import type { ElementorFrontend, ElementorEditor } from '@elementor/types';
 *
 * // Use in your custom widgets or handlers
 * class MyCustomHandler extends Frontend.Handlers.Base {
 *   // Your implementation
 * }
 * ```
 *
 * @example Using Helper Types
 * ```typescript
 * import type { ResponsiveValue, ElementSettings } from '@elementor/types';
 *
 * interface MyWidgetSettings {
 *   title: string;
 *   margin: ResponsiveValue<DimensionsValue>;
 *   color: ColorValue;
 * }
 * ```
 *
 * @example Using Type Guards
 * ```typescript
 * import { isResponsiveValue, isMediaValue } from '@elementor/types';
 *
 * if (isResponsiveValue(settings.margin)) {
 *   // TypeScript knows this is a responsive value
 *   const desktopMargin = settings.margin.desktop;
 * }
 * ```
 *
 * @packageDocumentation
 */

// ============================================================================
// Namespace exports for grouped functionality
// ============================================================================
export * as Core from "./core";
export * as Frontend from "./frontend";
export * as Editor from "./editor";
export * as Admin from "./admin";
export * as Utils from "./utils";
export * as ThirdParty from "./third-party";
export * as Globals from "./globals";

// ============================================================================
// Direct exports for commonly used types
// ============================================================================

// Core module system
export type {
  Module,
  ViewModule,
  ArgsObject,
  InstanceType,
  ForceMethodImplementation,
  ModuleSettings,
  ModuleElements,
} from "./core";

// Frontend essentials
export type {
  ElementorFrontend,
  ElementorFrontendConfig,
  ElementsHandler,
  DocumentsManager,
  HandlerOptions,
  ElementorBreakpoints,
  AssetsLoader,
  Controls,
  VideoLoader,
  Events as FrontendEvents,
  UrlActions,
} from "./frontend";

// Editor essentials
export type {
  ElementorEditor,
  Panel,
  Navigator,
  ResponsiveBar,
  HistoryManager,
  TemplateLibrary,
  DynamicTags,
  Notifications,
  IntroductionTooltips,
  Validator,
  ElementorGlobals,
  ElementorIconsManager,
  IconsManager,
} from "./editor";

// Utility types
export type {
  Hooks,
  Breakpoints,
  BreakpointConfig,
  ResponsiveConfig,
  React,
  Time,
  JsonUploadWarningMessage,
  Tiers,
} from "./utils";

// ============================================================================
// Additional exports from core modules (avoiding conflicts)
// ============================================================================
export * from "./core";
export * from "./third-party";
export * from "./globals";

// Note: Frontend, Editor, Admin types are available via namespace imports
// to avoid naming conflicts (e.g., both have Section classes)
// Use: import { Frontend, Editor } from '@arts/elementor-types'
