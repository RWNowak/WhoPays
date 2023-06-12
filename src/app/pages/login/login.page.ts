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
      header: 'Alert',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  LoginUser(value: { email: string, password: string }) {
    console.log("Logged in");
    this.errorMessage = '';
    try {
      this.authservice.loginFireauth(value).then(resp => {
        console.log(resp);
        if (resp.user) {
          this.authservice.setUser({
            username: resp.user.displayName,
            uid: resp.user.uid
          });
  
          const userProfile = this.firestore.collection('profile').doc(resp.user.uid);
  
          userProfile.get().subscribe(result => {
            if (result.exists) {
              this.nav.navigateForward(['home']).then(() => {
                this.ShowAlert('Logged in successfully!');
              });
            } else {
              this.firestore.doc(`profile/${this.authservice.getUID()}`).set({
                name: resp.user.displayName,
                email: resp.user.email
              });
            }
          });
        }
      });
    } catch (err) {
      console.log(err);
      this.ShowAlert('Wrong email or password');
    }
  }
}
