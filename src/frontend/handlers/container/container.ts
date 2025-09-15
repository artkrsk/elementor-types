/**
 * Container Handler Registry
 *
 * Mirrors frontend/handlers/container/container.js
 * Handler registry for container element types
 */

/**
 * Container Handler Registry
 * Array of handler imports for container elements
 */
export interface ContainerHandlerRegistry extends Array<() => Promise<any>> {
	0: () => Promise<any>; // background-slideshow
	1: () => Promise<any>; // background-video
	2: () => Promise<any>; // handles-position (editor)
	3: () => Promise<any>; // shapes (editor)
	4: () => Promise<any>; // grid-container (editor)
}

declare const ContainerHandlers: ContainerHandlerRegistry;

export { ContainerHandlers };
export default ContainerHandlers;