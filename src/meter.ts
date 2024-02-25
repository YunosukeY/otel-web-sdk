import { metrics, type Meter } from "@opentelemetry/api";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import { ConsoleMetricExporter, MeterProvider, PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { type IResource } from "@opentelemetry/resources";

type MeterConfig = {
  resource: IResource;
  otelcolOrigin: string;
  meterName: string;
  otelcolPath: string;
  exportIntervalMillis?: number;
  debug: boolean;
};

export const getMeter = (config: MeterConfig): Meter => {
  const readers = [
    new PeriodicExportingMetricReader({
      exporter: new OTLPMetricExporter({ url: `${config.otelcolOrigin}${config.otelcolPath}` }),
      exportIntervalMillis: config.exportIntervalMillis,
    }),
  ];
  if (config.debug) {
    readers.push(
      new PeriodicExportingMetricReader({
        exporter: new ConsoleMetricExporter(),
        exportIntervalMillis: config.exportIntervalMillis,
      }),
    );
  }

  const meterProvider = new MeterProvider({
    resource: config.resource,
    readers,
  });
  metrics.setGlobalMeterProvider(meterProvider);

  return metrics.getMeter(config.meterName);
};
