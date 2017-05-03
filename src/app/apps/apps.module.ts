import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppsComponent } from './apps.component';

@NgModule({
  declarations: [
    AppsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AppsComponent, pathMatch: 'full'}
    ])
  ],
  exports: [ RouterModule ]
})
export class AppsModule { }
