import { logs, SeverityNumber, type Logger as OtelLogger } from "@opentelemetry/api-logs";
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { type IResource } from "@opentelemetry/resources";

export class Logger {
  private readonly logger: OtelLogger;

  constructor(logger: OtelLogger) {
    this.logger = logger;
  }

  trace(message: string): void {
    this.logger.emit({
      severityNumber: SeverityNumber.TRACE,
      severityText: "TRACE",
      body: message,
    });
  }

  debug(message: string): void {
    this.logger.emit({
      severityNumber: SeverityNumber.DEBUG,
      severityText: "DEBUG",
      body: message,
    });
  }

  info(message: string): void {
    this.logger.emit({
      severityNumber: SeverityNumber.INFO,
      severityText: "INFO",
      body: message,
    });
  }

  warn(message: string): void {
    this.logger.emit({
      severityNumber: SeverityNumber.WARN,
      severityText: "WARN",
      body: message,
    });
  }

  error(message: string): void {
    this.logger.emit({
      severityNumber: SeverityNumber.ERROR,
      severityText: "ERROR",
      body: message,
    });
  }

  fatal(message: string): void {
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
};

export const getLogger = (config: LoggerConfig): Logger => {
  const loggerProvider = new LoggerProvider({ resource: config.resource });
  loggerProvider.addLogRecordProcessor(
    new BatchLogRecordProcessor(new OTLPLogExporter({ url: `${config.otelcolOrigin}/v1/logs` })),
  );
  logs.setGlobalLoggerProvider(loggerProvider);

  return new Logger(logs.getLogger(config.loggerName));
};
