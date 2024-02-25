import { ZoneContextManager } from "@opentelemetry/context-zone";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { FetchInstrumentation } from "@opentelemetry/instrumentation-fetch";
import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
  WebTracerProvider,
} from "@opentelemetry/sdk-trace-web";
import { W3CTraceContextPropagator } from "@opentelemetry/core";
import { trace, type Tracer } from "@opentelemetry/api";
import { XMLHttpRequestInstrumentation } from "@opentelemetry/instrumentation-xml-http-request";
import { type _CommonConfigAttributes, type TracesConfigAttributes } from "./sdk";

type TracerConfig = _CommonConfigAttributes & TracesConfigAttributes;

export const getTracer = ({ otelcolTracesPath = "/v1/traces", ...config }: TracerConfig): Tracer => {
  const provider = new WebTracerProvider({ resource: config.resource });
  provider.addSpanProcessor(
    new BatchSpanProcessor(new OTLPTraceExporter({ url: `${config.otelcolOrigin}${otelcolTracesPath}` })),
  );
  if (config.debug) {
    provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
  }
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
      new XMLHttpRequestInstrumentation({
        clearTimingResources: true,
      }),
    ],
  });

  return trace.getTracer(config.tracerName);
};
