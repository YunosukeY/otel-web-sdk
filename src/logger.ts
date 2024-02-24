import { logs, type Logger } from "@opentelemetry/api-logs";
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { type IResource } from "@opentelemetry/resources";

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

  return logs.getLogger(config.loggerName);
};
