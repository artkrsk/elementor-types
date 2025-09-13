/**
 * Elementor Editor Container Helper Utility
 *
 * Provides helper functions for creating and manipulating container elements.
 * Used throughout the editor for container operations.
 */

import type { $e } from "../commands/base";

// Declare global $e variable
declare const $e: $e;

/**
 * Complete Container interface based on JavaScript Container class
 */
export interface Container {
  /** Container type */
  type: string;
  /** Container ID */
  id: string;
  /** Document object */
  document: any;
  /** Container model (Backbone.Model) */
  model: any;
  /** Container settings (Backbone.Model) */
  settings: any;
  /** Container view */
  view: any;
  /** Container parent */
  parent?: Container;
  /** Container children */
  children: Container[];
  /** Container dynamic settings */
  dynamic: any;
  /** Container globals */
  globals: any;
  /** Container label */
  label: string;
  /** Container controls */
  controls: Record<string, any>;
  /** Repeaters containers */
  repeaters: Record<string, any>;
  /** Container renderer */
  renderer?: Container;
  /** Container panel */
  panel: any;
  /** Controls placeholders */
  placeholders: Record<string, any>;
}

/**
 * Flex direction types for containers
 */
export type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";

/**
 * Container creation settings
 */
export interface ContainerSettings {
  /** Container width */
  content_width?: string;
  /** Flex direction */
  flex_direction?: FlexDirection;
  /** Flex wrap */
  flex_wrap?: string;
  /** Gap between items */
  gap?: {
    unit: string;
    size: number;
    sizes?: Record<string, number>;
  };
  /** Padding */
  padding?: Record<string, any>;
  /** Margin */
  margin?: Record<string, any>;
  /** Background */
  background?: Record<string, any>;
  /** Border */
  border?: Record<string, any>;
  /** Additional custom settings */
  [key: string]: any;
}

/**
 * Container creation options
 */
export interface ContainerOptions {
  /** Container index position */
  index?: number;
  /** Force creation even with validation errors */
  force?: boolean;
  /** Silent creation without triggering events */
  silent?: boolean;
  /** Additional command options */
  [key: string]: any;
}

/**
 * Model attributes for container creation
 */
export interface ContainerModelAttributes {
  /** Element type */
  elType: "container";
  /** Widget type (for containers) */
  widgetType?: string;
  /** Element ID */
  id?: string;
  /** Custom data */
  [key: string]: any;
}

/**
 * Container Helper Class
 *
 * Provides static methods for creating and manipulating container elements
 * in the Elementor editor.
 */
export class ContainerHelper {
  // Flex direction constants
  static readonly DIRECTION_ROW: FlexDirection = "row";
  static readonly DIRECTION_COLUMN: FlexDirection = "column";
  static readonly DIRECTION_ROW_REVERSED: FlexDirection = "row-reverse";
  static readonly DIRECTION_COLUMN_REVERSED: FlexDirection = "column-reverse";
  static readonly DIRECTION_DEFAULT: FlexDirection =
    ContainerHelper.DIRECTION_COLUMN;

  // Container type constants
  static readonly CONTAINER_TYPE_GRID = "grid";

  /**
   * Create multiple container elements
   *
   * @param count - Number of containers to create
   * @param settings - Settings to apply to each container
   * @param target - Target container to create new containers inside
   * @param options - Additional command options
   * @returns Array of newly created containers
   */
  static createContainers(
    count: number,
    settings: ContainerSettings = {},
    target: Container = {} as Container,
    options: ContainerOptions = {}
  ): Container[] {
    const containers: Container[] = [];

    for (let i = 0; i < count; i++) {
      containers.push(this.createContainer(settings, target, options));
    }

    return containers;
  }

