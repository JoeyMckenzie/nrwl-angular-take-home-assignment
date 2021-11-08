import { Injectable } from '@angular/core';
import { UsersFacade } from './users.facade';

@Injectable()
export class MockUsersFacade extends UsersFacade {}
