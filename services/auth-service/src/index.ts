import "dotenv/config";
import { createServer } from "node:http";
import { createApp } from "./app";
import { logger } from "@/utils/logger";
import { env } from "@/config/env";

const main = async () => {
  try {
    const app = createApp();
    const server = createServer(app);

    const port = env.AUTH_SERVICE_PORT;
    server.listen(port, () => {
      logger.info({ port }, "Auth service is running");
    });
  } catch (error) {
    logger.error({ error }, "Failed to start auth service");
    process.exit(1);
  }
};

void main();
