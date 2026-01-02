import { createClient } from "redis";
import AppLogger from "./logger";
import { ConnectionError } from "../types/errors";

export default async function connectRedis() {
  const logger = AppLogger.getInstance();
  try {
    const client = createClient({
      username: "default",
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_SOCKET,
        port: 16987,
      },
    });

    client.on("error", (err) =>
      logger.error(`Redis Client Error: ${err.message}`)
    );
    await client.connect();
    logger.success(`[redis] Redis client connected successfully!`);
  } catch (err: any) {
    logger.error(`[redis] Connection failed: ${err.message}`);
    throw err instanceof ConnectionError
      ? err
      : new Error(`Undocumented error during redis connection: ${err.message}`);
  }
}
