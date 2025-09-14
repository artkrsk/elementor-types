/**
 * Editor Controls Index
 * Barrel export for all control system types
 */

export * from "./base";
export * from "./simple";
export * from "./behaviors";
export * from "./validation";
export * from "./groups";
export * from "./conditions";
export * from "./factory";

// Export layout controls with explicit naming to avoid conflicts
export {
	DimensionsControl,
	SliderControl,
	GapsControl,
	BoxShadowControl,
	BorderControl,
	StructureControl,
	PositionControl,
	TransformControl
} from "./layout";

// Export advanced controls with explicit naming to avoid conflicts
export {
	RepeaterControl,
	RepeaterRowControl,
	FontControl,
	WPWidgetControl,
	DateTimeControl,
	PopoverToggleControl,
	VisualChoiceControl,
	TaxonomyControl,
	PostSelectControl
} from "./advanced";

// Export window controls with prefixed naming to avoid conflicts
export {
	ElementorWindowControls,
	ControlBase as WindowControlBase,
	ControlBaseData as WindowControlBaseData,
	ColorControl as WindowColorControl,
	MediaControl as WindowMediaControl,
	DimensionsControl as WindowDimensionsControl,
	NumberControl as WindowNumberControl,
	SelectControl as WindowSelectControl,
	SwitcherControl as WindowSwitcherControl,
	RepeaterControl as WindowRepeaterControl,
	UrlControl as WindowUrlControl
} from "./window-controls";

// Export input controls with specific naming to avoid conflicts
export {
	TextControl,
	NumberControl as InputNumberControl,
	TextareaControl,
	UrlControl as InputUrlControl,
	EmailControl,
	PasswordControl,
	RangeControl,
	DateTimeControl as InputDateTimeControl,
	SearchControl
} from "./input";

// Export visual controls with specific naming to avoid conflicts
export {
	ColorControl as VisualColorControl,
	IconControl,
	IconsControl,
	MediaControl as VisualMediaControl,
	GalleryControl,
	ImageDimensionsControl,
	BackgroundControl
} from "./visual";

// Export specific controls (may have overlaps, handle carefully)
export * from "./specific";
