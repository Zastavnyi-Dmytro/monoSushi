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
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { WeCallModalComponent } from './pages/we-call-modal/we-call-modal.component';
import { SharedModule } from './shared/shared-module';
import { DatePipe } from '@angular/common';


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
    ProductInfoComponent,
    WeCallModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(()=> getFirestore()),
    provideAuth(()=> getAuth()),
    NoopAnimationsModule,
    SharedModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
