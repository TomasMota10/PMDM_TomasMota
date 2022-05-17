import { Component } from '@angular/core';
import { RestService } from './services/rest.service';
import { Router } from '@angular/router';
import { BasketLocalStorage } from './providers/basket-sqlite';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  constructor(
    public restService: RestService, 
    public Router: Router, 
    public basketLocalStorage: BasketLocalStorage
  ) {}

  
async logout() {
console.log('logout')
 this.restService.logout();
 this.Router.navigate(['/login']);
}

async Pedidos(){
console.log('pedidos')
  this.Router.navigate(['/basket']);
}

}


