/**
 * Visual Control Types
 *
 * Mirrors editor/controls/*.js visual control implementations
 * Includes Color, Icon, Icons, Media, Gallery, ImageDimensions controls
 */

import type { ControlBaseDataView, ControlBaseMultipleItemView, ControlUIElements } from './base';
import type { Select2Control } from './specific';

/**
 * Color Control
 * Color picker control with alpha support and global colors
 */
export interface ColorControl extends ControlBaseDataView {
	colorPicker?: any; // ColorPicker instance

	ui(): ControlUIElements & {
		pickerContainer: JQuery;
	};

	applySavedValue(): void;
	initPicker(): void;
	onPickerChange(): void;
	onPickerClear(): void;
	onAddGlobalButtonClick(): void;
	onReady(): void;
	onBeforeDestroy(): void;
	onAfterExternalChange(): void;
}

/**
 * Icon Control
 * Icon selector control extending Select2
 */
export interface IconControl extends Select2Control {
	initialize(): void;
	filterIcons(): void;
	iconsList(icon: { id?: string; text: string }): string | JQuery;
	getSelect2Options(): {
		allowClear: boolean;
		templateResult: (icon: any) => string | JQuery;
		templateSelection: (icon: any) => string | JQuery;
	};
}

/**
 * Icons Control (Font Awesome 5+)
 * Modern icon selector with library support
 */
export interface IconsControl extends ControlBaseDataView {
	ui(): ControlUIElements & {
		iconButton: JQuery;
		iconPreview: JQuery;
		deleteButton: JQuery;
	};

	events(): Record<string, string>;
	openIconsModal(): void;
	onIconSelect(icon: {
		library: string;
		value: string;
		name?: string;
	}): void;
	deleteIcon(): void;
	applySavedValue(): void;
	getControlValue(): {
		library?: string;
		value?: string;
	};
}

/**
 * Media Control
 * Media library integration for images, videos, and files
 */
export interface MediaControl extends ControlBaseMultipleItemView {
	frame?: any; // wp.media frame
	mediaType?: string;

	ui(): ControlUIElements & {
		controlMedia: JQuery;
		mediaImage: JQuery;
		mediaVideo: JQuery;
		frameOpeners: JQuery;
		removeButton: JQuery;
		promotions?: JQuery;
		promotions_dismiss?: JQuery;
		promotions_action?: JQuery;
		fileName: JQuery;
		mediaInputImageSize: JQuery;
	};

	events(): Record<string, string>;
	getMediaType(): string;
	getLibraryType(mediaType?: string): string;
	applySavedValue(): void;
	openFrame(): void;
	deleteImage(): void;
	onMediaInputImageSizeChange(): void;
	onPromotionDismiss?(): void;
	onPromotionAction?(): void;
	initFrame(): void;
	onSelectMedia(): void;
	setImagePreview(image: { url: string; id?: number }): void;
	setVideoPreview(video: { url: string; id?: number }): void;
}

/**
 * Gallery Control
 * Multiple media selection control
 */
export interface GalleryControl extends MediaControl {
	hasImages(): boolean;
	openFrame(): void;
	onSelectMedia(): void;
	applySavedValue(): void;
	getControlValue(): Array<{
		id: number;
		url: string;
		[key: string]: any;
	}>;
	initPreview(): void;
	resetGallery(): void;
	onBeforeDestroy(): void;
}

/**
 * Image Dimensions Control
 * Control for setting image dimensions and crop settings
 */
export interface ImageDimensionsControl extends ControlBaseMultipleItemView {
	ui(): ControlUIElements & {
		widthInput: JQuery;
		heightInput: JQuery;
		applyButton: JQuery;
		dimensionsDisplay: JQuery;
	};

	events(): Record<string, string>;
	onApplyClicked(): void;
	applySavedValue(): void;
	updateDimensionsDisplay(): void;
	getImageDimensions(): {
		width: number;
		height: number;
		crop?: boolean;
	};
}

/**
 * Background Control
 * Complex control for background settings
 */
export interface BackgroundControl extends ControlBaseDataView {
	ui(): ControlUIElements & {
		backgroundType: JQuery;
		colorPicker?: JQuery;
		imagePicker?: JQuery;
		videoPicker?: JQuery;
		gradientPicker?: JQuery;
	};

	onBackgroundTypeChange(): void;
	toggleFields(type: 'classic' | 'gradient' | 'video' | 'slideshow'): void;
	getBackgroundType(): string;
}

// Control Constructors
export interface ColorControlConstructor {
	new (options?: any): ColorControl;
	extend(proto: any, staticProps?: any): ColorControlConstructor;
}

export interface IconControlConstructor {
	new (options?: any): IconControl;
	extend(proto: any, staticProps?: any): IconControlConstructor;
}

export interface IconsControlConstructor {
	new (options?: any): IconsControl;
	extend(proto: any, staticProps?: any): IconsControlConstructor;
}

export interface MediaControlConstructor {
	new (options?: any): MediaControl;
	extend(proto: any, staticProps?: any): MediaControlConstructor;
}

export interface GalleryControlConstructor {
	new (options?: any): GalleryControl;
	extend(proto: any, staticProps?: any): GalleryControlConstructor;
}

export interface ImageDimensionsControlConstructor {
	new (options?: any): ImageDimensionsControl;
	extend(proto: any, staticProps?: any): ImageDimensionsControlConstructor;
}

export interface BackgroundControlConstructor {
	new (options?: any): BackgroundControl;
	extend(proto: any, staticProps?: any): BackgroundControlConstructor;
}

// Declare constructors
declare const ColorControl: ColorControlConstructor;
declare const IconControl: IconControlConstructor;
declare const IconsControl: IconsControlConstructor;
declare const MediaControl: MediaControlConstructor;
declare const GalleryControl: GalleryControlConstructor;
declare const ImageDimensionsControl: ImageDimensionsControlConstructor;
declare const BackgroundControl: BackgroundControlConstructor;

export {
	ColorControl,
	IconControl,
	IconsControl,
	MediaControl,
	GalleryControl,
	ImageDimensionsControl,
	BackgroundControl
};