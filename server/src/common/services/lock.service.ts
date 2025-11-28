import { Injectable, Logger } from '@nestjs/common';

/**
 * Service responsible for managing in-memory locks to prevent race conditions
 * in concurrent operations (e.g., simultaneous avatar uploads by the same user).
 *
 * Uses a queue-based locking mechanism to ensure FIFO ordering and prevent
 * busy-wait loops under high concurrency.
 */
@Injectable()
export class LockService {
  private readonly logger = new Logger(LockService.name);
  private readonly locks = new Map<string, Promise<void>>();

  /**
   * Acquires a lock for the given key and executes the callback.
   * If a lock already exists for the key, waits in queue for it to be released.
   *
   * @param key - Unique identifier for the lock (e.g., userId)
   * @param callback - Async function to execute while holding the lock
   * @returns Promise resolving to the callback's return value
   *
   * @example
   * await lockService.withLock('user-123', async () => {
   *   // Critical section - only one execution at a time for user-123
   *   await uploadFile();
   * });
   */
  async withLock<T>(key: string, callback: () => Promise<T>): Promise<T> {
    // Wait for any existing lock on this key (queue-based, no busy-wait)
    const existingLock = this.locks.get(key);
    if (existingLock) {
      await existingLock;
    }

    // Create new lock promise
    let releaseLock: () => void;
    const lockPromise = new Promise<void>((resolve) => {
      releaseLock = resolve;
    });

    this.locks.set(key, lockPromise);
    this.logger.debug(`Lock acquired for key: ${key}`);

    try {
      // Execute callback while holding the lock
      return await callback();
    } finally {
      // Always release the lock
      this.locks.delete(key);
      releaseLock!();
      this.logger.debug(`Lock released for key: ${key}`);
    }
  }

  /**
   * Checks if a lock is currently active for the given key
   *
   * @param key - Unique identifier to check
   * @returns true if locked, false otherwise
   */
  isLocked(key: string): boolean {
    return this.locks.has(key);
  }

  /**
   * Gets the number of active locks
   *
   * @returns Count of active locks
   */
  getActiveLockCount(): number {
    return this.locks.size;
  }
}
