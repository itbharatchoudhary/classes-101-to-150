// config/Cache.js

/**
 * =========================================================
 * Redis Client Initialization
 * Creates and configures a Redis connection using ioredis
 * Reads credentials from environment variables
 * =========================================================
 */
const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,

  // Retry connection with incremental delay (max 2s)
  retryStrategy(times) {
    return Math.min(times * 50, 2000);
  },
});


/**
 * =========================================================
 * Redis Connection Event Listeners
 * Logs connection lifecycle events for monitoring/debugging
 * =========================================================
 */

// When Redis connects successfully
redis.on("connect", () => {
  console.log("Redis connected");
});

// When Redis throws an error
redis.on("error", (err) => {
  console.error("Redis error:", err);
});

// When Redis is attempting reconnection
redis.on("reconnecting", () => {
  console.log("Redis reconnecting...");
});


/**
 * =========================================================
 * Cache Helper Functions
 * Wrapper methods for common Redis operations
 * These keep Redis logic centralized and reusable
 * =========================================================
 */

/**
 * Get value from cache by key
 * @param {string} key
 * @returns {Promise<string|null>}
 */
const getCache = async (key) => {
  return await redis.get(key);
};


/**
 * Set value in cache with optional TTL
 * If ttlSeconds is provided → value expires automatically
 * @param {string} key
 * @param {string} value
 * @param {number|null} ttlSeconds
 */
const setCache = async (key, value, ttlSeconds = null) => {
  if (ttlSeconds) {
    await redis.set(key, value, "EX", ttlSeconds);
  } else {
    await redis.set(key, value);
  }
};


/**
 * Delete value from cache by key
 * @param {string} key
 */
const deleteCache = async (key) => {
  await redis.del(key);
};


/**
 * =========================================================
 * Module Exports
 * Exposes Redis instance + helper methods for app usage
 * =========================================================
 */
module.exports = {
  redis,
  getCache,
  setCache,
  deleteCache,
};