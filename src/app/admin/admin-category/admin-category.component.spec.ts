import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryComponent } from './admin-category.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Storage, StorageModule } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdminCategoryComponent', () => {
  let component: AdminCategoryComponent;
  let fixture: ComponentFixture<AdminCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCategoryComponent],
      imports:[
        HttpClientTestingModule,
        StorageModule,
        ReactiveFormsModule
      ],
      providers:[
        {provide:Storage, useValue:{}}
      ],
      schemas:[NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(AdminCategoryComponent);
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

  it('should update form values when editing a category', () => {
    const mockCategory = {
      id: 1,
      name: 'Test Category',
      path: '/test-category',
      img: 'test-image.jpg'
    };

    component.editCategory(mockCategory);

    expect(component.categoryForm.value).toEqual({
      name: mockCategory.name,
      path: mockCategory.path,
      img: mockCategory.img
    });
  });

  it('should set appropriate flags when editing a category', () => {
    const mockCategory = {
      id: 1,
      name: 'Test Category',
      path: '/test-category',
      img: 'test-image.jpg'
    };

    component.editCategory(mockCategory);

    expect(component.isUploaded).toBeTrue();
    expect(component.addMenu).toBeTrue();
    expect(component.editMode).toBeTrue();
    expect(component.editId).toBe(mockCategory.id);
  });

  it('should return the value of a control', () => {
    const mockValue = 'Test Value';
    component.categoryForm.patchValue({ name: mockValue });

    const result = component.valueByControl('name');

    expect(result).toBe(mockValue);
  });

  it('should reset flags and variables', () => {
    component.editMode = true;
    component.addMenu = true;
    component.isUploaded = true;
    component.uploadPercent = 50;
    component.showProgress = true;

    component.addCategory();

    expect(component.editMode).toBeFalse();
    expect(component.addMenu).toBeFalse();
    expect(component.isUploaded).toBeFalse();
    expect(component.uploadPercent).toBe(0);
    expect(component.showProgress).toBeFalse();
  });

});
