import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrapper">
      <div class="top">
        <div class="nav">
          <ul>
            <li><a [routerLink]="['/dashboard']">Quantasnet Defender</a></li>
            <li><a [routerLink]="['/dashboard']" [routerLinkActive]="'active'">Dashboard</a></li>
            <li><a [routerLink]="['/deps/1']" [routerLinkActive]="'active'">Dependencies</a></li>
            <li><a [routerLink]="['/apps/1']" [routerLinkActive]="'active'">Apps</a></li>
            <li><a [routerLink]="['/builds/1']" [routerLinkActive]="'active'">Builds</a></li>
          </ul>
        </div>
      </div>
      <div class="content">
        <div class="main">
          <router-outlet></router-outlet>
        </div>
      </div>
      <div class="footer">
        &copy;2018 Quantasnet
      </div>
    </div>
  `,
  styleUrls: ['./app.component.less']
})
export class AppComponent {}
