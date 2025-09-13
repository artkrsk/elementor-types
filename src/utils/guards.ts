/**
 * Type Guards
 * Utility functions to check types at runtime
 */

/**
 * Check if a value is a responsive value object
 */
export function isResponsiveValue(value: any): value is Record<string, any> {
  return (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    (value.desktop !== undefined ||
      value.tablet !== undefined ||
      value.mobile !== undefined ||
      value.mobile_extra !== undefined ||
      value.tablet_extra !== undefined ||
      value.laptop !== undefined ||
      value.widescreen !== undefined)
  );
}

/**
 * Check if a value is a CSS value object with size and unit
 */
export function isCSSValue(
  value: any
): value is { size: number | string; unit: string } {
  return (
    value &&
    typeof value === "object" &&
    value.size !== undefined &&
    value.unit !== undefined
  );
}

/**
 * Check if a value is a media object
 */
export function isMediaValue(
  value: any
): value is { id?: number; url?: string } {
  return (
    value &&
    typeof value === "object" &&
    (value.id !== undefined || value.url !== undefined)
  );
}

/**
 * Check if a value is an icon object
 */
export function isIconValue(
  value: any
): value is { value?: string; library?: string } {
  return (
    value &&
    typeof value === "object" &&
    (value.value !== undefined || value.library !== undefined)
  );
}

/**
 * Check if a value is a link object
 */
export function isLinkValue(value: any): value is { url?: string } {
  return value && typeof value === "object" && value.url !== undefined;
}

/**
 * Check if a value is a color object (with global support)
 */
export function isColorValue(
  value: any
): value is { color?: string; global?: { id: string } } {
  return (
    value &&
    typeof value === "object" &&
    (value.color !== undefined || value.global !== undefined)
  );
}

/**
 * Check if a value is a dimensions object
 */
export function isDimensionsValue(value: any): value is {
  top?: any;
  right?: any;
  bottom?: any;
  left?: any;
  unit?: string;
  isLinked?: boolean;
} {
  return (
    value &&
    typeof value === "object" &&
    (value.top !== undefined ||
      value.right !== undefined ||
      value.bottom !== undefined ||
      value.left !== undefined ||
      value.unit !== undefined ||
      value.isLinked !== undefined)
  );
}

/**
 * Check if a value is a typography object
 */
export function isTypographyValue(value: any): value is {
  family?: string;
  size?: any;
  weight?: string | number;
  [key: string]: any;
} {
  return (
    value &&
    typeof value === "object" &&
    (value.family !== undefined ||
      value.size !== undefined ||
      value.weight !== undefined ||
      value.transform !== undefined ||
      value.style !== undefined ||
      value.decoration !== undefined ||
      value.line_height !== undefined ||
      value.letter_spacing !== undefined ||
      value.word_spacing !== undefined)
  );
}

/**
 * Check if a value is a box shadow object
 */
export function isBoxShadowValue(value: any): value is {
  horizontal?: number;
  vertical?: number;
  blur?: number;
  spread?: number;
  color?: string;
  position?: string;
} {
  return (
    value &&
    typeof value === "object" &&
    (value.horizontal !== undefined ||
      value.vertical !== undefined ||
      value.blur !== undefined ||
      value.spread !== undefined ||
      value.color !== undefined ||
      value.position !== undefined)
  );
}

/**
 * Type guard for element types
 */
export function isElementType(
  value: string
): value is "section" | "column" | "widget" | "container" {
  return ["section", "column", "widget", "container"].includes(value);
}

/**
 * Type guard to check if an object has an _id property (like repeater items)
 */
export function hasId(value: any): value is { _id: string } {
  return value && typeof value === "object" && typeof value._id === "string";
}
