import { LogEntry, LogProvider } from '../types';
import ddTrace from 'dd-trace';
import formats from 'dd-trace/ext/formats';

export class DatadogLogger implements LogProvider {
  private tracer: ddTrace.Tracer;

  constructor() {
    this.tracer = ddTrace.init({
      // Datadog configuration
    });
  }

  log(logEntry: LogEntry): void {
    const span = this.tracer.scope().active();
    if (span) {
      this.tracer.inject(span.context(), formats.LOG, logEntry);
    }
  }
}
