import {Injectable} from "@angular/core";

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
    this._message = message;

    this.clearTimeoutKey();
    this._timeoutKey = setTimeout(() => {
      this._message = null;
      this.clearTimeoutKey();
    }, 3000);
  }

  private clearTimeoutKey() {
    if (this._timeoutKey != null) {
      clearTimeout(this._timeoutKey);
      this._timeoutKey = null;
    }
  }
}
