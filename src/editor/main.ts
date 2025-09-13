/**
 * Editor Main Interface
 * Main ElementorEditor interface and core editor types
 */

import type { HistoryManager } from "./history";
import type { ElementorGlobals, ElementorIconsManager } from "./managers";
import type { WidgetCache } from "./elements";

/**
 * Main Elementor Editor interface
 */
export interface ElementorEditor {
  config: {
    document: {
      container: string;
      id: string;
      type: string;
    };
    user: {
      introduction: {
        [key: string]: boolean;
      };
    };
    additional_shapes?: {
      [shapeType: string]: string;
    };
  };

  settings: {
    page: {
      model: {
        attributes: {
          [key: string]: any;
        };
        on(event: string, callback: Function): void;
      };
    };
  };

  channels: {
    editor: {
      on(event: string, callback: Function): void;
      off(event: string, callback: Function): void;
      trigger(event: string, ...args: any[]): void;
    };
    data: {
      on(event: string, callback: Function): void;
      off(event: string, callback: Function): void;
      trigger(event: string, ...args: any[]): void;
    };
  };

  documents: {
    currentDocument: {
      id: string;
      container: {
        isEditable(): boolean;
      };
    };
    getCurrent(): any;
  };

  $previewContents: JQuery<HTMLElement>;

  // Panel and UI Components (placeholders)
  panel: any;
  navigator: any;
  responsiveBar: any;

  // History and Undo/Redo
  history: HistoryManager;

  // Template Library (placeholder)
  templates: any;

  // Dynamic Tags (placeholder)
  dynamicTags: any;

  // Notifications and Tooltips (placeholders)
  notifications: any;
  introduction: any;

  // Validator and Globals
  validator: any;
  globals: ElementorGlobals;

  // Icons Manager
  iconsManager: ElementorIconsManager;

  // Widget Cache for element type fallback logic
  widgetsCache: WidgetCache;

  // Methods
  getPreferences(key: string): any;
  setPreferences(key: string, value: any): void;
  isPreviewMode(): boolean;
  reloadPreview(): void;
  saveDocument(): Promise<any>;
  loadDocument(): Promise<any>;

  // Event methods
  on(event: string, callback: Function): void;
  off(event: string, callback: Function): void;
}
