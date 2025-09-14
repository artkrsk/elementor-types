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
  HistoryManager,
  ElementorGlobals,
  ElementorIconsManager,
} from "./editor";

// Global interfaces
export type { ElementorModules } from "./globals";

// Utility types
export type {
  ElementorAjax,
  AjaxRequestConfig,
  AjaxResponse,
  AjaxError,
  AjaxQueueItem,
  AjaxRetryConfig,
  ElementorAjaxActions,
  ElementorCommon,
  ElementorCommonAjax,
  ElementorCommonDialogsManager,
  ElementorCommonConfig,
  ElementorCommonDebug,
  DialogWidget,
  DialogOptions,
  DialogType,
  ControlViewConstructor,
  ControlRegistrationOptions,
  CustomControlView,
  ControlRegistry,
  ControlViewFactory,
  AddControlViewFunction,
  ElementorControlTypes,
  ElementorEditorModules,
  ElementorControlsModule,
  DimensionsControl,
  GapsControl,
  GlobalStyleRepeaterControl,
  RepeaterRowControl,
  SliderControl,
  ElementorHooks,
  ElementorHookConfig,
  ElementorHookHandler,
  ElementorActionCallback,
  ElementorFilterCallback,
  ElementorActionHooks,
  ElementorFilterHooks,
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

// ============================================================================
// Modern export conveniences for better tree-shaking
// ============================================================================

// Re-export utility functions for type checking
export {
  isAjaxResponse,
  isAjaxError,
  isElementorCommon,
  isControlBaseView,
  isControlDataView,
  isCustomControlView,
  isDimensionsControl,
  isGapsControl,
  isSliderControl,
  isRepeaterRowControl,
  isElementorHooks,
  hasId,
  isBoxShadowValue,
  isCSSValue,
  isColorValue,
  isDimensionsValue,
  isElementType,
  isIconValue,
  isLinkValue,
  isMediaValue,
  isResponsiveValue,
  isTypographyValue,
} from "./utils";

// Note: Frontend, Editor, Admin types are available via namespace imports
// to avoid naming conflicts (e.g., both have Section classes)
// Use: import { Frontend, Editor } from '@elementor/types'
// Or: import type { Frontend, Editor } from '@elementor/types'

/**
 * Common usage patterns:
 *
 * @example Namespace imports (recommended)
 * ```typescript
 * import type { Frontend, Editor, Core } from '@elementor/types';
 *
 * class MyHandler extends Frontend.Handlers.Base {
 *   // Implementation
 * }
 *
 * const command: Editor.Commands.CommandBase = ...;
 * const module: Core.Module = ...;
 * ```
 *
 * @example Direct imports for specific types
 * ```typescript
 * import type { ElementorModules, ElementorFrontend } from '@elementor/types';
 * import { isResponsiveValue, isMediaValue } from '@elementor/types';
 * ```
 *
 * @example Element and component types
 * ```typescript
 * import type { Editor } from '@elementor/types';
 *
 * type MyElement = Editor.Elements.Widget;
 * type MyControl = Editor.Controls.Select;
 * ```
 */
