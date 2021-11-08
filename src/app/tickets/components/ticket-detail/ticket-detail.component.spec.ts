import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { UsersFacade } from '@users';
import { initialTicketsState, MockTicketsFacade, TicketsFacade } from '../../+state';

import { TicketDetailComponent } from './ticket-detail.component';
import { initialUsersState, MockUsersFacade } from 'src/app/users/+state';

describe('TicketDetailComponent', () => {
  let component: TicketDetailComponent;
  let fixture: ComponentFixture<TicketDetailComponent>;
  let usersFacade: UsersFacade;
  let ticketsFacade: TicketsFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TicketDetailComponent],
      providers: [
        provideMockStore({ initialState: initialTicketsState }),
        provideMockStore({ initialState: initialUsersState }),
        {
          provide: TicketsFacade,
          useClass: MockTicketsFacade
        },
        {
          provide: UsersFacade,
          useClass: MockUsersFacade
        }
      ]
    }).compileComponents();

    usersFacade = TestBed.inject(UsersFacade);
    ticketsFacade = TestBed.inject(TicketsFacade);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
