# Changelog

## 2.0.0

Accuracy release. The whole surface was audited against Elementor 4.4.0 source
(the target version is now recorded in `package.json` → `elementor.version`).
Fabricated APIs are gone, missing real APIs are in. Breaking for anything that
relied on the old, wrong shapes — which is the point.

### Removed (did not exist in Elementor)

- `ElementorMain` and its `isElementorEditor` guard — `window.elementor` is `ElementorEditor`. The duplicate `ElementorEditor` interface in `globals/elementor-window` is gone too; `src/editor/main` is canonical.
- `ElementorIconsManager` / `IconsManager` — replaced by `ElementorEditor.iconManager` (singular, real shape: `library`, `store`, `cache`, `getLayout()`, `loadIconLibraries()`).
- `HelpersManager`: `urlActions`, `historyDebounce`, `heartbeat`, `scrollToElement()`, `isElementInViewport()`, `isTouchDevice()` — replaced by the real member set (`scrollToView()`, `isInViewport()`, `enqueueCSS()`, `enqueuePreviewStylesheet()`, `enqueueEditorStylesheet()`, `renderIcon()`, `getSimpleDialog()`, `hasPro()`, `getWidgetCache()`, deprecated `stringReplaceAll(string, replaces)`).
- Frontend handler interfaces `ContainerHandler`, `GridContainerHandler`, `AccessibilityHandler`, `NestedTitleKeyboardHandler`, `AudioHandler`, `ShapeHandler` (+ their `Handlers.*` aliases).
- Widget handler classes `Alert`, `Progress`, `Video`, `BackgroundVideo`, `TextEditor`, `WpAudio`, `HandlesPosition`, `BackgroundSlideshow` in `frontend/handlers/widgets` — the accurate `*Handler` siblings in `widget-interfaces` are the types to use. `TabsModule.findAndExposeTabIndexFromSearch()` removed.
- `ElementorCommonUtils` and `ElementorCommon.utils` — the real property is `helpers` (`consoleWarn`, `consoleError`, `cloneObject`, `upperCaseWords`, `getUniqueId`).
- `ElementorCommonDialogsManager`: `getDialog()`, `destroyDialog()`, `getActiveDialogs()`, `closeAll()`, `alert()`, `confirm()`, `modal()` — the real manager only has `createWidget()`, `getSettings()`, `init()`, `openDialogs`.
- `DialogWidget`: `id`, `type`, `options`, `getContent()`, `setContent()`, `setPosition()`, `refresh()`; added the real `addElement()`.
- `DialogOptions`: `id`, `title`, `width`, `height`, `resizable`, `draggable`, `autoOpen`, `closeOnEscape`, `closeOnBackgroundClick`.
- `Container`: `getAllControls()`, `getLabel()`, `getHierarchy()`, `getAllAncestry()`, `isEmpty()`, `isInner()`, `getElementType()`, `getChildType()`, `setSetting()` (lives on the Backbone model), instance-level `TYPE_REPEATER`/`TYPE_REPEATER_ITEM` (static-only).
- `ChildrenArray`: `filterRecursive()`, `mapRecursive()`, `getAllRecursive()`.
- `ContainerStateManager` (whole file) — no counterpart in Elementor.
- `editor/utils/select2` (`Select2Utils`, `Select2Registry`) — no such runtime module; use `Editor.Controls.Select2`.
- The fabricated `src/modules/imports/**` + `src/modules/modules.ts` subtree (second `Module`/`Masonry`/`Scroll` API).
- `Module.instanceParams` — constructor-closure local in Elementor, never an instance property.
- `ElementorControlsModule`: `'Global-style-repeater'` key (registered via `addControlView()`, not the literal) and the fabricated `get()`/`has()`/`getAvailableControls()`/`register()` registry methods.
- `ComponentBase` (`$e.modules.ComponentBase` and the editor variant): `config`, `register()`, `initialize()`, `ComponentConfig` — replaced by the real fan-out (`commands`, `commandsInternal`, `hooks`, `routes`, `tabs`, `shortcuts`, `utils`, `data`, `uiStates`, `states`) and `registerAPI()`.
- `$e.modules.editor` fabricated names `EditorCommandContainerBase`, `EditorCommandInternalBase`, `utils.EditorUtilsModule` — real shape is `{ CommandContainerBase, CommandContainerInternalBase, document: { CommandHistoryBase, CommandHistoryDebounceBase } }` (`EModulesEditor`).
- `CommandDataBase`: `validateData()`, `processData()`, `applyData()` — rewritten from the real `$e.modules.CommandData`.
- `CommandHistoryDebounceBase`: `debounceTimeout`, `debounceTimer`, `getDebounceTimeout()`, `startDebounce()`, `clearDebounce()`, `executeDebounced()` — debouncing is a static lodash wrapper, modeled as such.
- `ElementorFrontendConfig.urls.rest`; `HandlerOptions.model`; `LegacyDocumentsManager` (frontend `documentsManager` now uses the accurate `DocumentsManager`).
- `AjaxManager` on `ElementorEditor` — `elementor.ajax` is now `ElementorAjax` (one type for one object).

