import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountsInfoComponent } from './discounts-info.component';

describe('DiscountsInfoComponent', () => {
  let component: DiscountsInfoComponent;
  let fixture: ComponentFixture<DiscountsInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscountsInfoComponent]
    });
    fixture = TestBed.createComponent(DiscountsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
