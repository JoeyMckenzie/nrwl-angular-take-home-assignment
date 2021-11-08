import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { UsersFacade } from '@users';
import { initialTicketsState, MockTicketsFacade, TicketsFacade } from '../../+state';

import { TicketDetailComponent } from './ticket-detail.component';
import { initialUsersState, MockUsersFacade } from 'src/app/users/+state';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

describe('TicketDetailComponent', () => {
  let component: TicketDetailComponent;
  let fixture: ComponentFixture<TicketDetailComponent>;
  let usersFacade: UsersFacade;
  let ticketsFacade: TicketsFacade;
  let router: Router;

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
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should route the user back to the details page if no valid ID is found in the path', () => {
    // Arrange
    const ticketsFacadeSpy = spyOn(ticketsFacade, 'loadTicket');
    const routerSpy = spyOnProperty(router, 'url', 'get').and.returnValue('/tickets/abc');

    // Act
    component.ngOnInit();

    // Assert
    expect(ticketsFacadeSpy).not.toHaveBeenCalled();
  });

  it('should fire a request to load the current ticket and assignee given a valid URL', () => {
    // Arrange
    const ticketsFacadeSpy = spyOn(ticketsFacade, 'loadTicket');
    const usersFacadeSpy = spyOn(usersFacade, 'loadUser');
    spyOnProperty(router, 'url', 'get').and.returnValue('/tickets/1');

    // Act
    component.ngOnInit();

    // Assert
    expect(ticketsFacadeSpy).toHaveBeenCalledTimes(1);
    expect(usersFacadeSpy).toHaveBeenCalledTimes(1);
  });
});
