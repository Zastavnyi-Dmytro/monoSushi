import { TestBed } from '@angular/core/testing';

import { DiscountService } from './discount.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Discounts, DiscountsRequest } from '../../interfaces/interfaces.component';
import { ActivatedRouteSnapshot } from '@angular/router';

describe('DiscountService', () => {
  let service: DiscountService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(DiscountService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new discount', () => {
    const DiscountsRequest = {
      name: 'string',
      title: 'string',
      description: 'string',
      img: 'string'
    };

    service.create(DiscountsRequest).subscribe((response: any) => {
      expect(response).toEqual(DiscountsRequest);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/discounts');

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(DiscountsRequest);

    req.flush(DiscountsRequest, { status: 200, statusText: 'OK' });
  });

  it('should edit discount', () => {
    const editedDiscount: DiscountsRequest = {
      name: 'string',
      title: 'string',
      description: 'string',
      img: 'string'
    };
    const discountId = 1;

    service.edit(editedDiscount, discountId).subscribe((response: any) => {
      expect(response).toEqual(editedDiscount);
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/discounts/${discountId}`);

    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual(editedDiscount);

    req.flush(editedDiscount, { status: 200, statusText: 'OK' });
  });

  it('should delete discount', () => {
    const discountId = 1;

    service.delete(discountId).subscribe(() => {
      expect(true).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/discounts/${discountId}`);

    expect(req.request.method).toEqual('DELETE');

    req.flush(null, { status: 204, statusText: 'No Content' });
  });

  it('should resolve discount data', () => {
    const discountId = 1;
    const fakeDiscount = {
      date: new Date(),
      id: 1,
      name: 'string',
      title: 'string',
      description: 'string',
      img: 'string'
    };
    const route: ActivatedRouteSnapshot = {
      paramMap: {
        get: jasmine.createSpy().and.returnValue(String(discountId))
      }
    } as any;

    service.resolve(route).subscribe(discount => {
      // Ожидаемый формат для date: ExpectedRecursive<Date>
      const expectedDiscount = {
        ...fakeDiscount,
        date: jasmine.any(Date)
      };

      expect(discount).toEqual(expectedDiscount);
    });

    const req = httpTestingController.expectOne(`${service.api.discounts}/${discountId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(fakeDiscount);
  });

  it('should get discounts', () => {
    const fakeDiscounts: Discounts[] = [
      {date: new Date,
      id: 1,
      name: 'string',
      title: 'string',
      description: 'string',
      img: 'string'}
    ];

    service.getDiscounts().subscribe(discounts => {
      expect(discounts).toEqual(fakeDiscounts);
    });

    const req = httpTestingController.expectOne(service.api.discounts);
    expect(req.request.method).toEqual('GET');
    req.flush(fakeDiscounts);
  });
});
