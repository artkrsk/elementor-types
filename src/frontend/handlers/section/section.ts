/**
 * Section Handler Registry
 *
 * Mirrors frontend/handlers/section/section.js
 * Handler registry for section element types
 */

/**
 * Section Handler Registry
 * Array of handler imports for section elements
 */
export interface SectionHandlerRegistry extends Array<() => Promise<any>> {
	0: () => Promise<any>; // stretched-section
	1: () => Promise<any>; // background-slideshow
	2: () => Promise<any>; // background-video
	3: () => Promise<any>; // handles-position (editor)
	4: () => Promise<any>; // shapes (editor)
}

declare const SectionHandlers: SectionHandlerRegistry;

export { SectionHandlers };
export default SectionHandlers;