  /**
   * Create a single container element
   *
   * @param settings - Settings to apply to the container
   * @param target - Target container to create new container inside
   * @param options - Additional command options
   * @param modelAttributes - Additional model attributes
   * @returns Newly created container
   */
  static createContainer(
    settings: ContainerSettings = {},
    target?: Container,
    options: ContainerOptions = {},
    modelAttributes: Partial<ContainerModelAttributes> = {}
  ): Container {
    // Use Elementor's command system to create container
    return $e.run("document/elements/create", {
      container: target,
      model: {
        elType: "container",
        settings: {
          content_width: "boxed",
          flex_direction: this.DIRECTION_DEFAULT,
          ...settings,
        },
        ...modelAttributes,
      },
      ...options,
    });
  }

  /**
   * Get default container settings based on type
   *
   * @param containerType - Type of container ('grid', 'flex', etc.)
   * @returns Default settings for the container type
   */
  static getDefaultSettings(containerType?: string): ContainerSettings {
    const baseSettings: ContainerSettings = {
      content_width: "boxed",
      flex_direction: this.DIRECTION_DEFAULT,
    };

    switch (containerType) {
      case this.CONTAINER_TYPE_GRID:
        return {
          ...baseSettings,
          display: "grid",
          grid_template_columns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: {
            unit: "px",
            size: 20,
          },
        };
      default:
        return baseSettings;
    }
  }

  /**
   * Check if a container can accept child elements
   *
   * @param container - Container to check
   * @returns Whether the container can accept children
   */
  static canAcceptChildren(container: Container): boolean {
    // Check if container is not locked or has restrictions
    const settings = container.settings || {};
    return !settings._element_lock && !settings._disable_children;
  }

  /**
   * Get container flex direction
   *
   * @param container - Container to get direction from
   * @returns Flex direction of the container
   */
  static getDirection(container: Container): FlexDirection {
    const settings = container.settings || {};
    return settings.flex_direction || this.DIRECTION_DEFAULT;
  }

  /**
   * Set container flex direction
   *
   * @param container - Container to modify
   * @param direction - New flex direction
   */
  static setDirection(container: Container, direction: FlexDirection): void {
    $e.run("document/elements/settings", {
      container,
      settings: {
        flex_direction: direction,
      },
    });
  }

  /**
   * Clone a container with its children
   *
   * @param sourceContainer - Container to clone
   * @param targetContainer - Target container to clone into
   * @param options - Clone options
   * @returns Cloned container
   */
  static cloneContainer(
    sourceContainer: Container,
    targetContainer?: Container,
    options: ContainerOptions = {}
  ): Container {
    return $e.run("document/elements/duplicate", {
      containers: [sourceContainer],
      target: targetContainer,
      ...options,
    })[0];
  }

  /**
   * Remove a container and optionally move its children
   *
   * @param container - Container to remove
   * @param moveChildren - Whether to move children to parent container
   */
  static removeContainer(
    container: Container,
    moveChildren: boolean = false
  ): void {
    if (moveChildren && container.children?.length) {
      // Move children to parent before removing container
      const parent = container.parent;
      if (parent) {
        container.children.forEach((child: Container) => {
          $e.run("document/elements/move", {
            container: child,
            target: parent,
            options: { index: container.view?.getOption?.("index") || 0 },
          });
        });
      }
    }

    $e.run("document/elements/delete", {
      containers: [container],
    });
  }

  /**
   * Get container responsive settings
   *
   * @param container - Container to get settings from
   * @param deviceMode - Device mode ('desktop', 'tablet', 'mobile')
   * @returns Responsive settings for the device
   */
  static getResponsiveSettings(
    container: Container,
    deviceMode: string = "desktop"
  ): Record<string, any> {
    const settings = container.settings || {};
    const responsiveSettings: Record<string, any> = {};

    // Extract responsive settings for the specific device
    Object.keys(settings).forEach((key) => {
      if (key.endsWith(`_${deviceMode}`)) {
        const baseKey = key.replace(`_${deviceMode}`, "");
        responsiveSettings[baseKey] = settings[key];
      } else if (
        deviceMode === "desktop" &&
        !key.includes("_tablet") &&
        !key.includes("_mobile")
      ) {
        responsiveSettings[key] = settings[key];
      }
    });

    return responsiveSettings;
  }
}

/**
 * Export singleton instance for global use
 */
export const containerHelper = ContainerHelper;
