import { Injectable } from '@angular/core';
import { Ticket, Maybe } from '@types';
import { Observable, of } from 'rxjs';
import { AbstractTicketsFacade } from './abstract-tickets.facade';

export class MockTicketsFacade implements AbstractTicketsFacade {
  availableTickets$: Observable<Ticket[]> = of([
    {
      id: 0,
      description: 'Mock unassigned ticket',
      completed: false
    },
    {
      id: 1,
      description: 'Mock assigned ticket',
      completed: true,
      assigneeId: 1
    }
  ] as Ticket[]);

  filteredTickets$: Observable<Ticket[]> = of([
    {
      id: 1,
      description: 'Mock assigned ticket',
      completed: true,
      assigneeId: 1
    }
  ] as Ticket[]);

  currentTicket$: Observable<Maybe<Ticket>> = of({
    id: 1,
    description: 'Mock assigned ticket',
    completed: true,
    assigneeId: 1
  });

  loadingTickets$: Observable<boolean> = of(false);

  loadTickets() {
    console.log('loading tickets');
  }

  loadTicket(ticketId: number) {
    console.log('loading ticket');
  }

  filterTickets(description: string) {
    console.log('filtering tickets');
  }

  addTicket(description: string, userId: number) {
    console.log('adding ticket');
  }

  resetTicket() {
    console.log('resetting ticket');
  }
}
