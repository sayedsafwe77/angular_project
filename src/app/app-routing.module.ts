import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllProductComponent } from './all-product/all-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

import { CheckoutComponent } from './checkout/checkout.component';
import { AddToCardComponent } from './add-to-card/add-to-card.component'


const routes: Routes = [
  {
    path: '',
    component: AllProductComponent
  },
  {
    path: 'product',
    component:ProductDetailsComponent
  },
  {
    path: 'checkout',
    component:CheckoutComponent
  },
  {
    path: 'cardList',
    component:AddToCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
