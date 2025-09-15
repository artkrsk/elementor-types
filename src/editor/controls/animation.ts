/**
 * Animation Control
 *
 * Mirrors editor/controls/animation.js
 * Control for entrance animations
 */

import type { Select } from './specific';

/**
 * Animation options
 */
export interface AnimationOptions {
	'': 'None';
	fadeIn: 'Fade In';
	fadeInDown: 'Fade In Down';
	fadeInLeft: 'Fade In Left';
	fadeInRight: 'Fade In Right';
	fadeInUp: 'Fade In Up';
	zoomIn: 'Zoom In';
	zoomInDown: 'Zoom In Down';
	zoomInLeft: 'Zoom In Left';
	zoomInRight: 'Zoom In Right';
	zoomInUp: 'Zoom In Up';
	bounceIn: 'Bounce In';
	slideInDown: 'Slide In Down';
	slideInLeft: 'Slide In Left';
	slideInRight: 'Slide In Right';
	slideInUp: 'Slide In Up';
	[key: string]: string;
}

/**
 * Animation Control
 * Select control for entrance animations
 */
export interface AnimationControl extends Select {
	/**
	 * Get animation options
	 */
	getAnimationOptions(): AnimationOptions;

	/**
	 * Get animation CSS class
	 */
	getAnimationClass(animation: string): string;

	/**
	 * Preview animation
	 */
	previewAnimation(animation: string): void;
}

/**
 * Constructor for AnimationControl
 */
export interface AnimationControlConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): AnimationControlConstructor;
}

declare const AnimationControl: AnimationControlConstructor;

export { AnimationControl };
export default AnimationControl;