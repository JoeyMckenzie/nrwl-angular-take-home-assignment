export type Maybe<T> = T | undefined | null;

export interface SharedState {
  loading: boolean;
  currentError?: Maybe<string>;
}
