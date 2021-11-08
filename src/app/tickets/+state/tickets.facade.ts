import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TicketsState } from './tickets.reducer';
import * as fromSelectors from './tickets.selectors';
import * as fromActions from './tickets.actions';
import { filter } from 'rxjs/operators';
import { AbstractTicketsFacade } from './abstract-tickets.facade';

@Injectable()
export class TicketsFacade implements AbstractTicketsFacade {
  availableTickets$ = this.store.select(fromSelectors.selectAvailableTickets);
  filteredTickets$ = this.store.select(fromSelectors.selectFilteredTickets);
  currentTicket$ = this.store.select(fromSelectors.selectCurrentTicket);
  loadingTickets$ = this.store.select(fromSelectors.selectLoading);

  constructor(private store: Store<TicketsState>) {}

  loadTickets(): void {
    this.availableTickets$
      .pipe(filter(tickets => tickets.length === 0))
      .subscribe(() => this.store.dispatch(fromActions.loadTickets()));
  }

  loadTicket(ticketId: number): void {
    this.store.dispatch(fromActions.loadTicket({ ticketId }));
  }

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
