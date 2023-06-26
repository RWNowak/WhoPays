import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  eventsList: any[] = [];

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.fetchEvents();
  }

  fetchEvents() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const uid = user.uid;
        this.firestore
          .collection('profile')
          .doc(uid)
          .collection('events')
          .valueChanges()
          .subscribe((events: any[]) => {
            this.eventsList = events;
          });
      }
    });
  }
}
