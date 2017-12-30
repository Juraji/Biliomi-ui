declare var EventSource: {
  prototype: EventSource;
  new(url: string, options?: EventSourceOptions): EventSource;
};

interface EventSource extends EventTarget {
  readonly url: string;
  readonly withCredentials: boolean;
  readonly CONNECTING: number;
  readonly OPEN: number;
  readonly CLOSED: number;
  readonly readyState: number;
  onopen: (evt: MessageEvent) => any;
  onmessage: (evt: MessageEvent) => any;
  onerror: (evt: MessageEvent) => any;

  close(): void;
}

interface EventSourceOptions {
  readonly withCredentials: boolean;
}
