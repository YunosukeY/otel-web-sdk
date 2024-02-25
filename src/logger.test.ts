import { SeverityNumber } from "@opentelemetry/api-logs";
import { Logger } from "./logger";

describe("Logger", () => {
  describe("isTraceEnabled", () => {
    it("should return false if log level is UNSPECIFIED", () => {
      const logger = new Logger({ emit: () => {} }, SeverityNumber.UNSPECIFIED);

      expect(logger.isTraceEnabled()).toBeFalsy();
    });

    it("should return true if log level is TRACE", () => {
      const logger = new Logger({ emit: () => {} }, SeverityNumber.TRACE);

      expect(logger.isTraceEnabled()).toBeTruthy();
    });
  });

  describe("isDebugEnabled", () => {
    it("should return false if log level is TRACE", () => {
      const logger = new Logger({ emit: () => {} }, SeverityNumber.TRACE);

      expect(logger.isDebugEnabled()).toBeFalsy();
    });

    it("should return true if log level is DEBUG", () => {
      const logger = new Logger({ emit: () => {} }, SeverityNumber.DEBUG);

      expect(logger.isDebugEnabled()).toBeTruthy();
    });
  });

  describe("isInfoEnabled", () => {
    it("should return false if log level is DEBUG", () => {
      const logger = new Logger({ emit: () => {} }, SeverityNumber.DEBUG);

      expect(logger.isInfoEnabled()).toBeFalsy();
    });

    it("should return true if log level is INFO", () => {
      const logger = new Logger({ emit: () => {} }, SeverityNumber.INFO);

      expect(logger.isInfoEnabled()).toBeTruthy();
    });
  });

  describe("isWarnEnabled", () => {
    it("should return false if log level is INFO", () => {
      const logger = new Logger({ emit: () => {} }, SeverityNumber.INFO);

      expect(logger.isWarnEnabled()).toBeFalsy();
    });

    it("should return true if log level is WARN", () => {
      const logger = new Logger({ emit: () => {} }, SeverityNumber.WARN);

      expect(logger.isWarnEnabled()).toBeTruthy();
    });
  });

  describe("isErrorEnabled", () => {
    it("should return false if log level is WARN", () => {
      const logger = new Logger({ emit: () => {} }, SeverityNumber.WARN);

      expect(logger.isErrorEnabled()).toBeFalsy();
    });

    it("should return true if log level is ERROR", () => {
      const logger = new Logger({ emit: () => {} }, SeverityNumber.ERROR);

      expect(logger.isErrorEnabled()).toBeTruthy();
    });
  });

  describe("isFatalEnabled", () => {
    it("should return false if log level is ERROR", () => {
      const logger = new Logger({ emit: () => {} }, SeverityNumber.ERROR);

      expect(logger.isFatalEnabled()).toBeFalsy();
    });

    it("should return true if log level is FATAL", () => {
      const logger = new Logger({ emit: () => {} }, SeverityNumber.FATAL);

      expect(logger.isFatalEnabled()).toBeTruthy();
    });
  });
});
