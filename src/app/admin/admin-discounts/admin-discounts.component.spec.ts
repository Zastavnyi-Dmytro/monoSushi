import { ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';

import { AdminDiscountsComponent } from './admin-discounts.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { StorageModule } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { FirebaseApp, FirebaseAppModule } from '@angular/fire/app';
import { Firestore, FirestoreModule } from '@angular/fire/firestore';
import { DiscountService } from 'src/app/shared/services/discounts/discount.service';
import { Discounts } from 'src/app/shared/interfaces/interfaces.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

xdescribe('AdminDiscountsComponent', () => {
  let component: AdminDiscountsComponent;
  let fixture: ComponentFixture<AdminDiscountsComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDiscountsComponent],
      imports:[
        HttpClientTestingModule,
        StorageModule,
        ReactiveFormsModule
      ],
      providers:[
        {provide:Storage, useValue:{}},
        {provide:FirebaseApp, useValue:{}},
      ],
      schemas:[NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(AdminDiscountsComponent);
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
});
