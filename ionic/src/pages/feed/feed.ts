import { ArtigosProvider } from '../../providers/artigos/artigos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})

export class FeedPage {
  artigos: any[];
  page: number;
  todasCurtidas: any;
  todasCategorias: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private artigosProvider: ArtigosProvider) {  }

  ionViewDidEnter() {
    this.artigos = [];
    this.page = 1;
    this.getArtigos(this.page);
  }

  getArtigos(page: number) {
    this.artigosProvider.getArtigos().then((result: any) => {
      for (var i = 0; i < result.resp.length; i++) {
        var artigo = result.resp[i];
        this.artigos.push(artigo);
      }
    })
    .catch((error: any) => {
      this.toast.create({ message: 'Erro ao carregar os artigos', position: 'botton', duration: 3000}).present();
    });
  }

  carregaTodasCurtidas() {
    this.artigosProvider.getTotalCurtidas().then((result: any) => {
      this.todasCurtidas = result;
      console.log('carregaTodasCurtidas');
    })
    .catch((error: any) => {
      this.toast.create({ message: 'Erro ao carregar curtidas!', position: 'botton', duration: 3000}).present();  
    });
  }

  carregaTodasCategorias(){
    this.artigosProvider.getCategorias().then((result: any) => {
      this.todasCategorias = result;
      console.log('carregaTodasCategorias');
    }).catch((error: any) => {
      this.toast.create({ message: 'Erro ao carregar categorias!', position: 'botton', duration: 3000}).present();  
     });
  }

  openArtigo(id: number) {
    this.artigosProvider.getArtigo(id).then((result: any) => {
      this.art = result.resp;
    })
  }

  abrirComentarios(){
    this.navCtrl.push('ComentariosPage');
  }
}

