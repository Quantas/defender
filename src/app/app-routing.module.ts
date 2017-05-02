import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'builds',
    pathMatch: 'full'
  },
  {
    path: 'builds',
    loadChildren: './builds/builds.module#BuildsModule'
  }
  ,
  {
    path: 'build',
    loadChildren: './build/build.module#BuildModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
      { provide: APP_BASE_HREF, useValue: '' },
      { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class AppRoutingModule { }
