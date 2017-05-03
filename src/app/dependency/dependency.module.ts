import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DependencyComponent } from './dependency.component';

@NgModule({
  declarations: [
    DependencyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: ':id', component: DependencyComponent, pathMatch: 'full'}
    ])
  ],
  exports: [ RouterModule ]
})
export class DependencyModule { }
