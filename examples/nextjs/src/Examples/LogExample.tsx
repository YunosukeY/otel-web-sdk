import type React from "react";
import { logger } from "./otel";
import { SeverityNumber } from "@opentelemetry/api-logs";

const LogExample: React.FC = () => {
  logger.emit({
    severityNumber: SeverityNumber.INFO,
    severityText: "INFO",
    body: "client component",
  });

  return null;
};

export default LogExample;
