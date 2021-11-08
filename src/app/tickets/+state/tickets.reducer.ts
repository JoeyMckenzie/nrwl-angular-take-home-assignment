import { Action, createReducer, on } from '@ngrx/store';
import { Maybe, Ticket } from '@types';
import * as fromActions from './tickets.actions';

export const ticketsFeatureKey = 'tickets';

export interface TicketsState {
  availableTickets: Ticket[];
  filteredTickets: Ticket[];
  loading: boolean;
  currentTicket?: Maybe<Ticket>;
  currentError?: Maybe<string>;
}

export const initialTicketsState: TicketsState = {
  availableTickets: [],
  filteredTickets: [],
  loading: false
};

type FailureAction =
  | ReturnType<typeof fromActions.loadTicketsFailure>
  | ReturnType<typeof fromActions.loadTicketFailure>
  | ReturnType<typeof fromActions.addTicketFailure>;

const setStateWithError = (state: TicketsState, { error }: FailureAction): TicketsState => ({
  ...state,
  loading: false,
  currentError: error
});

const ticketsReducer = createReducer(
  initialTicketsState,
  on(fromActions.loadTickets, state => ({
    ...state,
    loading: true
  })),
  on(fromActions.loadTicketsSuccess, (state, { tickets }) => ({
    ...state,
    loading: false,
    availableTickets: tickets,
    filteredTickets: tickets
  })),
  on(fromActions.loadTicketsFailure, setStateWithError),
  on(fromActions.loadTicket, state => ({
    ...state,
    loading: true
  })),
  on(fromActions.loadTicketSuccess, (state, { ticket }) => ({
    ...state,
    loading: false,
    currentTicket: ticket
  })),
  on(fromActions.loadTicketFailure, setStateWithError),
  on(fromActions.addTicket, state => ({
    ...state,
    loading: true
  })),
  on(fromActions.addTicket, state => ({
    ...state,
    loading: true
  })),
  on(fromActions.addTicketSuccess, (state, { ticket }) => ({
    ...state,
    loading: false,
    availableTickets: [...state.availableTickets, ticket]
  })),
  on(fromActions.addTicketFailure, setStateWithError),
  on(fromActions.resetTicket, state => ({
    ...state,
    currentTicket: undefined
  }))
);

export function reducer(state: TicketsState | undefined, action: Action) {
  return ticketsReducer(state, action);
}
