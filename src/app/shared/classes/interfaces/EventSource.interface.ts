export interface IEventSourceOptions {
  withCredentials?: boolean;
}

export interface IOnMessageEvent {
  data: string;
}

export declare class EventSource {
  public static readonly CONNECTING: number; // 0
  public static readonly OPEN: number; // 1
  public static readonly CLOSED: number; // 2

  public url: string;
  public withCredentials: boolean;
  public readyState: number;
  public onopen: (event: Event) => any;
  public onmessage: (event: IOnMessageEvent) => void;
  public onerror: (event: Event) => any;
  public close: () => void;
  public addEventListener: (type: string, h: (event: IOnMessageEvent) => void) => void;
  public removeEventListener: (type: string, h: (event: IOnMessageEvent) => void) => void;

  constructor(url: string, options?: IEventSourceOptions)
}
