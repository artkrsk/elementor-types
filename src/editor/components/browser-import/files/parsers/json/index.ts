/**
 * Browser Import JSON Parser
 *
 * Mirrors editor/components/browser-import/files/parsers/json/index.js
 * Parser for JSON files containing Elementor data
 */

import type { BaseParser, ParseResult } from '../base/parser';

/**
 * JSON parse result
 */
export interface JSONParseResult extends ParseResult {
	data: {
		content?: any[];
		settings?: any;
		page_settings?: any;
		version?: string;
		[key: string]: any;
	};
	type: 'json';
}

/**
 * JSON Parser
 * Parses JSON files containing Elementor export data
 */
export interface JSONParser extends BaseParser {
	/**
	 * Parse JSON file to Elementor data
	 */
	parse(file: File): Promise<JSONParseResult>;

	/**
	 * Validate JSON file
	 */
	validate(file: File): boolean;

	/**
	 * Get supported JSON types
	 */
	getSupportedTypes(): ['application/json', 'text/plain'];

	/**
	 * Get parser name
	 */
	getName(): 'json';

	/**
	 * Validate Elementor JSON structure
	 */
	validateElementorJSON(data: any): boolean;

	/**
	 * Process Elementor export data
	 */
	processElementorData(data: any): any;
}

/**
 * Constructor for JSONParser
 */
export interface JSONParserConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): JSONParserConstructor;
}

declare const JSONParser: JSONParserConstructor;

export { JSONParser };
export default JSONParser;