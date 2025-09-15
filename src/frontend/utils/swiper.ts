/**
 * Swiper Utilities
 *
 * Mirrors frontend/utils/swiper.js
 * Utilities for Swiper.js integration
 */

/**
 * Swiper configuration options
 */
export interface SwiperConfig {
	slidesPerView?: number | 'auto';
	spaceBetween?: number;
	loop?: boolean;
	autoplay?: boolean | {
		delay: number;
		disableOnInteraction?: boolean;
	};
	navigation?: {
		nextEl?: string;
		prevEl?: string;
	};
	pagination?: {
		el?: string;
		clickable?: boolean;
		type?: 'bullets' | 'fraction' | 'progressbar';
	};
	breakpoints?: Record<number, Partial<SwiperConfig>>;
	[key: string]: any;
}

/**
 * Swiper instance interface
 */
export interface SwiperInstance {
	destroy(): void;
	update(): void;
	slideTo(index: number, speed?: number): void;
	slideNext(): void;
	slidePrev(): void;
	[key: string]: any;
}

/**
 * Swiper utilities for Elementor integration
 */
export interface SwiperUtils {
	/**
	 * Create Swiper instance
	 */
	createSwiper(element: HTMLElement, config: SwiperConfig): Promise<SwiperInstance>;

	/**
	 * Destroy Swiper instance
	 */
	destroySwiper(swiper: SwiperInstance): void;

	/**
	 * Get default Swiper configuration
	 */
	getDefaultConfig(): SwiperConfig;

	/**
	 * Update Swiper with new configuration
	 */
	updateSwiper(swiper: SwiperInstance, config: Partial<SwiperConfig>): void;

	/**
	 * Check if Swiper is available
	 */
	isSwiperAvailable(): boolean;
}

declare const SwiperUtils: any;

export { SwiperUtils };
export default SwiperUtils;