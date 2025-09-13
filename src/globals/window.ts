/**
 * Global Declarations
 * Additional global type declarations for Elementor
 */

import type { YouTubeAPI, VimeoAPI } from "../third-party/video";
import type { WordPressmedia, Screenfull } from "../third-party/wordpress";

/**
 * Additional global types
 * Note: Main Window interface extensions are declared in the main types.ts file
 */

/**
 * Global utility types
 */
export type ElementorGlobal = {
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
  };

  elementorDevTools: {
    deprecation: {
      deprecated(oldMethod: string, version: string, newMethod: string): void;
    };
  };
};
