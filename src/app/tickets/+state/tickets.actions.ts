import { createAction, props } from '@ngrx/store';
import { Ticket } from '@types';

export const loadTickets = createAction('[Tickets] Load all');
export const loadTicketsSuccess = createAction('[Tickets] Load all success', props<{ tickets: Ticket[] }>());
export const loadTicketsFailure = createAction('[Tickets] Load all error', props<{ error: string }>());

export const loadTicket = createAction('[Ticket] Load one', props<{ ticketId: number }>());
export const loadTicketSuccess = createAction('[Tickets] Load one success', props<{ ticket: Ticket }>());
export const loadTicketFailure = createAction('[Tickets] Load one error', props<{ error: string }>());

export const addTicket = createAction('[Tickets] Add', props<{ description: string; userId: number }>());
export const addTicketSuccess = createAction('[Tickets] Add success', props<{ ticket: Ticket }>());
export const addTicketFailure = createAction('[Tickets] Add failure', props<{ error: string }>());

export const filterTickets = createAction('[Tickets] Filter', props<{ description: string }>());

export const resetTicket = createAction('[Tickets] Reset');
