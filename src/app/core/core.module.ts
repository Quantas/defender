import { NgModule } from '@angular/core';

import { JavaDatePipe } from './javadate.pipe';
import { TitleCasePipe } from './titlecase.pipe';
import { StatusComponent } from './status.component';

@NgModule({
  exports: [
    JavaDatePipe,
    TitleCasePipe,
    StatusComponent
  ],
  entryComponents: [
    StatusComponent
  ],
  declarations: [
    JavaDatePipe,
    TitleCasePipe,
    StatusComponent
  ]
})
export class CoreModule {}
