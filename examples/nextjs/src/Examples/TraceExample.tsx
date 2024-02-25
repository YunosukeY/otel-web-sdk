import type React from "react";
import { useEffect } from "react";
import { tracer } from "./otel";

const ClientFetchTraceExample: React.FC = () => {
  useEffect(() => {
    const span = tracer.startSpan("client manual span");
    span.end();

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    tracer.startActiveSpan("nested span", async (span) => {
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
