/**
 * Regions System
 *
 * Export all region interfaces and types
 */

export * as Panel from './panel';
export * as Navigator from './navigator';
export * as ResponsiveBar from './responsive-bar';
export * as Hooks from './hooks';

// Re-export commonly used types
export type { PanelRoutes, PanelShortcuts } from './panel/component';
export type { NavigatorRoutes, NavigatorShortcuts } from './navigator/component';
export type { PreviewSize, DeviceConstraints } from './responsive-bar';
export type { ResponsiveBarUI, ResponsiveBarEvents } from './responsive-bar/view';

// Re-export hook types
export type { RegionHook, RegionHookArgs } from './hooks/base';