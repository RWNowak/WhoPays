import { Component } from '@angular/core';

import { PageTwoComponent } from './page-two.component';

@Component({
  selector: 'app-page-one',
  template: `
  <ion-content class="ion-padding">
    <ion-grid>
      <ion-row class="ion-align-items-center">
        <ion-col>
          <div style="display: flex; justify-content: right">
            <ion-button [disabled]="true">Pays</ion-button>
          </div>
        </ion-col>
        <ion-col>
            <div style="display: flex; justify-content: left">
            <ion-nav-link router-direction="forward" [component]="component">
              <ion-button>Dues</ion-button>
            </ion-nav-link>
            </div>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
`,
})
export class PageOneComponent {
  component = PageTwoComponent;
}