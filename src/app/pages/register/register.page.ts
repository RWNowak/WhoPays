import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterPageForm } from './register.page.form';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, NavController, LoadingController} from '@ionic/angular'
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
    private navCtr: NavController
    ) 
    {  
      this.loading = this.loadingCtrl
    }

  ngOnInit() {
    this.registerForm = new RegisterPageForm(this.formBuilder).createForm();
  }

  registerUser(value: {email: string; password: string; name: string}) {
    this.showalert();
    try {
      this.authservice.userRegistration(value).then(response => {
        console.log(response);
        if (response.user) {
          response.user.updateProfile({
            displayName: value.name,
            email: value.email
          });
          this.loading.dismiss();
          this.router.navigate(['login']);
        }
      }, error=>{
        this.loading.dismiss();
        this.errorLoading(error.message);
      })
    } catch (error) {
      console.log(error);
    }
  }

  async errorLoading(message: any){
    const loading = await this.alertCtrl.create({
      header:"Error Registering",
      message:message,
      buttons:[{
        text:'ok',
        handler: ()=>{
        this.navCtr.navigateBack(['register'])
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
