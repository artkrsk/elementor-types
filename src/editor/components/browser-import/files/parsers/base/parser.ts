/**
 * Browser Import Base Parser
 *
 * Base parser interface for file parsing operations
 */

/**
 * Parse result interface
 */
export interface ParseResult {
	data: any;
	type: string;
	success: boolean;
	error?: string;
}

/**
 * Base parser interface for file parsing
 * Provides common functionality for all file type parsers
 */
export interface BaseParser {
	/**
	 * Parse file content
	 */
	parse(file: File): Promise<ParseResult>;

	/**
	 * Validate file for parsing
	 */
	validate(file: File): boolean;

	/**
	 * Get supported file types
	 */
	getSupportedTypes(): string[];

	/**
	 * Get parser name
	 */
	getName(): string;
}

/**
 * Constructor for BaseParser
 */
export interface BaseParserConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): BaseParserConstructor;
}

declare const BaseParser: BaseParserConstructor;

export { BaseParser };
export default BaseParser;