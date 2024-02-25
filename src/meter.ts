import { metrics, type Meter } from "@opentelemetry/api";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import { MeterProvider, PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { type IResource } from "@opentelemetry/resources";

type MeterConfig = {
  resource: IResource;
  otelcolOrigin: string;
  meterName: string;
  otelcolPath: string;
  exportIntervalMillis?: number;
};

export const getMeter = (config: MeterConfig): Meter => {
  const meterProvider = new MeterProvider({
    resource: config.resource,
    readers: [
      new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter({ url: `${config.otelcolOrigin}${config.otelcolPath}` }),
        exportIntervalMillis: config.exportIntervalMillis,
      }),
    ],
  });
  metrics.setGlobalMeterProvider(meterProvider);

  return metrics.getMeter(config.meterName);
};
