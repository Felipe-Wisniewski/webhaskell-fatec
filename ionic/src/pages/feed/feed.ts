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
  todosComentarios: any;
  qtosComentarios: number = 0;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private artigosProvider: ArtigosProvider) {  }

  ionViewDidEnter() {
    this.artigos = [];
    this.page = 1;
    this.getArtigos(this.page);
  } 

  getArtigos(page: number) {
    this.carregaTodasCurtidas();
    this.carregaTodasCategorias();
    this.carregarTodosComentarios();

    this.artigosProvider.getArtigos().then((result: any) => {    
      for (var i = 0; i < result.resp.length; i++) {       
        let id = result.resp[i].id;
        let like = this.likesPost(id);
        let cat = this.categoriaPost(id);
        this.comentariosPost(id);

        console.log(this.qtosComentarios);
        var artigo = {
          usuarioid: result.resp[i].usuarioid,
          categoriaid: cat,
          titulo: result.resp[i].titulo,
          publicacao: result.resp[i].publicacao,
          texto: result.resp[i].texto,
          curtidas: like,
          comentarios: this.qtosComentarios
        };
        this.artigos.push(artigo);
      }
    }).catch((error: any) => {
      this.toast.create({ message: 'Erro ao carregar os artigos', position: 'botton', duration: 3000}).present();
    });
  }

  carregaTodasCurtidas() {
    this.artigosProvider.getTotalCurtidas().then((result: any) => {
      this.todasCurtidas = result;
    })
    .catch((error: any) => {
      this.toast.create({ message: 'Erro ao carregar curtidas!', position: 'botton', duration: 3000}).present();  
    });
  }
  
  carregaTodasCategorias(){
    this.artigosProvider.getCategorias().then((result: any) => {
      this.todasCategorias = result;
     }).catch((error: any) => {
      this.toast.create({ message: 'Erro ao carregar categorias!', position: 'botton', duration: 3000}).present();  
     });
  }

  carregarTodosComentarios(){
    this.artigosProvider.getComentarios().then((result: any) => {
      this.todosComentarios = result;
     }).catch((error: any) => {
      this.toast.create({ message: 'Erro ao carregar categorias!', position: 'botton', duration: 3000}).present();  
     });
  }

  likesPost(id){
    for (var i = 0; i < this.todasCurtidas.resp.length; i++) {
      if (this.todasCurtidas.resp[i].artigoid == id) {
        console.log('likesPost');
        return this.todasCurtidas.resp[i].total;          
      }
    };
  }

  categoriaPost(id){
    for (var i = 0; i < this.todasCategorias.resp.length; i++) {
      if (this.todasCategorias.resp[i].id == id) {
        console.log('categoriaPost');
        return this.todasCategorias.resp[i].tipo;          
      }
    };
  }

  comentariosPost(id){
    this.qtosComentarios = 0;
    for (var i = 0; i < this.todosComentarios.resp.length; i++) {
      if (this.todosComentarios.resp[i].artigoid == id) {
        this.qtosComentarios = this.qtosComentarios + 1;
        console.log('categoriaPost ' + this.qtosComentarios);
      }
    };    
  }

  updataLike() {
    console.log('oi');
  }

  abrirComentarios(){
    this.navCtrl.push('ComentariosPage');
  }
}

