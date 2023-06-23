import { Component, OnInit } from '@angular/core';
import { PaysComponent } from './pays.component'
import { AuthService, UserPro } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { EventModalComponent } from 'src/app/components/event-modal/event-modal.component';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user: UserPro = { name: '', uid: '', email: '', photoUrl: ''};

  component = PaysComponent;
  guests = [
    { name: 'Rob', id: 'rob', avatar: 'gs://whopays-c78dd.appspot.com/guestsUploads/rob.png' },
    { name: 'Sally', id: 'sally', avatar: 'gs://whopays-c78dd.appspot.com/guestsUploads/sally.png' },
    { name: 'Andrew', id: 'andrew', avatar: 'gs://whopays-c78dd.appspot.com/guestsUploads/andrew.png' },
    { name: 'Mike', id: 'mike', avatar: 'gs://whopays-c78dd.appspot.com/guestsUploads/mike.png' },
    { name: 'Sarah', id: 'sarah', avatar: 'gs://whopays-c78dd.appspot.com/guestsUploads/sarah.png' },
    { name: 'John', id: 'john', avatar: 'gs://whopays-c78dd.appspot.com/guestsUploads/john.png' },
  ];
  constructor(private authService: AuthService, 
    private alertController: AlertController, 
    private modalController: ModalController,
    private storage: AngularFireStorage) {
}

  ngOnInit() {
    const uid = this.authService.getUID();
    this.authService.getUserData(uid).then((userData) => {
      this.user.name = userData.name;
      this.user.email = userData.email;
      this.user.photoUrl = userData.photoUrl; 
    }).catch((error) => {
      console.error(error);
    });

    this.parseAvatarUrls();
  }

  async parseAvatarUrls() {
    for (let guest of this.guests) {
      const avatarUrl = await this.getDownloadUrl(guest.avatar);
      guest.avatar = avatarUrl;
    }
  }

  async getDownloadUrl(url: string): Promise<string> {
    const storageRef = this.storage.storage.refFromURL(url);
    const downloadUrl = await storageRef.getDownloadURL();
    return downloadUrl;
  }


  async openModal() {
    const modal = await this.modalController.create({
      component: EventModalComponent,
      componentProps: {
        guests: this.guests
      }
    });
    modal.present();
  
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      console.log(data); // Access the event data here
    }
  }
}