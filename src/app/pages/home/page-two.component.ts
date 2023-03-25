import { Component } from '@angular/core';
import { PageOneComponent } from './page-one.component'

@Component({
  selector: 'app-page-two',
  template: `
  <ion-content class="ion-padding">
    <ion-grid>
      <ion-row class="ion-align-items-center">
        <ion-col>
          <div style="display: flex; justify-content: right">
          <ion-nav-link router-direction="forward" [component]="component">
            <ion-button>Pays</ion-button>
            </ion-nav-link>
          </div>
      </ion-col>
        <ion-col>
            <div style="display: flex; justify-content: left">
              <ion-button [disabled]="true">Dues</ion-button>
            </div>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content> 
`,
})
export class PageTwoComponent {
  component = PageOneComponent;
}