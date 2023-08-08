import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { DiscountsInfoComponent } from './pages/discounts-info/discounts-info.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { DeliveryandpaymentComponent } from './pages/deliveryandpayment/deliveryandpayment.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { AdminDiscountsComponent } from './admin/admin-discounts/admin-discounts.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductService } from './shared/services/products/product.service';
import { DiscountService } from './shared/services/discounts/discount.service';



const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'home', component: HomeComponent},
  {path:'discounts', component: DiscountsComponent},
  {path:'discounts/:name/:id', component: DiscountsInfoComponent, resolve:{
    discountInfo: DiscountService
  }},
  {path:'products/:category', component: ProductsComponent},
  {path:'products/:category/:id', component: ProductInfoComponent, resolve:{
    productInfo: ProductService
  }},
  {path:'delivery-and-payment', component: DeliveryandpaymentComponent},
  {path:'about-us', component: AboutusComponent},
  {path:'admin/discounts', component: AdminDiscountsComponent},
  {path:'admin/products', component: AdminProductsComponent},
  {path:'admin/category', component: AdminCategoryComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
