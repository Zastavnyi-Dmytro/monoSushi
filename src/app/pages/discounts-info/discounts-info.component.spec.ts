import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountsInfoComponent } from './discounts-info.component';
import { ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DiscountsInfoComponent', () => {
  let component: DiscountsInfoComponent;
  let fixture: ComponentFixture<DiscountsInfoComponent>;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscountsInfoComponent],
      providers:[
        {provide:ActivatedRoute, useValue:{}},
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(DiscountsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
