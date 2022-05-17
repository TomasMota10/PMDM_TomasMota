import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Juego } from '../administration/interfaces/interface';
import { AlertController } from '@ionic/angular';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';

// @Injectable({
//     providedIn:'root'
// })
// export class FavsSQLite{
//     db: SQLiteObject=null;
    
//     constructor(public sqlite: SQLite){}

// createDatabase(){
//     let con=this.sqlite.create({name:'favoritos.db', location: 'default'})
//     if(con==null){console.log('SQL NULO')}; con.then(
//         (db:SQLiteObject) =>{if(this.db===null){
//             this.db = db;
//             let SQL='CREATE TABLE if NOT EXISTS favoritos(id INTEGER PRIMARY KEY, title VARCHAR(100), short_description VARCHAR(255), developer VARCHAR(100), platform VARCHAR(50), thumbnail VARCHAR(255))';
//             return this.db.executeSql(SQL);
//         }
//         }
//     ).catch(()=>{console.log('error');});
// }

// getDatabase(){
//     let sql='SELECT * from favoritos';
//     return this.db.executeSql(sql).then(data=>{
//         let elements=[];
//         for (let i=0; i<data.rows.length;i++){
//             elements.push(data.rows.item(i));
//         }
//         return Promise.resolve(elements);
//     });
// }

// addDatabase(juego:Juego){
//     let sql='INSERT INTO favoritos(id, title, short_description, developer, platform, thumbnail) VALUES (?,?,?,?,?,?)';
//     return this.db.executeSql(sql,[juego.id, juego.title, juego.short_description, juego.developer, juego.platform, juego.thumbnail]);
// }

// deletedDatabase(juego:Juego){
//     let sql='DELETE from favoritos WHERE id=?';
//     return this.db.executeSql(sql,[juego.id])
// }

// }

@Injectable({
    providedIn:'root'
})
export class BasketLocalStorage{

getDatabase(){
    var arrayBasket = JSON.parse(localStorage.getItem('Basket'));
    return arrayBasket;
}

constructor(
    public alertController: AlertController

){}

addDatabase(BasketGame: Juego){
    console.log(BasketGame);
    var arrayBasket = JSON.parse(localStorage.getItem('Basket'));

    if(arrayBasket==null){
        arrayBasket = [ ];
    }
        arrayBasket.splice(arrayBasket.length, 0 , BasketGame);
        arrayBasket.sort(({id:a}, {id:b}) => a-b);

    localStorage.setItem('Basket', JSON.stringify(arrayBasket));
    this.crearalert("Juego añadido a tu cesta.",'El juego ha sido movido a tu cesta.');
}

deleteDatabase(juegoDelete){
    var arrayBasket = JSON.parse(localStorage.getItem('Basket'));
    console.log(arrayBasket);
    for(let i=0; i< arrayBasket.length; i++){
    console.log([i]);
          if(arrayBasket[i].id == juegoDelete.id){
                arrayBasket.splice(i,1);
                  console.log("ELIMINADO");
            }
    }

    localStorage.setItem('Basket', JSON.stringify(arrayBasket));
    }

existsJuego(indexExists){
    var arrayBasket = JSON.parse(localStorage.getItem('Basket'));
    console.log(arrayBasket);
    for(let i=0; i< arrayBasket.length; i++){
    console.log([i]);
          if(arrayBasket[i].id == indexExists){
                return true;
            }
    }

    return false;

}

deletedBasket(){
    var arrayBasket = JSON.parse(localStorage.getItem('Basket'));
    console.log(arrayBasket);
    arrayBasket=[];
    localStorage.setItem('Basket', JSON.stringify(arrayBasket));
    this.crearalert("Cesta vacia.",'No hay ningún juego en el pedido actual.');
}

isEmpty() {
    var arrayBasket = JSON.parse(localStorage.getItem('Basket'));
    if(arrayBasket == null){
        return true;
    }else if(arrayBasket.length == 0){
        return true;
    }
    return false; 
}

async crearalert(variableHeader, variableMessage) {
    console.log()
    const alert = await this.alertController.create({
      header:variableHeader,
      message: variableMessage,
      buttons: ['Aceptar'],
    });
    await alert.present();
    return;
  }

}