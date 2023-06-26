import { Component } from '@angular/core';
import { DuesComponent } from './dues.component';
import { HomePage } from './home.page';
import { DebtServiceService } from 'src/app/services/debt-service.service';
import { AuthService } from 'src/app/services/auth.service';

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
      <ng-container *ngFor="let card of paysCards">
        <ion-row class="ion-align-items-left">
          <app-user-card-pays [guest]="card.guest" [amount]="card.amount"></app-user-card-pays>
        </ion-row>
      </ng-container>
      </ion-grid>
    </ion-content>
  `,
})
export class PaysComponent {
  component = DuesComponent;
  paysCards: { guest: { name: string; id: string; avatar: string; }; amount: number; }[] = [];
  
  constructor(public homePage: HomePage, private debtService: DebtServiceService, private authService: AuthService) {}

  async ngOnInit() {
    const guests = this.homePage.guests;
    const UID = this.authService.getUID();

    for (const guest of guests) {
      const { amount, isDebt } = await this.debtService.calculateOwedAmount(UID, guest.name);
      
      if (isDebt && amount !== 0) {
        this.paysCards.push({ guest, amount });
      }
    }

    console.log(this.paysCards);
  }
}