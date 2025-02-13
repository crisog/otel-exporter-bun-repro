import { NodeSDK } from "@opentelemetry/sdk-node";
import { Resource } from "@opentelemetry/resources";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

const traceExporter = new OTLPTraceExporter({
  url: "http://localhost:4318/v1/traces",
});

const sdk = new NodeSDK({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: "otel-bun-repro",
  }),
  spanProcessors: [new BatchSpanProcessor(traceExporter)],
});

sdk.start();
console.log("OpenTelemetry SDK initialized");

setTimeout(() => {
  sdk.shutdown().then(() => {
    console.log("SDK shut down successfully");
    process.exit(0);
  });
}, 5000);
