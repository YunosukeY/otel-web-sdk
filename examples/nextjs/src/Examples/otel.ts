"use client";

import { start } from "@kimitsu/otel-sdk-web";

export const { tracer, meter, logger } = start({
  serviceName: "client",
  otelcolOrigin: "http://localhost:3000",
  tracerName: "app",
  meterName: "app",
  loggerName: "app",
});
