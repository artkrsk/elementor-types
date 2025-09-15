/**
 * Admin Modules
 *
 * Mirrors admin/modules.js
 * Admin modules configuration and management
 */

/**
 * Admin module configuration
 */
export interface AdminModuleConfig {
	name: string;
	className: string;
	path: string;
	dependencies?: string[];
	[key: string]: any;
}

/**
 * Admin Modules Registry
 * Manages registration and loading of admin modules
 */
export interface AdminModules {
	/**
	 * Registered modules
	 */
	modules: Record<string, AdminModuleConfig>;

	/**
	 * Register an admin module
	 */
	register(name: string, config: AdminModuleConfig): void;

	/**
	 * Unregister an admin module
	 */
	unregister(name: string): void;

	/**
	 * Get registered module
	 */
	getModule(name: string): AdminModuleConfig | null;

	/**
	 * Load module by name
	 */
	loadModule(name: string): Promise<any>;

	/**
	 * Initialize all registered modules
	 */
	initializeModules(): void;

	/**
	 * Check if module is registered
	 */
	hasModule(name: string): boolean;
}

declare const AdminModules: any;

export { AdminModules };
export default AdminModules;