import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss'],
})
export class EventModalComponent implements OnInit {
  @Input() guests!: { id: string; name: string }[];
  eventForm!: FormGroup;
  eventName!: string;
  yourContribution!: string;
  userUID!: string;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private alertCtrl: AlertController
  ) {
    this.confirm = this.confirm.bind(this);
  }

  partyGuests = [
    { name: 'Rob', id: 'rob' },
    { name: 'Sally', id: 'sally' },
    { name: 'Andrew', id: 'andrew' },
    { name: 'Mike', id: 'mike' },
    { name: 'Sarah', id: 'sarah' },
    { name: 'John', id: 'john' },
  ];
  selectedGuests: { name: string; formControl: FormControl }[] = [];

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      yourContribution: ['', Validators.required],
      selectedGuest: ['', Validators.required],
    });

    this.userUID = this.authService.getUID();
  }

  onGuestChange() {
    const selectedGuestId = this.eventForm.get('selectedGuest')?.value;
    const selectedGuest = this.partyGuests.find((guest) => guest.id === selectedGuestId);

    if (selectedGuest) {
      const guestFormControl = new FormControl(0, Validators.required);
      this.selectedGuests.push({ name: selectedGuest.name, formControl: guestFormControl });
      this.eventForm.addControl(selectedGuestId, guestFormControl);
    }
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
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

  async confirm() {
    const eventNameControl = this.eventForm.get('eventName');
    const yourContributionControl = this.eventForm.get('yourContribution');
    
    if (eventNameControl && yourContributionControl && eventNameControl.valid && yourContributionControl.valid) {
      this.eventName = eventNameControl.value;
      this.yourContribution = yourContributionControl.value;
      
      const totalContribution = this.selectedGuests.reduce((sum, guest) => sum + Number(guest.formControl.value), Number(this.yourContribution));
      console.log(totalContribution);
      const averageContribution = parseFloat((totalContribution / (this.selectedGuests.length + 1)).toFixed(2));
      console.log(averageContribution);

      let Payments: any[] = [];

      if (parseFloat(this.yourContribution) < averageContribution) {
        Payments = this.selectedGuests.map(guest => {
          const difference = guest.formControl.value - averageContribution;
          if (difference < 0) {
            return {
              name: guest.name,
              type: 'due',
              amount: parseFloat((Math.abs(difference) / this.getParticipantsBelowAverage()).toFixed(2)),
            };
          } else {
            return null;
          }
        }).filter(payment => payment !== null);
      } else {
        Payments = this.selectedGuests.map(guest => {
          const difference = guest.formControl.value - averageContribution;
          if (difference > 0) {
            return {
              name: guest.name,
              type: 'pay',
              amount: parseFloat((difference / this.getParticipantsAboveAverage()).toFixed(2)),
            };
          } else {
            return null;
          }
        }).filter(payment => payment !== null);
      }
      
      const eventData = {
        eventName: this.eventName,
        totalContribution: totalContribution,
        Payments: Payments,
      };
      
      console.log('eventData:', eventData);
      
      try {
        const userUID = this.userUID;
        const userProfile = this.firestore.collection('profile').doc(userUID);
        const eventName = this.eventName.toLowerCase().replace(/ /g, '_');
        
        // Create a new subcollection under the profile/uid document
        await userProfile.collection('events').doc(eventName).set(eventData);
        
        const folderName = eventName;
        const folderRef = this.storage.ref(`profile/${userUID}/${folderName}`);
        const folderData = {
          yourContribution: Number(this.yourContribution),
          selectedGuests: this.selectedGuests.map(guest => ({
            name: guest.name,
            pays: Number(guest.formControl.value) || 0,
            dues: 0,
          })),
        };
      
        await folderRef.putString(JSON.stringify(folderData));
        this.modalCtrl.dismiss(eventData, 'confirm');
        this.ShowAlert('Event Added!');
      } catch (error) {
        console.error(error);
        this.ShowAlert('Something went wrong. Please try again.');
      }
    }
  }
  
  getParticipantsAboveAverage(): number {
    const averageContribution = (this.selectedGuests.reduce((total, guest) => total + (Number(guest.formControl.value) || 0), Number(this.yourContribution)) / (this.selectedGuests.length + 1)); // +1 for yourself
    return this.selectedGuests.reduce((count, guest) => (guest.formControl.value || 0) > averageContribution ? count + 1 : count, 0);
  }
  
  getParticipantsBelowAverage(): number {
    const averageContribution = (this.selectedGuests.reduce((total, guest) => total + (Number(guest.formControl.value) || 0), Number(this.yourContribution)) / (this.selectedGuests.length + 1)); // +1 for yourself
    return this.selectedGuests.reduce((count, guest) => (guest.formControl.value || 0) < averageContribution ? count + 1 : count, 0);
  }
}  