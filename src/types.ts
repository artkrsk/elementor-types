/// <reference types="jquery" />
/// <reference types="swiper" />

// ===== Swiper Types =====
import type { Swiper, SwiperOptions } from "swiper/types";

// Extended Swiper Options for Elementor
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
    renderProgressbar?: (progressbarFillClass: string) => string;
    renderCustom?: (swiper: Swiper, current: number, total: number) => string;
    progressbarOpposite?: boolean;
    formatFractionCurrent?: (number: number) => string;
    formatFractionTotal?: (number: number) => string;
  };
  navigation?: {
    nextEl?: string | HTMLElement;
    prevEl?: string | HTMLElement;
    hideOnClick?: boolean;
    disabledClass?: string;
    hiddenClass?: string;
    lockClass?: string;
    navigationDisabledClass?: string;
  };
}

// ===== Core Module Types =====
declare namespace ElementorModules {
  interface ModuleSettings {
    [key: string]: any;
  }

  interface ModuleElements {
    [key: string]: JQuery | HTMLElement;
  }

  class Module {
    constructor(settings?: ModuleSettings);
    getDefaultSettings(): ModuleSettings;
    getSettings(setting?: string): any;
    setSettings(
      settingKey: string | object,
      value?: any,
      settingsContainer?: object
    ): this;
    getErrorMessage(type: string, functionName?: string): string;
    forceMethodImplementation(functionName?: string): never;
    on(eventName: string | object, callback?: Function): this;
    off(eventName: string, callback?: Function): this;
    trigger(eventName: string, ...params: any[]): this;
    getConstructorID(): string;
    getItems(items: any, itemKey?: string): any;
    __construct(...args: any[]): void;
    static extend(properties: object): typeof Module;
  }

  class ViewModule extends Module {
    elements: ModuleElements | null;
    getDefaultElements(): ModuleElements;
    bindEvents(): void;
    unbindEvents?(): void;
    onInit(...args: any[]): void;
    initElements(): void;
    findElement(selector: string): JQuery;
  }

  class ArgsObject {
    args: object;
    constructor(args: object);
    requireArgument(property: string, args?: object): void;
    requireArgumentType(property: string, type: string, args?: object): void;
    requireArgumentInstance(
      property: string,
      instance: any,
      args?: object
    ): void;
    requireArgumentConstructor(
      property: string,
      type: any,
      args?: object
    ): void;
  }

  class InstanceType {
    static [Symbol.hasInstance](target: any): boolean;
    static getInstanceType(): string;
    instanceTypes?: string[];
  }

  class ForceMethodImplementation extends Error {
    constructor(
      info?: { isStatic?: boolean; fullName: string; functionName?: string },
      args?: object
    );
  }

  namespace utils {
    class Masonry extends ViewModule {
      run(): void;
      getDefaultSettings(): {
        container: null | string | HTMLElement;
        items: null | string | HTMLElement;
        columnsCount: number;
        verticalSpaceBetween: number;
      };
    }

    class Scroll {
      static scrollObserver(options: {
        sensitivity?: number;
        callback: (event: ScrollObserverEvent) => void;
        offset?: string;
        root?: HTMLElement | null;
      }): IntersectionObserver;

      static getElementViewportPercentage(
        $element: JQuery,
        offsetObj?: {
          start?: number;
          end?: number;
        }
      ): number;

      static getPageScrollPercentage(
        offsetObj?: {
          start?: number;
          end?: number;
        },
        limitPageHeight?: number
      ): number;
    }
  }

  interface ScrollObserverEvent {
    sensitivity?: number;
    isInViewport: boolean;
    scrollPercentage: number;
    intersectionScrollDirection: "up" | "down";
  }

  namespace frontend {
    namespace handlers {
      class Base extends ViewModule {
        $element: JQuery;
        isEdit: boolean;
        editorListeners: any[] | null;

        constructor(settings: { $element: JQuery });
        isActive(settings?: any): boolean;
        isElementInTheCurrentDocument(): boolean;
        getUniqueHandlerID(cid?: string, $element?: JQuery): string;
        initEditorListeners(): void;
        getEditorListeners(): any[];
        addEditorListeners(): void;
        removeEditorListeners(): void;
        getElementType(): string;
        getWidgetType(): string | undefined;
        getID(): string;
        getModelCID(): string;
        getElementSettings(setting?: string): any;
        getEditSettings(setting?: string): any;
        getCurrentDeviceSetting(settingKey: string): any;
        onElementChange?(propertyName: string): void;
        onEditSettingsChange?(propertyName: string): void;
        onPageSettingsChange?(propertyName: string): void;
        onDestroy(): void;
      }

      class StretchedElement extends Base {
        stretchElement: ElementorModules.frontend.tools.StretchElement;
        getStretchedClass(): string;
        getStretchSettingName(): string;
        getStretchActiveValue(): string;
        stretch(): void;
        initStretch(): void;
        getStretchContainer(): Window | string;
        isStretchSettingEnabled(): boolean;
        onKitChangeStretchContainerChange(): void;
        getStretchElementForConfig(childSelector?: string | null): JQuery;
        getStretchElementConfig(): object;
      }

      class SwiperBase extends Base {
        swiper: Swiper | null;
        elements: ModuleElements & {
          $swiperContainer?: JQuery;
          $slides?: JQuery;
        };
        activeItemIndex?: number;
        $activeImageBg?: JQuery;
        getInitialSlide(): number;
        getSlidesCount(): number;
        togglePauseOnHover(toggleOn: boolean): void;
        handleKenBurns(): void;
      }

      class CarouselBase extends SwiperBase {
        getSwiperSettings(): SwiperOptions;
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
          swiperOptions: SwiperOptions,
          slidesToShow: number
        ): void;
        forceSliderToShowNextSlideWhenOnLast(
          swiperOptions: SwiperOptions,
          slidesToShow: number
        ): void;
        addClassToSwiperContainer(className: string): void;
        onDirectionArrowKeydown(event: KeyboardEvent): void;
        onFocusDisableAutoplay(): void;
        handleElementHandlers(): void;
      }

      // Base class for tab-like widgets (tabs, accordion, toggle)
      class TabsModule extends Base {
        activateDefaultTab(): void;
        handleKeyboardNavigation(event: KeyboardEvent): void;
        changeActiveTab(tabIndex: string | number): void;
        isActiveTab(tabIndex: string | number): boolean;
        activateTab(tabIndex: string | number): void;
        deactivateActiveTab(tabIndex?: string | number): void;
        findAndExposeTabIndexFromSearch(elementsToSearch: any): void;
      }

      // Specific handler classes
      class Accordion extends TabsModule {}

      class Alert extends Base {
        dismiss(): void;
      }

      class BackgroundSlideshow extends SwiperBase {
        slideshowSpecialMethods(): void;
        buildSwiperElements(): void;
        handleKenBurns(): void;
      }

      class BackgroundVideo extends Base {
        player?: any;
        isFramework?: boolean;
        onElementChange(propertyName: string): void;
        playVideo(): void;
        pauseVideo(): void;
        showVideoFrame(): void;
        hideVideoFrame(): void;
        prepareYTVideo(YT: any): void;
        prepareVimeoVideo(Vimeo: any): void;
        changeVideoSize(): void;
        startVideoLoop(player: any): void;
        pauseVideoLoop(): void;
        setEntranceAnimation(animation: string): void;
      }

      class Counter extends Base {
        intersectionObserver?: IntersectionObserver;
      }

      class HandlesPosition extends Base {
        isFirstSection(): boolean;
        isOverflowHidden(): boolean;
        getOffset(): number;
        setHandlesPosition(): void;
      }

      class ImageCarousel extends CarouselBase {
        lightbox?: any;
        handleLightboxSlideChange(): void;
        onSlideChange(): void;
        getSlidesCount(): number;
        updateLightboxSlide(): void;
        onLightboxSlideItemClick(event: Event): void;
        getLightboxSlides(): any[];
        onLightboxSlideChange(): void;
      }

      class Progress extends Base {
        intersectionObserver?: IntersectionObserver;
        onElementChange(propertyName: string): void;
      }

