/**
 * Element Settings Types
 * Specific interfaces for common element setting patterns found in the JavaScript codebase
 */

/**
 * Video-related settings
 */
export interface VideoSettings {
  video_type?: 'youtube' | 'vimeo' | 'hosted';
  background_video_link?: string;
  background_play_once?: boolean;
  autoplay?: boolean;
  pause_on_hover?: boolean;
  mute?: boolean;
  loop?: boolean;
  controls?: boolean;
  video_start?: number;
  video_end?: number;
}

/**
 * Lightbox settings
 */
export interface LightboxSettings {
  lightbox?: boolean;
  lightbox_content_animation?: string;
  image_overlay?: boolean;
  caption?: string;
  description?: string;
}

/**
 * Background settings
 */
export interface BackgroundSettings {
  background_background?: 'classic' | 'gradient' | 'video' | 'slideshow';
  background_color?: string;
  background_image?: { url: string; id: number };
  background_position?: string;
  background_attachment?: string;
  background_repeat?: string;
  background_size?: string;
  background_video_link?: string;
  background_play_once?: boolean;
  background_play_on_mobile?: boolean;
}

/**
 * Animation settings
 */
export interface AnimationSettings {
  animation?: string;
  _animation_delay?: number;
  animation_delay?: number;
  _animation_duration?: number;
  animation_duration?: number;
}

/**
 * Typography settings
 */
export interface TypographySettings {
  typography_typography?: 'default' | 'custom';
  typography_font_family?: string;
  typography_font_size?: { unit: string; size: number; sizes: any };
  typography_font_weight?: string;
  typography_text_transform?: string;
  typography_font_style?: string;
  typography_text_decoration?: string;
  typography_line_height?: { unit: string; size: number };
  typography_letter_spacing?: { unit: string; size: number };
  typography_word_spacing?: { unit: string; size: number };
}

/**
 * Spacing settings (margin, padding)
 */
export interface SpacingSettings {
  margin?: {
    unit: string;
    top: string | number;
    right: string | number;
    bottom: string | number;
    left: string | number;
    isLinked: boolean;
  };
  padding?: {
    unit: string;
    top: string | number;
    right: string | number;
    bottom: string | number;
    left: string | number;
    isLinked: boolean;
  };
}

/**
 * Border settings
 */
export interface BorderSettings {
  border_border?: 'none' | 'solid' | 'double' | 'dotted' | 'dashed' | 'groove';
  border_width?: {
    unit: string;
    top: number;
    right: number;
    bottom: number;
    left: number;
    isLinked: boolean;
  };
  border_color?: string;
  border_radius?: {
    unit: string;
    top: number;
    right: number;
    bottom: number;
    left: number;
    isLinked: boolean;
  };
}

/**
 * Shadow settings
 */
export interface ShadowSettings {
  box_shadow_box_shadow_type?: 'yes' | '';
  box_shadow_box_shadow?: {
    horizontal: number;
    vertical: number;
    blur: number;
    spread: number;
    color: string;
    position?: 'inset' | 'outset';
  };
  text_shadow_text_shadow_type?: 'yes' | '';
  text_shadow_text_shadow?: {
    horizontal: number;
    vertical: number;
    blur: number;
    color: string;
  };
}

/**
 * Responsive value type for responsive controls
 */
export type ResponsiveValue<T> = {
  desktop?: T;
  tablet?: T;
  mobile?: T;
  widescreen?: T;
  laptop?: T;
  tablet_extra?: T;
  mobile_extra?: T;
} | T;

/**
 * Common element settings that most elements share
 */
