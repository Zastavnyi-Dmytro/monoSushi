import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountsComponent } from './discounts.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { DiscountService } from 'src/app/shared/services/discounts/discount.service';

class DiscountsBaseStub {
  getDiscounts() {
    return of([{
      date: 'Date',
      id: 1,
      name: 'string',
      title: 'string',
      description: 'string',
      img: 'string'
    }]);
  }
}

describe('DiscountsComponent', () => {
  let component: DiscountsComponent;
  let fixture: ComponentFixture<DiscountsComponent>;
  let discountsBaseStub: DiscountsBaseStub;

  beforeEach(() => {
    discountsBaseStub = new DiscountsBaseStub();
    TestBed.configureTestingModule({
      declarations: [DiscountsComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers:[
        { provide: DiscountService, useValue: discountsBaseStub }
      ]
    });
    fixture = TestBed.createComponent(DiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get discounts', () => {
    const fakeDiscounts = [
      {
        date: 'Date',
        id: 1,
        name: 'string',
        title: 'string',
        description: 'string',
        img: 'string'
      }
    ]
    spyOn(component, 'getDiscounts').and.callThrough();
    spyOn(discountsBaseStub, 'getDiscounts').and.returnValue(of(fakeDiscounts));

    component.getDiscounts();

    expect(component.getDiscounts).toHaveBeenCalled();
    expect(component.userDiscounts).toEqual(jasmine.arrayContaining(fakeDiscounts));
  });
});
