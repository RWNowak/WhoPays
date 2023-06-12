import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export interface UserPro{
  username: string;
  uid: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: UserPro = { username: '', uid: '' };

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
