import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BackendService } from '@shared';
import { API_TOLERANCE } from '@utilities';
import { of } from 'rxjs';
import { catchError, map, mergeMap, timeout } from 'rxjs/operators';
import * as fromActions from './users.actions';

@Injectable()
export class UsersEffects {
  loadUsersEffect$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadUsers),
      mergeMap(() =>
        this.backend.users().pipe(
          timeout(API_TOLERANCE),
          map(users => fromActions.loadUsersSuccess({ users })),
          catchError(error => of(fromActions.loadUserFailure({ error })))
        )
      )
    )
  );

  loadUserEffect$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadUser),
      mergeMap(({ userId }) =>
        this.backend.user(userId).pipe(
          timeout(API_TOLERANCE),
          map(user => {
            if (!user) {
              throw Error('No user found');
            }

            return fromActions.loadUserSuccess({ user });
          }),
          catchError(error => of(fromActions.loadUserFailure({ error })))
        )
      )
    )
  );

  constructor(private backend: BackendService, private actions: Actions) {}
}
