import { Component } from '@angular/core';
import { PaysComponent } from './pays.component';
import { HomePage } from './home.page';
import { DebtServiceService } from 'src/app/services/debt-service.service';
import { AuthService } from 'src/app/services/auth.service';

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
      <ng-container *ngFor="let card of duesCards">
        <ion-row class="ion-align-items-left">
          <app-user-card-dues [guest]="card.guest" [amount]="card.amount"></app-user-card-dues>
        </ion-row>
      </ng-container>
      </ion-grid>
    </ion-content> 
  `,
})

export class DuesComponent {
  component = PaysComponent;
  duesCards: { guest: { name: string; id: string; avatar: string; }; amount: number; }[] = [];
  
  constructor(public homePage: HomePage, private debtService: DebtServiceService, private authService: AuthService) {}

  async ngOnInit() {
    const guests = this.homePage.guests;
    const UID = this.authService.getUID();

    for (const guest of guests) {
      const { amount, isDebt } = await this.debtService.calculateOwedAmount(UID, guest.name);
      
      if (!isDebt && amount !== 0) {
        this.duesCards.push({ guest, amount });
      }
    }

    console.log(this.duesCards);
  }
}