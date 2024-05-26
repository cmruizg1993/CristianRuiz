import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';
import { ProductComponent } from './product/product.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    IndexComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProductModule { }
