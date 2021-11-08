import { Maybe } from './shared.types';

export type Ticket = {
  id: number;
  description: string;
  assigneeId?: Maybe<number>;
  completed: boolean;
};
