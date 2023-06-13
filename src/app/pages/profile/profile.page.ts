import { Component, OnInit } from '@angular/core';
import { AuthService, UserPro } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  user: UserPro = { name: '', uid: '', email: '' };

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const uid = this.authService.getUID();
    this.authService.getUserData(uid).then((userData) => {
      this.user.name = userData.username;
      this.user.email = userData.email;
    }).catch((error) => {
      console.error(error);
    });
  }
}
