import { Maybe, Ticket } from '@types';
import { Observable } from 'rxjs';

export interface AbstractTicketsFacade {
  availableTickets$: Observable<Ticket[]>;
  filteredTickets$: Observable<Ticket[]>;
  currentTicket$: Observable<Maybe<Ticket>>;
  loadingTickets$: Observable<boolean>;
  loadTickets: () => void;
  loadTicket: (ticketId: number) => void;
  filterTickets: (description: string) => void;
  addTicket: (description: string, userId: number) => void;
  resetTicket: () => void;
}
