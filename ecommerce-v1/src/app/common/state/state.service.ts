import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map, distinctUntilChanged } from "rxjs";
import { cloneDeep } from "./state.utility";
import { STATE_CONFIGS, StateConfigs } from "./state.configs";

@Injectable({ providedIn: "root" })

export class StateService<T>{
  private state$: BehaviorSubject<T>;
  stateChanges$!: Observable<T>;
  
  protected get state(): T {
    return this.state$.getValue();
  }

  get currentState() {
    return cloneDeep(this.state$.getValue());
  }

  constructor(@Inject(STATE_CONFIGS) stateConfigs: StateConfigs) {
    this.state$ = new BehaviorSubject<T>(stateConfigs.initialState);
    this.stateChanges$ = this.state$.asObservable();
  }

  protected select<K>(mapFunc: (state: T) => K): Observable<K> {
    return this.state$.asObservable().pipe(
      map((state: T) => mapFunc(state)),
      distinctUntilChanged()
    );
  }

  protected setState(newState: Partial<T>) {
    this.state$.next({
      ...this.state,
      ...newState,
    });
  };
}