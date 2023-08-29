import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthComponent } from './admin-auth.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Auth, AuthModule } from '@angular/fire/auth';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AdminAuthComponent', () => {
  let component: AdminAuthComponent;
  let fixture: ComponentFixture<AdminAuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAuthComponent],
      imports:[
        HttpClientTestingModule,
        AuthModule,
        ReactiveFormsModule
      ],
      providers:[
        {provide:Storage, useValue:{}},
        {provide:Auth, useValue:{}},
        {provide:Firestore, useValue:{}},
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(AdminAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
