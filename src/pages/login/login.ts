import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/core';
import { IonicPage, 
  NavController, 
  NavParams,
  LoadingController, Loading, Alert, AlertController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthProvider} from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { HomePage } from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
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
export class LoginPage {
  flyInOutState: string = 'out';
  public loginForm: FormGroup;
  public loading: Loading;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
  public alertCtrl: AlertController, public auth: AuthProvider,
  public formBuilder: FormBuilder, public loadingCtrl: LoadingController) { 
    this.loginForm = formBuilder.group({
      email:[
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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

  login():void {
    if(!this.loginForm.valid){
      console.log(`Form is not valid yet, current value: ${this.loginForm.value}`);
    }else{
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.auth.login(email,password).then((data)=>{
        this.loading.dismiss().then(()=>{
          this.navCtrl.setRoot(HomePage);
        });
      }, error =>{
        this.loading.dismiss().then(()=>{
          const alert: Alert = this.alertCtrl.create({
            message: error.message,
            buttons: [{text: 'OK', role: 'cancel'}]
          });
          alert.present();
        });
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
    this.navCtrl.setRoot(HomePage);
  }

  goToSignUp():void{
    this.navCtrl.push('RegisterPage');
  }

  goToResetPassword():void{
    this.navCtrl.push('ResetPasswordPage');
  }
}
