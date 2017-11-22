// Type definitions for Server-Sent Events
// Specification: http://dev.w3.org/html5/eventsource/
// Definitions by: Yannik Hampe <https://github.com/yankee42>

declare const EventSource: sse.IEventSource;

declare module sse {

  interface IEventSource {
    new (url: string, eventSourceInitDict?: IEventSourceInit): IEventSource;

    url: string;
    withCredentials: boolean;
    CONNECTING: number; // 0
    OPEN: number; // 1
    CLOSED: number; // 2
    readyState: number;
    onopen: (event: Event) => any;
    onmessage: (event: IOnMessageEvent) => void;
    onerror: (event: Event) => any;
    close: () => void;
    addEventListener: (type: string, h: (event: IOnMessageEvent) => void) => void;
    removeEventListener: (type: string, h: (event: IOnMessageEvent) => void) => void;
  }

  interface IEventSourceInit {
    withCredentials?: boolean;
  }

  interface IOnMessageEvent {
    data: string;
  }
}
