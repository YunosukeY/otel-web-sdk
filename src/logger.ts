import { logs, SeverityNumber, type Logger as OtelLogger } from "@opentelemetry/api-logs";
import {
  BatchLogRecordProcessor,
  ConsoleLogRecordExporter,
  LoggerProvider,
  SimpleLogRecordProcessor,
} from "@opentelemetry/sdk-logs";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { type _CommonConfigAttributes, type LogsConfigAttributes } from "./sdk";

export class Logger {
  private readonly logger: OtelLogger;
  private readonly logLevel: SeverityNumber;

  constructor(logger: OtelLogger, logLevel: SeverityNumber) {
    this.logger = logger;
    this.logLevel = logLevel;
  }

  /**
   * Emit a trace log if trace level is enabled.
   */
  trace(message: string): void {
    if (this.logLevel > SeverityNumber.TRACE) {
      return;
    }
    this.logger.emit({
      severityNumber: SeverityNumber.TRACE,
      severityText: "TRACE",
      body: message,
    });
  }

  /**
   * Emit a debug log if debug level is enabled.
   */
  debug(message: string): void {
    if (this.logLevel > SeverityNumber.DEBUG) {
      return;
    }
    this.logger.emit({
      severityNumber: SeverityNumber.DEBUG,
      severityText: "DEBUG",
      body: message,
    });
  }

  /**
   * Emit an info log if info level is enabled.
   */
  info(message: string): void {
    if (this.logLevel > SeverityNumber.INFO) {
      return;
    }
    this.logger.emit({
      severityNumber: SeverityNumber.INFO,
      severityText: "INFO",
      body: message,
    });
  }

  /**
   * Emit a warn log if warn level is enabled.
   */
  warn(message: string): void {
    if (this.logLevel > SeverityNumber.WARN) {
      return;
    }
    this.logger.emit({
      severityNumber: SeverityNumber.WARN,
      severityText: "WARN",
      body: message,
    });
  }

  /**
   * Emit an error log if error level is enabled.
   */
  error(message: string): void {
    if (this.logLevel > SeverityNumber.ERROR) {
      return;
    }
    this.logger.emit({
      severityNumber: SeverityNumber.ERROR,
      severityText: "ERROR",
      body: message,
    });
  }

  /**
   * Emit a fatal log if fatal level is enabled.
   */
  fatal(message: string): void {
    if (this.logLevel > SeverityNumber.FATAL) {
      return;
    }
    this.logger.emit({
      severityNumber: SeverityNumber.FATAL,
      severityText: "FATAL",
      body: message,
    });
  }
}

type LoggerConfig = _CommonConfigAttributes & LogsConfigAttributes;

export const getLogger = ({
  otelcolLogsPath = "/v1/logs",
  logLevel = SeverityNumber.INFO,
  ...config
}: LoggerConfig): Logger => {
  const loggerProvider = new LoggerProvider({ resource: config.resource });
  loggerProvider.addLogRecordProcessor(
    new BatchLogRecordProcessor(new OTLPLogExporter({ url: `${config.otelcolOrigin}${otelcolLogsPath}` })),
  );
  if (config.debug) {
    loggerProvider.addLogRecordProcessor(new SimpleLogRecordProcessor(new ConsoleLogRecordExporter()));
  }
  logs.setGlobalLoggerProvider(loggerProvider);

  return new Logger(logs.getLogger(config.loggerName), logLevel);
};
