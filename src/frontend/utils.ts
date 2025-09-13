/**
 * Frontend Utilities
 * Utility interfaces for frontend functionality
 */

import type { ElementorFrontendConfig } from "./config";

/**
 * Breakpoints utility interface
 */
export interface ElementorBreakpoints {
  responsiveConfig: ElementorFrontendConfig["responsive"];
  getActiveBreakpointsList(args?: {
    largeToSmall?: boolean;
    withDesktop?: boolean;
  }): string[];
  getBreakpointValues(): number[];
  getDesktopPreviousDeviceKey(): string;
  getDesktopMinPoint(): number;
  getDeviceMinBreakpoint(device: string): number;
  getActiveMatchRegex(): RegExp;
}

/**
 * Assets loader utility
 */
export interface AssetsLoader {
  load(type: "script" | "style", key: string): Promise<boolean>;
  getScriptElement(src: string): HTMLScriptElement;
  getStyleElement(src: string): HTMLLinkElement;
  loadAsset(assetData: any, assetType: string): Promise<boolean>;
  isAssetLoaded(assetData: any, assetType: string): boolean;
  appendAsset(assetData: any, element: HTMLElement): void;
}

/**
 * Controls utility
 */
export interface Controls {
  getControlValue(
    controlSettings: object,
    controlKey: string,
    controlSubKey?: string
  ): any;
  getResponsiveControlValue(
    controlSettings: object,
    controlKey: string,
    controlSubKey?: string,
    device?: string | null
  ): any;
}

/**
 * Video loader interface
 */
export interface VideoLoader {
  getApiURL(): string;
  getURLRegex(): RegExp;
  isApiLoaded(): boolean;
  getApiObject(): any;
  getVideoIDFromURL(url: string): string | null;
  onApiReady(callback: Function): void;
}

/**
 * Events utility interface
 */
export interface Events {
  dispatch(
    context: HTMLElement | JQuery<HTMLElement>,
    event: string,
    data?: any
  ): void;
}

/**
 * URL actions utility interface
 */
export interface UrlActions {
  addAction(action: string, callback: Function): void;
  runAction(url: string): void;
}

/**
 * Swiper types for frontend
 */
export interface SwiperInstance {
  // Basic Swiper interface - can be expanded based on actual usage
  slideNext(): void;
  slidePrev(): void;
  destroy(): void;
  update(): void;
}
