import { context, trace } from "@opentelemetry/api";
import type React from "react";
import { useEffect } from "react";
import { tracer } from "./otel";

const ClientFetchTraceExample: React.FC = () => {
  useEffect(() => {
    const span = tracer.startSpan("client manual Span");
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    context.with(trace.setSpan(context.active(), span), async () => {
      await fetch("https://example.com/", {
        method: "GET",
        mode: "no-cors",
      });
      span.end();
    });
  }, []);

  return null;
};

export default ClientFetchTraceExample;
