import { type Logger } from "@opentelemetry/api-logs";
import { type Tracer, type Meter } from "@opentelemetry/api";
import { getResource } from "./resource";
import { getLogger } from "./logger";
import { getTracer } from "./tracer";
import { getMeter } from "./meter";

export type Config = {
  serviceName: string;
  url: string;
  tracerName: string;
  meterName: string;
  loggerName: string;
};

export type Result = {
  tracer: Tracer;
  meter: Meter;
  logger: Logger;
};

export const start = (config: Config): Result => {
  const resource = getResource(config.serviceName);

  const tracer = getTracer({
    resource,
    url: config.url,
    tracerName: config.tracerName,
  });
  const meter = getMeter({
    resource,
    url: config.url,
    meterName: config.meterName,
  });
  const logger = getLogger({
    resource,
    url: config.url,
    loggerName: config.loggerName,
  });

  return { tracer, meter, logger };
};
