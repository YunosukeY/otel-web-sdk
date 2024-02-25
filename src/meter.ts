import { metrics, type Meter } from "@opentelemetry/api";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import { ConsoleMetricExporter, MeterProvider, PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { type _CommonConfigAttributes, type MetricsConfigAttributes } from "./sdk";

type MeterConfig = _CommonConfigAttributes & MetricsConfigAttributes;

export const getMeter = ({ otelcolMetricsPath = "/v1/metrics", ...config }: MeterConfig): Meter => {
  const readers = [
    new PeriodicExportingMetricReader({
      exporter: new OTLPMetricExporter({ url: `${config.otelcolOrigin}${otelcolMetricsPath}` }),
      exportIntervalMillis: config.metricsExportIntervalMillis,
    }),
  ];
  if (config.debug) {
    readers.push(
      new PeriodicExportingMetricReader({
        exporter: new ConsoleMetricExporter(),
        exportIntervalMillis: config.metricsExportIntervalMillis,
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
