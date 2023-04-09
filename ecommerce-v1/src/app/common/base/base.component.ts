import { Component, OnDestroy } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { AppState } from "src/app/app.state";
import { StateService } from "../state";

/**
 * Base component giúp defined props hay dùng để tất cả component sau chỉ cần kế thừa và dùng.
 */
@Component({ template: "" })
export class BaseComponent implements OnDestroy {
  destroy$ = new Subject<void>();

  appState!: AppState;

  constructor(protected _state: StateService<AppState>) {
    this.appState = _state.currentState;
    _state.stateChanges$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (changes) => {
        this.appState = changes;
      }
    });
  }

  /**
   * @description dùng đê đăng ký các sự kiện của observables/subject or call APIs
   * Component nào dùng chỉ cần override lại và invoke bên trong ngOnInit là được
   */
  registerCoreLayer() { }

  trackByFn(index: number) {
    return index;
  }

  /**
   * @description để auto hủy luôn cái stream observable/subject đó khi component destroy.
   * Cách dùng => pipe(takeUntil(this.destroy$)) nghĩa là  takeUntil(this.destroy$) giúp các
   * subscribers sẽ luôn nhận dữ liệu khi đã có sự thay đổi cho đến khi component destroy. 
   * Tại vì nếu các subscriber mà subscribe vào 1 subject mà k đc hủy khi k sài nữa, 
   * thì dù component đó có destroy những stream đó vẫn cứ nhận data và do something ....
   * @see https://dev.to/re4388/use-rxjs-takeuntil-to-unsubscribe-1ffj
   */

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}