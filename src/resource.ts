import { Resource, detectResourcesSync, type IResource } from "@opentelemetry/resources";
import { SEMRESATTRS_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import { browserDetector } from "@opentelemetry/opentelemetry-browser-detector";

export const getResource = (serviceName?: string): IResource => {
  const baseResource = new Resource({
    [SEMRESATTRS_SERVICE_NAME]: serviceName,
  });
  const detectedResources = detectResourcesSync({
    detectors: [browserDetector],
  });
  return baseResource.merge(detectedResources);
};
