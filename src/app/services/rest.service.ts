import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuarios } from '../administration/interfaces/interface';
import { Juegos } from '../administration/interfaces/interface';
import { AlertController } from '@ionic/angular';
@Injectable({
    providedIn: 'root'
  })
  export class RestService {
    token: any;
    apiUrl = 'http://semillero.allsites.es/public/api';
    apiUrlGames = "https://free-to-play-games-database.p.rapidapi.com/api/games";
    headersGame= {
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
      'X-RapidAPI-Key': '5b9b785409msh58ad96901bf0ff4p13390ajsn44378b704c79'
      }
    constructor(private http: HttpClient, private AlertController: AlertController) { }
  
    login(){
      return new Promise(resolve => {
        this.http.post<any>(this.apiUrl + '/login', 
        {
          email: 'raul@raul.com', 
          password: '123456'})     
          .subscribe(data => {
            this.token = data.data.token; 
            console.log(data); 
            resolve(data);
        });
  
      });
    }
  
    loginReal(myemail: string, mypassword: string){
      return new Promise(resolve => {
        this.http.post<any>(this.apiUrl + '/login', 
        {
          email: myemail, 
          password: mypassword})     
          .subscribe(data => {
            this.token = data.data.token; 
            resolve(data);   
            console.log(data);
            }, async err => {
              console.log('El usuario es erroneo o no existe.');
              const alert = await this.AlertController.create({
                header: 'Error al iniciar sesión',
                message: 'El email o la contraseña no son correctos.',
                buttons: ['Aceptar'],
              });
              await alert.present();
              return;
        });
      });
    }

    registrarUsuario(myName: string, mySecondname: string, myEmail: string, myPassword: string, myPasswordConf : string){
      return new Promise(resolve => {
        this.http.post(this.apiUrl + '/register', 
        {
          firstname: myName,
          secondname: mySecondname,
          email: myEmail,
          password: myPassword,
          c_password: myPasswordConf})
          .subscribe(data => {
            console.log(data);
            resolve(data);
          },err => {
              console.log(err);
          });
      });
    }
  
    activarUsuario(id: number){
      return new Promise(resolve => {
        this.http.post(this.apiUrl + '/activate',{
          user_id: id
        },
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
        })
        .subscribe(data => {resolve(data)
          console.log(data);
        err => {
          console.log(err);
        }
        })
      })
    }

    desactivarUsuario(id: number){
      return new Promise(resolve => {
        this.http.post(this.apiUrl + '/deactivate',
        {
          user_id: id
        },
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
        })
        .subscribe(data => {resolve(data)
          console.log(data);
        err => {
          console.log(err);
        }
        })
      })
    }
  
    eliminarUsuario(id: number){
  
      return new Promise(resolve => {
        this.http.post(this.apiUrl + '/user/deleted/' + id,
        {
          user_id: id
        },
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
        })
        .subscribe(data => {resolve(data)
          console.log(data);
        err => {
          console.log(err);
        }
        })
        
      })
  
    }

    obtenerUsuarios(){
      return new Promise(resolve => {
        this.http.get<Usuarios>(this.apiUrl + '/users',{
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
        })
        .subscribe(data => {resolve(data)
          console.log(data);
        err => {
          console.log(err)
        }})
      })
    }

    logout(){
      this.token = null;
    }

    obtenerJuegos(plataforma){
      if(plataforma ==''){
        return new Promise(resolve => {
          this.http.get<Juegos>(this.apiUrlGames,{headers:this.headersGame})
          .subscribe(data => {resolve(data)
            console.log(data);
          err => {
            console.log(err)
          }})
        })
      }else{
      return new Promise(resolve => {
        this.http.get<Juegos>(this.apiUrlGames,{headers:this.headersGame, params:{platform:plataforma}})
        .subscribe(data => {resolve(data)
          console.log(data);
        err => {
          console.log(err)
        }})
      })
    }
    }

    getGames(){
      return new Promise(resolve => {    
        this.http.get<Juegos>(this.apiUrlGames,{headers:this.headersGame}
        )
        .subscribe(data => {resolve(data);
          console.log(data);
        err => {
          console.log(err);
        }})
      })
    }



  }