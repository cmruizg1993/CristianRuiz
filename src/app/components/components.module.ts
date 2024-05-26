import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { ModalComponent } from './modal/modal.component';
import { SelectComponent } from './select/select.component';
import { PagerComponent } from './pager/pager.component';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { FormComponent } from './form/form.component';




@NgModule({
  declarations: [
    TableComponent,
    ModalComponent,
    SelectComponent,
    PagerComponent,
    InputComponent,
    ButtonComponent,
    ContextMenuComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TableComponent,
    ModalComponent,
    SelectComponent,
    PagerComponent,
    InputComponent,
    ButtonComponent,
    FormComponent
  ]
})
export class ComponentsModule { }
