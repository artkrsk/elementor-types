/**
 * Template Library Constants
 *
 * Mirrors editor/components/template-library/constants.js
 * Constants for template library operations
 */

/**
 * Save contexts for template operations
 */
export const SAVE_CONTEXTS = Object.freeze({
	SAVE: 'save' as const,
	MOVE: 'move' as const,
	COPY: 'copy' as const,
	BULK_MOVE: 'bulkMove' as const,
	BULK_COPY: 'bulkCopy' as const,
});

/**
 * Quota warning messages
 */
export const QUOTA_WARNINGS = Object.freeze({
	warning: 'You\'ve saved %1$d%% of the templates in your plan. To get more space <a href="https://go.elementor.com/go-pro-cloud-templates-usage-bar-80" target="_blank">Upgrade now</a>',
	alert: 'You\'ve saved %1$d%% of the templates in your plan. To get more space <a href="https://go.elementor.com/go-pro-cloud-templates-usage-bar-100" target="_blank">Upgrade now</a>',
});

/**
 * Quota bar states
 */
export const QUOTA_BAR_STATES = Object.freeze({
	NORMAL: 'normal' as const,
	WARNING: 'warning' as const,
	ALERT: 'alert' as const,
});

/**
 * Save context type union
 */
export type SaveContext = typeof SAVE_CONTEXTS[keyof typeof SAVE_CONTEXTS];

/**
 * Quota bar state type union
 */
export type QuotaBarState = typeof QUOTA_BAR_STATES[keyof typeof QUOTA_BAR_STATES];