export interface CommonElementSettings
  extends VideoSettings,
          LightboxSettings,
          BackgroundSettings,
          AnimationSettings,
          TypographySettings,
          SpacingSettings,
          BorderSettings,
          ShadowSettings {

  // Element visibility
  _element_id?: string;
  hide_desktop?: boolean;
  hide_tablet?: boolean;
  hide_mobile?: boolean;

  // Element positioning
  _position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  _offset_orientation_h?: 'start' | 'end';
  _offset_x?: ResponsiveValue<{ unit: string; size: number }>;
  _offset_y?: ResponsiveValue<{ unit: string; size: number }>;
  _offset_x_end?: ResponsiveValue<{ unit: string; size: number }>;
  _offset_y_end?: ResponsiveValue<{ unit: string; size: number }>;

  // Z-index
  _z_index?: number;

  // CSS classes and attributes
  css_classes?: string;
  _element_custom_css?: string;

  // Motion effects
  motion_fx_motion_fx_scrolling?: 'yes' | '';
  motion_fx_translateY_effect?: 'yes' | '';
  motion_fx_translateX_effect?: 'yes' | '';
  motion_fx_rotateZ_effect?: 'yes' | '';
  motion_fx_scale_effect?: 'yes' | '';
  motion_fx_opacity_effect?: 'yes' | '';
  motion_fx_blur_effect?: 'yes' | '';

  // Entrance animation
  _animation?: string;
  _animation_delay?: number;
  _animation_duration?: number;

  // Exit animation
  _animation_exit?: string;
  _animation_exit_delay?: number;
  _animation_exit_duration?: number;

  // Hover animations
  _hover_animation?: string;

  // Transform
  _transform_perspective_perspective?: { unit: string; size: number };
  _transform_translate_x?: { unit: string; size: number };
  _transform_translate_y?: { unit: string; size: number };
  _transform_translateZ?: { unit: string; size: number };
  _transform_rotate_x?: { unit: string; size: number };
  _transform_rotate_y?: { unit: string; size: number };
  _transform_rotateZ?: { unit: string; size: number };
  _transform_scale?: number;
  _transform_scale_x?: number;
  _transform_scale_y?: number;
  _transform_skew_x?: { unit: string; size: number };
  _transform_skew_y?: { unit: string; size: number };

  // Hover transform
  _transform_hover_perspective_perspective?: { unit: string; size: number };
  _transform_hover_translate_x?: { unit: string; size: number };
  _transform_hover_translate_y?: { unit: string; size: number };
  _transform_hover_translateZ?: { unit: string; size: number };
  _transform_hover_rotate_x?: { unit: string; size: number };
  _transform_hover_rotate_y?: { unit: string; size: number };
  _transform_hover_rotateZ?: { unit: string; size: number };
  _transform_hover_scale?: number;
  _transform_hover_scale_x?: number;
  _transform_hover_scale_y?: number;
  _transform_hover_skew_x?: { unit: string; size: number };
  _transform_hover_skew_y?: { unit: string; size: number };

  // Transition
  _transform_transition_hover?: { unit: string; size: number };
}

/**
 * Widget-specific settings interfaces
 */
export interface HeadingWidgetSettings extends CommonElementSettings {
  title?: string;
  size?: 'default' | 'small' | 'medium' | 'large' | 'xl' | 'xxl';
  header_size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  title_color?: string;
  blend_mode?: string;
  drop_cap?: boolean;
}

export interface ImageWidgetSettings extends CommonElementSettings {
  image?: { url: string; id: number; alt?: string };
  image_size?: string;
  caption_source?: 'none' | 'attachment' | 'custom';
  caption?: string;
  link_to?: 'none' | 'file' | 'custom';
  link?: { url: string; is_external: boolean; nofollow: boolean; custom_attributes: string };
  open_lightbox?: 'default' | 'yes' | 'no';
  lightbox_content_animation?: string;
}

export interface ButtonWidgetSettings extends CommonElementSettings {
  text?: string;
  link?: { url: string; is_external: boolean; nofollow: boolean; custom_attributes: string };
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  icon?: { value: string; library: string };
  icon_align?: 'left' | 'right';
  icon_indent?: { unit: string; size: number };
}

/**
 * Section and column settings
 */
export interface SectionSettings extends CommonElementSettings {
  layout?: 'boxed' | 'full_width';
  content_width?: 'boxed' | 'full_width';
  gap?: 'default' | 'no' | 'narrow' | 'extended' | 'wide' | 'wider';
  height?: 'default' | 'full' | 'min-height';
  min_height?: { unit: string; size: number };
  columns_position?: 'stretch' | 'top' | 'middle' | 'bottom';
  content_position?: 'top' | 'middle' | 'bottom';
  overflow?: 'hidden' | 'visible';
}

export interface ColumnSettings extends CommonElementSettings {
  _column_size?: number;
  _inline_size?: ResponsiveValue<number>;
  space_between_widgets?: { unit: string; size: number };
}

/**
 * Container settings (new Flexbox container system)
 */
export interface ContainerSettings extends CommonElementSettings {
  container_type?: 'flex' | 'grid';
  content_width?: 'boxed' | 'full_width';
  flex_direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  flex_wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justify_content?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  align_items?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  align_content?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  gap?: { unit: string; column: string | number; row: string | number; isLinked: boolean };
  flex_grow?: number;
  flex_shrink?: number;
  flex_basis?: { unit: string; size: number };
  align_self?: 'auto' | 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  order?: number;
  min_height?: { unit: string; size: number };
  overflow?: 'hidden' | 'visible' | 'scroll' | 'auto';
}