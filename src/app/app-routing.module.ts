import { NgModule } from '@angular/core';
import { ProductModule } from './products/product/product.module';
import { RouterModule, Routes } from '@angular/router';
import { ProviderModule } from './provider/provider.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products',
  },
  {
    path: 'products',
    loadChildren: () => ProductModule,
  },
  {
    path: 'provider',
    loadChildren: () => ProviderModule,
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
