/**
 * Swiper-based Handler Classes
 * Swiper carousel and slideshow handlers
 */

import type { Base } from "./base";
import type { ModuleElements } from "../../core";

/**
 * Base class for Swiper-based handlers
 */
export declare class SwiperBase extends Base {
  swiper: any | null; // Swiper instance
  elements: ModuleElements & {
    $swiperContainer?: JQuery<HTMLElement>;
    $slides?: JQuery<HTMLElement>;
  };
  activeItemIndex?: number;
  $activeImageBg?: JQuery<HTMLElement>;

  getInitialSlide(): number;
  getSlidesCount(): number;
  togglePauseOnHover(toggleOn: boolean): void;
  handleKenBurns(): void;
}

/**
 * Carousel base handler
 */
export declare class CarouselBase extends SwiperBase {
  getSwiperSettings(): any; // SwiperOptions
  initSwiper(): Promise<void>;
  updateSwiperOption(propertyName: string): void;
  getChangeableProperties(): string[];
  updateSpaceBetween(propertyName: string): void;
  getPaginationBullets(type?: "array" | "object"): any;
  a11ySetPaginationTabindex(): void;
  a11ySetSlideAriaHidden(status?: string): void;
  getSwiperWrapperTranformXValue(): number;
  getSpaceBetween(device?: string | null): number;
  getOffsetWidth(): number;
  applyOffsetSettings(
    elementSettings: any,
    swiperOptions: any, // SwiperOptions
    slidesToShow: number
  ): void;
  forceSliderToShowNextSlideWhenOnLast(
    swiperOptions: any, // SwiperOptions
    slidesToShow: number
  ): void;
  addClassToSwiperContainer(className: string): void;
  onDirectionArrowKeydown(event: KeyboardEvent): void;
  onFocusDisableAutoplay(): void;
  handleElementHandlers(): void;
}

/**
 * Background slideshow handler
 */
export declare class BackgroundSlideshow extends SwiperBase {
  slideshowSpecialMethods(): void;
  buildSwiperElements(): void;
  handleKenBurns(): void;
}

/**
 * Image carousel handler
 */
export declare class ImageCarousel extends CarouselBase {
  lightbox?: any;

  handleLightboxSlideChange(): void;
  onSlideChange(): void;
  getSlidesCount(): number;
  updateLightboxSlide(): void;
  onLightboxSlideItemClick(event: Event): void;
  getLightboxSlides(): any[];
  onLightboxSlideChange(): void;
}
