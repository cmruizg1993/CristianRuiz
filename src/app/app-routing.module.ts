import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductRoutingModule } from './product/product-routing.module';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes), ProductRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
