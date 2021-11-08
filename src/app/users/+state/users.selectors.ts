import { createFeatureSelector, createSelector } from '@ngrx/store';
import { usersFeatureKey, UsersState } from './users.reducer';

const usersFeatureSelector = createFeatureSelector<UsersState>(usersFeatureKey);

export const selectAvailableUsers = createSelector(usersFeatureSelector, state => state.availableUsers);

export const selectCurrentUser = createSelector(usersFeatureSelector, state => state.currentUser);

export const selectLoading = createSelector(usersFeatureSelector, state => state.loading);
