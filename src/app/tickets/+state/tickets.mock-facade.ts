import { Ticket, Maybe } from '@types';
import { Observable, of, Subject } from 'rxjs';
import { TicketsFacade } from './tickets.facade';

export class MockTicketsFacade implements TicketsFacade {
  unsubscribe$: Subject<unknown> = new Subject();

  availableTickets$: Observable<Ticket[]> = of([
    {
      id: 1,
      description: 'Mock ticket',
      completed: false
    },
    {
      id: 1,
      description: 'Another mock ticket',
      completed: true
    }
  ] as Ticket[]);

  filteredTickets$: Observable<Ticket[]> = of([
    {
      id: 1,
      description: 'Mock ticket',
      completed: false
    }
  ] as Ticket[]);

  currentTicket$: Observable<Maybe<Ticket>> = of({
    id: 1,
    description: 'Another mock ticket',
    completed: true
  } as Ticket);

  loadingTickets$: Observable<boolean> = of(false);

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  loadTickets(): void {
    throw new Error('Method not implemented.');
  }

  loadTicket(ticketId: number): void {
    throw new Error('Method not implemented.');
  }

  resetSelectedTicket(): void {
    throw new Error('Method not implemented.');
  }

  filterTickets(description: string): void {
    throw new Error('Method not implemented.');
  }

  addTicket(description: string, userId: number): void {
    throw new Error('Method not implemented.');
  }

  resetTicket(): void {
    throw new Error('Method not implemented.');
  }
}
