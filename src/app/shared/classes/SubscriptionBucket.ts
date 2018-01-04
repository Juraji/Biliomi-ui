import {Subscription} from "rxjs/Subscription";

export class SubscriptionBucket {
  private _subscriptions: Subscription[] = [];

  public add(subscription: Subscription): SubscriptionBucket {
    this._subscriptions.push(subscription);
    return this;
  }

  public unsubscribeAll() {
    this._subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    this._subscriptions = [];
  }
}
