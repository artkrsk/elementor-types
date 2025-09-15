/**
 * Admin Dashboard Widgets
 *
 * WordPress admin dashboard widget integration for Elementor
 */

/**
 * Dashboard widget configuration
 */
export interface DashboardWidgetConfig {
	id: string;
	title: string;
	callback: () => void;
	control_callback?: () => void;
	context?: 'normal' | 'side' | 'column3' | 'column4';
	priority?: 'high' | 'core' | 'default' | 'low';
}

/**
 * Dashboard widget data
 */
export interface DashboardWidgetData {
	recent_posts?: any[];
	elementor_usage?: {
		posts_count: number;
		templates_count: number;
	};
	news?: any[];
	[key: string]: any;
}

/**
 * Admin Dashboard Widgets Manager
 * Handles Elementor widgets in WordPress admin dashboard
 */
export interface AdminDashboardWidgets {
	/**
	 * Registered widgets
	 */
	widgets: Record<string, DashboardWidgetConfig>;

	/**
	 * Register a dashboard widget
	 */
	registerWidget(config: DashboardWidgetConfig): void;

	/**
	 * Unregister a dashboard widget
	 */
	unregisterWidget(id: string): void;

	/**
	 * Get widget data
	 */
	getWidgetData(widgetId: string): DashboardWidgetData;

	/**
	 * Render widget content
	 */
	renderWidget(widgetId: string): string;

	/**
	 * Initialize dashboard widgets
	 */
	initialize(): void;
}

declare const AdminDashboardWidgets: any;

export { AdminDashboardWidgets };
export default AdminDashboardWidgets;