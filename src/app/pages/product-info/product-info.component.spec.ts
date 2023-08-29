import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfoComponent } from './product-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductInfoComponent', () => {
  let component: ProductInfoComponent;
  let fixture: ComponentFixture<ProductInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductInfoComponent],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(ProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
