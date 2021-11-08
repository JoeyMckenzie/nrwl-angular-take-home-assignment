import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Maybe, Ticket, User } from '@types';

/**
 * This service acts as a mock backend.
 *
 * You are free to modify it as you see.
 */

function randomDelay() {
  return Math.random() * 1000;
}

@Injectable()
export class BackendService {
  storedTickets: Ticket[] = [
    {
      id: 0,
      description: 'Install a monitor arm',
      assigneeId: 111,
      completed: false
    },
    {
      id: 1,
      description: 'Move the desk to the new location',
      assigneeId: 111,
      completed: true
    }
  ];

  storedUsers: User[] = [
    { id: 111, name: 'Victor' },
    { id: 222, name: 'Jack' }
  ];

  lastId = 1;

  private findTicketById = (id: number) => this.storedTickets.find(ticket => ticket.id === +id);

  private findUserById = (id: number) => this.storedUsers.find(user => user.id === +id);

  tickets() {
    console.info('Loading tickets');
    return of(this.storedTickets).pipe(delay(randomDelay()));
  }

  ticket(id: number): Observable<Maybe<Ticket>> {
    console.info(`Loading ticket ${id}`);
    return of(this.findTicketById(id)).pipe(delay(randomDelay()));
  }

  users() {
    console.info('Loading users');
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  user(id: number) {
    console.info(`Loading user ${id}`);
    return of(this.findUserById(id)).pipe(delay(randomDelay()));
  }

  newTicket(payload: { description: string }) {
    console.log(`Creating ticket ${payload.description}`);
    const newTicket: Ticket = {
      id: ++this.lastId,
      description: payload.description,
      assigneeId: null,
      completed: false
    };

    this.storedTickets = this.storedTickets.concat(newTicket);

    return of(newTicket).pipe(delay(randomDelay()));
  }

  assign(ticketId: number, userId: number) {
    console.info(`Assigning ticket ${ticketId} to user ${userId}`);
    return this.update(ticketId, { assigneeId: userId });
  }

  complete(ticketId: number, completed: boolean) {
    return this.update(ticketId, { completed });
  }

  update(ticketId: number, updates: Partial<Omit<Ticket, 'id'>>) {
    console.info(`Updating ticket ${ticketId}`);
    const foundTicket = this.findTicketById(ticketId);

    if (!foundTicket) {
      return throwError(new Error('ticket not found'));
    }

    const updatedTicket = { ...foundTicket, ...updates };

    this.storedTickets = this.storedTickets.map(t => (t.id === ticketId ? updatedTicket : t));

    return of(updatedTicket).pipe(delay(randomDelay()));
  }
}
