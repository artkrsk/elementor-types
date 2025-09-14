/**
 * Controls CSS Parser
 *
 * Mirrors editor/utils/controls-css-parser.js
 * Parses control values and generates CSS rules
 */

import type { Module } from '../../core/modules';

/**
 * CSS rule configuration
 */
export interface CSSRule {
	selector: string;
	property: string;
	value: string;
	media?: string;
}

/**
 * CSS parsing options
 */
export interface CSSParsingOptions {
	id: string;
	settingsModel: any;
	context: any;
	dynamicParsing?: boolean;
	[key: string]: any;
}

/**
 * Controls CSS Parser
 * Generates CSS from control values and applies styling
 */
export interface ControlsCSSParser extends Module {
	/**
	 * Settings model reference
	 */
	settingsModel: any;

	/**
	 * Context for CSS generation
	 */
	context: any;

	/**
	 * Stylesheet instance
	 */
	stylesheet: any;

	/**
	 * Parse control value to CSS
	 */
	parseControlValue(control: any, value: any): string;

	/**
	 * Generate CSS rules from controls
	 */
	generateCSSRules(controls: any, values: any): CSSRule[];

	/**
	 * Add style rules to stylesheet
	 */
	addStyleRules(controls: any, values: any, controlsConfig: any, placeholders: RegExp[], replacements: string[]): void;

	/**
	 * Add styles to document
	 */
	addStyleToDocument(options?: { at?: string; of?: string }): void;

	/**
	 * Remove styles from document
	 */
	removeStyleFromDocument(): void;

	/**
	 * Get CSS output
	 */
	getCSSOutput(): string;

	/**
	 * Get style ID
	 */
	getStyleId(): string;
}

/**
 * Constructor for ControlsCSSParser
 */
export interface ControlsCSSParserConstructor {
	new (options: CSSParsingOptions): any;
	extend(proto: any, staticProps?: any): ControlsCSSParserConstructor;
}

declare const ControlsCSSParser: ControlsCSSParserConstructor;

export { ControlsCSSParser };
export default ControlsCSSParser;