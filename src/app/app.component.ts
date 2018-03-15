import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
// import { ListPage } from '../pages/list/list';
import {firebaseConfig} from '../credentials/credentials';
import * as firebase from 'firebase';
import { AuthProvider } from '../providers/auth/auth';
import {Unsubscribe} from '@firebase/util';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public userProfile:any;
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{ title: string, component: any, icon?: string }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
  public auth:AuthProvider) {
    this.initializeApp();
    
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Market', component: HomePage, icon: `assets/imgs/coinmenu/market.svg` },
      { title: 'Wallets', component: 'WalletsPage', icon: `assets/imgs/coinmenu/wallet.svg` },
      { title: 'Address Book', component: 'ContactsPage', icon: `assets/imgs/coinmenu/address.svg` },
      { title: 'Exchange', component: 'ExchangePage', icon: `assets/imgs/coinmenu/exchange.svg` },
      { title: 'Send', component: 'SendcoinPage', icon: `assets/imgs/coinmenu/send.svg` },
      { title: 'Messages', component: 'MessagesPage', icon: `assets/imgs/coinmenu/messages.svg` },
      { title: 'Settings', component: 'SettingsPage', icon: `assets/imgs/coinmenu/settings.svg` },
      { title: 'Profile', component: 'ProfilePage', icon: `assets/imgs/coinmenu/avatar.svg` },
    ];

  }

  initializeApp() {
    firebase.initializeApp(firebaseConfig);
    const unsubscribe:Unsubscribe = firebase.auth().onAuthStateChanged(user =>{
      if(!user){
        this.rootPage = 'LoginPage';
        unsubscribe();
      }else{
        this.rootPage = HomePage;
        this.userProfile = user;
        console.log(user);
        unsubscribe();
      }
    });
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
   
  }

  openPage(page: any) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
   
      this.nav.setRoot(page.component);
    
  }

  logout():void{
    this.auth.logout().then(()=>{
      this.nav.setRoot('LoginPage');
    })
  }
}
