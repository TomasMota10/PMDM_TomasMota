import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Juego } from '../../administration/interfaces/interface';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.page.html',
  styleUrls: ['./platform.page.scss'],
})
export class PlatformPage implements OnInit {

  constructor(private restService : RestService) 
  {
   }
  ngOnInit() {
    // this.getJuegos();
  }

  public showAll: any = false;
    
  triggerReadMore(showAll) {
      showAll = true;
      console.log(showAll);
  }
  juegos:Juego[];
  getJuegos($event){
    console.log($event)
    this.restService.obtenerJuegos($event.detail.value)
    .then((juegos:any) => {
      this.juegos = juegos;
      console.log(juegos);
    });
  }
}
