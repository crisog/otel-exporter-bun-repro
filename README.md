# OpenTelemetry Bun Runtime Issue

This repository contains a minimal reproduction of an issue with OpenTelemetry when running in Bun runtime.

## Environment

- Bun version: 1.2.2
- OS: macOS arm64
- OpenTelemetry SDK version: 0.57.1

## Issue Description

When trying to initialize the OpenTelemetry SDK with the OTLP HTTP exporter in Bun runtime, the following error occurs:

```
TypeError: Cannot call a class constructor without |new|
    at OTLPExporterBase (/path/to/node_modules/@opentelemetry/otlp-exporter-base/build/src/OTLPExporterBase.js:20:16)
    at new OTLPTraceExporter2 (/path/to/node_modules/@opentelemetry/exporter-trace-otlp-http/build/esm/platform/node/OTLPTraceExporter.js:42:23)
```

This appears to be related to how Bun handles ESM class inheritance with CommonJS modules, specifically in the context of the OpenTelemetry exporters.

## Steps to Reproduce

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Run the reproduction:
   ```bash
   bun run build
   bun run start
   ```

## Expected Behavior

The OpenTelemetry SDK should initialize successfully with the OTLP HTTP exporter.

## Actual Behavior

The application crashes with the constructor error mentioned above.
