import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageForm } from './login.page.form';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  errorMessage: string = '';
  form!: FormGroup;

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder, 
    public authservice: AuthService,
    private firestore: AngularFirestore,
    private nav: NavController,
    private alertCtrl: AlertController, ) { }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }

  register(){
    this.router.navigate(['register'])
  }

  async ShowAlert(message: string) {
    const alert = await this.alertCtrl.create({
      message: message,
      cssClass: 'ion-alert custom-alert',
      backdropDismiss: true,
      translucent: true,
    });

    await alert.present();

    setTimeout(() => {
      alert.dismiss();
    }, 500);

  }

  LoginUser(value: {email: string, password: string} ) {
    try{
      this.authservice.loginFireauth(value).then(resp =>{
        if (resp.user) {
          console.log(resp)
          console.log(resp.user)
          this.authservice.setUser({
            name: resp.user.displayName,
            uid: resp.user.uid,
            email: resp.user.email,
            photoUrl: resp.user.photoUrl
          })
           this.ShowAlert('Logged in successfully!');
           this.nav.navigateRoot(['/home']);

        }
      }).catch(err => {
        console.log(err);
        this.ShowAlert('Wrong email or password');
      });
    } catch (err) {
      console.log(err);
    }
  }
}