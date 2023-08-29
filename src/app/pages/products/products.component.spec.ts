import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increase count when value is true', function () {
    const product = { 
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
      count: 5,
     };
    component.productCount(product, true);
    expect(product.count).toEqual(6);
  });

  it('should increase count when value is true for zero count', function () {
    const product = { 
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
      count: 0,
     };
    component.productCount(product, true);
    expect(product.count).toEqual(1);
  });

  it('should decrease count when value is false and count > 1', function () {
    const product = { 
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
    component.productCount(product, false);
    expect(product.count).toEqual(2);
  });

  it('should not decrease count when value is false and count <= 1', function () {
    const product = { 
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
      count: 1,
     };
    component.productCount(product, false);
    expect(product.count).toEqual(1);
  });

  it('should not change count when value is false and count is 0', function () {
    const product = { 
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
      count: 0,
     };
    component.productCount(product, false);
    expect(product.count).toEqual(0);
  });
});
