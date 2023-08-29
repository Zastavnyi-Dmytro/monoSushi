import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Products } from 'src/app/shared/interfaces/interfaces.component';
import { AuthorizationComponent } from 'src/app/pages/authorization/authorization.component';
import { WeCallModalComponent } from 'src/app/pages/we-call-modal/we-call-modal.component';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
      ],
      providers: [
        { provide: Router, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MatDialogModule, useValue: {} },
        { provide: ActivatedRoute, useValue: {} },
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change total', () => {
    const FAKE_BASKET = [
      {
        id: 1,
        path: 'string',
        name: 'string',
        ingredients: 'string',
        weight: 10,
        price: 20,
        img: 'string',
        category: {
          id: 1,
          name: 'string',
          path: 'string',
          img: 'string'
        },
        count: 1
      }
    ]
    component.basket = FAKE_BASKET
    spyOn(component, 'getTotalPrice').and.callThrough()
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(20)
  });

  it('should open the burger', () => {
    component.openBurger();
    expect(component.burgerSwitch).toBe(true);
  });

  it('should close the burger', () => {
    component.burgerSwitch = true;
    component.closeBurger();
    expect(component.burgerSwitch).toBe(false);
  });

  it('should open basket', () => {
    component.openBasket();
    expect(component.basketSwitch).toBe(true);
  });

  it('should increase product count', () => {
    const product: Products = {
      id: 1,
      path: 'product-1',
      name: 'Product 1',
      ingredients: 'Ingredients 1',
      weight: 200,
      price: 10,
      img: 'product-1.jpg',
      category: {
        id: 1,
        name: 'string',
        path: 'string',
        img: 'string'
      },
      count: 3,
    };
    const basket: Products[] = [product];
    component.productCount(product, true);
    expect(product.count).toBe(4);
  });

  it('should decrease product count when value is false and product count > 1', () => {
    const product: Products = {
      id: 2,
      path: 'product-2',
      name: 'Product 2',
      ingredients: 'Ingredients 2',
      weight: 250,
      price: 15,
      img: 'product-2.jpg',
      category: {
        id: 1,
        name: 'string',
        path: 'string',
        img: 'string'
      },
      count: 3,
    };
    const basket: Products[] = [product];
    component.productCount(product, false);
    expect(product.count).toBe(2);
  });

  it('should update total correctly after modifying product count', () => {
    const product: Products = {
      id: 1,
      path: 'product-1',
      name: 'Product 1',
      ingredients: 'Ingredients 1',
      weight: 200,
      price: 10,
      img: 'product-1.jpg',
      category: {
        id: 1,
        name: 'string',
        path: 'string',
        img: 'string'
      },
      count: 3,
    };
    component.basket.push(product);
    component.productCount(product, true);
    expect(component.total).toBe(40);
  });

  it('should set login details for ADMIN role', () => {
    const mockLocalStorage = {
      getItem: () => JSON.stringify({ role: 'ADMIN' })
    };
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
    component.checkLogin();
    expect(component.isLogin).toBe(true);
    expect(component.loginUrl).toBe('admin/discounts');
    expect(component.loginPage).toBe('Admin');
  });

  it('should set login details for USER role', () => {
    const mockLocalStorage = {
      getItem: () => JSON.stringify({ role: 'USER' })
    };
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
    component.checkLogin();
    expect(component.isLogin).toBe(true);
    expect(component.loginUrl).toBe('user-profile/info');
    expect(component.loginPage).toBe('User');
  });

  it('should open the login dialog', () => {
    spyOn(component.dialog, 'open');

    component.openLoginDialog();

    expect(component.dialog.open).toHaveBeenCalledWith(AuthorizationComponent, {
      panelClass: 'auth-dialog',
      autoFocus: false
    });
  });

  it('should open the call dialog', () => {
    spyOn(component.dialog, 'open');

    component.openCallDialog();

    expect(component.dialog.open).toHaveBeenCalledWith(WeCallModalComponent, {
      panelClass: 'auth-dialog',
      autoFocus: false
    });
  });

  
});