      class Tabs extends TabsModule {
        onTabKeyDown(event: KeyboardEvent): void;
      }

      class TextEditor extends Base {
        onElementChange(propertyName: string): void;
        dropCapLetterHeightFix(): void;
      }

      class Toggle extends TabsModule {}

      class Video extends Base {
        player?: any;
        apiProvider?: any;
        youtubePlayer?: any;
        handleVideo(): void;
        playVideo(): void;
        animateVideo(): Promise<void>;
        hideLightbox(): Promise<void>;
        prepareYTVideo(YT: any, onOverlayClick?: boolean): void;
        prepareVimeoVideo(Vimeo: any, onOverlayClick?: boolean): void;
        changeVideoSize(): void;
        handleAspectRatio(): void;
        startVideoLoop(player: any): void;
        pauseVideoLoop(): void;
        bindEvents(): void;
        onElementChange(propertyName: string): void;
      }

      class WpAudio extends Base {
        onElementChange(propertyName: string): void;
        initAudio(): void;
      }

      // Container-specific handlers
      namespace container {
        class Container extends Base {
          onElementChange(propertyName: string): void;
        }

        class GridContainer extends Base {
          onElementChange(propertyName: string): void;
          setGridColumnsTemplate(): void;
          setGridRowsTemplate(): void;
        }

        class Shapes extends Base {
          buildSVG(): void;
          svgURL(shapeType: string, fileName: string): string;
          setShapeElementType(): void;
          createSvgShapeElement(): HTMLElement;
          buildShapeNode(): HTMLElement;
          setNegative(): void;
          onElementChange(propertyName: string): void;
        }
      }

      // Section-specific handlers
      namespace section {
        class Section extends Base {
          onElementChange(propertyName: string): void;
        }

        class Shapes extends Base {
          buildSVG(): void;
          svgURL(shapeType: string, fileName: string): string;
          setShapeElementType(): void;
          createSvgShapeElement(): HTMLElement;
          buildShapeNode(): HTMLElement;
          setNegative(): void;
          onElementChange(propertyName: string): void;
        }

        class StretchedSection extends StretchedElement {}
      }

      // Accessibility handlers
      namespace accessibility {
        class NestedTitleKeyboardHandler extends Base {
          getNestedTitleSelector(): string;
          getWidgetNumber(): number;
          getTitleIndex(currentElement: HTMLElement): number;
          getNextTitle(currentElement: HTMLElement): HTMLElement | null;
          getPreviousTitle(currentElement: HTMLElement): HTMLElement | null;
          handleKeyboardNavigation(event: KeyboardEvent): void;
          addTitleAriaLabels(): void;
          addTitleTabindex(): void;
          onElementChange(propertyName: string): void;
        }
      }
    }

    namespace tools {
      class StretchElement extends ViewModule {
        stretch(): void;
        reset(): void;
        applyCssVariables($element: JQuery, css: object): void;
        resetCssVariables($element: JQuery): void;
      }
    }

    // ===== Frontend Utils =====
    namespace utils {
      class Anchors extends ViewModule {
        getSettings(): any;
        bindEvents(): void;
        handleAnchorLinks(event: Event): void;
        scrollToAnchor(anchorLink: string): void;
      }

      class AnchorScrollMargin extends ViewModule {
        setScrollMargin(): void;
        getScrollMargin(): number;
      }

      class FlexHorizontalScroll extends ViewModule {
        bindEvents(): void;
        onScroll(event: Event): void;
      }

      class Utils extends ViewModule {
        escapeHTML(str: string): string;
        isScrollSnapActive(): boolean;
        getUserTimestamp(date?: Date): string;
      }

      namespace icons {
        class IconsManager extends ViewModule {
          createSvgElement(name: string, options: any): SVGElement;
          createSvgNode(tag: string, options: any): SVGElement;
        }
      }

      namespace lightbox {
        class Lightbox extends ViewModule {
          modal: any;
          setEntranceAnimation(animation: string): void;
          openSlideshow(gallery: any[]): void;
          onSlideChange(): void;
          getModal(): any;
        }
      }

      namespace videoApi {
        class BaseVideoApi extends ViewModule {
          getApiURL(): string;
          getURLRegex(): RegExp;
          isApiLoaded(): boolean;
          getApiObject(): any;
          getVideoIDFromURL(url: string): string | null;
          onApiReady(callback: Function): void;
          getAutoplayURL(videoURL: string): string;
        }

        class YoutubeApi extends BaseVideoApi {
          onYouTubeApiReady(): void;
        }

        class VimeoApi extends BaseVideoApi {
          onVimeoApiReady(): void;
        }
      }
    }

