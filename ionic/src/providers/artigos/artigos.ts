import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class ArtigosProvider {
  private API_URL = 'http://192.168.0.150:8080/'
  private date = new Date();
  
  constructor(public http: Http) { }

  criarUsuario(nome: string, email: string, password: string){
    return new Promise((resolve, reject) => {
      var data = {
        nome: nome,
        email: email,
        password: password
      };
      let body = JSON.stringify(data);
      this.http.post(this.API_URL + 'usuario', body, null).subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      var data = {
        email: email,
        password: password
      };
      let body = JSON.stringify(data);
      this.http.post(this.API_URL + 'usuario/login', body, null).subscribe((result: any) => {
        resolve(result.json());
      },
      (error) => {
        reject(error.json());
      });
    });
  }

  getUsuario(id: number) {
    return new Promise((resolve, reject) => {
      
      let url = this.API_URL + 'usuario/id/' + id;

      this.http.get(url).subscribe((result: any) => {
        resolve(result.json());
      },
      (error) => {
        reject(error.json());
      })
    });
  }

  getUsuarioEmail(email: string, password: string) {
    return new Promise((resolve, reject) => {
      let url = this.API_URL + 'usuario/email/' + email;
      
      this.http.get(url).subscribe((result: any) => {
        resolve(result.json());
      },
      (error) => {
        reject(error.json());
      })
    });
  }

  publicarArtigo(categoriaid: number, titulo: Text, texto: Text) {
    return new Promise((resolve, reject) => {
      let pub = this.date.getDate() + '/' + (this.date.getMonth() + 1) + '/' + this.date.getFullYear();

      var artigo = {
        usuarioid: 1,
        categoriaid: 1,
        titulo: titulo,
        publicacao: pub,
        texto: texto
      };

      let body = JSON.stringify(artigo);
      
      this.http.post(this.API_URL + 'artigo', body, null).subscribe((result: any) => {
        resolve(result.json());
      },
      (error) => {
        reject(error.json());
      });
    });
  }

  getArtigo(id: number) {
    return new Promise((resolve, reject) => {
      let url = this.API_URL + 'artigo/id/' + id;

      this.http.get(url).subscribe((result: any) => {
        resolve(result.json());
      },
      (error) => {
        reject(error.json());
      })
    });    
  }

  getArtigos() {
    return new Promise((resolve, reject) => {
      let url = this.API_URL + 'artigo';

      this.http.get(url).subscribe((result: any) => {
        resolve(result.json());
      },
      (error) => {
        reject(error.json());
      })
    });
  }

  criaCurtida(artigoid: number) {
    return new Promise((resolve, reject) => {
      
      let curtida = {artigoid: artigoid, total: 0};
      let body = JSON.stringify(curtida);
      
      this.http.post(this.API_URL + 'curtida', body, null).subscribe((result: any) => {
        resolve(result.json());
      },
      (error) => {
        reject(error.json());
      });
    });
  }

  getTotalCurtidas() {
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + 'curtida').subscribe((result: any) => {
        resolve(result.json());
      },
      (error) => {
        reject(error.json());
      })
    });    
  }

  getCategorias() {
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + 'categoria').subscribe((result: any) => {
        resolve(result.json());
      },
      (error) => {
        reject(error.json());
      })
    });    
  }

  getComentarios() {
    return new Promise((resolve, reject) => {
      let url = this.API_URL + 'comentario';
      
      this.http.get(url).subscribe((result: any) => {
        resolve(result.json());
      },
      (error) => {
        reject(error.json());
      })
    });
  }

}
