/**
 * Elementor Editor Context Menu Utility
 *
 * Provides right-click context menu functionality for editor elements.
 * Extends Module base class to provide context menu system.
 */

import type { Module } from "../../core";

/**
 * Context menu action configuration
 */
export interface ContextMenuAction {
  /** Action identifier */
  name: string;
  /** Display title */
  title: string;
  /** Action icon CSS class */
  icon?: string;
  /** Keyboard shortcut display */
  shortcut?: string;
  /** Action callback function */
  callback?: (action: ContextMenuAction) => void;
  /** Whether the action is disabled */
  disabled?: boolean;
  /** Whether the action is visible */
  visible?: boolean;
  /** Action group for organization */
  group?: string;
}

/**
 * Context menu group configuration
 */
export interface ContextMenuGroup {
  /** Group identifier */
  name: string;
  /** Group actions */
  actions: ContextMenuAction[];
  /** Whether to show divider after group */
  divider?: boolean;
}

/**
 * Context menu settings
 */
export interface ContextMenuSettings {
  /** Menu context ('preview', 'navigator', etc.) */
  context: string;
  /** Available actions */
  actions: Record<string, ContextMenuAction>;
  /** CSS classes for styling */
  classes: {
    list: string;
    group: string;
    groupPrefix: string;
    item: string;
    itemTypePrefix: string;
    itemTitle: string;
    itemShortcut: string;
    iconShortcut: string;
    itemDisabled: string;
    divider: string;
    hidden: string;
    promotionLink: string;
  };
}

/**
 * Context Menu Component Interface
 *
 * Manages context menus throughout the editor with actions, groups, and shortcuts.
 */
export interface ContextMenu extends Module {
  /**
   * Get default settings for context menu
   */
  getDefaultSettings(): ContextMenuSettings;

  /**
   * Build DOM element for a menu action
   */
  buildActionItem(action: ContextMenuAction): JQuery<HTMLElement>;

  /**
   * Build DOM element for a group divider
   */
  buildGroupDivider(): JQuery<HTMLElement>;

  /**
   * Build DOM elements for a menu group
   */
  buildGroup(group: ContextMenuGroup): JQuery<HTMLElement>[];

  /**
   * Execute a menu action
   */
  runAction(action: ContextMenuAction): void;

  /**
   * Show context menu at specified position
   */
  show(
    x: number,
    y: number,
    actions: ContextMenuAction[] | ContextMenuGroup[]
  ): void;

  /**
   * Hide context menu
   */
  hide(): void;

  /**
   * Register a new action
   */
  registerAction(name: string, action: Omit<ContextMenuAction, "name">): void;

  /**
   * Unregister an action
   */
  unregisterAction(name: string): void;

  /**
   * Get registered action by name
   */
  getAction(name: string): ContextMenuAction | undefined;

  /**
   * Get all registered actions
   */
  getActions(): Record<string, ContextMenuAction>;
}

/**
 * Context Menu Utility Functions
 */