    class Document extends ViewModule {
      $element: JQuery;
      isEdit: boolean;
      getDocumentSettings(setting?: string): any;
      runElementsHandlers(): void;
      onSettingsChange(): void;
    }
  }

  namespace editor {
    class Container extends Module {
      id: string;
      type: string;
      model: any;
      view: any;
      parent?: Container;
      children: Container[];

      isEditable(): boolean;
      getGroupRelatedControls(groupName: string): any[];
      getSetting(key: string): any;
      setSetting(key: string, value: any): void;
      getEditSettings(key?: string): any;
      isStructureEditable(): boolean;
      isContentEditable(): boolean;
      isDesignable(): boolean;
      hasVisualEffects(): boolean;
    }

    class Element extends Container {
      elType: string;
      widgetType?: string;

      getElementUniqueID(): string;
      getElementType(): string;
      getWidgetType(): string;
    }

    class Section extends Container {
      isInner: boolean;
    }

    class Column extends Container {
      getSize(): number;
      updateSize(size: number): void;
    }

    class Widget extends Element {
      controls: object;

      getControlsPointer(): object;
      getControlValue(controlName: string): any;
      setControlValue(controlName: string, value: any): void;
    }

    // ===== Editor Controls System =====
    namespace controls {
      // Base control classes
      class ControlBaseView extends ElementorModules.Module {
        model: any;
        container: Container;
        elementSettingsModel: any; // deprecated
        ui(): object;
        events(): object;
        templateHelpers(): object;
        className(): string;
        behaviors(): object;
        getBehavior(name: string): any;
        getTemplate(): any;
        getControlValue(): any;
        setValue(value: any): void;
        applySavedValue(): void;
        updateElementModel(value: any): void;
        onRender(): void;
        onDestroy(): void;
        saveEditor(): void;
        onBaseInputChange(event: Event): void;
        onBeforeDestroy(): void;
      }

      class ControlBaseDataView extends ControlBaseView {
        validatorTypes: {
          Base: any;
          Number: any;
          Breakpoint: any;
        };
        isFirstClick?: boolean;
        showInput?: boolean;
        disableSearch?: boolean;
        allowMultiple?: boolean;
        onBaseInputTextChange(event: Event): void;
        onBaseInputChange(event: Event): void;
        onResponsiveSwitchersClick(event: Event): void;
        validateSettings(): void;
        onRender(): void;
        onDestroy(): void;
        updateElementModel(value: any): void;
        applySavedValue(): void;
        getGlobalKey(): string;
        getCurrentValue(): any;
        isGlobalActive(): boolean;
        toggleLinkedItems(): void;
      }

      class ControlBaseMultiple extends ControlBaseDataView {
        childView: any;
        childViewContainer: string;
        templateHelpers(): object;
        getChildType(): string;
        getChildView(): any;
        getChildViewOptions(model: any): object;
        updateElementModel(value: any): void;
        onRender(): void;
        onBeforeDestroy(): void;
      }

      class ControlBaseUnits extends ControlBaseDataView {
        currentUnit?: string;
        unitMeasures?: object;
        $controls?: JQuery;
        units?: string[];
        getUnit(): string;
        getDefaultValue(): any;
        updateUnitsChoices(): void;
        onUnitChange(): void;
        onInputChange(): void;
        initUnits(): void;
      }

      // Specific control types
      class BoxShadow extends ControlBaseDataView {
        onColorChanged(): void;
        updateCSSVar(styleItem: any, key: string, value: any): void;
        applyValueFromSettings(): void;
      }

      class Button extends ControlBaseView {
        onButtonClick(event: Event): void;
      }

      class Choose extends ControlBaseDataView {
        applySavedValue(): void;
      }

      class Code extends ControlBaseDataView {
        editor?: any;
        onRender(): void;
        applySavedValue(): void;
        onDestroy(): void;
      }

      class Color extends ControlBaseDataView {
        colorPicker?: any;
        initPicker(): void;
        onPickerChange(): void;
        onPickerClear(): void;
        onAddGlobalButtonClick(): void;
        getCurrentValue(): any;
        reRoute(isEnabled: boolean): void;
        applySavedValue(): void;
        onDestroy(): void;
      }

      class DateTime extends ControlBaseDataView {
        onInputChange(): void;
        onRender(): void;
      }

      class Dimensions extends ControlBaseDataView {
        onInputChange(): void;
        onLinkedInputChange(): void;
        getCurrentValue(): any;
        applySavedValue(): void;
      }

      class Font extends ControlBaseDataView {
        cache?: WeakMap<any, any>;
        childView?: any;
        getStyleId(): string;
        onFontChange(): void;
        enqueueFont(): void;
        onRender(): void;
        onDestroy(): void;
      }

      class Gallery extends ControlBaseDataView {
        attachments?: any;
        library?: any;
        onButtonClick(): void;
        initRemoveDialog(): void;
        onRender(): void;
        applySavedValue(): void;
      }

      class Gaps extends ControlBaseDataView {
        onInputChange(): void;
        getCurrentValue(): any;
        applySavedValue(): void;
      }

      class Hidden extends ControlBaseDataView {}

      class Icon extends ControlBaseDataView {
        onRender(): void;
        onIconPickerSelect(): void;
        getControlValue(): any;
      }

      class Icons extends ControlBaseMultiple {
        childView: any;
        onRender(): void;
        getChildView(): any;
        onIconPickerSelect(): void;
        getControlValue(): any;
        updateElementModel(value: any): void;
      }

      class ImageDimensions extends ControlBaseDataView {
        onApplyImageSize(): void;
        onImageDimensionChange(): void;
        onCustomImageDimensionChange(): void;
        getCurrentValue(): any;
        applySavedValue(): void;
        onRender(): void;
      }

      class Media extends ControlBaseDataView {
        ui(): object;
        events(): object;
        onRender(): void;
        applySavedValue(): void;
        openFrame(view: string): void;
        select(): void;
        onFrameOpen(): void;
        onFrameSelect(): void;
        onFrameClose(): void;
        onRemoveClick(): void;
        onButtonClick(): void;
      }

      class Notice extends ControlBaseView {
        onRender(): void;
      }

      class Number extends ControlBaseDataView {
        onInputChange(): void;
        onRender(): void;
        validateValue(value: any): any;
      }

      class PopoverToggle extends Choose {
        onRender(): void;
        onChildControlValueChange(): void;
        onChooseSelect(): void;
        updatePopoverVisibility(): void;
      }

      class Repeater extends ControlBaseDataView {
        childView?: any;
        templateHelpers(): object;
        getChildView(): any;
        getChildViewOptions(model: any): object;
        updateElementModel(value: any): void;
        onAddButtonClick(): void;
        onSortUpdate(): void;
        onRender(): void;
        onBeforeDestroy(): void;
      }

      class RepeaterRow extends ControlBaseDataView {
        className(): string;
        tagName(): string;
        controlViews?: object;
        onRowDuplicate(): void;
        onRowRemove(): void;
        onRowToggle(): void;
        onRender(): void;
        onDestroy(): void;
      }

      class Section extends ControlBaseView {
        onRender(): void;
      }

      class Select extends ControlBaseDataView {
        onRender(): void;
        onSelectChange(): void;
        applySavedValue(): void;
      }

      class Select2 extends ControlBaseDataView {
        cache?: WeakMap<any, any>;
        getSelect2Placeholder(): string;
        getSelect2Options(): object;
        onRender(): void;
        onDestroy(): void;
      }

      class Slider extends ControlBaseDataView {
        onInputChange(): void;
        onSliderChange(): void;
        resetDimensions(): void;
        onRender(): void;
        onDestroy(): void;
      }

      class Structure extends ControlBaseView {
        currentPreset?: any;
        onPresetSelected(event: Event): void;
        onRender(): void;
      }

      class Switcher extends ControlBaseDataView {
        onSwitcherChange(): void;
        applySavedValue(): void;
      }

      class Tab extends ControlBaseView {
        onRender(): void;
      }

      class URL extends ControlBaseMultiple {
        onRender(): void;
        onInputChange(): void;
        updateElementModel(value: any): void;
      }

      class VisualChoice extends ControlBaseDataView {
        onChoiceSelect(event: Event): void;
        applySavedValue(): void;
      }

      class WpWidget extends ControlBaseDataView {
        onFormUpdate(): void;
        onRender(): void;
        applySavedValue(): void;
      }

      class WYSIWYG extends ControlBaseDataView {
        editor?: any;
        onRender(): void;
        onDestroy(): void;
        applySavedValue(): void;
        getWysiwygValue(): string;
      }

      // Control behaviors
      namespace behaviors {
        class GlobalSettings extends ElementorModules.Module {
          initialize(): void;
          onElementChange(): void;
          updateElementModel(): void;
        }

        class Tags extends ElementorModules.Module {
          initialize(): void;
          onRender(): void;
          onDestroy(): void;
        }
      }
    }

    // ===== Elements System =====
    namespace elements {
      // Element Type Base Classes
      namespace types {
        namespace base {
          class ElementBase extends ElementorModules.Module {
            getType(): string;
            getView(): any;
            getEmptyView(): any;
            getModel(): any;
          }
        }

        class Base extends ElementorModules.Module {
          type: string;
          view: any;
          model: any;
          onCreate(): void;
          onDestroy(): void;
        }

        class Document extends Base {
          getContainer(): Container;
        }

        class Section extends Base {
          isInner: boolean;
          getColumns(): Column[];
        }

        class InnerSection extends Section {}

        class Column extends Base {
          getSize(): number;
          updateSize(size: number): void;
          getParentSection(): Section;
        }

        class Container extends Base {
          isGridContainer(): boolean;
          setGridTemplate(): void;
        }

        class Widget extends Base {
          widgetType: string;
          getControls(): object;
          getControlView(controlName: string): any;
        }
      }

      // Element Models
      namespace models {
        class BaseElementModel extends ElementorModules.Module {
          isValidChild(childModel: any): boolean;
          attributes: any;
          id: string;
          cid: string;
          get(key: string): any;
          set(key: string, value: any): void;
          toJSON(): any;
        }

        class ElementModel extends BaseElementModel {
          elType: string;
          settings: any;
          getContainer(): Container;
          getElementType(): string;
        }

        class Document extends BaseElementModel {
          type: string;
          container: Container;
          isEditable(): boolean;
        }

        class Section extends ElementModel {
          isInner: boolean;
          getColumns(): any[];
        }

        class Column extends ElementModel {
          getSize(): number;
          setSize(size: number): void;
        }

        class Widget extends ElementModel {
          widgetType: string;
          controls: object;
        }

        class Container extends ElementModel {
          gridTemplate: any;
          getGridColumns(): number;
          getGridRows(): number;
        }
      }

      // Element Views
      namespace views {
        class BaseElementView extends ElementorModules.Module {
          model: any;
          container: Container;
          allowRender: boolean;
          toggleEditTools: boolean;
          renderAttributes: object;
          isRendering: boolean;
          tagName: string;
          className(): string;
          attributes(): object;
          ui(): object;
          behaviors(): object;
          getElementUniqueID(): string;
          getID(): string;
          getContainer(): Container;
          getElementType(): string;
          renderElement(): void;
          onRender(): void;
          onDestroy(): void;
        }

        class BaseWidget extends BaseElementView {
          childViewContainer: string;
          getChildView(): any;
          getChildViewOptions(): object;
        }

        class Section extends BaseElementView {
          childView: any;
          addColumn(model: any): void;
          removeColumn(model: any): void;
        }

        class Column extends BaseElementView {
          isEmpty(): boolean;
          getEmptyView(): any;
        }

        class Widget extends BaseWidget {
          widgetType: string;
          getControlsView(): any;
        }

        class Container extends BaseElementView {
          isGridContainer(): boolean;
          renderGrid(): void;
        }

        namespace behaviors {
          class WidgetDraggable extends ElementorModules.Module {
            onStart(): void;
            onStop(): void;
          }

          class WidgetResizable extends ElementorModules.Module {
            onResize(): void;
            onStop(): void;
          }

          class ColumnResizable extends ElementorModules.Module {
            onResize(): void;
            onStop(): void;
            getColumnPercentSize(): number;
          }

          class ContextMenu extends ElementorModules.Module {
            show(event: Event): void;
            hide(): void;
            getContextMenuItems(): any[];
          }

          class InlineEditing extends ElementorModules.Module {
            startEditing(): void;
            stopEditing(): void;
            isEditing(): boolean;
            onKeyDown(event: KeyboardEvent): void;
          }

          class InnerTabs extends ElementorModules.Module {
            activateTab(tabIndex: number): void;
            getActiveTab(): number;
          }

          class Sortable extends ElementorModules.Module {
            onStart(): void;
            onSort(): void;
            onStop(): void;
          }
        }

        namespace container {
          class EmptyView extends ElementorModules.Module {
            tagName: string;
            className: string;
            template(): string;
          }
        }
      }

      // Elements Manager
      class Manager extends ElementorModules.Module {
        elements: { [key: string]: any };
        registerElementType(elementType: string, elementClass: any): void;
        getElementTypes(): object;
        getElementType(elementType: string): any;
        createElement(elementType: string, data: any): any;
        runReadyTrigger(scope: any): void;
      }

      // Element Collections
      namespace collections {
        class Elements extends ElementorModules.Module {
          model: any;
          comparator: string | Function;
          add(model: any): any;
          remove(model: any): void;
          get(id: string): any;
          at(index: number): any;
          length: number;
        }
      }
    }

    // ===== Data Models & Collections =====
    namespace data {
      class Model {
        attributes: any;
        id: string;
        cid: string;
        get(key: string): any;
        set(key: string | object, value?: any): void;
        unset(key: string): void;
        clear(): void;
        toJSON(): any;
        clone(): Model;
        isValid(): boolean;
        validate(): boolean | object;
        on(event: string, callback: Function): void;
        off(event: string, callback?: Function): void;
        trigger(event: string, ...args: any[]): void;
      }

      class Collection {
        model: any;
        models: Model[];
        length: number;
        comparator?: string | Function;
        add(models: Model | Model[]): any;
        remove(models: Model | Model[]): any;
        reset(models?: Model[]): any;
        set(models: Model[]): any;
        get(id: string | number): Model;
        at(index: number): Model;
        where(attributes: object): Model[];
        findWhere(attributes: object): Model;
        pluck(attribute: string): any[];
        sort(): Collection;
        sortBy(attribute: string): Model[];
        toJSON(): any[];
        on(event: string, callback: Function): void;
        off(event: string, callback?: Function): void;
        trigger(event: string, ...args: any[]): void;
      }

      // Backbone Radio Channels
      namespace channels {
        interface Channel {
          on(event: string, callback: Function): void;
          off(event: string, callback?: Function): void;
          trigger(event: string, ...args: any[]): void;
          request(command: string, ...args: any[]): any;
          reply(command: string, callback: Function): void;
          stopReplying(command?: string): void;
        }

        const editor: Channel;
        const data: Channel;
        const panelElements: Channel;
        const dataEditMode: Channel;
        const deviceMode: Channel;
        const templates: Channel;
        const responsivePreview: Channel;
      }
    }

    // ===== Settings & Schemes =====
    namespace settings {
      class Settings extends ElementorModules.Module {
        page: any;
        editorPreferences: any;
        get(key: string): any;
        set(key: string, value: any): void;
        getSettings(): any;
      }

      class Schemes extends ElementorModules.Module {
        color: any;
        typography: any;
        getScheme(type: string): any;
        setScheme(type: string, scheme: any): void;
      }
    }

    // ===== Regions System =====
    namespace regions {
      class BaseRegion extends ElementorModules.Module {
        show(): void;
        hide(): void;
        toggle(): void;
        isVisible(): boolean;
      }

      namespace panel {
        class Component extends $e.modules.ComponentBase {
          currentPageName: string;
          currentPageView: any;
          storage: any;
          setPage(page: string): void;
          getCurrentPageName(): string;
          getCurrentPageView(): any;
        }

        namespace commands {
          class Publish extends $e.modules.CommandBase {
            apply(): Promise<any>;
          }

          class Save extends $e.modules.CommandBase {
            apply(): Promise<any>;
          }

          class ChangeDeviceMode extends $e.modules.CommandBase {
            apply(args: { device: string }): void;
          }

          class PageSettings extends $e.modules.CommandBase {
            apply(): void;
          }

          class Close extends $e.modules.CommandBase {
            apply(): void;
          }

          class Exit extends $e.modules.CommandBase {
            apply(): void;
          }

          class Toggle extends $e.modules.CommandBase {
            apply(): void;
          }

          class EditorPreferences extends $e.modules.CommandBase {
            apply(): void;
          }
        }

        namespace pages {
          namespace editor {
            class Component extends $e.modules.ComponentBase {
              view: any;
              show(): void;
              hide(): void;
            }
          }
        }
      }

      namespace navigator {
        class Navigator extends BaseRegion {
          indicators: any[];
          isOpen(): boolean;
          setStructureCustomized(elementView: any): void;
          getIndicators(): any[];
          addIndicator(id: string, options: object): void;
        }
      }

      namespace responsiveBar {
        class ResponsiveBar extends BaseRegion {
          currentDeviceMode: string;
          switchDevice(device: string): void;
          getDevices(): string[];
          getActiveBreakpoint(): string;
        }
      }
    }

    // ===== Editor Components System =====
    namespace components {
      // Browser Import System
      namespace browserImport {
        class Manager extends $e.modules.editor.utils.Module {
          readers: { [key: string]: any };
          parsers: { [key: string]: any };
          normalizer: Normalizer;
          parseConfig(config: any): void;
          registerReader(reader: any): void;
          registerParser(parser: any): void;
          import(files: FileList | File[]): Promise<any>;
          validate(args: any): Promise<boolean>;
        }

        class Normalizer extends ElementorModules.Module {
          manager: Manager;
          normalize(data: any): any;
        }

        class Component extends $e.modules.ComponentBase {
          manager: Manager;
        }

        namespace files {
          class FileReaderBase extends ElementorModules.Module {
            static getName(): string;
            static get mimeTypes(): string[];
            read(file: File): Promise<any>;
          }

          class FileParserBase extends ElementorModules.Module {
            static getName(): string;
            parse(data: any): Promise<any>;
            validate(data: any): boolean;
          }

          namespace readers {
            class Image extends FileReaderBase {}
            class Video extends FileReaderBase {}
            class Json extends FileReaderBase {}
          }

          namespace parsers {
            class MediaParser extends FileParserBase {
              extractWidgetData(data: any): any;
            }

            namespace image {
              class Widget extends MediaParser {}
            }

            namespace video {
              class Widget extends MediaParser {}
            }

            namespace json {
              class Elements extends FileParserBase {}
            }
          }
        }

        namespace commands {
          class Import extends $e.modules.CommandBase {
            apply(args: { files: FileList | File[] }): Promise<any>;
          }

          namespace internal {
            class Validate extends $e.modules.CommandBase {
              apply(args: any): Promise<boolean>;
            }
          }
        }
      }

      // Documents System
      namespace documents {
        class Component extends $e.modules.ComponentBase {
          documents: { [id: string]: Document };
          getCurrent(): Document;
          create(type: string, options: any): Document;
          open(id: string): Promise<Document>;
          close(id: string): void;
          save(id: string): Promise<any>;
        }

        class Document extends ElementorModules.Module {
          id: string;
          type: string;
          container: Container;
          config: any;
          $element: JQuery;
          editor: Editor;
          getTitle(): string;
          getContainer(): Container;
          save(): Promise<any>;
          close(): void;
          isEditable(): boolean;
        }

        class Editor extends ElementorModules.Module {
          document: Document;
          isChanged: boolean;
          status: string;
          getStatus(): string;
          setStatus(status: string): void;
          save(): Promise<any>;
        }

        namespace commands {
          class Open extends $e.modules.CommandBase {
            apply(args: { id: string; type?: string }): Promise<Document>;
          }

          class Close extends $e.modules.CommandBase {
            apply(args: { id: string }): void;
          }

          class Preview extends $e.modules.CommandBase {
            apply(args: { id: string }): void;
          }

          class View extends $e.modules.CommandBase {
            apply(args: { id: string }): void;
          }

          namespace internal {
            class AttachPreview extends $e.modules.CommandInternalBase {
              apply(args: any): void;
            }

            class Unload extends $e.modules.CommandInternalBase {
              apply(args: { document: Document }): void;
            }
          }
        }
      }

      // Dynamic Tags System
      namespace dynamicTags {
        class Component extends $e.modules.ComponentBase {
          tags: { [key: string]: any };
          getConfig(tagName?: string): any;
          getTags(format?: string): any;
          getTag(id: string): any;
          registerTag(id: string, tag: any): void;
          createTag(tagID: string, data: object): any;
          parseTagsText(
            text: string,
            settings?: object,
            parseCallback?: Function
          ): any;
          cleanCache(): void;
        }

        class TagView extends ElementorModules.Module {
          model: any;
          render(): void;
          destroy(): void;
        }
      }

      // Hotkeys System
      namespace hotkeys {
        class Component extends $e.modules.ComponentBase {
          shortcuts: { [key: string]: any };
          register(shortcut: string, callback: Function): void;
          unregister(shortcut: string): void;
          handle(event: KeyboardEvent): boolean;
        }
      }

      // Icons Manager System
      namespace iconsManager {
        class Component extends $e.modules.ComponentBase {
          libraries: { [key: string]: any };
          enqueueIconFonts(iconType: string): void;
          getIconLibraries(): object;
          registerIconLibrary(libraryName: string, config: object): void;
          renderIcon(icon: object, attributes?: object, tag?: string): string;
        }

        class IconsManager extends ElementorModules.Module {
          tabs: { [key: string]: any };
          currentTab: string;
          modal: any;
          show(): void;
          hide(): void;
          setCurrentTab(tabName: string): void;
        }
      }

      // Preview System
      namespace preview {
        class Component extends $e.modules.ComponentBase {
          iframe: HTMLIFrameElement;
          window: Window;
          document: Document;
          reload(): void;
          refresh(): void;
          getCurrentUrl(): string;
        }

        namespace commands {
          class Drop extends $e.modules.editor.CommandContainerBase {
            apply(args: any): void;
          }

          class Reload extends $e.modules.CommandBase {
            apply(): void;
          }
        }
      }

      // Selection System
      namespace selection {
        class Component extends $e.modules.ComponentBase {
          selected: Container[];
          select(container: Container): void;
          unselect(container: Container): void;
          clear(): void;
          getSelected(): Container[];
          isSelected(container: Container): boolean;
        }
      }

      // Settings System
      namespace settings {
        class Component extends $e.modules.ComponentBase {
          pages: { [key: string]: any };
          getCurrentPage(): any;
          setPage(page: string): void;
        }
      }

      // Template Library System
      namespace templateLibrary {
        class Component extends $e.modules.ComponentBase {
          manager: any;
          layout: any;
          showModal(): void;
          hideModal(): void;
          getFilter(name: string): any;
          setFilter(name: string, value: any): void;
          importTemplate(templateData: object): Promise<any>;
          saveTemplate(data: object): Promise<any>;
        }
      }

      // Validator System
      namespace validator {
        class Component extends $e.modules.ComponentBase {
          validators: { [key: string]: any };
          validate(value: any, validationTerms: object): boolean;
          addValidationMethod(methodName: string, method: Function): void;
        }

        class BreakpointValidator extends ElementorModules.Module {
          validate(value: any): boolean;
          getErrorMessage(): string;
        }

        class NumberValidator extends ElementorModules.Module {
          validate(value: any): boolean;
          getErrorMessage(): string;
        }
      }
    }

    // ===== Editor Views System =====
    namespace views {
      class BaseContainer extends ElementorModules.Module {
        childView: any;
        childViewContainer: string;
        collection: any;
        addChildView(view: any): void;
        removeChildView(view: any): void;
        isEmpty(): boolean;
        getEmptyView(): any;
      }

      class BaseSectionsContainer extends BaseContainer {
        template: any;
        addSection(model: any): void;
        removeSection(model: any): void;
      }

      class ControlsStack extends ElementorModules.Module {
        controlsView: any;
        addControlView(controlView: any): void;
        removeControlView(controlView: any): void;
        getControlView(controlName: string): any;
      }

      class Preview extends ElementorModules.Module {
        iframe: HTMLIFrameElement;
        window: Window;
        document: Document;
        refresh(): void;
        getCurrentUrl(): string;
      }

      namespace addSection {
        class BaseAddSectionView extends ElementorModules.Module {
          template: any;
          addSection(): void;
          onAddSection(): void;
        }

        class AddSectionView extends BaseAddSectionView {
          isInline: boolean;
        }

        class IndependentAddSectionView extends BaseAddSectionView {
          isIndependent: boolean;
        }
      }
    }

    // ===== Editor Utils System =====
    namespace utils {
      class ControlsCSSParser extends ElementorModules.Module {
        parseCSS(css: string): object;
        addStyleRules(styleRules: object): void;
      }
    }

    // ===== Document System =====
    namespace document {
      // Base command classes
      class CommandBase extends $e.modules.CommandBase {
        document: any;
        initialize(args: any): void;
      }

      class CommandHistoryBase extends $e.modules.editor.CommandContainerBase {
        document: any;
        getHistory(args: any): {
          containers: any[];
          type: string;
          subTitle: string;
        };
        initialize(args: any): void;
      }

      class CommandInternalBase extends $e.modules.CommandInternalBase {
        document: any;
        initialize(args: any): void;
      }

      // Save commands namespace
      namespace save {
        class Base extends CommandBase {
          status: string;
          shouldSave(args: any): boolean;
          prepareSaveData(args: any): any;
        }

        class Auto extends Base {
          apply(args: any): Promise<any>;
        }

        class Draft extends Base {
          apply(args: any): Promise<any>;
        }

        class Discard extends Base {
          apply(args: any): Promise<any>;
        }

        class Pending extends Base {
          apply(args: any): Promise<any>;
        }

        class Update extends Base {
          apply(args: any): Promise<any>;
        }

        class Default extends Base {
          apply(args: any): Promise<any>;
        }

        namespace internal {
          class SetIsModified extends CommandInternalBase {
            apply(args: { isModified: boolean }): void;
          }

          class Save extends CommandInternalBase {
            apply(args: any): Promise<any>;
          }
        }

        class Component extends $e.modules.ComponentBase {
          namespace: string;
          defaultSaveType: string;
          save(type?: string, options?: any): Promise<any>;
          isSaveEnabled(): boolean;
          setSaveEnabled(enabled: boolean): void;
        }
      }

      // Repeater commands namespace
      namespace repeater {
        class Move extends CommandHistoryBase {
          apply(args: {
            container: any;
            name: string;
            sourceIndex: number;
            targetIndex: number;
            containers?: any[];
          }): any;
        }

        class Duplicate extends CommandHistoryBase {
          apply(args: {
            container: any;
            name: string;
            index: number;
            containers?: any[];
          }): any;
        }

        class Remove extends CommandHistoryBase {
          apply(args: {
            container: any;
            name: string;
            index: number;
            containers?: any[];
          }): any;
        }

        class Select extends CommandHistoryBase {
          apply(args: { container: any; name: string; index: number }): void;
        }

        class Insert extends CommandHistoryBase {
          apply(args: {
            container: any;
            name: string;
            model: any;
            options?: { at?: number };
          }): any;
        }

        class Component extends $e.modules.ComponentBase {
          namespace: string;
        }
      }

      // UI states and globals
      namespace ui {
        class Component extends $e.modules.ComponentBase {
          states: { [key: string]: any };
          setState(state: string, value: any): void;
          getState(state: string): any;
        }
      }

      namespace globals {
        class Component extends $e.modules.ComponentBase {
          data: { [key: string]: any };
          get(key: string): any;
          set(key: string, value: any): void;
          delete(key: string): void;
        }

        namespace colors {
          class Component extends $e.modules.ComponentBase {
            namespace: string;
          }

          namespace commands {
            class Create extends $e.modules.editor.CommandContainerBase {
              apply(args: any): any;
            }
          }
        }

        namespace typography {
          class Component extends $e.modules.ComponentBase {
            namespace: string;
          }

          namespace commands {
            class Create extends $e.modules.editor.CommandContainerBase {
              apply(args: any): any;
            }
          }
        }

        namespace commands {
          namespace data {
            class Colors extends $e.modules.CommandData {
              apply(args: any): any;
            }

            class Typography extends $e.modules.CommandData {
              apply(args: any): any;
            }

            class Index extends $e.modules.CommandData {
              apply(args: any): any;
            }
          }
        }
      }

      // History system
      namespace history {
        class Component extends $e.modules.ComponentBase {
          items: any[];
          currentIndex: number;
          startTransaction(title: string): void;
          endTransaction(): void;
          addItem(item: any): void;
          undo(): void;
          redo(): void;
          canUndo(): boolean;
          canRedo(): boolean;
          clear(): void;
        }
      }

      // Hooks system
      namespace hooks {
        class Component extends $e.modules.ComponentBase {
          hooks: { [key: string]: Function[] };
          addAction(
            action: string,
            callback: Function,
            priority?: number
          ): void;
          removeAction(action: string, callback: Function): void;
          doAction(action: string, ...args: any[]): void;
          addFilter(
            filter: string,
            callback: Function,
            priority?: number
          ): void;
          removeFilter(filter: string, callback: Function): void;
          applyFilters(filter: string, value: any, ...args: any[]): any;
        }
      }
    }

    // ===== Editor Infrastructure =====
    class EditorBase extends ElementorModules.Module {
      widgetsCache: { [key: string]: any };
      config: any;
      loaded: boolean;
      elementsManager: any;
      documents: any;
      schemes: any;
      heartbeat: any;
      ajax: any;

      init(): void;
      start(): void;
      initComponents(): void;
      bindEvents(): void;
      getElementsDefaultArgs(): any;
      loadingView: any;
      getRegion(name: string): any;
    }

    class Editor extends EditorBase {
      getContainer(): Container;
      isChanged(): boolean;
      saved(): void;
      getModel(): any;
    }

    namespace views {
      class ControlsPopover extends ElementorModules.Module {
        currentControl: any;
        isOpen: boolean;
        show(controlView: any): void;
        hide(): void;
        toggle(controlView: any): void;
        position(): void;
        onRender(): void;
        onDestroy(): void;
      }
    }

    namespace introductionTooltips {
      class Manager extends ElementorModules.Module {
        tooltips: { [key: string]: any };
        show(tooltipId: string): void;
        hide(tooltipId: string): void;
        register(tooltipId: string, tooltip: any): void;
        hasViewed(tooltipId: string): boolean;
        markAsViewed(tooltipId: string): void;
      }

      class GlobalColorIntroduction extends ElementorModules.Module {
        show(): void;
        hide(): void;
      }

      class GlobalFontIntroduction extends ElementorModules.Module {
        show(): void;
        hide(): void;
      }
    }

    namespace errors {
      class ElementTypeNotFound extends Error {
        constructor(message: string);
      }
    }

    namespace utils {
      class Module extends ElementorModules.Module {}

      class Promotion extends ElementorModules.Module {
        showDialog(options: any): void;
        hideDialog(): void;
      }

      class NoticeBar extends ElementorModules.Module {
        show(message: string, type?: string): void;
        hide(): void;
      }

      class ControlConditions extends ElementorModules.Module {
        check(condition: any, values: any): boolean;
      }

      class FontVariables extends ElementorModules.Module {
        generateCSS(): string;
      }
    }
  }

  // ===== Admin System =====
  namespace admin {
    class BetaTesterModule extends ElementorModules.ViewModule {
      layout: any;
      show(): void;
      hide(): void;
      toggle(): void;
    }

    class BetaTesterView extends ElementorModules.Module {
      render(): void;
      destroy(): void;
    }

    class BetaTesterLayout extends ElementorModules.Module {
      show(): void;
      hide(): void;
    }

    class MenuHandler extends ElementorModules.ViewModule {
      initialize(): void;
      bindEvents(): void;
    }

    namespace floatingElements {
      class Layout extends ElementorModules.Module {
        show(): void;
        hide(): void;
      }

      class NewFloatingElements extends ElementorModules.Module {
        show(): void;
        hide(): void;
      }

      class View extends ElementorModules.Module {
        render(): void;
        destroy(): void;
      }
    }

    namespace newTemplate {
      class Layout extends ElementorModules.Module {
        show(): void;
        hide(): void;
      }

      class NewTemplate extends ElementorModules.Module {
        create(type: string): void;
      }

      class TemplateControls extends ElementorModules.Module {
        render(): void;
      }

      class View extends ElementorModules.Module {
        render(): void;
        destroy(): void;
      }
    }
  }

  // ===== Utils System =====
  namespace utils {
    class Events extends ElementorModules.Module {
      dispatch(context: HTMLElement | JQuery, event: string, data?: any): void;
    }

    class Hooks extends ElementorModules.Module {
      actions: { [key: string]: Function[] };
      filters: { [key: string]: Function[] };
      addAction(action: string, callback: Function, priority?: number): void;
      removeAction(action: string, callback: Function): void;
      doAction(action: string, ...args: any[]): void;
      addFilter(filter: string, callback: Function, priority?: number): void;
      removeFilter(filter: string, callback: Function): void;
      applyFilters(filter: string, value: any, ...args: any[]): any;
    }

    class Breakpoints extends ElementorModules.Module {
      activeBreakpoints: { [key: string]: any };
      getActiveBreakpointsList(): string[];
      getBreakpointValues(): number[];
      getDesktopMinPoint(): number;
    }

    class React extends ElementorModules.Module {
      render(component: any, element: HTMLElement): void;
      unmount(element: HTMLElement): void;
    }

    class Time extends ElementorModules.Module {
      getUserTimestamp(date?: Date): string;
      formatTime(timestamp: number): string;
    }

    class Notifications extends ElementorModules.Module {
      showToast(options: {
        message: string;
        type?: "info" | "success" | "warning" | "error";
        duration?: number;
      }): void;
    }

    class Introduction extends ElementorModules.Module {
      show(introductionId: string): void;
      hide(introductionId: string): void;
      hasViewed(introductionId: string): boolean;
      markAsViewed(introductionId: string): void;
    }

    class JsonUploadWarningMessage extends ElementorModules.Module {
      show(message: string): void;
      hide(): void;
    }

    class Tiers extends ElementorModules.Module {
      TIERS: {
        free: string;
        essential: string;
        advanced: string;
        expert: string;
        agency: string;
      };
      isTierAtLeast(currentTier: string, expectedTier: string): boolean;
    }
  }

  // Export ForceMethodImplementation function - remove the function declaration
}

