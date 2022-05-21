import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BasketpdfPageRoutingModule } from './basketpdf-routing.module';

import { BasketpdfPage } from './basketpdf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BasketpdfPageRoutingModule
  ],
  declarations: [BasketpdfPage]
})
export class BasketpdfPageModule {}
