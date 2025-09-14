/**
 * Editor Elements Index
 *
 * Comprehensive barrel export for all element system types
 * Aligned with original Elementor JS structure: models/, views/, collections/, manager.js
 */

// Element Models - Core element data structures
export * as Models from './models';
export * from './models';

// Element Views - UI rendering and interaction
export * as Views from './views';
export * from './views';

// Element Collections - Backbone collections for element management
export * as Collections from './collections';
export * from './collections';

// Element Manager - Registration and factory for element types
export * from './manager';

// Note: All specific types are now available directly via export * statements above
// Both namespaced access (Editor.Elements.Models.ElementModel) and direct access (Editor.Elements.ElementModel) work