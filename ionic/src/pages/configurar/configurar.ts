import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-configurar',
  templateUrl: 'configurar.html'
})
export class ConfigurarPage {

  constructor(public navCtrl: NavController) {  }

  abrirConta() {
    this.navCtrl.push('UserAddPage');
  }
 
  abrirLogin() {
    this.navCtrl.push('UserLoginPage');
  }

  logout() {
    
  }
}