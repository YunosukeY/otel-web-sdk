"use client";

import React from "react";
import TraceExample from "./TraceExample";
import LogExample from "./LogExample";
import MetricExample from "./MetricExample";

const Examples: React.FC = () => {
  return (
    <>
      <TraceExample />
      <MetricExample />
      <LogExample />
    </>
  );
};

export default Examples;
