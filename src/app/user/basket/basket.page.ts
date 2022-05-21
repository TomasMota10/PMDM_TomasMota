import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, Platform } from '@ionic/angular';
import { BasketLocalStorage } from 'src/app/providers/basket-sqlite';
import { Juego } from '../../administration/interfaces/interface';
import { BasketpdfPage } from '../basketpdf/basketpdf.page';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
})
export class BasketPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  juegos: any;
  deletedBasket: any;
  

  constructor(
  public platform: Platform,
  public basketLocalStorage: BasketLocalStorage,
  public basketPagePDF: BasketpdfPage
  ) { }

  ngOnInit() {
    this.getPedidos();
   
  }

  ionViewWillEnter() {
    this.getPedidos();
   }
 
   doRefresh(event){
     this.getPedidos();
     setTimeout(() => {
       console.log('Async operation has ended');
       event.target.complete();
     }, 2000)
   }
   
  async getPedidos() {
    this.platform.ready().then(()=>{this.juegos=this.basketLocalStorage.getDatabase()});
  }

  async comprarPedidos() {
    this.basketPagePDF.createPdf();
    this.basketLocalStorage.deletedBasket();
    this.getPedidos();
  }

}
