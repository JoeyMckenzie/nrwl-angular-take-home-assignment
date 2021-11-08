import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UsersState } from './users.reducer';
import { filter } from 'rxjs/operators';
import * as fromSelectors from './users.selectors';
import * as fromActions from './users.actions';

@Injectable()
export class UsersFacade {
  availableUsers$ = this.store.select(fromSelectors.selectAvailableUsers);
  currentUser$ = this.store.select(fromSelectors.selectCurrentUser);
  loadingUsers$ = this.store.select(fromSelectors.selectLoading);

  constructor(private store: Store<UsersState>) {}

  loadUsers(): void {
    this.availableUsers$
      .pipe(filter(users => users.length === 0))
      .subscribe(() => this.store.dispatch(fromActions.loadUsers()));
  }

  loadUser(userId: number): void {
    this.store.dispatch(fromActions.loadUser({ userId }));
  }

  resetUser(): void {
    this.store.dispatch(fromActions.resetUser());
  }
}
