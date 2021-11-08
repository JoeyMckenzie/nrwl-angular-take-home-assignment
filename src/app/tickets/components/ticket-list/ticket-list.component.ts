import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersFacade } from '@users';
import { isNullOrUndefined } from '@utilities';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TicketsFacade } from '../../+state';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject();

  ticketDescription = '';
  assignedUserId?: number;
  tickets$ = this.ticketsFacade.availableTickets$;
  users$ = this.usersFacade.availableUsers$;
  loadingTickets$ = this.ticketsFacade.loadingTickets$;
  loadingUsers$ = this.usersFacade.loadingUsers$;

  get formIsValid(): boolean {
    return this.ticketDescription !== '' && !isNullOrUndefined(this.assignedUserId);
  }

  constructor(private ticketsFacade: TicketsFacade, private usersFacade: UsersFacade) {}

  ngOnInit(): void {
    this.ticketsFacade.loadTickets();
    this.usersFacade.loadUsers();
    this.tickets$.pipe(takeUntil(this.unsubscribe$));
    this.users$.pipe(takeUntil(this.unsubscribe$));
    this.loadingTickets$.pipe(takeUntil(this.unsubscribe$));
    this.loadingUsers$.pipe(takeUntil(this.unsubscribe$));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getTicketLink(id: number) {
    return `/tickets/${id}`;
  }

  createTicket(): void {
    if (this.formIsValid) {
      this.ticketsFacade.addTicket(this.ticketDescription, this.assignedUserId!);
    }
  }
}
