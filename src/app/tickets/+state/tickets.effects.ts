import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BackendService } from '@shared';
import { API_TOLERANCE } from '@utilities';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap, timeout } from 'rxjs/operators';
import { TicketsState } from './tickets.reducer';
import * as fromActions from './tickets.actions';
import * as fromSelectors from './tickets.selectors';

@Injectable()
export class TicketsEffects {
  loadTicketsEffect$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadTickets),
      mergeMap(() =>
        this.backend.tickets().pipe(
          timeout(API_TOLERANCE),
          map(tickets => fromActions.loadTicketsSuccess({ tickets })),
          catchError(error => of(fromActions.loadTicketsFailure({ error: error.toString() })))
        )
      )
    )
  );

  loadTicketEffect$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.loadTicket),
      concatLatestFrom(() => this.store.select(fromSelectors.selectAvailableTickets)),
      mergeMap(([{ ticketId }, tickets]) => {
        const existingTicket = tickets.find(t => t.id === ticketId);

        return existingTicket
          ? of(fromActions.loadTicketSuccess({ ticket: existingTicket }))
          : this.backend.ticket(ticketId).pipe(
              timeout(API_TOLERANCE),
              map(ticket => {
                if (!ticket) {
                  throw Error('No ticket was returned from the API.');
                }

                return fromActions.loadTicketSuccess({ ticket });
              }),
              catchError(error => of(fromActions.loadTicketFailure({ error: error.toString() })))
            );
      })
    )
  );

  addTicketEffect$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.addTicket),
      mergeMap(({ description, userId }) =>
        this.backend.newTicket({ description }).pipe(
          switchMap(({ id }) =>
            this.backend.update(id, { assigneeId: userId }).pipe(
              map(ticket => fromActions.addTicketSuccess({ ticket })),
              catchError(error => of(fromActions.addTicketFailure({ error: error.toString() })))
            )
          )
        )
      )
    )
  );

  loadTicketsFailureEffect$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromActions.loadTicketsFailure, fromActions.loadTicketFailure),
        tap(() => this.router.navigateByUrl('/'))
      ),
    {
      dispatch: false
    }
  );

  constructor(
    private backend: BackendService,
    private actions: Actions,
    private store: Store<TicketsState>,
    private router: Router
  ) {}
}
