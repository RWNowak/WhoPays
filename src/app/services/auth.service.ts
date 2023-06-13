import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export interface UserPro{
  name: string;
  uid: string;
  email: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: UserPro = { name: '', uid: '', email: ''};

  constructor(public auth: AngularFireAuth){ }

  loginFireauth(value: { email: string; password: string }) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          error => reject(error)
        );
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