// ===== Editor Command System Types =====
declare namespace $e {
  namespace modules {
    class CommandBase extends ElementorModules.Module {
      validateArgs(args?: object): void;
      requireArgument(property: string, args?: object): void;
      requireArgumentType(property: string, type: string, args?: object): void;
      requireArgumentInstance(
        property: string,
        instance: any,
        args?: object
      ): void;
      requireArgumentConstructor(
        property: string,
        type: any,
        args?: object
      ): void;
      apply(args: object): any;
      run?(args: object): any;
    }

    class CommandContainerBase extends CommandBase {
      requireContainer(args?: object): void;
    }

    class CommandContainerInternalBase extends CommandContainerBase {}

    class ComponentBase extends BaseComponent {
      manager?: any;
    }

    class CommandInternalBase extends CommandBase {}

    class CommandData extends CommandBase {}

    namespace editor {
      class CommandContainerBase extends $e.modules.CommandContainerBase {}
      class CommandHistoryBase extends CommandContainerBase {}
      class CommandInternalBase extends $e.modules.CommandInternalBase {}

      namespace utils {
        class Module extends ElementorModules.Module {}
      }
    }

    class BaseComponent extends ElementorModules.Module {
      namespace: string;
      tabs: object;
      routes: object;
      commands: object;
      shortcuts: object;

