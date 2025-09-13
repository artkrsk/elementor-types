/**
 * Elementor Editor Heartbeat Utility
 *
 * Handles WordPress Heartbeat API integration for maintaining editor session,
 * checking user status, and handling connection monitoring.
 */

/**
 * Heartbeat event data
 */
export interface HeartbeatData {
  [key: string]: any;
}

/**
 * Heartbeat response data
 */
export interface HeartbeatResponse {
  [key: string]: any;
}

/**
 * Heartbeat settings
 */
export interface HeartbeatSettings {
  /** Heartbeat interval in seconds */
  interval?: number;
  /** Minimum interval in seconds */
  minInterval?: number;
  /** Maximum interval in seconds */
  maxInterval?: number;
  /** Suspend on blur */
  suspendOnBlur?: boolean;
  /** Screen ID */
  screenId?: string;
}

/**
 * Heartbeat status
 */
export interface HeartbeatStatus {
  /** Whether heartbeat is running */
  isRunning: boolean;
  /** Current interval */
  interval: number;
  /** Last tick timestamp */
  lastTick: number;
  /** Connection status */
  hasConnectionError: boolean;
  /** Whether window is focused */
  hasFocus: boolean;
}

/**
 * Heartbeat event handler function type
 */
export type HeartbeatEventHandler = (
  event: string,
  data?: HeartbeatData
) => void;

/**
 * Heartbeat tick handler function type
 */
export type HeartbeatTickHandler = (
  data: HeartbeatData,
  textStatus: string,
  jqXHR: JQuery.jqXHR
) => void;

/**
 * Heartbeat send handler function type
 */
export type HeartbeatSendHandler = (data: HeartbeatData) => void;

/**
 * WordPress Heartbeat API Utility
 */
export class Heartbeat {
  private static instance: Heartbeat | null = null;
  private isInitialized: boolean = false;
  private eventHandlers: Map<string, HeartbeatEventHandler[]> = new Map();
  private settings: HeartbeatSettings = {};
  private status: HeartbeatStatus = {
    isRunning: false,
    interval: 60,
    lastTick: 0,
    hasConnectionError: false,
    hasFocus: true,
  };

  /**
   * Get singleton instance
   */
  static getInstance(): Heartbeat {
    if (!this.instance) {
      this.instance = new Heartbeat();
    }
    return this.instance;
  }

  /**
   * Initialize heartbeat
   */
  initialize(settings: HeartbeatSettings = {}): void {
    if (this.isInitialized) {
      return;
    }

    this.settings = {
      interval: 60,
      minInterval: 15,
      maxInterval: 120,
      suspendOnBlur: true,
      screenId: "elementor",
      ...settings,
    };

    this.status.interval = this.settings.interval!;

    // Check if WordPress heartbeat is available
    if (typeof wp !== "undefined" && wp.heartbeat) {
      this.setupWordPressHeartbeat();
    } else {
      this.setupCustomHeartbeat();
    }

    this.setupEventHandlers();
    this.isInitialized = true;
  }

  /**
   * Setup WordPress heartbeat integration
   */
  private setupWordPressHeartbeat(): void {
    // Configure WordPress heartbeat
    if (wp.heartbeat?.interval) {
      wp.heartbeat.interval(this.settings.interval!);
    }

    // Listen to heartbeat events
    jQuery(document).on("heartbeat-send.elementor", (event, data) => {
      this.handleHeartbeatSend(data);
    });

    jQuery(document).on(
      "heartbeat-tick.elementor",
      (event, data, textStatus, jqXHR) => {
        this.handleHeartbeatTick(data, textStatus, jqXHR);
      }
    );

    jQuery(document).on(
      "heartbeat-error.elementor",
      (event, jqXHR, textStatus) => {
        this.handleHeartbeatError(jqXHR, textStatus);
      }
    );

    // Start WordPress heartbeat
    this.status.isRunning = true;
    this.emit("started");
  }

  /**
   * Setup custom heartbeat implementation
   */
  private setupCustomHeartbeat(): void {
    console.warn(
      "WordPress Heartbeat API not available, using custom implementation"
    );
    // Fallback to custom implementation if needed
    this.startCustomHeartbeat();
  }

  /**
   * Start custom heartbeat
   */
  private startCustomHeartbeat(): void {
    if (this.status.isRunning) {
      return;
    }

    const tick = () => {
      if (!this.status.isRunning) {
        return;
      }

      this.status.lastTick = Date.now();

      const data: HeartbeatData = {};
      this.handleHeartbeatSend(data);

      this.sendHeartbeatRequest(data)
        .then((response) => {
          this.handleHeartbeatTick(response, "success", null as any);
        })
        .catch((error) => {
          this.handleHeartbeatError(null as any, error.message || "error");
        });

      // Schedule next tick
      setTimeout(tick, this.status.interval * 1000);
    };

    this.status.isRunning = true;
    this.emit("started");
    tick();
  }

