import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { UsersFacade } from '@users';
import { initialUsersState, MockUsersFacade } from 'src/app/users/+state';
import { initialTicketsState, MockTicketsFacade, TicketsFacade } from '../../+state';

import { TicketListComponent } from './ticket-list.component';

describe('TicketListComponent', () => {
  let component: TicketListComponent;
  let fixture: ComponentFixture<TicketListComponent>;
  let usersFacade: UsersFacade;
  let ticketsFacade: TicketsFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TicketListComponent],
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
    fixture = TestBed.createComponent(TicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Act/Assert
    expect(component).toBeTruthy();
  });
});