      registerAPI(): void;
      registerCommands(): void;
      registerRoutes(): void;
      registerShortcuts(): void;
      registerTabs(): void;
      getNamespace(): string;
      getRootContainer(): any;
    }
  }

  interface ComponentRegistry {
    register(component: modules.BaseComponent): void;
    get(id: string): modules.BaseComponent;
  }

  var components: ComponentRegistry;

  interface Route {
    callback(args: object): void;
    isValidContainer(container: any): boolean;
  }

  function route(route: string, args?: object): void;
  function run(command: string, args?: object): any;
  function runShortcut(command: string, event?: Event): any;
}

// ===== Dynamic Tags Types =====
export interface DynamicTags {
  tagTextEditor: any;
  tagDataEditor: any;

  getConfig(tagName?: string): any;
  getTags(format?: string): any;
  getTag(id: string): any;
  registerTag(id: string, tag: any): void;

  createTag(tagID: string, data: object): any;
  parseTagsText(text: string, settings?: object, parseCallback?: Function): any;
  cleanCache(): void;
}

// ===== Template Library Types =====
export interface TemplateLibrary {
  manager: {
    getTemplates(): any[];
    deleteTemplate(template: any): void;
    importTemplate(templateData: object): Promise<any>;
    saveTemplate(data: object): Promise<any>;
    getTemplateContent(templateID: string): Promise<any>;
    loadTemplates(): Promise<void>;
  };

