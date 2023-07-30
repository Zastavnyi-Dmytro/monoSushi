import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { RollsComponent } from './pages/products/rolls/rolls.component';
import { SetsComponent } from './pages/products/sets/sets.component';
import { DrinksComponent } from './pages/products/drinks/drinks.component';
import { SaucesComponent } from './pages/products/sauces/sauces.component';
import { DeliveryandpaymentComponent } from './pages/deliveryandpayment/deliveryandpayment.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { AdminDiscountsComponent } from './admin/admin-discounts/admin-discounts.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'home', component: HomeComponent},
  {path:'discounts', component: DiscountsComponent},
  {path:'products/rolls', component: RollsComponent},
  {path:'products/sets', component: SetsComponent},
  {path:'products/drinks', component: DrinksComponent},
  {path:'products/sauces', component: SaucesComponent},
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
