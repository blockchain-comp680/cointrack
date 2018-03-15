import { Component,
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes } from '@angular/core';
import { IonicPage, 
  NavController, 
  NavParams,
  LoadingController, Loading, Alert, AlertController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthProvider} from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { HomePage } from '../home/home';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
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
export class RegisterPage {
  public registerForm:FormGroup;
  public loading:Loading;
  flyInOutState: string = 'out';

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public auth:AuthProvider, public loadingCtrl:LoadingController,
public alertCtrl:AlertController, public formBuilder:FormBuilder) {
    this.registerForm = formBuilder.group({
      email:[
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password:[
        '',
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
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

  register():void{
    if(!this.registerForm.valid){
      console.log(`Need to complete the form, current value: ${this.registerForm.value}`);
    }else{
      const email:string = this.registerForm.value.email;
      const password:string = this.registerForm.value.password;

      this.auth.register(email,password).then( user =>{
        this.loading.dismiss().then(()=>{
          this.navCtrl.setRoot(HomePage);
        });
      }, error =>{
        this.loading.dismiss().then(()=>{
          const alert:Alert = this.alertCtrl.create({
            message:error.message,
            buttons:[{ text:"OK", role:'cancel'}]
          });
          alert.present();
        });
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

}
