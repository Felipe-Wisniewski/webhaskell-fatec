import { ArtigosProvider } from '../../providers/artigos/artigos';
import { Component } from '@angular/core';
import {  NavController, NavParams, ToastController } from 'ionic-angular';
import { FeedPage } from '../feed/feed';


@Component({
  selector: 'page-publicar',
  templateUrl: 'publicar.html',
})
export class PublicarPage {
  categoriaid: number;
  titulo: Text;
  texto: Text;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private artigosProvider: ArtigosProvider) { }

  pushParams() {
    this.navCtrl.push(FeedPage, { 'generos': this.categoriaid, 'titulo': this.titulo, 'texto': this.texto });

    this.artigosProvider.publicarArtigo(this.categoriaid, this.titulo, this.texto).then((result: any) => {
      
      this.artigosProvider.criaCurtida(result.resp).then((result: any) => { }).catch((error: any) => {
        this.toast.create({ message: 'Erro ao criar curtida', position: 'botton', duration: 3000}).present();
       });

      this.toast.create({ message: 'Artigo postado com sucesso!', position: 'botton', duration: 3000}).present();
      this.navCtrl.push(PublicarPage);   
    })
    .catch((error: any) => {
      this.toast.create({ message: 'Erro ao publicar o artigo', position: 'botton', duration: 3000}).present();
    });
  }
  

}
