import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({ providedIn: "root" })
export class SharedService implements OnDestroy {
  private __subject$ = new Subject<any>();
  sharedData$ = this.__subject$.asObservable();

  sharedData(data: any) {
    this.__subject$.next(data);
  }

  ngOnDestroy() {
    this.__subject$.complete();
  }
}