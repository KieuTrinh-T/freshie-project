import { Observable } from "rxjs";

export interface ILoading {
  getState: () => Observable<boolean>,
  setLoading: (value: boolean) => void
}