  layout: any;

  showModal(): void;
  hideModal(): void;
  getFilter(name: string): any;
  setFilter(name: string, value: any): void;
}

// ===== History Manager Types =====
export interface HistoryManager {
  startHistoryTransaction(title: string): void;
  endHistoryTransaction(): void;
  doItem(index: number): void;
  undoItem(): void;
  redoItem(): void;
  getItems(): any[];
  getCurrentId(): number;
  navigate(to: boolean): void;
  canUndo(): boolean;
  canRedo(): boolean;
}

// ===== Panel and UI Types =====
export interface Panel {
  storage: {
    get(key: string): any;
    set(key: string, value: any): void;
    remove(key: string): void;
  };

  getCurrentPageName(): string;
  getCurrentPageView(): any;
  setPage(page: string): void;
  changeTab(tab: string): void;
  blockUser(): void;
  unblockUser(): void;
  isOpen(): boolean;
  toggle(): void;
}

export interface Navigator {
  open(): void;
  close(): void;
  toggle(): void;
  isOpen(): boolean;
  setStructureCustomized(elementView: any): void;
  getIndicators(): any[];
  addIndicator(id: string, options: object): void;
}

export interface ResponsiveBar {
  currentDeviceMode: string;
  switchDevice(device: string): void;
  getDevices(): string[];
  getActiveBreakpoint(): string;
  getDevicesList(): object[];
}

