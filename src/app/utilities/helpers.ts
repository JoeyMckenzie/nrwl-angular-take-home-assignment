import { Maybe } from '@types';

export function isNullOrUndefined(objectToValidate?: Maybe<any>): boolean {
  return objectToValidate === null || objectToValidate === undefined;
}
