# OpenTelemetry SDK for Browser JS

[![CI](https://github.com/YunosukeY/otel-sdk-web/actions/workflows/ci.yaml/badge.svg?branch=master&event=push)](https://github.com/YunosukeY/otel-sdk-web/actions/workflows/ci.yaml)
[![npm version](https://badge.fury.io/js/@kimitsu%2Fotel-sdk-web.svg)](https://badge.fury.io/js/@kimitsu%2Fotel-sdk-web)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**NOTE: This package depends on experimental packages. There's no guarantee to work correctly.**

This package provides OpenTelemetry SDK for Browser JS including tracing, metrics and logs.

## Quick Start

### Installation

npm

```
npm install @kimitsu/otel-sdk-web
```

yarn

```
yarn add @kimitsu/otel-sdk-web
```

pnpm

```
pnpm install @kimitsu/otel-sdk-web
```

### Instrumentation

#### Create `Tracer`, `Meter` and `Logger`

```ts
const { tracer, meter, logger } = start({
  serviceName: "client",
  tracerName: "app",
  meterName: "app",
  loggerName: "app",
});
```

#### Emit `Span`s

```ts
const span = tracer.startSpan("client manual span");
span.end();
```

#### Emit `Instrument`s

```ts
const counter = meter.createCounter("client_counter");
counter.add(1);
```

#### Emit `LogRecord`s

```ts
logger.info("client log");
```

## Configuration

Common Attributes

| Option Name     | Required | Description                                       | Type      | Default Value             |
| --------------- | -------- | ------------------------------------------------- | --------- | ------------------------- |
| `serviceName`   | ❌       | Your service name.                                | `string`  |                           |
| `otelcolOrigin` | ❌       | The origin of OpenTelemetry Collector.            | `string`  | `"http://localhost:4318"` |
| `debug`         | ❌       | The flag to enable debug output to `console.log`. | `boolean` | `false`                   |

Traces Attributes

| Option Name         | Required | Description                                                 | Type     | Default Value  |
| ------------------- | -------- | ----------------------------------------------------------- | -------- | -------------- |
| `tracerName`        | ✅       | The `Tracer` name.                                          | `string` |                |
| `otelcolTracesPath` | ❌       | The path of the traces endpoint of OpenTelemetry Collector. | `string` | `"/v1/traces"` |

Metrics Attributes

| Option Name                   | Required | Description                                                  | Type     | Default Value   |
| ----------------------------- | -------- | ------------------------------------------------------------ | -------- | --------------- |
| `meterName`                   | ✅       | The `Meter` name.                                            | `string` |                 |
| `otelcolMetricsPath`          | ❌       | The path of the metrics endpoint of OpenTelemetry Collector. | `string` | `"/v1/metrics"` |
| `metricsExportIntervalMillis` | ❌       | The interval in milliseconds for exporting metrics.          | `number` | `60_000`        |

Logs Attributes

| Option Name       | Required | Description                                               | Type             | Default Value         |
| ----------------- | -------- | --------------------------------------------------------- | ---------------- | --------------------- |
| `loggerName`      | ✅       | The `Logger` name.                                        | `string`         |                       |
| `otelcolLogsPath` | ❌       | The path of the logs endpoint of OpenTelemetry Collector. | `string`         | `"/v1/logs"`          |
| `logLevel`        | ❌       | The log level.                                            | `SeverityNumber` | `SeverityNumber.INFO` |

## Examples

### Next.js

See under `/examples/nextjs`.
