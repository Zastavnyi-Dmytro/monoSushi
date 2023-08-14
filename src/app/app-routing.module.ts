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
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { ProductService } from './shared/services/products/product.service';
import { DiscountService } from './shared/services/discounts/discount.service';
import { authGuard } from './shared/guards/auth/auth.guard';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserProfileInfoComponent } from './pages/user-profile/user-profile-info/user-profile-info.component';
import { UserProfileHistoryComponent } from './pages/user-profile/user-profile-history/user-profile-history.component';
import { AdminAuthComponent } from './admin/admin-auth/admin-auth.component';



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
  {path:'auth', component: AuthorizationComponent},
  {path:'user-profile', component: UserProfileComponent, canActivate:[authGuard]},
  {path:'user-profile/info', component: UserProfileInfoComponent, canActivate:[authGuard]},
  {path:'user-profile/history', component: UserProfileHistoryComponent, canActivate:[authGuard]},
  {path:'admin/discounts', component: AdminDiscountsComponent, canActivate:[authGuard]},
  {path:'admin/products', component: AdminProductsComponent, canActivate:[authGuard]},
  {path:'admin/category', component: AdminCategoryComponent, canActivate:[authGuard]},
  {path:'admin/order', component: AdminOrderComponent, canActivate:[authGuard]},
  {path:'admin/admin-auth', component: AdminAuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
