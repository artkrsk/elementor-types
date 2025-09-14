/**
 * Simple Control Types
 *
 * Mirrors editor/controls/*.js simple control implementations
 * Includes Button, Code, Hidden, Alert, and other basic controls
 */

import type { ControlBaseView, ControlBaseDataView, ControlUIElements, ControlTemplateHelpers } from './base';

/**
 * Button Control
 * Extends ControlBaseView
 * Triggers events when clicked
 */
export interface ButtonControl extends ControlBaseView {
	ui(): ControlUIElements & {
		button: JQuery;
	};
	onButtonClick(): void;
}

/**
 * Code Control
 * Extends ControlBaseDataView
 * Provides code editor functionality with ACE editor
 */
export interface CodeControl extends ControlBaseDataView {
	editor?: any; // ACE editor instance

	ui(): ControlUIElements & {
		editor: JQuery;
	};

	onReady(): void;
	onResize(): void;
	isEditable(): boolean;
}

/**
 * Hidden Control
 * Extends ControlBaseDataView
 * Hidden input field
 */
export interface HiddenControl extends ControlBaseDataView {
	// Hidden controls have minimal interface
}

/**
 * Alert Control
 * Extends ControlBaseView
 * Displays alert/notification messages
 */
export interface AlertControl extends ControlBaseView {
	ui(): ControlUIElements & {
		alertMessage: JQuery;
		dismissButton?: JQuery;
	};

	onAlertDismiss?(): void;
}

/**
 * HTML Control
 * Extends ControlBaseView
 * Renders raw HTML content
 */
export interface HtmlControl extends ControlBaseView {
	ui(): ControlUIElements & {
		content: JQuery;
	};
}

/**
 * Raw HTML Control
 * Extends ControlBaseView
 * Renders unescaped HTML
 */
export interface RawHtmlControl extends ControlBaseView {
	templateHelpers(): ControlTemplateHelpers;
}

/**
 * Heading Control
 * Extends ControlBaseView
 * Section heading/title display
 */
export interface HeadingControl extends ControlBaseView {
	ui(): ControlUIElements & {
		heading: JQuery;
	};
}

/**
 * Divider Control
 * Extends ControlBaseView
 * Visual separator between controls
 */
export interface DividerControl extends ControlBaseView {
	// Divider controls have minimal interface
}

/**
 * Deprecated Control
 * Extends ControlBaseDataView
 * Shows deprecated notice
 */
export interface DeprecatedControl extends ControlBaseDataView {
	ui(): ControlUIElements & {
		deprecatedNotice: JQuery;
	};
}

/**
 * Notice Control
 * Extends ControlBaseView
 * Displays informational notices
 */
export interface NoticeControl extends ControlBaseView {
	ui(): ControlUIElements & {
		notice: JQuery;
		noticeIcon?: JQuery;
	};

	getNoticeType(): 'info' | 'warning' | 'error' | 'success';
}

/**
 * Info Control
 * Extends ControlBaseView
 * Displays information with optional link
 */
export interface InfoControl extends ControlBaseView {
	ui(): ControlUIElements & {
		info: JQuery;
		infoLink?: JQuery;
	};

	onInfoLinkClick?(): void;
}

// Control Constructors
export interface ButtonControlConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): ButtonControlConstructor;
}

export interface CodeControlConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): CodeControlConstructor;
}

export interface HiddenControlConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): HiddenControlConstructor;
}

export interface AlertControlConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): AlertControlConstructor;
}

export interface HtmlControlConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): HtmlControlConstructor;
}

export interface RawHtmlControlConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): RawHtmlControlConstructor;
}

export interface HeadingControlConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): HeadingControlConstructor;
}

export interface DividerControlConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): DividerControlConstructor;
}

export interface DeprecatedControlConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): DeprecatedControlConstructor;
}

export interface NoticeControlConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): NoticeControlConstructor;
}

export interface InfoControlConstructor {
	new (options?: any): any;
	extend(proto: any, staticProps?: any): InfoControlConstructor;
}

// Declare constructors
declare const ButtonControl: ButtonControlConstructor;
declare const CodeControl: CodeControlConstructor;
declare const HiddenControl: HiddenControlConstructor;
declare const AlertControl: AlertControlConstructor;
declare const HtmlControl: HtmlControlConstructor;
declare const RawHtmlControl: RawHtmlControlConstructor;
declare const HeadingControl: HeadingControlConstructor;
declare const DividerControl: DividerControlConstructor;
declare const DeprecatedControl: DeprecatedControlConstructor;
declare const NoticeControl: NoticeControlConstructor;
declare const InfoControl: InfoControlConstructor;

export {
	ButtonControl,
	CodeControl,
	HiddenControl,
	AlertControl,
	HtmlControl,
	RawHtmlControl,
	HeadingControl,
	DividerControl,
	DeprecatedControl,
	NoticeControl,
	InfoControl
};