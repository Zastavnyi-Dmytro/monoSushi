import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { DiscountsInfoComponent } from './pages/discounts-info/discounts-info.component';
import { ProductsComponent } from './pages/products/products.component';
import { DeliveryandpaymentComponent } from './pages/deliveryandpayment/deliveryandpayment.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { InterfacesComponent } from './shared/interfaces/interfaces.component';
import { AdminDiscountsComponent } from './admin/admin-discounts/admin-discounts.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { UserProfileInfoComponent } from './pages/user-profile/user-profile-info/user-profile-info.component';
import { UserProfileHistoryComponent } from './pages/user-profile/user-profile-history/user-profile-history.component';

import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { AdminAuthComponent } from './admin/admin-auth/admin-auth.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DiscountsComponent,
    DiscountsInfoComponent,
    ProductsComponent,
    DeliveryandpaymentComponent,
    AboutusComponent,
    InterfacesComponent,
    AdminDiscountsComponent,
    AdminCategoryComponent,
    AdminProductsComponent,
    ProductInfoComponent,
    AuthorizationComponent,
    UserProfileComponent,
    AdminOrderComponent,
    UserProfileInfoComponent,
    UserProfileHistoryComponent,
    AdminAuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(()=> getFirestore()),
    provideAuth(()=> getAuth()),
    NoopAnimationsModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
