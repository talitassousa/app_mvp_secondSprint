import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CadProductComponent } from '../cad-product/cad-product.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [ProductComponent, CadProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ToastModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    HttpClientModule,
    AutoCompleteModule
  ],
})
export class ProductModule {}
