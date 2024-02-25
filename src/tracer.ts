import { ZoneContextManager } from "@opentelemetry/context-zone";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { FetchInstrumentation } from "@opentelemetry/instrumentation-fetch";
import { BatchSpanProcessor, WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { W3CTraceContextPropagator } from "@opentelemetry/core";
import { trace, type Tracer } from "@opentelemetry/api";
import { type IResource } from "@opentelemetry/resources";

type TracerConfig = {
  resource: IResource;
  otelcolOrigin: string;
  tracerName: string;
  otelcolPath: string;
};

export const getTracer = (config: TracerConfig): Tracer => {
  const provider = new WebTracerProvider({ resource: config.resource });
  provider.addSpanProcessor(
    new BatchSpanProcessor(new OTLPTraceExporter({ url: `${config.otelcolOrigin}${config.otelcolPath}` })),
  );
  provider.register({
    contextManager: new ZoneContextManager(),
    propagator: new W3CTraceContextPropagator(),
  });
  trace.setGlobalTracerProvider(provider);

  registerInstrumentations({
    instrumentations: [
      new FetchInstrumentation({
        clearTimingResources: true,
      }),
    ],
  });

  return trace.getTracer(config.tracerName);
};
