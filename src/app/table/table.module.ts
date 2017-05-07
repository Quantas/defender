import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TablePaginationComponent } from './table.pagination.component';
import { TableComponent } from './table.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    TableComponent,
    TablePaginationComponent
  ],
  exports: [
    TableComponent,
    TablePaginationComponent
  ]
})
export class TableModule { }
