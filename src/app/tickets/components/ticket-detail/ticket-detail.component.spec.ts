import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore } from '@ngrx/store/testing';
import { UsersFacade } from '@users';
import { TicketsFacade } from '../../+state';

import { TicketDetailComponent } from './ticket-detail.component';

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
        {
          provide: UsersFacade,
          useValue: MockStore
        },
        {
          provide: TicketsFacade,
          useValue: MockStore
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
