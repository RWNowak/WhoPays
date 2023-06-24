import { Component } from '@angular/core';
import { PaysComponent } from './pays.component';
import { HomePage } from './home.page';

@Component({
  selector: 'app-page-two',
  template: `
    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row class="ion-align-items-center">
          <ion-col>
            <div style="display: flex; justify-content: right">
              <ion-nav-link router-direction="forward" [component]="component">
                <ion-button class="mainActive">Pays</ion-button>
              </ion-nav-link>
            </div>
          </ion-col>
          <ion-col>
            <div style="display: flex; justify-content: left">
              <ion-button class="mainNonActive" [disabled]="true">Dues</ion-button>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-grid>
      <ng-container *ngFor="let guest of homePage.guests.slice(3, 6)">
        <ion-row class="ion-align-items-left">
          <app-user-card-dues [guest]="guest"></app-user-card-dues>
        </ion-row>
      </ng-container>
      </ion-grid>
    </ion-content> 
  `,
})

export class DuesComponent {
  component = PaysComponent;
  
  constructor(public homePage: HomePage) {}

  ngOnInit() {}
}
