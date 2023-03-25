import { Component } from '@angular/core';

import { PageTwoComponent } from './page-two.component';

@Component({
  selector: 'app-page-one',
  template: `
  <ion-content class="ion-padding" color="">
    <ion-grid>
      <ion-row class="ion-align-items-center">
        <ion-col>
          <div style="display: flex; justify-content: right">
            <ion-button style="box-shadow: 0 2px 6px 0 rgba(255, 255, 255, 0.5)" [disabled]="true">Pays</ion-button>
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