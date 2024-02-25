import { logs, SeverityNumber, type Logger as OtelLogger } from "@opentelemetry/api-logs";
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { type IResource } from "@opentelemetry/resources";

export class Logger {
  private readonly logger: OtelLogger;
  private readonly logLevel: SeverityNumber;

  constructor(logger: OtelLogger, logLevel: SeverityNumber) {
    this.logger = logger;
    this.logLevel = logLevel;
  }

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

type LoggerConfig = {
  resource: IResource;
  otelcolOrigin: string;
  loggerName: string;
  otelcolPath: string;
  logLevel?: SeverityNumber;
};

export const getLogger = ({ logLevel = SeverityNumber.INFO, ...config }: LoggerConfig): Logger => {
  const loggerProvider = new LoggerProvider({ resource: config.resource });
  loggerProvider.addLogRecordProcessor(
    new BatchLogRecordProcessor(new OTLPLogExporter({ url: `${config.otelcolOrigin}${config.otelcolPath}` })),
  );
  logs.setGlobalLoggerProvider(loggerProvider);

  return new Logger(logs.getLogger(config.loggerName), logLevel);
};
