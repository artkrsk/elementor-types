/**
 * Command Data Base
 *
 * Mirrors modules/web-cli/assets/js/modules/command-data.js ($e.modules.CommandData)
 * Base class for data-related commands
 */

import type { CommandBase } from '../base';

/**
 * Base command for data operations backed by the $e.data REST layer
 */
export interface CommandDataBase extends CommandBase {
	/** Resolved response data */
	data: any;

	/** Request type for the current run */
	type: 'create' | 'delete' | 'get' | 'update' | 'options';

	/**
	 * Before/after hooks pair for the given request type, or false
	 */
	getApplyMethods(type?: string): { before: (args: any) => any; after: (data: any, args: any) => any } | false;

	/**
	 * Assemble the request descriptor sent to $e.data
	 */
	getRequestData(): {
		type: string;
		args: any;
		timestamp: number;
		component: any;
		command: string;
		endpoint: string;
	};

	apply(): Promise<any>;

	applyBeforeCreate(args?: any): any;
	applyAfterCreate(data: any, args?: any): any;
	applyBeforeDelete(args?: any): any;
	applyAfterDelete(data: any, args?: any): any;
	applyBeforeGet(args?: any): any;
	applyAfterGet(data: any, args?: any): any;
	applyBeforeUpdate(args?: any): any;
	applyAfterUpdate(data: any, args?: any): any;
	applyBeforeOptions(args?: any): any;
	applyAfterOptions(data: any, args?: any): any;

	applyAfterCatch(e: any): void;
	onCatchApply(e: any): void;
}

/**
 * Constructor for CommandDataBase
 */
export interface CommandDataBaseConstructor {
	new (options?: any): any;
	getInstanceType(): string;
	extend(proto: any, staticProps?: any): CommandDataBaseConstructor;
}

declare const CommandDataBase: CommandDataBaseConstructor;

export { CommandDataBase };
export default CommandDataBase;
