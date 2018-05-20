import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';
@Injectable()
export class GlobalState {

  private _data = new Subject<Object>();
  private _dataStream$ = this._data.asObservable();

  private _subscriptions: Map<string, Array<Function>> = new Map<string, Array<Function>>();

  constructor() {
    this._dataStream$.subscribe((data) => this._onEvent(data));
  }

  notifyDataChanged(event, value) {
    const current = this._data[event];
    if (current !== value) {
      this._data[event] = value;

      this._data.next({
        event: event,
        data: this._data[event]
      });
    }
    if (environment.production !== true) {
      console.log('%c action :' + event + ',nextState :' + JSON.stringify(this._data[event]), 'background: #222; color: #bada55');
    }
  }

  subscribe(event: string, callback: Function) {
    const subscribers = this._subscriptions.get(event) || [];
    subscribers.push(callback);
    this._subscriptions.set(event, subscribers);
    if (this._data[event] !== undefined) {
      callback.call(null, this._data[event]);
    }
    if (environment.production !== true) {
      console.log('%c subscribe :' + event + ',currentState :' + JSON.stringify(this._data[event]), 'background: #222; color: #bada55');
    }
  }

  _onEvent(data: any) {
    const subscribers = this._subscriptions.get(data['event']) || [];

    subscribers.forEach((callback) => {
      callback.call(null, data['data']);
    });
  }
}
