import { createLogger } from "@chat/common";
import type { Logger } from "@chat/common";

export const logger: Logger = createLogger({name: "auth-service"})