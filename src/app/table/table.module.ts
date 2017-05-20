import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TablePaginationComponent } from './table.pagination.component';
import { TableComponent } from './table.component';
import { FormsModule } from '@angular/forms';
import { LocalFilterPipe } from './localfilter.pipe';
import { TableUtils } from './table.utils';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    TableComponent,
    TablePaginationComponent,
    LocalFilterPipe
  ],
  exports: [
    TableComponent,
    TablePaginationComponent
  ],
  providers: [
    TableUtils
  ]
})
export class TableModule { }
