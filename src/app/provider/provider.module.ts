import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ProviderRoutingModule } from './provider-routing.module';
import { ProviderComponent } from './provider.component';

@NgModule({
  declarations: [ProviderComponent],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    ToastModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class ProviderModule {}
