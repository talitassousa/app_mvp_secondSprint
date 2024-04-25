import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { CadProductComponent } from '../cad-product/cad-product.component';
import { ProviderComponent } from 'src/app/provider/provider.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
  },
  {
    path: 'cadastrar',
    component: CadProductComponent,
  },
  {
    path: ':id',
    component: CadProductComponent,
  },
  {
    path: 'provider',
    component: ProviderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
