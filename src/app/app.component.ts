import { Component } from '@angular/core';
import { RestService } from './services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  constructor(
    public restService: RestService, 
    public Router: Router
  ) {}

  
async logout() {
console.log('logout')
 this.restService.logout();
 this.Router.navigate(['/login']);
}


}


