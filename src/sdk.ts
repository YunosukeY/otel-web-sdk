import { type Logger } from "@opentelemetry/api-logs";
import { type Tracer, type Meter } from "@opentelemetry/api";
import { getResource } from "./resource";
import { getLogger } from "./logger";
import { getTracer } from "./tracer";
import { getMeter } from "./meter";

export type Config = {
  serviceName?: string;
  collectorOrigin?: string;
  tracerName: string;
  meterName: string;
  loggerName: string;
};

export type Result = {
  tracer: Tracer;
  meter: Meter;
  logger: Logger;
};

export function start({ collectorOrigin = "http://localhost:4318", ...config }: Config): Result {
  const resource = getResource(config.serviceName);

  const tracer = getTracer({
    resource,
    collectorOrigin,
    tracerName: config.tracerName,
  });
  const meter = getMeter({
    resource,
    collectorOrigin,
    meterName: config.meterName,
  });
  const logger = getLogger({
    resource,
    collectorOrigin,
    loggerName: config.loggerName,
  });

  return { tracer, meter, logger };
}
