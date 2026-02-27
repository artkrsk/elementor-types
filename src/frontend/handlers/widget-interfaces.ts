/**
 * Specific Widget Handler Interfaces
 * Interfaces for Elementor frontend widget handlers based on actual source
 */

import type { Base } from "./base";
import type { BaseTabsHandler } from "./base-tabs";
import type { BaseSwiperHandler } from "./base-swiper";
import type { BaseCarouselHandler } from "./base-carousel";

/**
 * Accordion Widget Handler
 */
export interface AccordionHandler extends BaseTabsHandler {}

/**
 * Tabs Widget Handler
 */
export interface TabsHandler extends BaseTabsHandler {}

/**
 * Toggle Widget Handler
 */
export interface ToggleHandler extends BaseTabsHandler {}

/**
 * Video Widget Handler
 */
export declare class VideoHandler extends Base {
  apiProvider: any;
  videoID: string;
  youtubePlayer: any;
  intersectionObserver?: IntersectionObserver;

  getDefaultSettings(): {
    selectors: {
      imageOverlay: string;
      video: string;
      videoIframe: string;
      playIcon: string;
    };
  };

  getDefaultElements(): {
    $imageOverlay: JQuery<HTMLElement>;
    $video: JQuery<HTMLElement>;
    $videoIframe: JQuery<HTMLElement>;
    $playIcon: JQuery<HTMLElement>;
  };

  handleVideo(): void;
  playVideo(): void;
  animateVideo(): Promise<void>;
  hideLightbox(): Promise<void>;
  prepareYTVideo(YT: any, onOverlayClick?: boolean): void;
  bindEvents(): void;
  onInit(...args: any[]): void;
  onElementChange?(propertyName: string, controlView?: any, elementView?: any): void;
}

/**
 * Counter Widget Handler
 */
export declare class CounterHandler extends Base {
  intersectionObserver?: IntersectionObserver;

  getDefaultSettings(): {
    selectors: {
      counterNumber: string;
    };
  };

  getDefaultElements(): {
    $counterNumber: JQuery<HTMLElement>;
  };

  onInit(...args: any[]): void;
}

/**
 * Progress Widget Handler
 */
export declare class ProgressHandler extends Base {
  getDefaultSettings(): {
    selectors: {
      progressNumber: string;
    };
  };

  getDefaultElements(): {
    $progressNumber: JQuery<HTMLElement>;
  };

  onInit(...args: any[]): void;
  createObserver(): void;
}

/**
 * Alert Widget Handler
 */
export declare class AlertHandler extends Base {
  getDefaultSettings(): {
    selectors: {
      dismissButton: string;
    };
  };

  getDefaultElements(): {
    $dismissButton: JQuery<HTMLElement>;
  };

  bindEvents(): void;
  onDismissButtonClick(): void;
}

/**
 * Background Video Widget Handler
 */
export declare class BackgroundVideoHandler extends Base {
  player: any;
  videoType: string;
  apiProvider: any;

  getDefaultSettings(): {
    selectors: {
      backgroundVideoContainer: string;
      backgroundVideoEmbed: string;
      backgroundVideoHosted: string;
    };
  };

  getDefaultElements(): {
    $backgroundVideoContainer: JQuery<HTMLElement>;
    $backgroundVideoEmbed: JQuery<HTMLElement>;
    $backgroundVideoHosted: JQuery<HTMLElement>;
  };

  calcVideosSize($video: JQuery<HTMLElement>): void;
  changeVideoSize(): void;
  startVideoLoop(firstTime?: boolean): void;
  prepareVimeoVideo(Vimeo: any, videoLink: string): void;
  handleVimeoStartEndTimes(elementSettings: any): void;
  prepareYTVideo(YT: any, videoID: string): void;
  activate(): void;
  deactivate(): void;
  run(): void;
  onInit(...args: any[]): void;
  onElementChange?(propertyName: string, controlView?: any, elementView?: any): void;
}

/**
 * Background Slideshow Widget Handler
 */
export interface BackgroundSlideshowHandler extends BaseSwiperHandler {
  getSlidesCount(): number;
  buildSlideshow(): void;
  initSlideshow(): void;
  setKenBurnsSettings(): void;
  handleKenBurns(): void;
}

/**
 * Image Carousel Widget Handler
 */
export interface ImageCarouselHandler extends BaseCarouselHandler {
  lightbox?: any;
  getSwiperSettings(): any;
  updateSwiperOption(propertyName: string): void;
  openLightbox(slideIndex: number): void;
  createLightboxSlides(): any[];
  onSlideClick(event: Event): void;
}

/**
 * Text Editor Widget Handler
 */
export declare class TextEditorHandler extends Base {
  dropCapLetter?: string;

  getDefaultSettings(): {
    selectors: {
      paragraph: string;
    };
    classes: {
      dropCap: string;
      dropCapLetter: string;
    };
  };

  getDefaultElements(): {
    $paragraph: JQuery<HTMLElement>;
    $dropCap: JQuery<HTMLElement>;
    $dropCapLetter: JQuery<HTMLElement>;
  };

  wrapDropCap(): void;
  onInit(...args: any[]): void;
  onElementChange?(propertyName: string, controlView?: any, elementView?: any): void;
}

/**
 * Handles Position Handler (editor only)
 */
export declare class HandlesPositionHandler extends Base {
  isSectionScrollSnapEnabled(): boolean;
  isFirstElement(): boolean;
  isOverflowHidden(): boolean;
  getOffset(): number;
  setHandlesPosition(): void;
  onInit(...args: any[]): void;
}

/**
 * WP Audio Widget Handler
 */
export declare class WpAudioHandler extends Base {
  onInit(...args: any[]): void;
}

/**
 * Global Handler
 */
export declare class GlobalHandler extends Base {
  currentAnimation?: string;

  getWidgetType(): string;
  animate(): void;
  getAnimation(): string;
  onInit(...args: any[]): void;
  onElementChange?(propertyName: string, controlView?: any, elementView?: any): void;
}

/**
 * Complete widget handlers map
 */
export interface ElementorWidgetHandlers {
  accordion: AccordionHandler;
  tabs: TabsHandler;
  toggle: ToggleHandler;
  video: VideoHandler;
  "background-video": BackgroundVideoHandler;
  "background-slideshow": BackgroundSlideshowHandler;
  "image-carousel": ImageCarouselHandler;
  "wp-audio": WpAudioHandler;
  "text-editor": TextEditorHandler;
  counter: CounterHandler;
  progress: ProgressHandler;
  alert: AlertHandler;
  "handles-position": HandlesPositionHandler;
  global: GlobalHandler;
}
