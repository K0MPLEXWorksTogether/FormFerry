import { createLogger, format, transports, Logger } from "winston";

const { combine, timestamp, printf, colorize } = format;

export class AppLogger {
  private static instance: Logger | null;
  private constructor() {}
  public static getInstance(): Logger {
    if (!this.instance) {
      const customFormat = printf(({ level, message, timestamp }) => {
        return `${timestamp} [${level}]: ${message}`;
      });

      this.instance = createLogger({
        level: "info",
        format: combine(
          colorize(),
          timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          customFormat
        ),
        transports: [
          new transports.Console(),
          new transports.File({
            filename: "../logs/error.log",
            level: "error",
          }),
          new transports.File({ filename: "../logs/combined.log" }),
        ],
        exitOnError: false,
      });
    }

    return this.instance;
  }
}