export const ContextMenuUtils = {
  /**
   * Get default context menu settings
   */
  getDefaultSettings(): ContextMenuSettings {
    return {
      context: "preview",
      actions: {},
      classes: {
        list: "elementor-context-menu-list",
        group: "elementor-context-menu-list__group",
        groupPrefix: "elementor-context-menu-list__group-",
        item: "elementor-context-menu-list__item",
        itemTypePrefix: "elementor-context-menu-list__item-",
        itemTitle: "elementor-context-menu-list__item__title",
        itemShortcut: "elementor-context-menu-list__item__shortcut",
        iconShortcut: "elementor-context-menu-list__item__icon",
        itemDisabled: "elementor-context-menu-list__item--disabled",
        divider: "elementor-context-menu-list__divider",
        hidden: "elementor-hidden",
        promotionLink:
          "elementor-context-menu-list__item__shortcut--link-fullwidth",
      },
    };
  },

  /**
   * Build DOM element for a menu action
   */
  buildActionItem(
    action: ContextMenuAction,
    classes: ContextMenuSettings["classes"]
  ): JQuery<HTMLElement> {
    const $item = jQuery("<div>", {
      class: `${classes.item} ${classes.itemTypePrefix}${action.name}`,
      role: "menuitem",
      tabindex: "0",
    });

    const $itemTitle = jQuery("<div>", { class: classes.itemTitle }).text(
      action.title
    );
    const $itemIcon = jQuery("<div>", { class: classes.iconShortcut });

    if (action.icon) {
      $itemIcon.html(`<i class="${action.icon}"></i>`);
    }

    $item.append($itemIcon, $itemTitle);

    if (action.shortcut) {
      const $itemShortcut = jQuery("<div>", {
        class: classes.itemShortcut,
      }).html(action.shortcut);
      $item.append($itemShortcut);
    }

    if (action.callback) {
      $item.on("click", () => {
        ContextMenuUtils.runAction(action);
      });

      $item.on("keyup", (event) => {
        const ENTER_KEY = 13;
        const SPACE_KEY = 32;

        if (event.which === ENTER_KEY || event.which === SPACE_KEY) {
          ContextMenuUtils.runAction(action);
        }
      });
    }

    if (action.disabled) {
      $item.addClass(classes.itemDisabled);
    }

    return $item;
  },

  /**
   * Build DOM element for a group divider
   */
  buildGroupDivider(
    classes: ContextMenuSettings["classes"]
  ): JQuery<HTMLElement> {
    return jQuery("<div>", { class: classes.divider });
  },

  /**
   * Build DOM elements for a menu group
   */
  buildGroup(
    group: ContextMenuGroup,
    classes: ContextMenuSettings["classes"]
  ): JQuery<HTMLElement>[] {
    const elements: JQuery<HTMLElement>[] = [];

    // Create group container
    const $group = jQuery("<div>", {
      class: `${classes.group} ${classes.groupPrefix}${group.name}`,
    });

    // Add actions to group
    group.actions.forEach((action) => {
      if (action.visible !== false) {
        $group.append(ContextMenuUtils.buildActionItem(action, classes));
      }
    });

    elements.push($group);

    // Add divider if specified
    if (group.divider) {
      elements.push(ContextMenuUtils.buildGroupDivider(classes));
    }

    return elements;
  },

  /**
   * Execute a menu action
   */
  runAction(action: ContextMenuAction): void {
    if (action.disabled) {
      return;
    }

    if (action.callback) {
      action.callback(action);
    }

    // Hide menu after action
    ContextMenuUtils.hide();
  },

  /**
   * Show context menu at specified position
   */
  show(
    x: number,
    y: number,
    actions: ContextMenuAction[] | ContextMenuGroup[],
    settings?: ContextMenuSettings
  ): void {
    const classes =
      settings?.classes || ContextMenuUtils.getDefaultSettings().classes;

    // Remove existing menu
    ContextMenuUtils.hide();

    // Create menu container
    const $menu = jQuery("<div>", { class: classes.list });

    // Build menu items
    if (Array.isArray(actions) && actions.length > 0) {
      if ("actions" in actions[0]) {
        // Handle groups
        (actions as ContextMenuGroup[]).forEach((group) => {
          const groupElements = ContextMenuUtils.buildGroup(group, classes);
          groupElements.forEach(($element) => $menu.append($element));
        });
      } else {
        // Handle individual actions
        (actions as ContextMenuAction[]).forEach((action) => {
          if (action.visible !== false) {
            $menu.append(ContextMenuUtils.buildActionItem(action, classes));
          }
        });
      }
    }

    // Position and show menu
    $menu.css({
      position: "fixed",
      left: x,
      top: y,
      zIndex: 999999,
    });

    jQuery("body").append($menu);

    // Handle outside clicks to close menu
    jQuery(document).on("click.contextmenu", (event) => {
      const target = event.target as unknown as Element | null;
      if (target && !$menu.is(target) && !$menu.has(target).length) {
        ContextMenuUtils.hide();
      }
    });

    // Handle escape key
    jQuery(document).on("keyup.contextmenu", (event) => {
      if (event.which === 27) {
        // ESC key
        ContextMenuUtils.hide();
      }
    });
  },

  /**
   * Hide context menu
   */
  hide(): void {
    const classes = ContextMenuUtils.getDefaultSettings().classes;
    jQuery(`.${classes.list}`).remove();
    jQuery(document).off(".contextmenu");
  },
};

/**
 * Export for module extension pattern
 */
export default ContextMenu;
