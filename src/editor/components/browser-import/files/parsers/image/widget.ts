/**
 * Browser Import Image Widget Parser
 *
 * Mirrors editor/components/browser-import/files/parsers/image/widget.js
 * Parser for image files to create image widgets
 */

import type { BaseParser, ParseResult } from '../base/parser';

/**
 * Image widget parse result
 */
export interface ImageParseResult extends ParseResult {
	data: {
		elType: 'widget';
		widgetType: 'image';
		settings: {
			image: {
				url: string;
				id?: string;
			};
			[key: string]: any;
		};
	};
	type: 'image';
}

/**
 * Image Widget Parser
 * Parses image files and converts them to image widget data
 */
export interface ImageWidgetParser extends BaseParser {
	/**
	 * Parse image file to widget data
	 */
	parse(file: File): Promise<ImageParseResult>;

	/**
	 * Validate image file
	 */
	validate(file: File): boolean;

	/**
	 * Get supported image types
	 */
	getSupportedTypes(): ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

	/**
	 * Get parser name
	 */
	getName(): 'image-widget';

	/**
	 * Convert file to data URL
	 */
	fileToDataURL(file: File): Promise<string>;

	/**
	 * Create widget settings from image data
	 */
	createWidgetSettings(imageUrl: string, file: File): any;
}

/**
 * Constructor for ImageWidgetParser
 */
export interface ImageWidgetParserConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): ImageWidgetParserConstructor;
}

declare const ImageWidgetParser: ImageWidgetParserConstructor;

export { ImageWidgetParser };
export default ImageWidgetParser;