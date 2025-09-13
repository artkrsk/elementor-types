/**
 * Frontend Handlers Index
 * Barrel export for all frontend handler types
 */

export * from "./base";
export * from "./swiper";
export * from "./widgets";
export * from "./container";

// Enhanced base classes with comprehensive functionality
export {
  EnhancedBase,
  HandlerSettings,
  HandlerElements,
  VideoProvider,
  IntersectionObserverConfig,
  AnimationConfig,
  LightboxConfig,
} from "./enhanced-base";

// Specific widget handler interfaces
export * from "./widget-interfaces";

// Handler registration and lifecycle management
export * from "./registration";

// Placeholder - will be populated during type extraction
export {};
