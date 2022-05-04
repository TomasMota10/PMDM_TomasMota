import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Juego } from '../../administration/interfaces/interface';
import { TruncatePipe } from './game.truncate.pipe';
import { IonInfiniteScroll } from '@ionic/angular';
import { FavsLocalStorage } from 'src/app/providers/favs-sqlite';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  providers:[TruncatePipe]
})
export class GamePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    private restService : RestService, 
    public truncate : TruncatePipe,
    public favsLocalStorage:FavsLocalStorage
    ) 
  {
   }
  ngOnInit() {
    this.getJuegos();
  }

  juegos:Juego[];
  favoritos:Juego[];

  async getJuegos(){
    this.restService.obtenerJuegos('')
    // Con '' indicamos que queremos toda la lista de juegos disponibles
    .then((juegos:any) => {
      this.juegos = juegos;
      console.log(juegos);
    });
    this.favoritos=this.favsLocalStorage.getDatabase();
    console.log(this.favoritos);
  }
  
  existsJuego(juego){
    if (this.favoritos!=null){
      return this.favoritos.some( rest => rest['id'] === juego.id)
    }

  }
  // async addFavorite(favorites){
  //   console.log(favorites);
  //   this.favsLocalStorage.addDatabase(favorites);
  // }

  addFavoritos(juego){
    this.favsLocalStorage.addDatabase(juego);
    this.getJuegos();
  }

  ionViewWillEnter() {
    this.getJuegos();
   }

  doRefresh(event){
    this.getJuegos();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000)
  }

  public showAll: any = false;
    
  triggerReadMore(showAll) {
      showAll = true;
      console.log(showAll);
  }


}

