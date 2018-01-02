import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DependencyComponent } from './dependency.component';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';
import {SharkTableModule} from "shark-ng-table";

@NgModule({
  declarations: [
    DependencyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    SharkTableModule,
    RouterModule.forChild([
      { path: ':id', component: DependencyComponent, pathMatch: 'full'}
    ])
  ],
  exports: [ RouterModule ]
})
export class DependencyModule { }
