import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersFacade } from '@users';
import { isNullOrUndefined } from '@utilities';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { TicketsFacade } from '../../+state';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html'
})
export class TicketDetailComponent implements OnInit, OnDestroy {
  ticket$ = this.ticketsFacade.currentTicket$;
  user$ = this.usersFacade.currentUser$;
  loadingTicket$ = this.ticketsFacade.loadingTickets$;
  ticketCompleteStatus = false;

  private readonly unsubscribe$ = new Subject();

  constructor(private ticketsFacade: TicketsFacade, private usersFacade: UsersFacade, private router: Router) {}

  ngOnInit(): void {
    this.ticket$.pipe(takeUntil(this.unsubscribe$));
    this.user$.pipe(takeUntil(this.unsubscribe$));
    this.loadingTicket$.pipe(takeUntil(this.unsubscribe$));

    const currentTicket = this.router.url?.split('/')?.[2] ?? '';
    const parsedTicketNumber = parseInt(currentTicket, 10);

    if (isNaN(parsedTicketNumber)) {
      this.router.navigateByUrl('/');
    }

    this.ticketsFacade.loadTicket(parsedTicketNumber);

    this.ticket$
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(ticket => !isNullOrUndefined(ticket) && !isNullOrUndefined(ticket!.assigneeId))
      )
      .subscribe(ticket => {
        this.ticketCompleteStatus = ticket!.completed;
        this.usersFacade.loadUser(ticket!.assigneeId!);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.ticketsFacade.resetTicket();
    this.usersFacade.resetUser();
  }

  // TODO: Fire off request to update ticket when toggle is checked
  updateTicketStatus(): void {
    this.ticketCompleteStatus = !this.ticketCompleteStatus;
  }
}
