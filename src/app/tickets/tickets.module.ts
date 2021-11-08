import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducer, TicketsEffects, TicketsFacade, ticketsFeatureKey } from './+state';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';
import { UsersModule } from '@users';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(ticketsFeatureKey, reducer),
    EffectsModule.forFeature([TicketsEffects]),
    RouterModule.forChild([
      {
        path: '',
        component: TicketListComponent
      },
      {
        path: 'tickets/:id',
        component: TicketDetailComponent
      }
    ]),
    SharedModule,
    UsersModule,
    FormsModule
  ],
  providers: [TicketsFacade],
  declarations: [TicketListComponent, TicketDetailComponent]
})
export class TicketsModule {}
