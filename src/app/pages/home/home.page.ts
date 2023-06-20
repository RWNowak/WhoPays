import { Component, OnInit } from '@angular/core';
import { PaysComponent } from './pays.component'
import { AuthService, UserPro } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user: UserPro = { name: '', uid: '', email: '', photoUrl: ''};

  component = PaysComponent;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    const uid = this.authService.getUID();
    this.authService.getUserData(uid).then((userData) => {
      this.user.name = userData.name;
      this.user.email = userData.email;
      this.user.photoUrl = userData.photoUrl; 
    }).catch((error) => {
      console.error(error);
    });
  }
}
