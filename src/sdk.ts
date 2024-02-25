import { type Tracer, type Meter } from "@opentelemetry/api";
import { getResource } from "./resource";
import { type Logger, getLogger } from "./logger";
import { getTracer } from "./tracer";
import { getMeter } from "./meter";
import { type SeverityNumber } from "@opentelemetry/api-logs";

export type Config = {
  serviceName?: string;
  otelcolOrigin?: string;
  debug?: boolean;
  tracerName: string;
  otelcolTracesPath?: string;
  meterName: string;
  otelcolMetricsPath?: string;
  metricsExportIntervalMillis?: number;
  loggerName: string;
  otelcolLogsPath?: string;
  logLevel?: SeverityNumber;
};

export type Result = {
  tracer: Tracer;
  meter: Meter;
  logger: Logger;
};

export function start({
  otelcolOrigin = "http://localhost:4318",
  otelcolTracesPath = "/v1/traces",
  otelcolMetricsPath = "/v1/metrics",
  otelcolLogsPath = "/v1/logs",
  debug = false,
  ...config
}: Config): Result {
  const resource = getResource(config.serviceName);

  const tracer = getTracer({
    resource,
    otelcolOrigin,
    tracerName: config.tracerName,
    otelcolPath: otelcolTracesPath,
    debug,
  });
  const meter = getMeter({
    resource,
    otelcolOrigin,
    meterName: config.meterName,
    otelcolPath: otelcolMetricsPath,
    exportIntervalMillis: config.metricsExportIntervalMillis,
    debug,
  });
  const logger = getLogger({
    resource,
    otelcolOrigin,
    loggerName: config.loggerName,
    otelcolPath: otelcolLogsPath,
    logLevel: config.logLevel,
    debug,
  });

  return { tracer, meter, logger };
}
