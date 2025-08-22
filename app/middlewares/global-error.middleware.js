import { FormError, isSystemError } from "@peacom/core";
import { appLog } from "../config/winston";
import { sendTelegramErrorMessage } from "../services/monitor/telegram-monitor.service";
import { errorToTraceText } from "../utils/error.util";

export const handleGlobalError = (app) => {
  app.use((err, _req, _res, next) => {
    appLog.error(`handleGlobalError: - ${err.message}: ${errorToTraceText(err)}`);
    next(err);
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (err instanceof FormError) {
      // res.statusMessage = encodeURIComponent(err.message);
      res.status(err.code || 400).json(err.errors);
    } else if (!isSystemError(err)) {
      res.statusMessage = err.message;
      res.status(err.code || 500).json({ error: err.message });
    }
  });
  process.on("uncaughtException", async (err) => {
    // Handle the error safely
    appLog.error(err);
    sendTelegramErrorMessage(err, "process uncaughtException").then();
  });

  process.on("unhandledRejection", async (reason, promise) => {
    // Handle the error safely
    appLog.error({ reason, promise });
    sendTelegramErrorMessage(reason, "process unhandledRejection").then();
  });
};
