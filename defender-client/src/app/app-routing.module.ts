import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { AuthorizationGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'dashboard',
    canActivate: [ AuthorizationGuard ],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'builds',
    canActivate: [ AuthorizationGuard ],
    loadChildren: () => import('./builds/builds.module').then(m => m.BuildsModule)
  },
  {
    path: 'build',
    canActivate: [ AuthorizationGuard ],
    loadChildren: () => import('./build/build.module').then(m => m.BuildModule)
  },
  {
    path: 'deps',
    canActivate: [ AuthorizationGuard ],
    loadChildren: () => import('./dependencies/dependencies.module').then(m => m.DependenciesModule)
  },
  {
    path: 'dep',
    canActivate: [ AuthorizationGuard ],
    loadChildren: () => import('./dependency/dependency.module').then(m => m.DependencyModule)
  },
  {
    path: 'apps',
    canActivate: [ AuthorizationGuard ],
    loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule)
  },
  {
    path: 'app',
    canActivate: [ AuthorizationGuard ],
    loadChildren: () => import('./application/application.module').then(m => m.ApplicationModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
      { provide: APP_BASE_HREF, useValue: '' }
  ]
})
export class AppRoutingModule { }
