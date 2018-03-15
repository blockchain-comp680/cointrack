import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,
Alert, AlertController } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile:any;
  public birthDate: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public alertCtrl:AlertController, public auth: AuthProvider, public profile:ProfileProvider) {
    
  }

  ionViewDidLoad() {
    this.profile.getUserProfile().on('value', userSnapshot =>{
      this.userProfile = userSnapshot.val();
      this.birthDate = userSnapshot.val().birthDate;
    });
  }

  updateName():void{
    const alert:Alert = this.alertCtrl.create({
      message: 'Your first name & last name',
      inputs: [
        {
          name:'firstName',
          placeholder:'Your first name',
          value: this.userProfile.firstName
        },
        {
          name:'lastName',
          placeholder:'Your last name',
          value: this.userProfile.lastName
        }
      ],
      buttons:[
        {text: 'Cancel'},
        {
          text:'Save',
          handler: data=>{
            this.profile.updateName(data.firstName, data.lastName);
            var name:string = data.firstName + ' ' + data.lastName;
            firebase.auth().currentUser.updateProfile({displayName: name, photoURL:null})
          }
        }
      ]
    });
    alert.present();
  }

  updateDOB(birthDate:string):void{
    this.profile.updateDOB(birthDate);
  }

  updateEmail():void{
    let alert: Alert = this.alertCtrl.create({
      inputs:[
        {name: 'newEmail', placeholder: 'Your new email'},
        {name: 'password', placeholder: 'Your password', type: 'password'}
      ],
      buttons: [
        {text: 'Cancel'},
        {
          text: 'Save',
          handler: data =>{
            this.profile.updateEmail(data.newEmail, data.password).then(()=>{
              console.log('Email changed successfully');
            }).catch(error => {
              console.log('ERROR: '+ error.message);
            });
          }
        }
      ]
    });
    alert.present();
  }

  updatePassword():void{
    let alert:Alert = this.alertCtrl.create({
      inputs:[
        {name:'newPassword', placeholder:'New Password', type: 'password'},
        {name: 'oldPassword', placeholder:'Old Password', type: 'password'}
      ],
      buttons: [
        {text: 'Cancel'},
        {
          text: 'Save',
          handler: data =>{
            this.profile.updatePassword(data.newPassword, data.oldPassword);
          }
        }
      ]
    });
    alert.present();
  }

 

}