// ===== Notifications and Tooltips Types =====
export interface Notifications {
  showToast(options: {
    message: string;
    type?: "info" | "success" | "warning" | "error";
    duration?: number;
    buttons?: Array<{
      text: string;
      callback: Function;
      type?: string;
    }>;
  }): void;
}

export interface IntroductionTooltips {
  show(id: string): void;
  hide(id: string): void;
  register(id: string, config: object): void;
  hasViewed(id: string): boolean;
  markAsViewed(id: string): void;
  getTooltips(): object;
}

// ===== Validator and Globals Types =====
export interface Validator {
  validate(value: any, validationTerms: object): boolean;
  getErrorMessage(): string;
  normalizeValidationTerms(validationTerms: any): object;
  addValidationMethod(methodName: string, method: Function): void;
}

export interface ElementorGlobals {
  typography: object;
  colors: object;

  get(id: string): any;
  set(id: string, value: any): void;
  getAll(): object;
  update(id: string, value: any): void;
}

// ===== Extended Icons Manager Types =====
export interface ElementorIconsManager extends IconsManager {
  enqueueIconFonts(iconType: string): void;
  getIconLibraries(): object;
  registerIconLibrary(libraryName: string, config: object): void;
  renderIcon(icon: object, attributes?: object, tag?: string): string;
  renderUploadedSVG(value: object, attributes?: object, tag?: string): string;
  isIconLibraryLoaded(libraryName: string): boolean;
  loadIconLibrary(libraryName: string): Promise<void>;
}

// ===== Frontend Types =====
export interface ElementorFrontendConfig {
  environmentMode: {
    edit: boolean;
    wpPreview: boolean;
    isScriptDebug: boolean;
  };
  is_rtl: boolean;
  breakpoints: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  responsive: {
    breakpoints: {
      [key: string]: {
        label: string;
        value: number;
        default_value: number;
        direction: "min" | "max";
        is_enabled: boolean;
      };
    };
    activeBreakpoints: {
      [key: string]: {
        label: string;
        value: number;
        default_value: number;
        direction: "min" | "max";
        is_enabled: boolean;
      };
    };
    hasCustomBreakpoints?: boolean;
  };
  version: string;
  is_static: boolean;
  legacyMode: {
    elementWrappers: boolean;
  };
  urls: {
    assets: string;
    rest: string;
    uploadUrl: string;
  };
  settings: {
    page: {
      [key: string]: any;
    };
    editorPreferences?: {
      [key: string]: any;
    };
  };
  kit: {
    [key: string]: any;
  };
  elements: {
    data: {
      [modelCID: string]: {
        id: string;
        elType: string;
        widgetType?: string;
        settings: object;
        attributes: {
          [key: string]: any;
        };
      };
    };
  };
  i18n: {
    [key: string]: string;
  } & {
    a11yCarouselPrevSlideMessage?: string;
    a11yCarouselNextSlideMessage?: string;
    a11yCarouselFirstSlideMessage?: string;
    a11yCarouselLastSlideMessage?: string;
  };
  experimentalFeatures: {
    e_font_icon_svg?: boolean;
    container?: boolean;
    "nested-elements"?: boolean;
    [key: string]: boolean | undefined;
  };
}

export interface ElementorFrontend {
  config: ElementorFrontendConfig;
  elements: {
    window: Window;
    $window: JQuery<Window>;
    $document: JQuery<Document>;
    $head: JQuery<HTMLHeadElement>;
    $body: JQuery<HTMLBodyElement>;
    $deviceMode: JQuery;
    $wpAdminBar?: JQuery;
  };
  breakpoints: ElementorBreakpoints;
  utils: {
    lightbox: Promise<any>;
    swiper: typeof Swiper;
    assetsLoader: AssetsLoader;
    controls: Controls;
    vimeo: VideoLoader;
    youtube: VideoLoader;
    anchors: any;
    events: Events;
    urlActions: UrlActions;
  };
  hooks: {
    addAction(
      action: string,
      callback: Function,
      priority?: number,
      context?: any
    ): void;
    doAction(action: string, ...args: any[]): void;
    removeAction(action: string, callback?: Function): void;
    addFilter(
      filter: string,
      callback: Function,
      priority?: number,
      context?: any
    ): void;
    applyFilters(filter: string, value: any, ...args: any[]): any;
  };
  elementsHandler: ElementsHandler;
  documentsManager: DocumentsManager;

