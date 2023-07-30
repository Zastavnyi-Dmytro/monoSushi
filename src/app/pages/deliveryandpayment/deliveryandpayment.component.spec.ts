import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryandpaymentComponent } from './deliveryandpayment.component';

describe('DeliveryandpaymentComponent', () => {
  let component: DeliveryandpaymentComponent;
  let fixture: ComponentFixture<DeliveryandpaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryandpaymentComponent]
    });
    fixture = TestBed.createComponent(DeliveryandpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
