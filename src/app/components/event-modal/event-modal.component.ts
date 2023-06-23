import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss'],
})
export class EventModalComponent implements OnInit {
  @Input() guests!: { id: string, name: string }[];
  eventForm!: FormGroup;
  eventName: any;
  yourContribution: any;
  constructor(private modalCtrl: ModalController, private formBuilder: FormBuilder) {}
  partyGuests = [
    { name: 'Rob', id: 'rob' },
    { name: 'Sally', id: 'sally' },
    { name: 'Andrew', id: 'andrew' },
    { name: 'Mike', id: 'mike' },
    { name: 'Sarah', id: 'sarah' },
    { name: 'John', id: 'john' },
  ];
  selectedGuests: { name: string, formControl: FormControl }[] = [];

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      yourContribution: ['', Validators.required],
      selectedGuest: ['', Validators.required],
    });
  }

  onGuestChange() {
    const selectedGuestId = this.eventForm.get('selectedGuest')?.value;
    const selectedGuest = this.partyGuests.find(guest => guest.id === selectedGuestId);

    if (selectedGuest) {
      const guestFormControl = new FormControl('', Validators.required);
      this.selectedGuests.push({ name: selectedGuest.name, formControl: guestFormControl });
      this.eventForm.addControl(selectedGuestId, guestFormControl);
    }
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    const eventData = {
      eventName: this.eventName,
      yourContribution: this.yourContribution,
      selectedGuests: this.selectedGuests.map(guest => ({
        name: guest.name,
        contribution: guest.formControl.value,
      })),
    };
    this.modalCtrl.dismiss(eventData, 'confirm');
  }
}
