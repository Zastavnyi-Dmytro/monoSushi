import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../shared/guards/auth/auth.guard';
import { AdminAuthComponent } from './admin-auth/admin-auth.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminDiscountsComponent } from './admin-discounts/admin-discounts.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';


const routes: Routes = [
    { path: 'discounts', component: AdminDiscountsComponent, canActivate: [authGuard] },
    { path: 'products', component: AdminProductsComponent, canActivate: [authGuard] },
    { path: 'category', component: AdminCategoryComponent, canActivate: [authGuard] },
    { path: 'order', component: AdminOrderComponent, canActivate: [authGuard] },
    { path: 'admin-auth', component: AdminAuthComponent, canActivate: [authGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