### Renamed / re-signatured

- `$e` root: added `commands`, `commandsInternal`, `hooks`, `data`, `routes`, `store`, `shortcuts`, `uiStates`, `extras`, `bc`, `internal()`, `modules.hookData`; `runShortcut()` moved from the root to `$e.commands` (where it really lives).
- `ElementsManager.registerElementType(element)` — one `ElementTypeBase` argument (the type key comes from `element.getType()`), not `(type, class)`.
- `ElementorAjax.addRequest(action, config?, immediately?)` returns `JQuery.Deferred`, callbacks are single-argument (no jQuery-style `(response, textStatus, jqXHR)`).
- `ElementorCommonAjax.addRequest(action, options?, immediately?)` returns `JQuery.Deferred`.
- `elementorCommon.translate(stringKey, context?, templateArgs?, i18nStack?)` — 4-arg, not `(key, domain)`.
- `ElementorCommonStorage`: real `get(key?, options?)` / `set(key, value, options?)` / `save(object, session?)`; `remove`/`clear`/`has` removed.
- `ElementorCommonDebug` — an error-reporting queue (`addURLToWatch`, `addCustomError`, `addError`, `sendErrors`), not a console logger.
- `ElementorCommonConfig` — real localized shape (`version`, `isRTL`, `isDebug`, `activeModules`, `experimentalFeatures`, `urls.{assets,rest}`, `filesUpload`).
- `DialogType` narrowed to the 5 registered widget types: `'simple' | 'buttons' | 'lightbox' | 'confirm' | 'alert'`; `DialogOptions.hide.onButtonClick` added.
- `Container.getGroupRelatedControls(settings)` takes a settings object, not a group name.
- `ElementsHandler.getHandler()` returns the class directly when already resolved (was always `Promise`).
- Frontend/editor hooks `addAction`/`addFilter`/`doAction`/`removeAction`/`removeFilter` are chainable (return the hooks object), matching the real `EventManager`.
- `ElementorFrontendConfig.i18n.shareOnTwitter` → `shareOnX`.
- `Frontend.Handlers.Base`, `HandlerBase`, and the root `FrontendHandlerBase` all resolve to the single declared class in `frontend/handlers/base` (previously three silently divergent types). `FrontendHandlerBase` is class-typed — `typeof FrontendHandlerBase` now works, so the `dist/frontend/handlers/base` deep import is unnecessary.
- `Base.$element` / `Base.isEdit` are `| null` (both are null until `__construct` runs, and only when `isActive()` returns true).
- `BackgroundSlideshowHandler` rewritten from real members (`buildSwiperElements()`, `initSlider(): Promise<void>`; the invented `buildSlideshow`/`initSlideshow`/`setKenBurnsSettings` are gone).
- `ElementorModules.{Module,ViewModule,ArgsObject,ForceMethodImplementation}` are real `typeof` types (were `any`); `ElementorModules.utils.Scroll` is the static class (`getElementViewportPercentage` et al.), `utils.Masonry` the real constructor.
- `ArgsObject` extends `InstanceType` and exposes `static getInstanceType()`.
- `elementor.modules.controls` gained the real keys (incl. `Select2`) with a loose index signature for the rest.

### Added

- `HookArgs`: `containers`, `options`, `sourceIndex`, `targetIndex`, `status`, `isMultiSettings` — the fields real commands destructure. (`containers` absence caused a shipped consumer bug.)
- `HookUIBase.register()`; `HookDataBase` / `HookData` (`$e.modules.hookData`).
- `ElementorCommonAjax.loadObjects()`; `ElementorCommon.elements.{$window,$document,$body}`.
- `ElementorEditor`: `elementsManager`, `settings.page.addChangeCallback()`, `settings.page.model.get()`, `once()`/`trigger()`, `$preview: JQuery<HTMLIFrameElement>`, config index signature; `PanelView.getCurrentPageView()`.
- `Select2.getSelect2DefaultOptions()`; `ExtendableConstructor.prototype`.
- `AjaxRequestConfig.unique_id`; `ElementorStorage.set` `lifetimeInSeconds`.
- `elementorFrontend.utils.anchors` as optional and `@deprecated` (removed from core after 3.25.x; present only on older installs).

### Packaging

- `exports` no longer claims CJS (`require` condition dropped — the emitted ESM barrels never resolved under `require`). Top-level `main`/`types` retained for classic-resolution consumers.
- `peerDependencies.swiper` narrowed to `>=12.0.0` (the only major actually type-checked against).
- Target Elementor version recorded in `package.json` (`elementor.version`), README, and the `src/index.ts` header.

## 1.0.10

Previous release (2026-03-21).
