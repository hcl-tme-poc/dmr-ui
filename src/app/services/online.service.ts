import { Injectable } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OnlineService {
  _online$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor() {
    setInterval(() => {
      this.checkOnlineStatus();
    }, 2000);
  }

  private checkOnlineStatus(): void {
    if(navigator){
      this._online$.next(navigator.onLine);
    }
  }

  get online$(): Observable<boolean> {
    return this._online$.asObservable()
      .pipe(
        distinctUntilChanged()
      );
  }

  get online(): boolean {
    if(navigator){
      return navigator.onLine;
    } else {
      return true;
    }
  }
}
