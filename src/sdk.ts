import { type Tracer, type Meter } from "@opentelemetry/api";
import { getResource } from "./resource";
import { type Logger, getLogger } from "./logger";
import { getTracer } from "./tracer";
import { getMeter } from "./meter";
import { type SeverityNumber } from "@opentelemetry/api-logs";

type CommonConfigAttributes = {
  /**
   * Your service name.
   */
  serviceName?: string;
  /**
   * The origin of OpenTelemetry Collector.
   * @default "http://localhost:4318"
   */
  otelcolOrigin?: string;
  /**
   * The flag to enable debug output to `console.log`.
   * @default false
   */
  debug?: boolean;
};

type TracesConfigAttributes = {
  /**
   * The `Tracer` name.
   */
  tracerName: string;
  /**
   * The path of the traces endpoint of OpenTelemetry Collector.
   * @default "/v1/traces"
   */
  otelcolTracesPath?: string;
};

type MetricsConfigAttributes = {
  /**
   * The `Meter` name.
   */
  meterName: string;
  /**
   * The path of the metrics endpoint of OpenTelemetry Collector.
   * @default "/v1/metrics"
   */
  otelcolMetricsPath?: string;
  /**
   * The interval in milliseconds for exporting metrics.
   * @default 60_000
   */
  metricsExportIntervalMillis?: number;
};

type LogsConfigAttributes = {
  /**
   * The `Logger` name.
   */
  loggerName: string;
  /**
   * The path of the logs endpoint of OpenTelemetry Collector.
   * @default "/v1/logs"
   */
  otelcolLogsPath?: string;
  /**
   * The log level.
   * @default SeverityNumber.INFO
   */
  logLevel?: SeverityNumber;
};

export type Config = CommonConfigAttributes & TracesConfigAttributes & MetricsConfigAttributes & LogsConfigAttributes;

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