  /**
   * Send heartbeat request
   */
  private async sendHeartbeatRequest(
    data: HeartbeatData
  ): Promise<HeartbeatResponse> {
    const ajaxUrl =
      (globalThis as any).elementorCommon?.config?.urls?.ajaxurl ||
      "/wp-admin/admin-ajax.php";
    const nonce = (globalThis as any).elementorCommon?.config?.nonce || "";

    const response = await fetch(ajaxUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        action: "elementor_heartbeat",
        data: JSON.stringify(data),
        _wpnonce: nonce,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Setup event handlers
   */
  private setupEventHandlers(): void {
    // Window focus/blur handling
    if (this.settings.suspendOnBlur) {
      window.addEventListener("focus", () => {
        this.status.hasFocus = true;
        this.resume();
        this.emit("focus");
      });

      window.addEventListener("blur", () => {
        this.status.hasFocus = false;
        this.suspend();
        this.emit("blur");
      });
    }

    // Connection monitoring
    window.addEventListener("online", () => {
      this.status.hasConnectionError = false;
      this.resume();
      this.emit("online");
    });

    window.addEventListener("offline", () => {
      this.status.hasConnectionError = true;
      this.suspend();
      this.emit("offline");
    });
  }

  /**
   * Handle heartbeat send event
   */
  private handleHeartbeatSend(data: HeartbeatData): void {
    const elementorGlobal = (globalThis as any).elementor;

    // Add Elementor-specific data
    data.elementor_editor = {
      post_id: elementorGlobal?.config?.document?.id || 0,
      screen_id: this.settings.screenId,
      timestamp: Date.now(),
      user_id: elementorGlobal?.config?.user?.id || 0,
    };

    // Emit send event for listeners
    this.emit("send", data);
  }

  /**
   * Handle heartbeat tick event
   */
  private handleHeartbeatTick(
    data: HeartbeatResponse,
    textStatus: string,
    jqXHR: JQuery.jqXHR
  ): void {
    this.status.hasConnectionError = false;
    this.status.lastTick = Date.now();

    // Handle Elementor-specific responses
    if (data.elementor_editor) {
      this.handleElementorResponse(data.elementor_editor);
    }

    // Emit tick event for listeners
    this.emit("tick", data);
  }

  /**
   * Handle heartbeat error event
   */
  private handleHeartbeatError(jqXHR: JQuery.jqXHR, textStatus: string): void {
    this.status.hasConnectionError = true;

    // Emit error event for listeners
    this.emit("error", {
      textStatus,
      statusCode: jqXHR ? jqXHR.status : 0,
      responseText: jqXHR ? jqXHR.responseText : "",
    });

    // Handle specific error scenarios
    if (jqXHR && jqXHR.status === 401) {
      this.emit("unauthorized");
    } else if (jqXHR && jqXHR.status === 403) {
      this.emit("forbidden");
    }
  }

  /**
   * Handle Elementor-specific response data
   */
  private handleElementorResponse(data: any): void {
    // Handle user lock status
    if (data.user_lock) {
      this.emit("user-lock", data.user_lock);
    }

    // Handle revision updates
    if (data.revision_id) {
      this.emit("revision-update", data.revision_id);
    }

    // Handle maintenance mode
    if (data.maintenance_mode) {
      this.emit("maintenance-mode", data.maintenance_mode);
    }

    // Handle notifications
    if (data.notifications) {
      this.emit("notifications", data.notifications);
    }
  }

  /**
   * Add event listener
   */
  on(event: string, handler: HeartbeatEventHandler): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event)!.push(handler);
  }

  /**
   * Remove event listener
   */
  off(event: string, handler?: HeartbeatEventHandler): void {
    if (!this.eventHandlers.has(event)) {
      return;
    }

    if (handler) {
      const handlers = this.eventHandlers.get(event)!;
      const index = handlers.indexOf(handler);
      if (index !== -1) {
        handlers.splice(index, 1);
      }
    } else {
      this.eventHandlers.delete(event);
    }
  }

  /**
   * Emit event
   */
  private emit(event: string, data?: HeartbeatData): void {
    if (!this.eventHandlers.has(event)) {
      return;
    }

    const handlers = this.eventHandlers.get(event)!;
    handlers.forEach((handler) => {
      try {
        handler(event, data);
      } catch (error) {
        console.error("Heartbeat event handler error:", error);
      }
    });
  }

  /**
   * Start heartbeat
   */
  start(): void {
    if (this.status.isRunning) {
      return;
    }

    if (typeof wp !== "undefined" && wp.heartbeat) {
      // Resume WordPress heartbeat
      wp.heartbeat.connectNow();
    } else {
      this.startCustomHeartbeat();
    }
  }

