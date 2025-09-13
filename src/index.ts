/**
 * TypeScript type definitions for Elementor WordPress plugin
 *
 * This package provides comprehensive TypeScript types for developing
 * Elementor plugins and extensions in TypeScript environments.
 *
 * @version 1.0.0
 * @author Framework Team
 * @license MIT
 */

// Export all types from the main types file
export * from "./types";

// Re-export specific commonly used types for convenience
export type {
  ElementorFrontend,
  ElementorFrontendConfig,
  ElementorEditor,
  ElementorBreakpoints,
  ElementsHandler,
  HandlerOptions,
  AssetsLoader,
  Controls,
  VideoLoader,
  UrlActions,
  Events,
  ElementorUtils,
  ElementorTiers,
  IconsManager,
  ElementorIconsManager,
  ElementorSwiperOptions,
  // New editor types
  DynamicTags,
  TemplateLibrary,
  HistoryManager,
  Panel,
  Navigator,
  ResponsiveBar,
  Notifications,
  IntroductionTooltips,
  Validator,
  ElementorGlobals,
} from "./types";

// Export the ElementorModules namespace
export { ElementorModules } from "./types";

// Re-export Swiper types for convenience
export type { Swiper, SwiperOptions } from "swiper/types";
