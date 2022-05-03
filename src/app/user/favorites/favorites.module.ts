import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritesPageRoutingModule } from './favorites-routing.module';

import { FavoritesPage } from './favorites.page';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { ComponentsModule } from 'src/app/components/components.module';
import { TruncatePipe } from '../favorites/favorites.truncate.pipe';
import { FavsLocalStorage } from 'src/app/providers/favs-sqlite';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritesPageRoutingModule,
    ComponentsModule,

  ],
  providers: [SQLite, FavsLocalStorage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [FavoritesPage, TruncatePipe]
})
export class FavoritesPageModule {}
