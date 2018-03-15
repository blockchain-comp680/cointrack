import { Component,
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes } from '@angular/core';
import { IonicPage, NavController,
   NavParams, Alert, AlertController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthProvider} from '../../providers/auth/auth';
import {EmailValidator} from '../../validators/email';


/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
  animations: [
    trigger('flyInOut', [
      state(
        'in',
        style({
          transform: 'translate3d(0, 0, 0)'
        })
      ),
      state(
        'out',
        style({
          transform: 'translate3d(0, 150%, 0)'
        })
      ),
      transition('in => out', animate('300ms ease-in')),
      transition('out => in', animate('300ms ease-out'))
    ]),
  ]
})
export class ResetPasswordPage {
  public resetPasswordForm:FormGroup;
  flyInOutState: string = 'out';

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public auth:AuthProvider, public alertCtrl:AlertController,
public formBuilder:FormBuilder) {

    this.resetPasswordForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
    let logo = document.getElementById('logo');
    logo.classList.add('rotate');
    setTimeout(() => {
      this.flyInOutState = 'in';
    }, 1000);
    setTimeout(() => {
      let logo = document.getElementById('logo');
      logo.classList.remove('rotate');
    }, 2000);
  }

  resetPassword():void{
    if(!this.resetPasswordForm.valid){
      console.log(`Form is not valid yet, current value: ${this.resetPasswordForm.value}`);
    }else{
      const email:string = this.resetPasswordForm.value.email;
      this.auth.resetPassword(email).then(user =>{
        const alert:Alert = this.alertCtrl.create({
          message:"Check you email for a password reset link",
          buttons:[
            {
              text:"OK",
              role:"cancel",
              handler:()=>{
                this.navCtrl.pop();
              }
            }
          ]
        });
        alert.present();
      }, error=>{
        const errorAlert: Alert = this.alertCtrl.create({
          message: error.message,
          buttons:[{text:"OK", role:"cancel"}]
        });
        errorAlert.present();
      });
    }
  }

}
