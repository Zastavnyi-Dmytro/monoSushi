import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductsComponent } from './admin-products.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FirebaseAppModule } from '@angular/fire/app';
import { Storage } from '@angular/fire/storage';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

describe('AdminProductsComponent', () => {
  let component: AdminProductsComponent;
  let fixture: ComponentFixture<AdminProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProductsComponent],
      imports:[
        HttpClientTestingModule,
        RouterLink
      ],
      providers:[
        {provide:FirebaseAppModule, useValue:{}},
        {provide:Storage, useValue:{}},
        {provide:Firestore, useValue:{}},
        {provide:ActivatedRoute, useValue:{}},

      ]
    });
    fixture = TestBed.createComponent(AdminProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle addMenu to true', () => {
    component.addMenu = false;
    component.openAddMenu();
    expect(component.addMenu).toBe(true);
  });

  it('should toggle addMenu to false', () => {
    component.addMenu = true;
    component.openAddMenu();
    expect(component.addMenu).toBe(false);
  });

  it('should reset flags and variables', () => {
    component.isUploaded = true;
    component.uploadPercent = 50;
    component.showProgress = true;
    component.editMode = true;
    component.addMenu = true;

    component.addProduct();

    expect(component.isUploaded).toBe(false);
    expect(component.uploadPercent).toBe(0);
    expect(component.showProgress).toBe(false);
    expect(component.editMode).toBe(false);
    expect(component.addMenu).toBe(false);
  });

  it('should set form values and flags when editing a product', () => {
    const mockProduct = {
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

    component.editProduct(mockProduct);

    expect(component.productForm.value).toEqual({
      name: mockProduct.name,
      path: mockProduct.path,
      ingredients: mockProduct.ingredients,
      weight: mockProduct.weight,
      price: mockProduct.price,
      img: mockProduct.img,
      count: mockProduct.count,
      category: null
    });
    expect(component.isUploaded).toBe(true);
    expect(component.addMenu).toBe(true);
    expect(component.editMode).toBe(true);
    expect(component.editId).toBe(mockProduct.id);
  });

  it('should return the value of a control', () => {
    const mockValue = 'Test Value';
    component.productForm.patchValue({ name: mockValue });

    const result = component.valueByControl('name');

    expect(result).toBe(mockValue);
  });
});
