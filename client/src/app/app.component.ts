import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: [
    `
      :host {
        display: flex;
        margin: 2rem 25% 0 25%;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Grocery List';
}
