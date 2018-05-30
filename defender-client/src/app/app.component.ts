import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrapper">
      <header>
        <nav><a [routerLink]="['/dashboard']">Quantasnet Defender</a></nav>
        <nav [routerLinkActive]="'active'"><a [routerLink]="['/dashboard']">Dashboard</a></nav>
        <nav [routerLinkActive]="'active'"><a [routerLink]="['/deps/1']">Dependencies</a></nav>
        <nav [routerLinkActive]="'active'"><a [routerLink]="['/apps/1']">Apps</a></nav>
        <nav [routerLinkActive]="'active'"><a [routerLink]="['/builds/1']">Builds</a></nav>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
      <footer>
        &copy;2018 Quantasnet
      </footer>
    </div>
  `,
  styleUrls: ['./app.component.less']
})
export class AppComponent {}
