/**
 * Global Elementor Interface
 * Complete interface for window.elementor that includes both frontend and editor functionality
 */

import type { ElementorFrontend } from "../frontend/main";
import type { ElementorEditor } from "../editor/main";
import type { EditorChannels } from "../editor/channels";

/**
 * Complete Elementor Main Interface
 * This interface represents the full window.elementor object that includes
 * both frontend functionality and editor extensions when in editor mode
 */
export interface ElementorMain extends ElementorFrontend {
  // Editor-specific channels (only in editor mode)
  channels?: EditorChannels;

  // Editor-specific properties (optional, only present in editor mode)
  widgetsCache?: any;
  loaded?: boolean;
  previewLoadedOnce?: boolean;
  activeBreakpointsUpdated?: boolean;
  helpers?: any;
  imagesManager?: any;
  presetsFactory?: any;
  templates?: any;
  ajax?: any;
  conditions?: any;
  history?: any;

  // Editor modules and settings
  settings?: {
    page: {
      model: {
        attributes: {
          [key: string]: any;
        };
        on(event: string, callback: Function): void;
      };
    };
  };

  // Documents system
  documents?: {
    currentDocument: {
      id: string;
      container: {
        isEditable(): boolean;
      };
    };
    getCurrent(): any;
  };

  // UI Elements (editor-specific, different from frontend elements)
  $previewContents?: JQuery<HTMLElement>;
  $preview?: JQuery<HTMLElement>;

  // Editor navigation
  navigator?: {
    indicatorsModel: any;
    getIndicators(): any;
    storage: any;
  };

  // Selection and editing
  selection?: {
    isSelected(container: any): boolean;
    add(container: any): void;
    remove(container: any): void;
    clear(): void;
    getElements(): any[];
  };

  // Preview mode methods (editor-specific)
  exitPreviewMode?(): void;
  enterPreviewMode?(): void;

  // Background click listeners
  backgroundClickListeners?: {
    [key: string]: {
      element: string;
      ignore: string;
      callback?: (elements: JQuery) => void;
    };
  };

  // Editor panel
  panel?: {
    getCurrentPageName(): string;
    getCurrentPageView(): any;
    getPages(): any;
    setPage(pageName: string, viewOptions?: any): any;
  };

  // Device mode (editor-specific extensions)
  changeDeviceMode?(deviceMode: string): void;

  // Promotions and notices
  promotion?: {
    dialog?: {
      hide(): void;
      show(): void;
    };
  };
}

/**
 * Type guard to check if we're in editor mode
 */
export function isElementorEditor(
  elementor: ElementorMain
): elementor is ElementorMain & { channels: EditorChannels } {
  return (
    "channels" in elementor &&
    typeof elementor.channels === "object" &&
    "editor" in elementor.channels
  );
}

/**
 * Window interface extension for Elementor
 */
declare global {
  interface Window {
    elementor: ElementorMain;
    elementorFrontend: ElementorFrontend;
    elementorCommon: {
      ajax: {
        addRequest(
          action: string,
          options: {
            data?: object;
            success?: Function;
            error?: Function;
          }
        ): void;
      };
      dialogsManager: {
        createWidget(type: string, options: object): any;
      };
      config: {
        experimentalFeatures: {
          container?: boolean;
          [feature: string]: boolean | undefined;
        };
      };
      debug: {
        enabled: boolean;
        log(...args: any[]): void;
        warn(...args: any[]): void;
        error(...args: any[]): void;
      };
    };
    elementorDevTools: {
      deprecation: {
        deprecated(oldMethod: string, version: string, newMethod: string): void;
      };
    };
  }
}

export {};
