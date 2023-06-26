import { Component, OnInit } from '@angular/core';
import { PaysComponent } from './pays.component';
import { AuthService, UserPro } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { EventModalComponent } from 'src/app/components/event-modal/event-modal.component';
import { AngularFireStorage } from '@angular/fire/compat/storage';

interface TotalAmounts {
  totalPay: number;
  totalDue: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user: UserPro = { name: '', uid: '', email: '', photoUrl: '' };

  component = PaysComponent;
  guests = [
    { name: 'Andrew', id: 'andrew', avatar: 'gs://whopays-c78dd.appspot.com/guestsUploads/andrew.png' },
    { name: 'John', id: 'john', avatar: 'gs://whopays-c78dd.appspot.com/guestsUploads/john.png' },
    { name: 'Mike', id: 'mike', avatar: 'gs://whopays-c78dd.appspot.com/guestsUploads/mike.png' },
    { name: 'Rob', id: 'rob', avatar: 'gs://whopays-c78dd.appspot.com/guestsUploads/rob.png' },
    { name: 'Sally', id: 'sally', avatar: 'gs://whopays-c78dd.appspot.com/guestsUploads/sally.png' },
    { name: 'Sarah', id: 'sarah', avatar: 'gs://whopays-c78dd.appspot.com/guestsUploads/sarah.png' },
  ];

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private modalController: ModalController,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    // Call the separate function to execute the code
    this.refreshData();

    // Add an event listener to the button
    const refreshButton = document.getElementById('refreshButton');
    if (refreshButton) {
    refreshButton.addEventListener('click', () => {
      // Call the refreshData function
      this.refreshData();
    });
  }}

  refreshData() {
    const uid = this.authService.getUID();
    this.authService
      .getUserData(uid)
      .then((userData) => {
        this.user.name = userData.name;
        this.user.email = userData.email;
        this.user.photoUrl = userData.photoUrl;
      })
      .catch((error) => {
        console.error(error);
      });

    this.parseAvatarUrls();

    // Check if 'guests' collection exists
    const db = firebase.firestore();
    const guestsCollection = db.collection(`profile/${uid}/guests`);
    guestsCollection
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot);
        if (querySnapshot.empty) {
          // 'guests' collection doesn't exist, create it and add the initial guest documents
          this.createInitialGuests(guestsCollection);
        } else {
          // 'guests' collection exists, calculate TotalPays and TotalDues for each guest
          querySnapshot.forEach((doc) => {
            const guest = doc.data();
            console.log(guestsCollection.doc(doc.id));
            this.calculateTotalAmount(doc.id) // Pass the guest object to the calculateTotalAmount function
              .then((totalAmounts) => {
                guestsCollection
                  .doc(doc.id) // Use the document ID as it contains the guest name
                  .update({
                    totalPay: totalAmounts.totalPay,
                    totalDue: totalAmounts.totalDue,
                  })
                  .catch((error) => {
                    console.error('Error updating guest:', error);
                  });
              })
              .catch((error) => {
                console.error('Error calculating total amounts:', error);
              });
          });
        }
      })
      .catch((error) => {
        console.error('Error checking guests collection:', error);
      });
  }

  calculateTotalAmount(guestName: string): Promise<TotalAmounts> {
    let totalPay = 0;
    let totalDue = 0;

    const uid = this.authService.getUID();

    // Access the Firebase Firestore collection
    const db = firebase.firestore();

    // Access the events collection for the user
    const eventsRef = db.collection('profile').doc(uid).collection('events');

    // Iterate through all events and calculate total pay and total due for the guest
    return eventsRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const event = doc.data();
          console.log('Event:', event); // Log the event data to check its structure

          if (event['Payments']) {
            console.log('Event Payments:', event['Payments']); // Log the event payments to check their structure

            const payments = event['Payments'];
            for (const payment of payments) {
              console.log('Payment:', payment); // Log each payment to check its structure
              console.log('Payment Name:', payment.name); // Log the payment name for further inspection

              if (payment.name === guestName) {
                if (payment.type === 'pay') {
                  totalPay += payment.amount;
                } else if (payment.type === 'due') {
                  totalDue += payment.amount;
                }
              }
            }
          }
        });

        // Return the calculated total amounts
        return {
          totalPay,
          totalDue,
        };
      })
      .catch((error) => {
        console.error('Error getting events collection:', error);
        throw error;
      });
  }

  createInitialGuests(guestsCollection: firebase.firestore.CollectionReference) {
    const guests = [
      { name: 'Rob' },
      { name: 'Sally' },
      { name: 'Andrew' },
      { name: 'Mike' },
      { name: 'Sarah' },
      { name: 'John' },
    ];

    guests.forEach((guest) => {
      guestsCollection
        .doc(guest.name)
        .set({
          name: guest.name,
          totalPay: 0,
          totalDue: 0,
        })
        .catch((error) => {
          console.error('Error creating initial guest:', error);
        });
    });
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
        guests: this.guests,
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      console.log(data); // Access the event data here
    }
  }
}
