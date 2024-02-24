# Next.js Example

## Preparations

1. Clone a `opentelemetry-collector-dev-setup` repository.

```sh
git clone https://github.com/vercel/opentelemetry-collector-dev-setup.git
```

2. Add following lines to the `otel-collector-config.yaml` so that OTelCol can process logs.

```diff
service:
  extensions: [pprof, zpages, health_check]
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [logging, zipkin, jaeger]
    metrics:
      receivers: [otlp]
      processors: [batch]
      exporters: [logging, prometheus]
+   logs:
+     receivers: [otlp]
+     processors: [batch]
+     exporters: [logging]
```

3. Launch containers.

```
docker compose up -d
```

## Launch the application

```
yarn install
yarn dev
```

To learn more details, look under `/src/Examples`.
