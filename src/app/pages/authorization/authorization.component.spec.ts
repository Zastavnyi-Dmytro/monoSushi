import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationComponent } from './authorization.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { Auth, AuthModule } from '@angular/fire/auth';
import { FirebaseApp, FirebaseAppModule } from '@angular/fire/app';
import { Firestore, FirestoreModule } from '@angular/fire/firestore';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AuthorizationComponent', () => {
  let component: AuthorizationComponent;
  let fixture: ComponentFixture<AuthorizationComponent>;
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorizationComponent],
      imports: [
        HttpClientTestingModule,
        AuthModule,
        ReactiveFormsModule,
        MatDialogModule,
        RouterTestingModule
      ],
      providers: [
        { provide: FirebaseApp, useValue: {} },
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(AuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return password AbstractControl', () => {
    expect(component.password).toBeInstanceOf(FormControl);
  });

  it('should have password FormControl in the form', () => {
    expect(component.authForm.get('password')).toBe(component.password);
  });

  it('should return confirmPassword AbstractControl', () => {
    expect(component.confirmPassword).toBeInstanceOf(FormControl);
  });

  it('should have confirmPassword FormControl in the form', () => {
    expect(component.authForm.get('confirmPassword')).toBe(component.confirmPassword);
  });
  
  it('should return error visibility status when error exists', () => {
    const controlName = 'password';
    const errorName = 'required';
    
    component.authForm.controls[controlName].setErrors({ [errorName]: true });
    expect(component.checkVisibilityControl(controlName, errorName)).toBeTruthy();
  });

  it('should toggle signUpCheck to true', () => {
    component.signUpCheck = false;
    component.openSignUp();
    expect(component.signUpCheck).toBe(true);
  });

  it('should toggle signUpCheck to false', () => {
    component.signUpCheck = true;
    component.openSignUp();
    expect(component.signUpCheck).toBe(false);
  });

  it('should check and update confirmPassword validity', () => {
    component.password.setValue('password');
    component.confirmPassword.setValue('password');

    component.checkConfirmPassword();

    expect(component.checkPassword).toBe(true);
    expect(component.authForm.controls['confirmPassword'].hasError('matchError')).toBe(false);
  });

  it('should set matchError if passwords do not match', () => {
    component.password.setValue('password');
    component.confirmPassword.setValue('different-password');

    component.checkConfirmPassword();

    expect(component.checkPassword).toBe(false);
    expect(component.authForm.controls['confirmPassword'].hasError('matchError')).toBe(true);
  });
});