  /**
   * Stop heartbeat
   */
  stop(): void {
    if (!this.status.isRunning) {
      return;
    }

    this.status.isRunning = false;

    if (typeof wp !== "undefined" && wp.heartbeat) {
      // WordPress heartbeat doesn't have a direct stop method
      // We rely on the running flag to prevent our handlers
    }

    this.emit("stopped");
  }

  /**
   * Suspend heartbeat
   */
  suspend(): void {
    if (typeof wp !== "undefined" && wp.heartbeat && wp.heartbeat.suspend) {
      wp.heartbeat.suspend();
    }
    this.emit("suspended");
  }

  /**
   * Resume heartbeat
   */
  resume(): void {
    if (typeof wp !== "undefined" && wp.heartbeat && wp.heartbeat.resume) {
      wp.heartbeat.resume();
    }
    this.emit("resumed");
  }

  /**
   * Set heartbeat interval
   */
  setInterval(interval: number): void {
    const clampedInterval = Math.max(
      this.settings.minInterval!,
      Math.min(this.settings.maxInterval!, interval)
    );

    this.status.interval = clampedInterval;

    if (typeof wp !== "undefined" && wp.heartbeat && wp.heartbeat.interval) {
      wp.heartbeat.interval(clampedInterval);
    }

    this.emit("interval-changed", { interval: clampedInterval });
  }

  /**
   * Get heartbeat status
   */
  getStatus(): HeartbeatStatus {
    return { ...this.status };
  }

  /**
   * Check if heartbeat is connected
   */
  isConnected(): boolean {
    return this.status.isRunning && !this.status.hasConnectionError;
  }

  /**
   * Check if heartbeat is healthy
   */
  isHealthy(): boolean {
    if (!this.isConnected()) {
      return false;
    }

    // Check if last tick was recent enough
    const now = Date.now();
    const maxSilence = (this.status.interval + 30) * 1000; // Add 30s buffer
    return now - this.status.lastTick < maxSilence;
  }

  /**
   * Force a heartbeat tick
   */
  tick(): void {
    if (typeof wp !== "undefined" && wp.heartbeat && wp.heartbeat.connectNow) {
      wp.heartbeat.connectNow();
    } else {
      // For custom implementation, this would trigger immediate check
      this.emit("force-tick");
    }
  }

  /**
   * Add data to next heartbeat
   */
  enqueue(key: string, data: any): void {
    this.on("send", (event, heartbeatData) => {
      if (heartbeatData) {
        heartbeatData[key] = data;
      }
    });
  }

  /**
   * Get time since last heartbeat
   */
  getTimeSinceLastTick(): number {
    return Date.now() - this.status.lastTick;
  }

  /**
   * Get next expected heartbeat time
   */
  getNextTickTime(): number {
    return this.status.lastTick + this.status.interval * 1000;
  }

  /**
   * Check if user session is still valid
   */
  checkUserSession(): Promise<boolean> {
    return new Promise((resolve) => {
      let resolved = false;

      const cleanup = () => {
        this.off("tick", tickHandler);
        this.off("error", errorHandler);
        this.off("unauthorized", unauthorizedHandler);
      };

      const tickHandler = () => {
        if (!resolved) {
          resolved = true;
          cleanup();
          resolve(true);
        }
      };

      const errorHandler = () => {
        if (!resolved) {
          resolved = true;
          cleanup();
          resolve(false);
        }
      };

      const unauthorizedHandler = () => {
        if (!resolved) {
          resolved = true;
          cleanup();
          resolve(false);
        }
      };

      this.on("tick", tickHandler);
      this.on("error", errorHandler);
      this.on("unauthorized", unauthorizedHandler);

      // Force a heartbeat to check session
      this.tick();

      // Timeout after 30 seconds
      setTimeout(() => {
        if (!resolved) {
          resolved = true;
          cleanup();
          resolve(false);
        }
      }, 30000);
    });
  }

  /**
   * Destroy heartbeat instance
   */
  destroy(): void {
    this.stop();
    this.eventHandlers.clear();
    this.isInitialized = false;

    // Clean up WordPress heartbeat listeners
    jQuery(document).off(".elementor");

    // Remove window event listeners
    window.removeEventListener("focus", this.resume);
    window.removeEventListener("blur", this.suspend);
    window.removeEventListener("online", this.resume);
    window.removeEventListener("offline", this.suspend);

    Heartbeat.instance = null;
  }
}

// Export types for external use - no global declarations
export interface HeartbeatWindow extends Window {
  elementorHeartbeat: Heartbeat;
}

export interface WPHeartbeat {
  interval(seconds: number): void;
  connectNow(): void;
  suspend?(): void;
  resume?(): void;
}

// Declare wp for internal use
declare const wp: {
  heartbeat?: WPHeartbeat;
};

// Initialize singleton instance
if (typeof window !== "undefined") {
  (window as any).elementorHeartbeat = Heartbeat.getInstance();
}
