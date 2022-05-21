import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasketpdfPage } from './basketpdf.page';

const routes: Routes = [
  {
    path: '',
    component: BasketpdfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasketpdfPageRoutingModule {}
