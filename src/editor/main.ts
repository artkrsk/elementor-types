/**
 * Editor Main Interface
 * Main ElementorEditor interface and core editor types
 */

import type { Panel, Navigator, ResponsiveBar } from "./components";
import type { HistoryManager } from "./history";
import type {
  TemplateLibrary,
  DynamicTags,
  Notifications,
  IntroductionTooltips,
  Validator,
  ElementorGlobals,
  ElementorIconsManager,
} from "./managers";

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

  // Panel and UI Components
  panel: Panel;
  navigator: Navigator;
  responsiveBar: ResponsiveBar;

  // History and Undo/Redo
  history: HistoryManager;

  // Template Library
  templates: TemplateLibrary;

  // Dynamic Tags
  dynamicTags: DynamicTags;

  // Notifications and Tooltips
  notifications: Notifications;
  introduction: IntroductionTooltips;

  // Validator and Globals
  validator: Validator;
  globals: ElementorGlobals;

  // Icons Manager
  iconsManager: ElementorIconsManager;

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
