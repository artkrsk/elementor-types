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
  model?: any;
}

/**
 * Elements handler manager
 */
export interface ElementsHandler {
  addHandler(
    HandlerClass: any, // typeof ElementorModules.frontend.handlers.Base,
    options: HandlerOptions
  ): void;
  attachHandler(elementName: string, Handlers: any, skin: string | null): void;
  getHandler(handlerName: string): Promise<any>; // Promise<typeof ElementorModules.frontend.handlers.Base>;
  getHandlers(handlerName?: string): any;
  runReadyTrigger(scope: HTMLElement | JQuery<HTMLElement>): void;
  init(): void;
  elementsHandlers: {
    [key: string]: any;
  };
}

/**
 * Documents manager interface
 */
export interface DocumentsManager extends ViewModule {
  documents: {
    [documentId: string]: any; // ElementorModules.frontend.Document;
  };
  documentClasses: {
    [documentType: string]: any; // typeof ElementorModules.frontend.Document;
  };
  initDocumentClasses(): void;
  addDocumentClass(
    documentType: string,
    documentClass: any // typeof ElementorModules.frontend.Document
  ): void;
  attachDocumentsClasses(): void;
  attachDocumentClass($document: JQuery<HTMLElement>): void;
}
