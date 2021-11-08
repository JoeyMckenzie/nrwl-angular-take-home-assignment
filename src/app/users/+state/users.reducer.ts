import { Action, createReducer, on } from '@ngrx/store';
import { Maybe, User } from '@types';
import { SharedState } from 'src/app/types/shared.types';
import * as fromActions from './users.actions';

export const usersFeatureKey = 'users';

export interface UsersState extends SharedState {
  availableUsers: User[];
  currentUser?: Maybe<User>;
}

export const initialUsersState: UsersState = {
  availableUsers: [],
  loading: false
};

type FailureAction = ReturnType<typeof fromActions.loadUsersFailure> | ReturnType<typeof fromActions.loadUserFailure>;

const setStateWithError = (state: UsersState, { error }: FailureAction): UsersState => ({
  ...state,
  loading: false,
  currentError: error
});

const usersReducer = createReducer(
  initialUsersState,
  on(fromActions.loadUsers, state => ({
    ...state,
    loading: true
  })),
  on(fromActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    availableUsers: users
  })),
  on(fromActions.loadUsersFailure, setStateWithError),
  on(fromActions.loadUser, state => ({
    ...state,
    loading: true
  })),
  on(fromActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    currentUser: user
  })),
  on(fromActions.loadUserFailure, setStateWithError),
  on(fromActions.resetUser, state => ({
    ...state,
    currentUser: undefined
  }))
);

export function reducer(state: UsersState | undefined, action: Action) {
  return usersReducer(state, action);
}
