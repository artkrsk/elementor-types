/**
 * Notice Bar Utilities
 *
 * Mirrors editor/utils/notice-bar.js
 * Notice and notification bar management
 */

/**
 * Notice types
 */
export type NoticeType = 'info' | 'warning' | 'error' | 'success';

/**
 * Notice configuration
 */
export interface NoticeConfig {
	type: NoticeType;
	message: string;
	dismissible?: boolean;
	timeout?: number;
	actions?: {
		text: string;
		callback: () => void;
	}[];
}

/**
 * Notice Bar Utilities
 * Manages editor notices and notification bars
 */
export interface NoticeBarUtils {
	/**
	 * Show notice in editor
	 */
	showNotice(config: NoticeConfig): void;

	/**
	 * Hide specific notice
	 */
	hideNotice(noticeId: string): void;

	/**
	 * Hide all notices
	 */
	hideAllNotices(): void;

	/**
	 * Check if notice is visible
	 */
	isNoticeVisible(noticeId: string): boolean;

	/**
	 * Get active notices
	 */
	getActiveNotices(): Record<string, NoticeConfig>;

	/**
	 * Create notice element
	 */
	createNoticeElement(config: NoticeConfig): HTMLElement;
}

declare const NoticeBarUtils: any;

export { NoticeBarUtils };
export default NoticeBarUtils;