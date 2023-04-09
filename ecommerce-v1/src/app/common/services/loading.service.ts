import { Injectable } from '@angular/core';
import { ILoading } from '@common/models';
import { Subject } from 'rxjs';
@Injectable({ providedIn: "root" })
export class LoadingSerivce implements ILoading {
  private __state: Subject<boolean> = new Subject();
  getState() {
    return this.__state.asObservable();
  }

  setLoading(value: boolean) {
    this.__state.next(value);
  }
}

