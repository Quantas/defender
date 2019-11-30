import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent, pathMatch: 'full'}
    ])
  ],
  exports: [ RouterModule ]
})
export class HomeModule { }
