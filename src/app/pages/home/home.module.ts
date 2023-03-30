import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { PaysComponent } from './pays.component';
import { DuesComponent } from './dues.component';
import { HomePage } from './home.page';
import { UserCardPaysComponent } from 'src/app/components/user-card-pays/user-card-pays.component';
import { UserCardDuesComponent } from 'src/app/components/user-card-dues/user-card-dues.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    IonicModule.forRoot({})
  ],
  declarations: [HomePage, PaysComponent, DuesComponent, UserCardPaysComponent, UserCardDuesComponent]
})
export class HomePageModule {}
