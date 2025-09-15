/**
 * Elementor Modules
 *
 * Mirrors modules/modules.js
 * Main modules export for elementorModules global
 */

import type { Module, ViewModule, ArgsObject, ForceMethodImplementation } from '../core/modules';
import type { Masonry } from './imports/utils/masonry';
import type { Scroll } from './imports/utils/scroll';

/**
 * Elementor Modules Global Interface
 * Main modules collection available as window.elementorModules
 */
export interface ElementorModules {
	/**
	 * Base module class
	 */
	Module: typeof Module;

	/**
	 * View module class with DOM handling
	 */
	ViewModule: typeof ViewModule;

	/**
	 * Arguments object for settings management
	 */
	ArgsObject: typeof ArgsObject;

	/**
	 * Force method implementation utility
	 */
	ForceMethodImplementation: typeof ForceMethodImplementation;

	/**
	 * Utility modules
	 */
	utils: {
		/**
		 * Masonry layout utility
		 */
		Masonry: typeof Masonry;

		/**
		 * Scroll utility functions
		 */
		Scroll: typeof Scroll;
	};
}

declare const elementorModules: ElementorModules;

export { elementorModules };
export default elementorModules;