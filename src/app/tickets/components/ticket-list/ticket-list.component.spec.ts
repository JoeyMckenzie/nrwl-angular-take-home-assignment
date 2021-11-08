import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
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
    expect(component).toBeTruthy();
  });

  it('should fire the request to load users and tickets on mount', () => {
    // Arrange
    const usersFacadeSpy = spyOn(usersFacade, 'loadUsers');
    const ticketsFacadeSpy = spyOn(ticketsFacade, 'loadTickets');

    // Act
    component.ngOnInit();

    // Assert
    expect(usersFacadeSpy).toHaveBeenCalledTimes(1);
    expect(ticketsFacadeSpy).toHaveBeenCalledTimes(1);
  });

  it('should fire the request to create a ticket if the form is valid', () => {
    // Arrange
    const ticketsFacadeSpy = spyOn(ticketsFacade, 'addTicket');
    spyOnProperty(component, 'formIsValid', 'get').and.returnValue(true);

    // Act
    component.createTicket();

    // Assert
    expect(ticketsFacadeSpy).toHaveBeenCalledTimes(1);
  });

  it('should not fire the request to create a ticket if the form is invalid', () => {
    // Arrange
    const ticketsFacadeSpy = spyOn(ticketsFacade, 'addTicket');
    spyOnProperty(component, 'formIsValid', 'get').and.returnValue(false);

    // Act
    component.createTicket();

    // Assert
    expect(ticketsFacadeSpy).not.toHaveBeenCalled();
  });
});
