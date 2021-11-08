import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () => import('@tickets').then(m => m.TicketsModule)
      },
      {
        path: '**',
        redirectTo: ''
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
