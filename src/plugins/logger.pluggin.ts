import { format, createLogger, transports } from "winston";

const { combine, timestamp, json } = format;
const logger = createLogger({
  level: "info",
  format: combine(timestamp(), json()),
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write all logs with importance level of `error` or higher to `error.log`
    //   (i.e., error, fatal, but not other levels)
    //
    new transports.File({ filename: "error.log", level: "error" }),
    //
    // - Write all logs with importance level of `info` or higher to `combined.log`
    //   (i.e., fatal, error, warn, and info, but not trace)
    //
    new transports.File({ filename: "combined.log" }),
  ],
});

logger.add(
  new transports.Console({
    format: format.simple(),
  })
);

export const buildLogger = (service: string) => {
  return {
    log: (message: string) => {
      logger.log("info", { message, service });
    },
    error: (message: string) => {
      logger.error("error", { message, service });
    },
  };
};
