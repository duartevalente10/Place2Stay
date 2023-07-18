import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RentPagePage } from './rent-page.page';

const routes: Routes = [
  {
    path: '',
    component: RentPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentPagePageRoutingModule {}
