import { Component, OnInit } from '@angular/core';
import { Info, InfoService } from './info/info.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar class="nav">
      <button mat-icon-button (click)="sidenav.toggle()" fxShow fxHide.gt-sm="true">
        <mat-icon>menu</mat-icon>
      </button>
      <a mat-button [routerLink]="['/home']">Home</a>
      <span fxShow fxHide.lt-md="true">
        <ng-container *ngIf="!isAuthenticated">
          <button mat-button (click)="login()">Login</button>
        </ng-container>
        <ng-container *ngIf="isAuthenticated">
          <a mat-button [routerLinkActive]="'active'" [routerLink]="['/dashboard']">Dashboard</a>
          <a mat-button [routerLinkActive]="'active'" [routerLink]="['/deps/1']">Dependencies</a>
          <a mat-button [routerLinkActive]="'active'" [routerLink]="['/apps/1']">Apps</a>
          <a mat-button [routerLinkActive]="'active'" [routerLink]="['/builds/1']">Builds</a>
          <button mat-button (click)="logout()">Logout</button>
        </ng-container>
      </span>
    </mat-toolbar>
    <mat-sidenav-container>
      <mat-sidenav #sidenav [mode]="'over'" [(opened)]="opened" class="bottom-to-top">
        <mat-nav-list (click)="closeSidebar()">
          <a mat-list-item [routerLink]="['/dashboard']">Dashboard</a>
          <a mat-list-item [routerLink]="['/deps/1']">Dependencies</a>
          <a mat-list-item [routerLink]="['/apps/1']">Apps</a>
          <a mat-list-item [routerLink]="['/builds/1']">Builds</a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <div class="wrapper">
          <main>
            <router-outlet></router-outlet>
          </main>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
    <footer fxLayout="row">
      <span>&copy; 2019 Quantasnet</span>
      <span fxFlex fxLayoutAlign="end start">{{ info.hostname }}</span>
    </footer>
  `,
  styles: [
    `
      .nav {
        background-color: #333;
        color: white;
      }

      .mat-toolbar-single-row {
        height: 2rem;
      }

      .wrapper {
        margin: 0;
        padding: 0;
        height: 100%;
      }

      main {
        padding-left: 2rem;
        padding-right: 2rem;
        padding-bottom: 2rem;
      }

      footer {
        background-color: #333;
        color: white;
        font-size: 0.9rem;
        padding: 0.25rem;
      }
    `
  ]
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean;
  userData: any;

  info: Info = {hostname: ''};

  opened = false;

  constructor(private infoService: InfoService, public oidcSecurityService: OidcSecurityService) {
    if (this.oidcSecurityService.moduleSetup) {
      this.doCallbackLogicIfRequired();
    } else {
      this.oidcSecurityService.onModuleSetup.subscribe(() => {
          this.doCallbackLogicIfRequired();
      });
    }
  }

  ngOnInit(): void {
    this.oidcSecurityService.getIsAuthorized().subscribe(auth => {
      this.isAuthenticated = auth;

      this.infoService.infoUpdate.subscribe(info => this.info = info);
    });

    this.oidcSecurityService.getUserData().subscribe(userData => {
        this.userData = userData;
    });
  }

  closeSidebar(): void {
    this.opened = false;
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff();
  }

  private doCallbackLogicIfRequired() {
    // Will do a callback, if the url has a code and state parameter.
    this.oidcSecurityService.authorizedCallbackWithCode(window.location.toString());
  }
}
