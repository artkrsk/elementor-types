/**
 * Swiper Utilities
 *
 * Mirrors frontend/utils/swiper.js
 * Async factory wrapper: `new SwiperHandler(container, config)` returns a Promise<Swiper>
 */

import type Swiper from "swiper";

/**
 * SwiperHandler constructor that returns a Promise resolving to a Swiper instance.
 * Lazy-loads the Swiper library if not already available.
 */
export interface SwiperHandlerConstructor {
  new (
    container: HTMLElement | JQuery<HTMLElement>,
    config: Record<string, any>
  ): Promise<Swiper>;
}
