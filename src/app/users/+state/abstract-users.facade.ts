import { User } from '@types';
import { Observable } from 'rxjs';

export interface AbstractUsersFacade {
  availableUsers$: Observable<User[]>;
  currentUser$: Observable<User>;
  loadingUsers$: Observable<boolean>;
  loadUsers: () => void;
  loadUser: (userId: number) => void;
  resetUser: () => void;
}
