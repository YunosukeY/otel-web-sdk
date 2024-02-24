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
logger.emit({
  severityNumber: SeverityNumber.INFO,
  severityText: "INFO",
  body: "client log",
});
```

## Configuration

#### tracerName (required)

The `Tracer` name.

#### meterName (required)

The `Meter` name.

#### loggerName (required)

The `Logger` name.

#### serviceName (optional)

Your service name.

#### otelcolOrigin (optional)

The origin of OpenTelemetry Collector.
The default value is `"http://localhost:4318"`.

## Examples

### Next.js

See under `/examples/nextjs`.
