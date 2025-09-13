/**
 * Widget Handler Classes
 * Specific widget handlers for various Elementor widgets
 */

import type { Base } from "./base";

/**
 * Base class for tab-like widgets (tabs, accordion, toggle)
 */
export declare class TabsModule extends Base {
  activateDefaultTab(): void;
  handleKeyboardNavigation(event: KeyboardEvent): void;
  changeActiveTab(tabIndex: string | number): void;
  isActiveTab(tabIndex: string | number): boolean;
  activateTab(tabIndex: string | number): void;
  deactivateActiveTab(tabIndex?: string | number): void;
  findAndExposeTabIndexFromSearch(elementsToSearch: any): void;
}

/**
 * Accordion widget handler
 */
export declare class Accordion extends TabsModule {}

/**
 * Tabs widget handler
 */
export declare class Tabs extends TabsModule {
  onTabKeyDown(event: KeyboardEvent): void;
}

/**
 * Toggle widget handler
 */
export declare class Toggle extends TabsModule {}

/**
 * Alert widget handler
 */
export declare class Alert extends Base {
  dismiss(): void;
}

/**
 * Counter widget handler
 */
export declare class Counter extends Base {
  intersectionObserver?: IntersectionObserver;
}

/**
 * Progress widget handler
 */
export declare class Progress extends Base {
  intersectionObserver?: IntersectionObserver;
  onElementChange(propertyName: string): void;
}

/**
 * Video widget handler
 */
export declare class Video extends Base {
  player?: any;
  apiProvider?: any;
  youtubePlayer?: any;

  handleVideo(): void;
  playVideo(): void;
  animateVideo(): Promise<void>;
  hideLightbox(): Promise<void>;
  prepareYTVideo(YT: any, onOverlayClick?: boolean): void;
  prepareVimeoVideo(Vimeo: any, onOverlayClick?: boolean): void;
  changeVideoSize(): void;
  handleAspectRatio(): void;
  startVideoLoop(player: any): void;
  pauseVideoLoop(): void;
  bindEvents(): void;
  onElementChange(propertyName: string): void;
}

/**
 * Background video handler
 */
export declare class BackgroundVideo extends Base {
  player?: any;
  isFramework?: boolean;

  onElementChange(propertyName: string): void;
  playVideo(): void;
  pauseVideo(): void;
  showVideoFrame(): void;
  hideVideoFrame(): void;
  prepareYTVideo(YT: any): void;
  prepareVimeoVideo(Vimeo: any): void;
  changeVideoSize(): void;
  startVideoLoop(player: any): void;
  pauseVideoLoop(): void;
  setEntranceAnimation(animation: string): void;
}

/**
 * Text editor widget handler
 */
export declare class TextEditor extends Base {
  onElementChange(propertyName: string): void;
  dropCapLetterHeightFix(): void;
}

/**
 * WP Audio widget handler
 */
export declare class WpAudio extends Base {
  onElementChange(propertyName: string): void;
  initAudio(): void;
}

/**
 * Handles position utility handler
 */
export declare class HandlesPosition extends Base {
  isFirstSection(): boolean;
  isOverflowHidden(): boolean;
  getOffset(): number;
  setHandlesPosition(): void;
}
