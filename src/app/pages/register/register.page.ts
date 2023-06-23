  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
  import { Router } from '@angular/router';
  import { RegisterPageForm } from './register.page.form';
  import { AuthService } from 'src/app/services/auth.service';
  import { AlertController, NavController, LoadingController} from '@ionic/angular'
  import { AngularFirestore } from '@angular/fire/compat/firestore';
  @Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
  })
  export class RegisterPage implements OnInit {

    registerForm!: FormGroup;
    loading:any;
    constructor(private router: Router, 
      private formBuilder: FormBuilder, 
      private authservice: AuthService, 
      public loadingCtrl : LoadingController, 
      private alertCtrl: AlertController,
      private firestore: AngularFirestore,
      private nav: NavController
      ) 
      {  
        this.loading = this.loadingCtrl
      }

    ngOnInit() {
      this.registerForm = new RegisterPageForm(this.formBuilder).createForm();
    }

    registerUser(value: { email: string; password: string; name: string }) {
      this.showalert();
      try {
        this.authservice.userRegistration(value).then((resp) => {
          console.log(resp); // Check the response object structure
          if (resp && resp.user) {
            console.log(resp.user); // Check the user object
            const uid = resp.user.uid;
            console.log(uid); // Check the value of uid
            const userProfile = this.firestore.collection('profile').doc(uid);
    
            userProfile.get().subscribe((result) => {
              if (result.exists) {
                this.nav.navigateForward(['home']);
              } else {
                this.firestore.doc(`profile/${uid}`).set({
                  name: value.name,
                  email: resp.user.email
                });
              }
            });
    
            this.loading.dismiss();
            this.router.navigate(['login']);
          } else {
            console.log('User object not found in the response');
            // Handle the case when the user object is missing in the response
          }
        }, (error) => {
          this.loading.dismiss();
          this.errorLoading(error.message);
        });
      } catch (error) {
        console.log(error);
      }
    }
    

    async errorLoading(message: any){
      const loading = await this.alertCtrl.create({
        header:"Error Registering",
        message:"The chosen e-mail is already in use",
        buttons:[{
          text:'ok',
          handler: ()=>{
          this.nav.navigateBack(['register'])
        }
        }]
      })
      await loading.present();
    }

    async showalert(){
    var load = await this.loadingCtrl.create({
    message:"Please wait....",

  })
    load.present();
  }

  }
