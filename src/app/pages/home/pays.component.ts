import { Component } from '@angular/core';
import { DuesComponent} from './dues.component';

@Component({
  selector: 'app-page-one',
  template: `
  <ion-content class="ion-padding" color="">
    <ion-grid>
      <ion-row class="ion-align-items-center">
        <ion-col>
          <div style="display: flex; justify-content: right">
            <ion-button class="mainNonActive" [disabled]="true">Pays</ion-button>
          </div>
        </ion-col>
        <ion-col>
            <div style="display: flex; justify-content: left">
            <ion-nav-link router-direction="forward" [component]="component">
              <ion-button class="mainActive">Dues</ion-button>
            </ion-nav-link>
            </div>
        </ion-col>
      </ion-row>
    </ion-grid>
    <ion-grid>
      <ion-row class="ion-align-items-left">
        <app-user-card-pays></app-user-card-pays>
      </ion-row>
      <ion-row class="ion-align-items-left">
        <app-user-card-pays></app-user-card-pays>
      </ion-row>
      <ion-row class="ion-align-items-left">
        <app-user-card-pays></app-user-card-pays>
      </ion-row>
    </ion-grid>
  </ion-content>
`,
})
export class PaysComponent {
  component = DuesComponent;
}