import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoadingComponent } from './components/loading/loading.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { firebaseConfig } from 'src/environments/environment';
import { EventModalComponent } from './components/event-modal/event-modal.component';

@NgModule({
  declarations: [AppComponent, LoadingComponent, EventModalComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule, 
    StoreDevtoolsModule.instrument({maxAge: 25})],
  providers: [{ 
    provide: 
      RouteReuseStrategy, 
    useClass: 
      IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
