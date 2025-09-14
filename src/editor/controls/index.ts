/**
 * Editor Controls Index
 * Barrel export for all control system types
 */

export * from "./base";
export * from "./simple";
export * from "./layout";
export * from "./advanced";
export * from "./behaviors";
export * from "./validation";
export * from "./groups";
export * from "./conditions";
export * from "./factory";
export * from "./window-controls";

// Export input controls with specific naming to avoid conflicts
export {
	TextControl,
	NumberControl as InputNumberControl,
	TextareaControl,
	UrlControl as InputUrlControl,
	EmailControl,
	PasswordControl,
	RangeControl,
	DateTimeControl,
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
