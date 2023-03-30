import { Component } from '@angular/core';
import { PaysComponent } from './pays.component'

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
              <ion-button style="box-shadow: 0 2px 6px 0 rgba(255, 255, 255, 0.5)" [disabled]="true">Dues</ion-button>
            </div>
        </ion-col>
      </ion-row>
    </ion-grid>
    <ion-grid>
      <ion-row class="ion-align-items-left">
        <app-user-card-dues></app-user-card-dues>
      </ion-row>
      <ion-row class="ion-align-items-left">
        <app-user-card-dues></app-user-card-dues>
      </ion-row>
      <ion-row class="ion-align-items-left">
        <app-user-card-dues></app-user-card-dues>
      </ion-row>
    </ion-grid>
  </ion-content> 
`,
})
export class DuesComponent {
  component = PaysComponent;
}