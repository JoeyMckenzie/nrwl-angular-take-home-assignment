import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ticketsFeatureKey, TicketsState } from './tickets.reducer';

const ticketsFeatureSelector = createFeatureSelector<TicketsState>(ticketsFeatureKey);

export const selectAvailableTickets = createSelector(ticketsFeatureSelector, state => state.availableTickets);

export const selectFilteredTickets = createSelector(ticketsFeatureSelector, state => state.filteredTickets);

export const selectCurrentTicket = createSelector(ticketsFeatureSelector, state => {
  console.log(state.currentTicket);
  return state.currentTicket;
});

export const selectLoading = createSelector(ticketsFeatureSelector, state => state.loading);
