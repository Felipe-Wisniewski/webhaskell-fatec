import { ArtigosProvider } from '../../providers/artigos/artigos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ConfigurarPage } from '../configurar/configurar';

@IonicPage()
@Component({
  selector: 'page-user-add',
  templateUrl: 'user-add.html',
})
export class UserAddPage {
  nome: string;
  email: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private toast: ToastController, private artigosPrivader: ArtigosProvider) { }

  pushParams() {
    this.navCtrl.push(ConfigurarPage, { 'generos': this.nome, 'titulo': this.email, 'texto': this.password });
  
    this.artigosPrivader.criarUsuario(this.nome, this.email, this.password).then((result: any) => {
      this.toast.create({ message: 'Usuário criado com sucesso!', position: 'botton', duration: 3000}).present();
    })
    .catch((error: any) => {
      this.toast.create({ message: 'Erro ao criar o usuário.', position: 'botton', duration: 3000}).present();
    })
  }
}
