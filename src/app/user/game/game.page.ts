import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Juego } from '../../administration/interfaces/interface';
import { TruncatePipe } from './game.truncate.pipe';
import { IonInfiniteScroll } from '@ionic/angular';

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
    ) 
  {
   }
  ngOnInit() {
    this.getJuegos();
  }

  juegos:Juego[];

  async getJuegos(){
    this.restService.obtenerJuegos('')
    // Con '' indicamos que queremos toda la lista de juegos disponibles
    .then((juegos:any) => {
      this.juegos = juegos;
      console.log(juegos);
    });
  }

  public showAll: any = false;
    
  triggerReadMore(showAll) {
      showAll = true;
      console.log(showAll);
  }


}

