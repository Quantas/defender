import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ApplicationComponent } from './application.component';

@NgModule({
  declarations: [
    ApplicationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: ':id', component: ApplicationComponent, pathMatch: 'full'}
    ])
  ],
  exports: [ RouterModule ]
})
export class ApplicationModule { }
