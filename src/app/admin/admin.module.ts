import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing-module';
import { SharedModule } from '../shared/shared-module';
import { AdminAuthComponent } from './admin-auth/admin-auth.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminDiscountsComponent } from './admin-discounts/admin-discounts.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';



@NgModule({
  declarations: [
    AdminAuthComponent,
    AdminCategoryComponent,
    AdminDiscountsComponent,
    AdminOrderComponent,
    AdminProductsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
