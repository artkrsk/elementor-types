/**
 * Helper Types and Utilities
 * Developer-friendly helper types for common Elementor patterns
 */

/**
 * Generic responsive value type for settings that support different values per device
 */
export type ResponsiveValue<T> =
  | {
      desktop?: T;
      tablet?: T;
      mobile?: T;
      mobile_extra?: T;
      tablet_extra?: T;
      laptop?: T;
      widescreen?: T;
    }
  | T;

/**
 * Generic element settings type with responsive support
 */
export type ElementSettings<T = any> = {
  [K in keyof T]: T[K] extends ResponsiveValue<infer U>
    ? ResponsiveValue<U>
    : T[K];
} & {
  [key: string]: any;
};

/**
 * CSS value type for properties that accept units
 */
export type CSSValue =
  | {
      size: number | string;
      unit: "px" | "em" | "rem" | "%" | "vw" | "vh" | "vmin" | "vmax";
    }
  | string
  | number;

/**
 * Responsive CSS value type
 */
export type ResponsiveCSSValue = ResponsiveValue<CSSValue>;

/**
 * Dimensions value type (padding, margin, etc.)
 */
export type DimensionsValue = {
  top?: CSSValue;
  right?: CSSValue;
  bottom?: CSSValue;
  left?: CSSValue;
  unit?: string;
  isLinked?: boolean;
};

/**
 * Border value type
 */
export type BorderValue = {
  width?: CSSValue;
  color?: string;
  style?:
    | "solid"
    | "dashed"
    | "dotted"
    | "double"
    | "groove"
    | "ridge"
    | "inset"
    | "outset"
    | "none";
};

/**
 * Box shadow value type
 */
export type BoxShadowValue = {
  horizontal?: number;
  vertical?: number;
  blur?: number;
  spread?: number;
  color?: string;
  position?: "inset" | "outset";
};

/**
 * Typography value type
 */
export type TypographyValue = {
  family?: string;
  size?: ResponsiveCSSValue;
  weight?: string | number;
  transform?: "none" | "uppercase" | "lowercase" | "capitalize";
  style?: "normal" | "italic" | "oblique";
  decoration?: "none" | "underline" | "overline" | "line-through";
  line_height?: ResponsiveCSSValue;
  letter_spacing?: ResponsiveCSSValue;
  word_spacing?: ResponsiveCSSValue;
};

/**
 * Media value type (images, videos)
 */
export type MediaValue = {
  id?: number;
  url?: string;
  alt?: string;
  source?: "library" | "external";
  dimensions?: {
    width: number;
    height: number;
  };
};

/**
 * Icon value type
 */
export type IconValue = {
  value?: string;
  library?: string;
  custom?: {
    id?: number;
    url?: string;
  };
};

/**
 * Link value type
 */
export type LinkValue = {
  url?: string;
  is_external?: boolean;
  nofollow?: boolean;
  custom_attributes?: string;
};

/**
 * Repeater item type
 */
export type RepeaterItem<T = any> = T & {
  _id: string;
};

/**
 * Color value type (supports global colors)
 */
export type ColorValue =
  | {
      color?: string;
      global?: {
        id: string;
      };
    }
  | string;

/**
 * Element type identifiers
 */
export type ElementType = "section" | "column" | "widget" | "container";

/**
 * Widget type identifiers (common widgets)
 */
export type WidgetType =
  | "heading"
  | "text-editor"
  | "image"
  | "button"
  | "spacer"
  | "divider"
  | "tabs"
  | "accordion"
  | "toggle"
  | "counter"
  | "progress"
  | "video"
  | "carousel"
  | "gallery"
  | "testimonial"
  | "icon"
  | "icon-list"
  | "icon-box"
  | "star-rating"
  | "alert"
  | "social-icons"
  | "wp-widget-archives"
  | "wp-widget-calendar"
  | "wp-widget-categories"
  | "wp-widget-meta"
  | "wp-widget-nav-menu"
  | "wp-widget-pages"
  | "wp-widget-recent-comments"
  | "wp-widget-recent-posts"
  | "wp-widget-rss"
  | "wp-widget-search"
  | "wp-widget-tag-cloud"
  | "wp-widget-text"
  | string;
