/**
 * Global Data System
 *
 * Mirrors editor/data/globals/ structure
 * Complete global data management system for colors, typography, and other global values
 */

export * from './base';
export * from './component';
export * as Colors from './colors';
export * as Typography from './typography';
export * as Commands from './commands';

export { default as GlobalsComponent } from './component';
export { default as ColorsComponent } from './colors/component';
export { default as TypographyComponent } from './typography/component';
export { default as CreateBase } from './base/create-base';