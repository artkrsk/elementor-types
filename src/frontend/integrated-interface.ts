/**
 * Comprehensive Frontend Integration Interface
 * Main interface that ties together all frontend systems and provides the complete elementorFrontend API
 */

import type { ViewModule } from "../core";
import type { ElementorFrontendConfig } from "./config";
import type { ElementsHandler, DocumentsManager } from "./managers";
import type { ElementorFrontend as BaseElementorFrontend } from "./main";
import type {
  ElementorBreakpoints,
  AssetsLoader,
  Controls,
  VideoLoader,
  Events,
  UrlActions,
} from "./utils";

// Import enhanced frontend systems
import type {
  FrontendDocumentsManager,
  FrontendDocument,
  DocumentObserver,
  DocumentUtilsInterface,
} from "./document-management";

import type {
  EnhancedElementsHandlersManager,
  ElementsHandlersFactory,
  BuiltInHandlers,
  ExperimentalHandlers,
} from "./enhanced-handlers-manager";

import type {
  GlobalFrontendUtilities,
  ConfigurationManager,
  EnhancedBreakpointsUtility,
  FrontendPerformanceMonitor,
  EnhancedAssetsManager,
  FrontendCacheManager,
  DOMUtilities,
  EventSystemUtility,
} from "./enhanced-utilities";

import type {
  HandlerRegistry,
  HandlerManager,
  HandlerRegistrationConfig,
  HandlerLifecycleState,
} from "./handlers/registration";

/**
 * Enhanced Elementor Frontend interface that integrates all systems
 */
export interface ElementorFrontendIntegrated extends BaseElementorFrontend {
  // Enhanced document management
  documentManagement: {
    manager: FrontendDocumentsManager;
    observer: DocumentObserver;
    utils: DocumentUtilsInterface;

    // Document operations
    getDocument(id: string): FrontendDocument | null;
    getActiveDocument(): FrontendDocument | null;
    getAllDocuments(): FrontendDocument[];
    createDocument(config: any): FrontendDocument;

    // Document lifecycle
    onDocumentReady(callback: (document: FrontendDocument) => void): void;
    onDocumentUnload(callback: (document: FrontendDocument) => void): void;
  };

  // Enhanced handlers system
  handlersManagement: {
    manager: EnhancedElementsHandlersManager;
    factory: ElementsHandlersFactory;
    registry: HandlerRegistry;
    handlerManager: HandlerManager;

    // Built-in and experimental handlers
    builtIn: BuiltInHandlers;
    experimental: ExperimentalHandlers;

    // Handler operations
    registerHandler(
      name: string,
      handlerClass: any,
      options?: HandlerRegistrationConfig
    ): boolean;
    unregisterHandler(name: string): boolean;
    getHandler(name: string): any;
    getAllHandlers(): Record<string, any>;

    // Handler lifecycle
    initializeHandlers(): Promise<void>;
    destroyHandlers(): Promise<void>;
    getHandlerState(name: string): HandlerLifecycleState;
  };

  // Enhanced utilities system
  enhancedUtils: GlobalFrontendUtilities;

  // Enhanced configuration management
  configManager: ConfigurationManager;

  // Enhanced breakpoints system
  enhancedBreakpoints: EnhancedBreakpointsUtility;

  // Performance monitoring
  performance: FrontendPerformanceMonitor;

  // Enhanced assets management
  enhancedAssets: EnhancedAssetsManager;

  // Cache system
  cache: FrontendCacheManager;

  // Enhanced DOM utilities
  dom: DOMUtilities;

  // Enhanced event system
  enhancedEvents: EventSystemUtility;
}

/**
 * Frontend initialization configuration
 */
export interface FrontendInitializationConfig {
  // Core initialization
  enableDocumentManagement?: boolean;
  enableEnhancedHandlers?: boolean;
  enablePerformanceMonitoring?: boolean;
  enableEnhancedUtilities?: boolean;

