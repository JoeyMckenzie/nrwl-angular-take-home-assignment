import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducer, UsersFacade, usersFeatureKey } from './+state';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './+state/users.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(usersFeatureKey, reducer),
    EffectsModule.forFeature([UsersEffects]),
    SharedModule
  ],
  providers: [UsersFacade]
})
export class UsersModule {}
