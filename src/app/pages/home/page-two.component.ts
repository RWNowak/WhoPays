import { Component } from '@angular/core';

import { PageThreeComponent } from './page-three.component';

@Component({
  selector: 'app-page-two',
  template: `
    <ion-content class="ion-padding">
      <h1>Page Two</h1>
      <div>
        <ion-nav-link router-direction="forward" [component]="component">
          <ion-button>Go to Page Three</ion-button>
        </ion-nav-link>
      </div>
    </ion-content>
  `,
})
export class PageTwoComponent {
  component = PageThreeComponent;
}