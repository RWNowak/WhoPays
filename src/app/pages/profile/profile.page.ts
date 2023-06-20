import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage'
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators'
import { AuthService, UserPro } from 'src/app/services/auth.service';
export interface imageData{
  fileName: string;
  filePath: string;
  size: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  user: UserPro = { name: '', uid: '', email: '', photoUrl:''};

  private imageCollection: AngularFirestoreCollection<imageData>;
  imagefile: Observable<imageData[]>;
  imageUpload!: AngularFireUploadTask;
  snapshot!: Observable<any>;
  FileImageUpload!: Observable<any>;
  UserUID!: AngularFirestoreDocument;

  constructor( 
    private database: AngularFirestore, 
    private storage: AngularFireStorage,
    private router: Router, 
    private loading: LoadingController, 
    private authservice: AuthService
    ) { 

    this.imageCollection = this.database.collection<imageData>('loginUploads');
    this.imagefile = this.imageCollection.valueChanges();
  }

  async uploadImageToFirebase(event: any) {
    const load = await this.loading.create({
      spinner: 'dots',
    });
    load.present();
  
    const file = event.target.files;
    console.log(file);
    var fileName = file[0]; 
    console.log(fileName);
  
    if (fileName.type.split('/')[0] !== "image") {
      console.error("File is not an Image");
      return;
    }

    const path = `loginUploads/${new Date().getTime()}_${fileName.name}`;
  
    var fileRef = this.storage.ref(path);
  
    this.imageUpload = this.storage.upload(path, fileName);

    setTimeout(() => {
      load.dismiss(); // Dismiss the loading alert after 1/4th of a second
    }, 250);

    this.imageUpload.then( res=>{
      var imagefile = res.task.snapshot.ref.getDownloadURL();
      imagefile.then( downloadableUrl=>{
        console.log("URL", downloadableUrl);
        this.database.doc(`profile/${this.authservice.getUID()}`).update({
          photoUrl: downloadableUrl
        });
      })
    })
  }
  
  ngOnInit() {
    const uid = this.authservice.getUID();
    this.authservice.getUserData(uid).then((userData) => {
      this.user.name = userData.name;
      this.user.email = userData.email;
      this.user.photoUrl = userData.photoUrl;
    }).catch((error) => {
      console.error(error);
    });
  }
}
