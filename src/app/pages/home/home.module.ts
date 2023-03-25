import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { PageOneComponent } from './page-one.component';
import { PageTwoComponent } from './page-two.component';
import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    IonicModule.forRoot({})
  ],
  declarations: [HomePage, PageOneComponent, PageTwoComponent]
})
export class HomePageModule {}
