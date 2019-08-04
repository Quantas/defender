import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'builds',
    loadChildren: () => import('./builds/builds.module').then(m => m.BuildsModule)
  },
  {
    path: 'build',
    loadChildren: () => import('./build/build.module').then(m => m.BuildModule)
  },
  {
    path: 'deps',
    loadChildren: () => import('./dependencies/dependencies.module').then(m => m.DependenciesModule)
  },
  {
    path: 'dep',
    loadChildren: () => import('./dependency/dependency.module').then(m => m.DependencyModule)
  },
  {
    path: 'apps',
    loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./application/application.module').then(m => m.ApplicationModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
      { provide: APP_BASE_HREF, useValue: '' }
  ]
})
export class AppRoutingModule { }
