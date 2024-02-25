import type React from "react";
import { logger } from "./otel";

const LogExample: React.FC = () => {
  logger.info("client component");

  return null;
};

export default LogExample;
