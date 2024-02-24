import { Resource, detectResourcesSync, type IResource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { browserDetector } from "@opentelemetry/opentelemetry-browser-detector";

export const getResource = (serviceName?: string): IResource => {
  const baseResource = new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
  });
  const detectedResources = detectResourcesSync({
    detectors: [browserDetector],
  });
  return baseResource.merge(detectedResources);
};
