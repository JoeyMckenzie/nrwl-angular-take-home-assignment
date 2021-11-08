import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { TicketsState } from './tickets.reducer';
import * as fromSelectors from './tickets.selectors';
import * as fromActions from './tickets.actions';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Injectable()
export class TicketsFacade implements OnDestroy {
  availableTickets$ = this.store.select(fromSelectors.selectAvailableTickets);
  filteredTickets$ = this.store.select(fromSelectors.selectFilteredTickets);
  currentTicket$ = this.store.select(fromSelectors.selectCurrentTicket);
  loadingTickets$ = this.store.select(fromSelectors.selectLoading);

  private readonly unsubscribe$ = new Subject();

  constructor(private store: Store<TicketsState>) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadTickets(): void {
    this.availableTickets$
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(tickets => tickets.length === 0)
      )
      .subscribe(() => this.store.dispatch(fromActions.loadTickets()));
  }

  loadTicket(ticketId: number): void {
    this.store.dispatch(fromActions.loadTicket({ ticketId }));
  }

  resetSelectedTicket(): void {}

  filterTickets(description: string): void {
    this.store.dispatch(fromActions.filterTickets({ description }));
  }

  addTicket(description: string, userId: number): void {
    this.store.dispatch(fromActions.addTicket({ description, userId }));
  }

  resetTicket(): void {
    this.store.dispatch(fromActions.resetTicket());
  }
}
