/**
 * Elementor Pro — Popup Builder frontend
 *
 * Mirrors pro `modules/popup/assets/js/frontend/{document,triggers,module}.js`
 * (Elementor Pro 4.2.2). Members listed here were read from the shipped bundle
 * `assets/js/elements-handlers.js`; nothing is inferred.
 */
import type { Module } from '../core/modules/module';
import type { Document } from '../frontend/document';
import type { DialogWidget } from '../utils/common';

/**
 * One armed trigger (`page_load`, `scrolling`, `scrolling_to`, `click`, `inactivity`,
 * `exit_intent`, `adblock_detection`) — `triggers/*.js`, all `elementorModules.Module`s.
 */
export interface PopupTrigger extends Module {
	callback: () => void;
	getTriggerSetting(settingKey: string): any;
	run(): void;
	/** clearTimeout / `.off()` / `IntersectionObserver.disconnect()` — nothing survives. */
	destroy(): void;
}

/**
 * The triggers helper a popup document creates in `initTriggers()` — present only when the
 * popup has a trigger condition and passed its timing checks (`startTiming()`).
 */
export interface PopupTriggers extends Module {
	document: PopupDocument;
	triggers: PopupTrigger[];
	runTriggers(): void;
	/** Destroys every armed trigger and empties the list. */
	destroyTriggers(): void;
	/** `document.showModal(true)` then `destroyTriggers()`. */
	onTriggerFired(): void;
}

export interface PopupShowSettings {
	id: string | number;
	/** Hide instead when the modal is already visible. */
	toggle?: boolean;
}

export interface PopupCloseSettings {
	/** `document.disable()` after hiding — the popup never shows again for this visitor. */
	do_not_show_again?: boolean;
}

/**
 * A popup document as `elementorFrontend.documentsManager.documents[id]` holds it.
 *
 * On the frontend `onInit()` detaches the popup's own root (`$element.show().remove()`),
 * keeps its markup in `elementHTML`, binds `elementorFrontend.elements.$body.on('click',
 * open_selector, showModal)` and arms `triggers` through `startTiming()`. `showModal()` rebuilds
 * a clean root from `elementHTML` and runs the elements handlers on it — `runElementsHandlers()`
 * is a no-op at init for popups.
 */
export interface PopupDocument extends Document {
	/** The popup root's `outerHTML`, captured at init; every show rebuilds from it. */
	elementHTML: string;
	/** Set by `initTriggers()`; absent when the timing checks failed or no trigger is configured. */
	triggers?: PopupTriggers;
	/** Lazily CREATES the DialogsManager widget (`#elementor-popup-modal-<id>`) on first call. */
	getModal(): DialogWidget;
	initModal(): void;
	/** @param event the triggering event, or `true` from a trigger (`avoidMultiple`) */
	showModal(event?: Event | boolean, avoidMultiple?: boolean): void;
	/** Timing checks (`timing.js`), then `initTriggers()` when they pass. */
	startTiming(): void;
	initTriggers(): void;
	/** Persists "never show again" for this visitor (`disable` storage key). */
	disable(): void;
}

/**
 * `elementorProFrontend.modules.popup` — `modules/popup/assets/js/frontend/module.js`.
 */
export interface PopupModule extends Module {
	/** True once any popup showed in this page lifetime; gates `avoid_multiple_popups`. */
	popupPopped: boolean;
	/** Synchronous registry lookup — a popup not printed on the page is a silent no-op. */
	showPopup(settings: PopupShowSettings, event?: Event): void;
	/** Resolves the popup from the event target's `[data-elementor-type="popup"]` ancestor. */
	closePopup(settings: PopupCloseSettings, event: Event): void;
	/** Page-view / session timing counters (`timing/page-views`, `timing/sessions`). */
	shouldSetViewsAndSessions(): boolean;
	setViewsAndSessions(): void;
	/** Registers the `popup:open` / `popup:close` URL actions. */
	onFrontendComponentsInit(): void;
}
