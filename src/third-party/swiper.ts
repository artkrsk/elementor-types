/**
 * Swiper Integration Types
 * Types for Swiper carousel library integration
 */

/// <reference types="swiper" />

import type { Swiper, SwiperOptions } from "swiper/types";

/**
 * Extended Swiper options for Elementor-specific functionality
 */
export interface ElementorSwiperOptions extends SwiperOptions {
  // Elementor-specific options
  handleElementorBreakpoints?: boolean;
  showArrows?: boolean;
  pagination?: {
    el?: string | HTMLElement;
    type?: "bullets" | "fraction" | "progressbar";
    clickable?: boolean;
    dynamicBullets?: boolean;
    dynamicMainBullets?: number;
    hideOnClick?: boolean;
    renderBullet?: (index: number, className: string) => string;
    renderFraction?: (currentClass: string, totalClass: string) => string;
    renderProgressbar?: () => string;
    renderCustom?: (swiper: Swiper, current: number, total: number) => string;
    renderBulletElement?: string;
    bulletClass?: string;
    bulletActiveClass?: string;
    modifierClass?: string;
    currentClass?: string;
    totalClass?: string;
    hiddenClass?: string;
    progressbarFillClass?: string;
  } & SwiperOptions["pagination"];
}

/**
 * Re-export Swiper types for convenience
 */
export type { Swiper, SwiperOptions };
