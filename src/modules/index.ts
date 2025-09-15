/**
 * Elementor Modules - Module Registry System
 *
 * Mirrors the original elementorModules global pattern from modules/modules.js
 * Provides dynamic module registration and namespace organization
 */

import type { Module } from '../core/modules/module';
import type { ViewModule } from '../core/modules/view-module';
import type { ArgsObject } from '../core/modules/args-object';
import type { ForceMethodImplementation } from '../core/modules/force-implementation';

// Module utilities
export interface MasonryModule extends ViewModule {
	getDefaultSettings(): {
		container: string | HTMLElement | null;
		items: string | HTMLElement | null;
		columnsCount: number;
		verticalSpaceBetween: number;
	};

	getDefaultElements(): {
		$container: JQuery;
		$items: JQuery;
	};

	run(): void;
}

export interface ScrollModule {
	/**
	 * Creates an intersection observer for scroll-based animations
	 * @param obj Configuration object
	 */
	scrollObserver(obj: {
		sensitivity?: number;
		callback: (data: {
			sensitivity?: number;
			isInViewport: boolean;
			scrollPercentage: number;
			intersectionScrollDirection: 'up' | 'down';
		}) => void;
		offset?: string;
		root?: HTMLElement | null;
	}): IntersectionObserver;

	/**
	 * Get element viewport percentage
	 */
	getElementViewportPercentage($element: JQuery, offsetObj?: {
		start?: number;
		end?: number;
	}): number;

	/**
	 * Get page scroll percentage
	 */
	getPageScrollPercentage(offsetObj?: {
		start?: number;
		end?: number;
	}, limitPageHeight?: number): number;
}

// Module utilities namespace
export interface ModuleUtils {
	Masonry: new (...args: any[]) => MasonryModule;
	Scroll: ScrollModule;
}

// Frontend module namespace
export interface FrontendModules {
	Document: any;
	tools: {
		StretchElement: any;
	};
	handlers: {
		Base: any;
		StretchedElement: any;
		SwiperBase: any;
		CarouselBase: any;
	};
}

// Editor module namespace
export interface EditorModules {
	[key: string]: any;
}

// Main elementorModules interface
export interface ElementorModules {
	Module: typeof Module;
	ViewModule: typeof ViewModule;
	ArgsObject: typeof ArgsObject;
	ForceMethodImplementation: typeof ForceMethodImplementation;

	utils: ModuleUtils;
	frontend?: FrontendModules;
	editor?: EditorModules;

	// Dynamic module registration
	[key: string]: any;
}

/**
 * Window interface for elementorModules
 * Note: Users should extend Window interface in their own projects if needed
 */

// Export the main modules interface
export type { ElementorModules as default };