  init(): void;
  isEditMode(): boolean;
  isWPPreviewMode(): boolean;
  getCurrentDeviceMode(): string;
  getCurrentDeviceSetting(settings: object, settingKey: string): any;
  getDeviceSetting(
    deviceMode: string,
    settings: object,
    settingKey: string
  ): any;
  getKitSettings(settingName?: string): any;
  getPageSettings(settingName?: string): any;
  getGeneralSettings(settingName?: string): any;
  addListenerOnce(
    listenerID: string,
    event: string,
    callback: Function,
    to?: any
  ): void;
  removeListeners(
    listenerID: string,
    event: string,
    callback?: Function,
    from?: any
  ): void;
  debounce(func: Function, wait: number): Function;

  on(eventName: string, callback: Function): void;
  off(eventName: string, callback?: Function): void;
  trigger(eventName: string, ...args: any[]): void;
}

// ===== Handler Types =====
export interface HandlerOptions {
  $element: JQuery;
  elementName?: string;
  model?: any;
}

export interface ElementsHandler {
  addHandler(
    HandlerClass: typeof ElementorModules.frontend.handlers.Base,
    options: HandlerOptions
  ): void;
  attachHandler(elementName: string, Handlers: any, skin?: string): void;
  getHandler(
    handlerName: string
  ): Promise<typeof ElementorModules.frontend.handlers.Base>;
  getHandlers(handlerName?: string): any;
  runReadyTrigger(scope: HTMLElement | JQuery): void;
  init(): void;
  elementsHandlers: {
    [key: string]: any;
  };
}

export interface DocumentsManager extends ElementorModules.ViewModule {
  documents: {
    [documentId: string]: ElementorModules.frontend.Document;
  };
  documentClasses: {
    [documentType: string]: typeof ElementorModules.frontend.Document;
  };
  initDocumentClasses(): void;
  addDocumentClass(
    documentType: string,
    documentClass: typeof ElementorModules.frontend.Document
  ): void;
  attachDocumentsClasses(): void;
  attachDocumentClass($document: JQuery): void;
}

// ===== Utility Types =====
export interface ElementorBreakpoints {
  responsiveConfig: ElementorFrontendConfig["responsive"];
  getActiveBreakpointsList(args?: {
    largeToSmall?: boolean;
    withDesktop?: boolean;
  }): string[];
  getBreakpointValues(): number[];
  getDesktopPreviousDeviceKey(): string;
  getDesktopMinPoint(): number;
  getDeviceMinBreakpoint(device: string): number;
  getActiveMatchRegex(): RegExp;
}

export interface AssetsLoader {
  load(type: "script" | "style", key: string): Promise<boolean>;
  getScriptElement(src: string): HTMLScriptElement;
  getStyleElement(src: string): HTMLLinkElement;
  loadAsset(assetData: any, assetType: string): Promise<boolean>;
  isAssetLoaded(assetData: any, assetType: string): boolean;
  appendAsset(assetData: any, element: HTMLElement): void;
}

export interface Controls {
  getControlValue(
    controlSettings: object,
    controlKey: string,
    controlSubKey?: string
  ): any;
  getResponsiveControlValue(
    controlSettings: object,
    controlKey: string,
    controlSubKey?: string,
    device?: string | null
  ): any;
}

export interface VideoLoader {
  getApiURL(): string;
  getURLRegex(): RegExp;
  isApiLoaded(): boolean;
  getApiObject(): any;
  getVideoIDFromURL(url: string): string | null;
  onApiReady(callback: Function): void;
  getAutoplayURL(videoURL: string): string;
}

export interface UrlActions extends ElementorModules.ViewModule {
  actions: {
    [actionName: string]: (settings: any, ...args: any[]) => void;
  };
  addAction(name: string, callback: Function): void;
  runAction(url: string, ...restArgs: any[]): void;
  runLinkAction(event: Event): void;
  runHashAction(): void;
  createActionHash(action: string, settings: object): string;
}

export interface Events {
  dispatch(
    context: HTMLElement | JQuery,
    event: string,
    data?: any,
    bcEvent?: string | null
  ): void;
}

// ===== Editor Types =====
export interface ElementorEditor {
  config: {
    document: {
      container: string;
      id: string;
      type: string;
    };
    user: {
      introduction: {
        [key: string]: boolean;
      };
    };
    additional_shapes?: {
      [shapeType: string]: string;
    };
  };
  settings: {
    page: {
      model: {
        attributes: {
          [key: string]: any;
        };
        on(event: string, callback: Function): void;
      };
    };
  };
  channels: {
    editor: {
      on(event: string, callback: Function): void;
      off(event: string, callback: Function): void;
      trigger(event: string, ...args: any[]): void;
    };
    data: {
      on(event: string, callback: Function): void;
      off(event: string, callback: Function): void;
      trigger(event: string, ...args: any[]): void;
    };
  };
  documents: {
    currentDocument: {
      id: string;
      container: {
        isEditable(): boolean;
      };
    };
    getCurrent(): any;
  };
  $previewContents: JQuery;

  // Panel and UI Components
  panel: Panel;
  navigator: Navigator;
  responsiveBar: ResponsiveBar;

  // History and Undo/Redo
  history: HistoryManager;

  // Template Library
  templates: TemplateLibrary;

  // Dynamic Tags
  dynamicTags: DynamicTags;

  // Notifications and Tooltips
  notifications: Notifications;
  introduction: IntroductionTooltips;

  // Validator and Globals
  validator: Validator;
  globals: ElementorGlobals;

  // Icons Manager
  iconsManager: ElementorIconsManager;

  // Methods
  getPreferences(key: string): any;
  setPreferences(key: string, value: any): void;
  isPreviewMode(): boolean;
  reloadPreview(): void;
  saveDocument(): Promise<any>;
  loadDocument(): Promise<any>;

  on(event: string, callback: Function): void;
  off(event: string, callback: Function): void;
}

// ===== Utils Types =====
export interface ElementorUtils {
  escapeHTML(str: string): string;
  isScrollSnapActive(): boolean;
  getUserTimestamp(date?: Date): string;
}

export interface ElementorTiers {
  TIERS: Readonly<{
    free: string;
    essential: string;
    "essential-oct2023": string;
    advanced: string;
    expert: string;
    agency: string;
  }>;
  TIERS_PRIORITY: ReadonlyArray<string>;
  isTierAtLeast(currentTier: string, expectedTier: string): boolean;
}

export interface IconsManager {
  prefix: string;
  createSvgElement(
    name: string,
    options: { path: string; width: number; height: number }
  ): SVGElement;
  createSvgNode(
    tag: string,
    options: { props?: object; attrs?: object }
  ): SVGElement;
  createSvgIconElement(options: {
    iconName: string;
    iconSelector: string;
  }): SVGElement;
  createSvgSymbolsContainer(): void;
  createSymbolElement(options: {
    id: string;
    path: string;
    width: number;
    height: number;
  }): SVGElement;
}

// ===== Global Declarations =====
declare global {
  interface Window {
    elementor: ElementorEditor;
    elementorFrontend: ElementorFrontend;
    elementorModules: typeof ElementorModules;
    $e: typeof $e;
    elementorCommon: {
      ajax: {
        addRequest(
          action: string,
          options: {
            data?: object;
            success?: Function;
            error?: Function;
          }
        ): void;
      };
      dialogsManager: {
        createWidget(type: string, options: object): any;
      };
    };
    elementorDevTools: {
      deprecation: {
        deprecated(oldMethod: string, version: string, newMethod: string): void;
      };
    };
    jQuery: JQueryStatic;
    Swiper: typeof Swiper;
    YT?: {
      Player: any;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
      loaded: boolean;
    };
    Vimeo?: {
      Player: any;
    };
    wp?: {
      mediaelement: {
        initialize(): void;
      };
    };
    screenfull?: {
      isEnabled: boolean;
      isFullscreen: boolean;
      element?: HTMLElement;
      request(element?: HTMLElement): Promise<void>;
      exit(): Promise<void>;
      toggle(element?: HTMLElement): Promise<void>;
      on(event: string, callback: Function): void;
      off(event: string, callback: Function): void;
    };
  }

  const elementorFrontendConfig: ElementorFrontendConfig;

  function __(text: string, domain?: string): string;
}

// Export the ElementorModules namespace
export { ElementorModules };

// Re-export Swiper types for convenience
export type { Swiper, SwiperOptions };
