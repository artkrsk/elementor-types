/**
 * Frontend Managers
 * Manager interfaces for frontend functionality
 */

import type { ViewModule } from "../core";

/**
 * Handler options interface
 */
export interface HandlerOptions {
  $element: JQuery<HTMLElement>;
  elementName?: string;
}

/**
 * Elements handler manager
 */
export interface ElementsHandler {
  addHandler(
    HandlerClass: any, // typeof ElementorModules.frontend.handlers.Base,
    options: HandlerOptions
  ): void;
  /**
   * Attach handler to element - Enhanced based on real usage patterns
   * Pattern: window.elementorFrontend.elementsHandler.attachHandler('container', HandlerClass, ...)
   */
  attachHandler(
    elementName: string,
    HandlerClass: any,
    skin?: string | null
  ): void;
  /** Returns the handler class directly when already resolved, else a Promise of it */
  getHandler(handlerName: string): any;
  getHandlers(handlerName?: string): any;
  runReadyTrigger(scope: HTMLElement | JQuery<HTMLElement>): void;
  init(): void;
  elementsHandlers: {
    [key: string]: any;
  };
}

