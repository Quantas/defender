import { Component, OnInit } from '@angular/core';
import { Info, InfoService } from './info/info.service';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar class="nav">
      <button mat-icon-button (click)="sidenav.toggle()" fxShow fxHide.gt-sm="true">
        <mat-icon>menu</mat-icon>
      </button>
      <a mat-button [routerLink]="['/dashboard']">Home</a>
      <span fxShow fxHide.lt-md="true">
        <a mat-button [routerLinkActive]="'active'" [routerLink]="['/dashboard']">Dashboard</a>
        <a mat-button [routerLinkActive]="'active'" [routerLink]="['/deps/1']">Dependencies</a>
        <a mat-button [routerLinkActive]="'active'" [routerLink]="['/apps/1']">Apps</a>
        <a mat-button [routerLinkActive]="'active'" [routerLink]="['/builds/1']">Builds</a>
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
    <footer>
      &copy;2018 Quantasnet - {{ info.hostname }}
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
        padding: 0.5rem;
      }
    `
  ]
})
export class AppComponent implements OnInit {
  info: Info = {hostname: ''};

  opened = false;

  constructor(private infoService: InfoService) {}

  ngOnInit(): void {
    this.infoService.infoUpdate.subscribe((info: Info) => this.info = info);
  }

  closeSidebar(): void {
    this.opened = false;
  }
}
