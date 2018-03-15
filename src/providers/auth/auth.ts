import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }

  login(email:string, password:string):Promise<any>{
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  register(email:string, password:string):Promise<any>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        firebase.database().ref(`/userProfile/${newUser.uid}/email`).set(email);
      }).catch(error =>{
        console.log(error);
        throw new Error(error);
      });
  }

  resetPassword(email:string):Promise<void>{
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logout():Promise<void>{
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref(`/userProfile/${userId}`).off();
    return firebase.auth().signOut();
  }

}
