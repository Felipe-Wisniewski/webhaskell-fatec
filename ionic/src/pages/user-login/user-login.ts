import { ArtigosProvider } from './../../providers/artigos/artigos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-user-login',
  templateUrl: 'user-login.html'
})

export class UserLoginPage {
  email: string;
  password: string;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private artigosProvider: ArtigosProvider) { }

pushParams() {
  this.artigosProvider.getUsuarioEmail(this.email, this.password).then((result: any) => {
    if(result.resp.password == this.password){
      this.navCtrl.setRoot(TabsPage);
    }else{
      this.toast.create({ message: 'Senha inválida!', position: 'botton', duration: 3000 }).present();
    }
  }).catch((error: any) => {
      this.toast.create({ message: 'Erro ao efetuar login.', position: 'botton', duration: 3000 }).present();
    });
  }
}
