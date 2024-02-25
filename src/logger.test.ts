import { SeverityNumber } from "@opentelemetry/api-logs";
import { Logger } from "./logger";

describe("Logger", () => {
  describe("trace", () => {
    it("should not emit a trace log if log level is UNSPECIFIED", () => {
      const emit = jest.fn();
      const logger = new Logger({ emit }, SeverityNumber.UNSPECIFIED);

      logger.trace("trace");

      expect(emit).not.toHaveBeenCalled();
    });

    it("should emit a trace log if log level is TRACE", () => {
      const emit = jest.fn();
      const logger = new Logger({ emit }, SeverityNumber.TRACE);

      logger.trace("trace");

      expect(emit).toHaveBeenCalledWith({
        severityNumber: SeverityNumber.TRACE,
        severityText: "TRACE",
        body: "trace",
      });
    });
  });

  describe("debug", () => {
    it("should not emit a debug log if log level is TRACE", () => {
      const emit = jest.fn();
      const logger = new Logger({ emit }, SeverityNumber.TRACE);

      logger.debug("debug");

      expect(emit).not.toHaveBeenCalled();
    });

    it("should emit a debug log if log level is DEBUG", () => {
      const emit = jest.fn();
      const logger = new Logger({ emit }, SeverityNumber.DEBUG);

      logger.debug("debug");

      expect(emit).toHaveBeenCalledWith({
        severityNumber: SeverityNumber.DEBUG,
        severityText: "DEBUG",
        body: "debug",
      });
    });
  });

  describe("info", () => {
    it("should not emit a info log if log leve is DEBUG", () => {
      const emit = jest.fn();
      const logger = new Logger({ emit }, SeverityNumber.DEBUG);

      logger.info("info");

      expect(emit).not.toHaveBeenCalled();
    });

    it("should emit a info log if log level is INFO", () => {
      const emit = jest.fn();
      const logger = new Logger({ emit }, SeverityNumber.INFO);

      logger.info("info");

      expect(emit).toHaveBeenCalledWith({
        severityNumber: SeverityNumber.INFO,
        severityText: "INFO",
        body: "info",
      });
    });
  });

  describe("warn", () => {
    it("should not emit a warn log if log level is INFO", () => {
      const emit = jest.fn();
      const logger = new Logger({ emit }, SeverityNumber.INFO);

      logger.warn("warn");

      expect(emit).not.toHaveBeenCalled();
    });

    it("should emit a warn log if log level is WARN", () => {
      const emit = jest.fn();
      const logger = new Logger({ emit }, SeverityNumber.WARN);

      logger.warn("warn");

      expect(emit).toHaveBeenCalledWith({
        severityNumber: SeverityNumber.WARN,
        severityText: "WARN",
        body: "warn",
      });
    });
  });

  describe("error", () => {
    it("should not emit a error log if log level is WARN", () => {
      const emit = jest.fn();
      const logger = new Logger({ emit }, SeverityNumber.WARN);

      logger.error("error");

      expect(emit).not.toHaveBeenCalled();
    });

    it("should emit a error log if log level is ERROR", () => {
      const emit = jest.fn();
      const logger = new Logger({ emit }, SeverityNumber.ERROR);

      logger.error("error");

      expect(emit).toHaveBeenCalledWith({
        severityNumber: SeverityNumber.ERROR,
        severityText: "ERROR",
        body: "error",
      });
    });
  });

  describe("fatal", () => {
    it("should not emit a fatal log if log level is ERROR", () => {
      const emit = jest.fn();
      const logger = new Logger({ emit }, SeverityNumber.ERROR);

      logger.fatal("fatal");

      expect(emit).not.toHaveBeenCalled();
    });

    it("should emit a fatal log if log level is FATAL", () => {
      const emit = jest.fn();
      const logger = new Logger({ emit }, SeverityNumber.FATAL);

      logger.fatal("fatal");

      expect(emit).toHaveBeenCalledWith({
        severityNumber: SeverityNumber.FATAL,
        severityText: "FATAL",
        body: "fatal",
      });
    });
  });
});
