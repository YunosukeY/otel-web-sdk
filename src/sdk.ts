import { type Logger } from "@opentelemetry/api-logs";
import { type Tracer, type Meter } from "@opentelemetry/api";
import { getResource } from "./resource";
import { getLogger } from "./logger";
import { getTracer } from "./tracer";
import { getMeter } from "./meter";

export type Config = {
  serviceName?: string;
  otelcolOrigin?: string;
  tracerName: string;
  meterName: string;
  metricsExportIntervalMillis?: number;
  loggerName: string;
};

export type Result = {
  tracer: Tracer;
  meter: Meter;
  logger: Logger;
};

export function start({ otelcolOrigin = "http://localhost:4318", ...config }: Config): Result {
  const resource = getResource(config.serviceName);

  const tracer = getTracer({
    resource,
    otelcolOrigin,
    tracerName: config.tracerName,
  });
  const meter = getMeter({
    resource,
    otelcolOrigin,
    meterName: config.meterName,
    exportIntervalMillis: config.metricsExportIntervalMillis,
  });
  const logger = getLogger({
    resource,
    otelcolOrigin,
    loggerName: config.loggerName,
  });

  return { tracer, meter, logger };
}
