/**
 * Admin Notices System
 *
 * Notification and admin notice management for Elementor
 */

/**
 * Notice types
 */
export type NoticeType = 'info' | 'warning' | 'error' | 'success';

/**
 * Notice configuration
 */
export interface AdminNoticeConfig {
	id: string;
	type: NoticeType;
	message: string;
	dismissible?: boolean;
	persistent?: boolean;
	actions?: {
		text: string;
		url?: string;
		callback?: () => void;
		class?: string;
	}[];
}

/**
 * Admin Notices Manager
 * Handles display and management of admin notices
 */
export interface AdminNotices {
	/**
	 * Active notices
	 */
	notices: Record<string, AdminNoticeConfig>;

	/**
	 * Add an admin notice
	 */
	addNotice(config: AdminNoticeConfig): void;

	/**
	 * Remove an admin notice
	 */
	removeNotice(id: string): void;

	/**
	 * Dismiss a notice
	 */
	dismissNotice(id: string): void;

	/**
	 * Check if notice is dismissed
	 */
	isNoticeDismissed(id: string): boolean;

	/**
	 * Render notice HTML
	 */
	renderNotice(notice: AdminNoticeConfig): string;

	/**
	 * Initialize notices system
	 */
	initialize(): void;
}

declare const AdminNotices: any;

export { AdminNotices };
export default AdminNotices;