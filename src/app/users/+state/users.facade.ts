import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { UsersState } from './users.reducer';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import * as fromSelectors from './users.selectors';
import * as fromActions from './users.actions';

@Injectable()
export class UsersFacade implements OnDestroy {
  availableUsers$ = this.store.select(fromSelectors.selectAvailableUsers);
  currentUser$ = this.store.select(fromSelectors.selectCurrentUser);
  loadingUsers$ = this.store.select(fromSelectors.selectLoading);

  private readonly unsubscribe$ = new Subject();

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  constructor(private store: Store<UsersState>) {}

  loadUsers(): void {
    this.availableUsers$
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(users => users.length === 0)
      )
      .subscribe(() => this.store.dispatch(fromActions.loadUsers()));
  }

  loadUser(userId: number): void {
    this.store.dispatch(fromActions.loadUser({ userId }));
  }

  resetUser(): void {
    this.store.dispatch(fromActions.resetUser());
  }
}