  // Performance settings
  performance?: {
    enableBatching?: boolean;
    enableCaching?: boolean;
    enableLazyLoading?: boolean;
    enableOptimizations?: boolean;
  };

  // Feature flags
  features?: {
    experimentalHandlers?: boolean;
    advancedBreakpoints?: boolean;
    enhancedEvents?: boolean;
    cacheManagement?: boolean;
  };

  // Debug settings
  debug?: {
    enableLogging?: boolean;
    enableTracing?: boolean;
    logLevel?: "error" | "warn" | "info" | "debug";
  };
}

/**
 * Frontend system status interface
 */
export interface FrontendSystemStatus {
  // System states
  isInitialized: boolean;
  isReady: boolean;
  hasErrors: boolean;

  // Component status
  components: {
    documentManagement: "ready" | "initializing" | "error" | "disabled";
    handlersManagement: "ready" | "initializing" | "error" | "disabled";
    utilities: "ready" | "initializing" | "error" | "disabled";
    performance: "ready" | "initializing" | "error" | "disabled";
    cache: "ready" | "initializing" | "error" | "disabled";
  };

  // Performance metrics
  metrics: {
    initializationTime: number;
    memoryUsage: number;
    activeHandlers: number;
    cachedItems: number;
  };

  // Error information
  errors: Array<{
    component: string;
    message: string;
    timestamp: number;
    severity: "error" | "warning";
  }>;
}

/**
 * Frontend factory interface for creating integrated frontend instances
 */
export interface FrontendFactory {
  // Factory methods
  create(config?: FrontendInitializationConfig): ElementorFrontendIntegrated;
  createMinimal(): BaseElementorFrontend;

  // System management
  getSystemStatus(): FrontendSystemStatus;
  resetSystem(): void;

  // Configuration
  getDefaultConfig(): FrontendInitializationConfig;
  validateConfig(config: FrontendInitializationConfig): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  };
}

/**
 * Global frontend interface (what's available on window.elementorFrontend)
 */
export interface GlobalElementorFrontend extends ElementorFrontendIntegrated {
  // Version information
  version: string;

  // System information
  systemInfo: {
    isProVersion: boolean;
    phpVersion: string;
    wpVersion: string;
    browserInfo: {
      name: string;
      version: string;
      platform: string;
    };
  };

  // Global utilities
  factory: FrontendFactory;

  // Migration helpers (for backward compatibility)
  migration: {
    isLegacyMode(): boolean;
    enableLegacyMode(): void;
    disableLegacyMode(): void;
    getLegacyInterface(): BaseElementorFrontend;
  };

  // Development tools (available in debug mode)
  devTools?: {
    inspector: any;
    profiler: any;
    debugger: any;
  };
}

/**
 * Module integration interface for connecting frontend with other Elementor modules
 */
export interface FrontendModuleIntegration {
  // Editor integration
  editor?: {
    onElementorLoaded(callback: () => void): void;
    isEditorActive(): boolean;
    getEditorInstance(): any;
  };

  // Admin integration
  admin?: {
    isAdminPage(): boolean;
    getAdminPageType(): string;
    onAdminReady(callback: () => void): void;
  };

  // Third-party integration
  thirdParty?: {
    jquery: JQueryStatic;
    backbone: any;
    underscore: any;
    swiper: any;
  };
}

/**
 * Complete frontend system interface combining all aspects
 */
export interface CompleteFrontendSystem extends GlobalElementorFrontend {
  // Module integration
  modules: FrontendModuleIntegration;

  // System lifecycle
  lifecycle: {
    onBeforeInit(callback: () => void): void;
    onAfterInit(callback: () => void): void;
    onBeforeDestroy(callback: () => void): void;
    onAfterDestroy(callback: () => void): void;
  };

  // Error handling
  errorHandler: {
    onError(callback: (error: Error, context: string) => void): void;
    reportError(error: Error, context: string): void;
    getErrorLog(): Array<{ error: Error; context: string; timestamp: number }>;
  };
}
