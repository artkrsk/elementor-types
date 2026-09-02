/**
 * Elementor Pro — frontend entry (`window.elementorProFrontend`)
 *
 * Mirrors pro `assets/dev/js/frontend/frontend.js` (Elementor Pro 4.2.2).
 */
import type { ViewModule } from '../core/modules/view-module';
import type { PopupModule } from './popup';

/**
 * `ElementorProFrontendConfig` — the inline `elementor-pro-frontend-js-before` block.
 */
export interface ElementorProFrontendConfig {
	ajaxurl: string;
	nonce: string;
	urls: {
		assets: string;
		rest: string;
	};
	settings: Record<string, any>;
	popup: {
		/** Site-wide: any published popup exists, not "this page has one". */
		hasPopUps: boolean;
	};
	shareButtonsNetworks: Record<string, any>;
	facebook_sdk?: Record<string, any>;
	lottie?: Record<string, any>;
	[key: string]: any;
}

/**
 * `window.elementorProFrontend`. `config` is captured once from `ElementorProFrontendConfig`
 * at construction; `modules` are instantiated on `elementor/frontend/init`.
 */
export interface ElementorProFrontend extends ViewModule {
	config: ElementorProFrontendConfig;
	modules: {
		popup: PopupModule;
		[moduleName: string]: any;
	};
	initModules(): void;
	onElementorFrontendInit(): void;
}
