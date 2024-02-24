import type React from "react";
import { useEffect } from "react";
import { meter } from "./otel";

const ClientMetricsExample: React.FC = () => {
  useEffect(() => {
    const counter = meter.createCounter("client_counter");
    counter.add(1);
  }, []);

  return null;
};

export default ClientMetricsExample;
