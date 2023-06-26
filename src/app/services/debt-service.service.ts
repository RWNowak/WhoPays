import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DebtServiceService {

  constructor(private firestore: AngularFirestore) { }

  calculateOwedAmount(uid: string, guestName: string): Promise<{ amount: number; isDebt: boolean }> {
    return this.firestore
      .collection('profile')
      .doc(uid)
      .collection('guests')
      .doc(guestName)
      .get()
      .toPromise()
      .then((docSnapshot) => {
        const guest = docSnapshot!.data();
        const totalPay = guest!['totalPay'] || 0;
        const totalDue = guest!['totalDue'] || 0;
        const owedAmount = totalPay - totalDue;
        let isDebt = null;
        if (owedAmount > 0) {
          isDebt = true;
        } else {
          isDebt = false;
        }
        return { amount: Math.abs(owedAmount), isDebt };
      })
      .catch((error) => {
        console.error('Error getting guest document:', error);
        return { amount: 0, isDebt: false };
      });
  }
}
