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
export class FavsLocalStorage{

getDatabase(){
    var arrayFav = JSON.parse(localStorage.getItem('Fav'));
    return arrayFav;
}

addDatabase(FavGame: Juego){
    console.log(FavGame);
    var arrayFav = JSON.parse(localStorage.getItem('Fav'));

    if(arrayFav==null){
        arrayFav = [ ];
    }
        arrayFav.splice(arrayFav.length, 0 , FavGame);
        arrayFav.sort(({id:a}, {id:b}) => a-b);

    localStorage.setItem('Fav', JSON.stringify(arrayFav));
    alert('Hola');
}

deleteDatabase(indexDeleted){
    var arrayFav = JSON.parse(localStorage.getItem('Fav'));
    console.log(arrayFav);
    for(let i=0; i< arrayFav.length; i++){
    console.log([i]);
          if(arrayFav[i].id == indexDeleted){
                arrayFav.splice(i,1);
                  console.log("ELIMINADO");
            }
    }

    localStorage.setItem('Fav', JSON.stringify(arrayFav));
    }

existsJuego(indexExists){
    var arrayFav = JSON.parse(localStorage.getItem('Fav'));
    console.log(arrayFav);
    for(let i=0; i< arrayFav.length; i++){
    console.log([i]);
          if(arrayFav[i].id == indexExists){
                return true;
            }
    }

    return false;

}
}