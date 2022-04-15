import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamePageRoutingModule } from './game-routing.module';

import { GamePage } from './game.page';

import { ComponentsModule } from '../../components/components.module';
import { TruncatePipe } from './game.truncate.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamePageRoutingModule,
    ComponentsModule, 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [GamePage, TruncatePipe ]
})
export class GamePageModule {}
