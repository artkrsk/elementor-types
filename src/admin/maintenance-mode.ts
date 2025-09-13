/**
 * Maintenance Mode Module Types
 * Types for maintenance mode functionality
 */

export interface MaintenanceModeConfig {
  enabled: boolean;
  mode: "coming_soon" | "maintenance";
  exclude_mode: "logged_in" | "custom";
  exclude_roles: string[];
  template_id?: string;
  custom_message?: string;
}

export interface MaintenanceModeModule {
  config: MaintenanceModeConfig;

  // State management
  isEnabled(): boolean;
  enable(config?: Partial<MaintenanceModeConfig>): void;
  disable(): void;

  // Access control
  shouldShowMaintenance(userRoles: string[]): boolean;
  isExcluded(userRoles: string[]): boolean;

  // Template management
  setTemplate(templateId: string): void;
  getTemplate(): string | undefined;
  setCustomMessage(message: string): void;
}
