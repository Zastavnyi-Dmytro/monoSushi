import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { DiscountsInfoComponent } from './pages/discounts-info/discounts-info.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { DeliveryandpaymentComponent } from './pages/deliveryandpayment/deliveryandpayment.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { authGuard } from './shared/guards/auth/auth.guard';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'discounts', component: DiscountsComponent },
  {
    path: 'discounts/:name/:id', component: DiscountsInfoComponent
  },
  { path: 'products/:category', component: ProductsComponent },
  {
    path: 'products/:category/:id', component: ProductInfoComponent
  },
  { path: 'delivery-and-payment', component: DeliveryandpaymentComponent },
  { path: 'about-us', component: AboutusComponent },
  { path: 'auth', loadChildren: () => import('./pages/authorization/authorization.module').then(m => m.AuthorizationModule) },
  { path: 'user-profile', canActivate: [authGuard], loadChildren: () => import('./pages/user-profile/user-profile.module').then(m => m.UserProfileModule) },
  { path: 'admin', canActivate: [authGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
