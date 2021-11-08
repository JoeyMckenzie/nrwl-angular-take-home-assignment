import { Injectable } from '@angular/core';
import { AbstractUsersFacade } from './abstract-users.facade';
import { User } from '@types';
import { Observable, of } from 'rxjs';

@Injectable()
export class MockUsersFacade implements AbstractUsersFacade {
  availableUsers$: Observable<User[]> = of([
    {
      id: 0,
      name: 'Mock user'
    },
    {
      id: 1,
      name: 'Another mock user'
    }
  ] as User[]);

  currentUser$: Observable<User> = of({
    id: 0,
    name: 'Mock user'
  });

  loadingUsers$: Observable<boolean> = of(false);

  loadUsers() {
    console.log('loading users');
  }

  loadUser(userId: number) {
    console.log('loading users');
  }

  resetUser() {
    console.log('resetting user');
  }
}
