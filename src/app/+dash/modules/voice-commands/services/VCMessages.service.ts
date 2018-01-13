import {Injectable} from "@angular/core";

const MESSAGE_DURATION: number = 5e3;

@Injectable()
export class VCMessagesService {
  private _message: string;
  private _timeoutKey: any;

  public get hasMessage(): boolean {
    return this._message != null;
  }

  public get currentMessage(): string {
    return this._message;
  }

  public notify(message: string) {
    this.clearTimeoutKey();

    this._message = null;

    let t = setTimeout(() => {
      this._message = message;
      clearTimeout(t);
    }, 100);

    this._timeoutKey = setTimeout(() => {
      this._message = null;
      this.clearTimeoutKey();
    }, MESSAGE_DURATION);
  }

  private clearTimeoutKey() {
    if (this._timeoutKey != null) {
      clearTimeout(this._timeoutKey);
      this._timeoutKey = null;
    }
  }
}
