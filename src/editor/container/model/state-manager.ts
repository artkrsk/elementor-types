/**
 * Container State Manager
 *
 * Manages container state, lifecycle, and data persistence
 */

// Forward declaration to avoid circular reference
export interface StateContainer {
	[key: string]: any;
}

/**
 * State change event data
 */
export interface StateChangeEvent {
	container: StateContainer;
	property: string;
	oldValue: any;
	newValue: any;
	timestamp: number;
}

/**
 * Container lifecycle phases
 */
export type ContainerLifecyclePhase = 'created' | 'initialized' | 'rendered' | 'destroyed';

/**
 * State manager for container lifecycle and data management
 */
export interface ContainerStateManager {
	/**
	 * Reference to the container
	 */
	container: StateContainer;

	/**
	 * Current lifecycle phase
	 */
	phase: ContainerLifecyclePhase;

	/**
	 * State change history
	 */
	history: StateChangeEvent[];

	/**
	 * Initialize the state manager
	 */
	initialize(): void;

	/**
	 * Set container lifecycle phase
	 */
	setPhase(phase: ContainerLifecyclePhase): void;

	/**
	 * Get current lifecycle phase
	 */
	getPhase(): ContainerLifecyclePhase;

	/**
	 * Record state change
	 */
	recordStateChange(property: string, oldValue: any, newValue: any): void;

	/**
	 * Get state change history
	 */
	getStateHistory(): StateChangeEvent[];

	/**
	 * Clear state history
	 */
	clearStateHistory(): void;

	/**
	 * Check if container is in specific phase
	 */
	isInPhase(phase: ContainerLifecyclePhase): boolean;

	/**
	 * Validate container state
	 */
	validateState(): boolean;

	/**
	 * Reset container state
	 */
	resetState(): void;

	/**
	 * Cleanup resources
	 */
	cleanup(): void;
}

/**
 * Constructor for ContainerStateManager
 */
export interface ContainerStateManagerConstructor {
	new (container: StateContainer): any;
	extend(proto: any, staticProps?: any): ContainerStateManagerConstructor;
}

declare const ContainerStateManager: ContainerStateManagerConstructor;

export { ContainerStateManager };
export default ContainerStateManager;