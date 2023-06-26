import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export interface UserPro{
  name: string
  uid: string
  email: string
  photoUrl: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: UserPro = { name: '', uid: '', email: '', photoUrl:''};

  constructor(public auth: AngularFireAuth){ 
    this.initializeApp();
  }

  initializeApp() {
    this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        // Authentication persistence enabled
        // You can now listen for authentication state changes
        this.listenForAuthStateChanges();
      })
      .catch((error) => {
        // Error occurred while setting persistence
        console.error('Error setting persistence:', error);
      });
  }

  listenForAuthStateChanges() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        // User is logged in
        // You can perform necessary actions here
      } else {
        // User is logged out
        // You can handle the logout state here
      }
    });
  }

  loginFireauth(value: { email: string; password: string }) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          firebase.auth().signInWithEmailAndPassword(value.email, value.password)
            .then(
              res => resolve(res),
              error => reject(error)
            );
        })
        .catch((error) => {
          console.error('Error setting persistence:', error);
          reject(error);
        });
    });
  }
  
  setUser(user: UserPro){
    return this.user = user;
  }

  getUID(): string{
    return this.user.uid;
  }

  getUserData(uid: string): Promise<any> {
    const userProfile = firebase.firestore().collection('profile').doc(uid);
    return userProfile.get().then((doc) => {
      if (doc.exists) {
        const userData = doc.data();
        return userData;
      } else {
        throw new Error('User data not found');
      }
    });
  }

  userRegistration(value: {email: string; password: string}) {
    return new Promise<any>((resolve, reject )=>{
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        error => reject(error)
      );
    });
  }

}
