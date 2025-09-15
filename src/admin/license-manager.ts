/**
 * License & Updates Manager
 *
 * License management and update system for Elementor Pro
 */

/**
 * License status types
 */
export type LicenseStatus = 'valid' | 'invalid' | 'expired' | 'disabled';

/**
 * License information
 */
export interface LicenseInfo {
	key: string;
	status: LicenseStatus;
	expires: string;
	activations_left?: number;
	customer_name?: string;
	customer_email?: string;
}

/**
 * Update information
 */
export interface UpdateInfo {
	version: string;
	download_url?: string;
	changelog?: string;
	requires_license?: boolean;
	tested_up_to?: string;
}

/**
 * License & Updates Manager
 * Handles license validation and update management
 */
export interface LicenseManager {
	/**
	 * Current license information
	 */
	license: LicenseInfo | null;

	/**
	 * Available update information
	 */
	update: UpdateInfo | null;

	/**
	 * Validate license key
	 */
	validateLicense(key: string): Promise<boolean>;

	/**
	 * Activate license
	 */
	activateLicense(key: string): Promise<LicenseInfo>;

	/**
	 * Deactivate license
	 */
	deactivateLicense(): Promise<boolean>;

	/**
	 * Check for updates
	 */
	checkForUpdates(): Promise<UpdateInfo | null>;

	/**
	 * Get license status
	 */
	getLicenseStatus(): LicenseStatus;

	/**
	 * Check if license is valid
	 */
	isLicenseValid(): boolean;

	/**
	 * Get update information
	 */
	getUpdateInfo(): UpdateInfo | null;

	/**
	 * Initialize license manager
	 */
	initialize(): void;
}

declare const LicenseManager: any;

export { LicenseManager };
export default LicenseManager;