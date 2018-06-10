import { ArtigosProvider } from './../../providers/artigos/artigos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ConfigurarPage } from '../configurar/configurar';

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
  this.navCtrl.push(ConfigurarPage, { 'email': this.email, 'password': this.password });

  this.artigosProvider.login(this.email, this.password).then((result: any) => {
      this.toast.create({ message: 'Usuário~' + result.resp + 'logado com sucesso.', position: 'botton', duration: 3000 }).present();
      //Salvar o token no Ionic Storage para usar em futuras requisições.
      //Redirecionar o usuario para outra tela usando o navCtrl
      //this.navCtrl.pop();
      //this.navCtrl.setRoot()
    })
    .catch((error: any) => {
      this.toast.create({ message: 'Erro ao efetuar login.', position: 'botton', duration: 3000 }).present();
    });
  }
}
