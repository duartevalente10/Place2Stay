import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RentPagePageRoutingModule } from './rent-page-routing.module';

import { RentPagePage } from './rent-page.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RentPagePageRoutingModule
  ],
  declarations: [RentPagePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RentPagePageModule {}
