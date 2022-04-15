import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlatformPageRoutingModule } from './platform-routing.module';

import { PlatformPage } from './platform.page';

import { ComponentsModule } from '../../components/components.module';

import { TruncatePipe } from './platform.truncate.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlatformPageRoutingModule,
    ComponentsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [PlatformPage, TruncatePipe]
})
export class PlatformPageModule {}
