import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Juego } from '../../administration/interfaces/interface';
import { IonInfiniteScroll, Platform } from '@ionic/angular';
import { TruncatePipe } from './favorites.truncate.pipe';
import { FavsLocalStorage } from '../../providers/favs-sqlite';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  providers:[TruncatePipe]
})
export class FavoritesPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    private restService : RestService,
    public alertController: AlertController, 
    public favsLocalStorage: FavsLocalStorage,
    public truncate : TruncatePipe,
    public platform: Platform
  ) {this.getFavorites();}

  ngOnInit() {
   this.getFavorites();
   
  }

  ionViewWillEnter() {
   this.getFavorites();
  }

  doRefresh(event){
    this.getFavorites();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000)
  }
  
  juegos:Juego[];

  async getFavorites(){
    this.platform.ready().then(()=>{this.juegos=this.favsLocalStorage.getDatabase()});
  }

  public showAll: any = false;
    
  triggerReadMore(showAll) {
      showAll = true;
      console.log(showAll);
  }

  deletedFavorites(id){
    this.favsLocalStorage.deleteDatabase(id);
    this.getFavorites();
  }
  
}
