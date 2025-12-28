import { logger } from "@/utils/logger";
import { HTTPError } from "@chat/common";
import { ErrorRequestHandler } from "express";


export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  logger.error({ err }, "Unhandled error occurred");

  const error = err instanceof HTTPError ? err : undefined;
  const StatusCode = error?.StatusCode ?? 500;
  const message =
    StatusCode >= 500
      ? "Internal server error"
      : (error?.message ?? "Unknown error");
  const payload = error?.details
    ? { message, details: error.details }
    : { message };

  res.status(StatusCode).json(payload);

  void _next();
};
