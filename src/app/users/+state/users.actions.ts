import { createAction, props } from '@ngrx/store';
import { User } from '@types';

export const loadUsers = createAction('[Users] Load all');
export const loadUsersSuccess = createAction('[Users] Load all success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[Users] Load all error', props<{ error: string }>());

export const loadUser = createAction('[User] Load one', props<{ userId: number }>());
export const loadUserSuccess = createAction('[Users] Load one success', props<{ user: User }>());
export const loadUserFailure = createAction('[Users] Load one error', props<{ error: string }>());

export const resetUser = createAction('[User] Reset');
