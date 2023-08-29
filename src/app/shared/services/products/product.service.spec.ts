import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductService } from './product.service';
import { ProductsRequest } from '../../interfaces/interfaces.component';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new product', () => {
    const productsRequest = {
      path: 'string',
      name: 'string',
      ingredients: 'string',
      weight: 40,
      price: 200,
      img: 'string'
    };

    service.create(productsRequest).subscribe((response: any) => {
      expect(response).toEqual(productsRequest);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/products');

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(productsRequest);

    req.flush(productsRequest, { status: 200, statusText: 'OK' });
  });

  it('should edit  product', () => {
    const editedProduct: ProductsRequest = {
      path: 'edited',
      name: 'edited',
      ingredients: 'edited',
      weight: 50,
      price: 250,
      img: 'edited'
    };
    const productId = 1;

    service.edit(editedProduct, productId).subscribe((response: any) => {
      expect(response).toEqual(editedProduct);
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/products/${productId}`);

    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual(editedProduct);

    req.flush(editedProduct, { status: 200, statusText: 'OK' });
  });

  it('should delete an existing product', () => {
    const productId = 1;

    service.delete(productId).subscribe(() => {
      expect(true).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/products/${productId}`);

    expect(req.request.method).toEqual('DELETE');

    req.flush(null, { status: 204, statusText: 'No Content' });
  });

  it('should get products by category', () => {
    const categoryName = 'electronics';
    const fakeProducts = [
      {
        id: 1,
        path: 'string',
        name: 'string',
        ingredients: 'string',
        weight: 2,
        price: 41,
        img: 'string',
        category: 'Category',
        count: 5
      },
      {
        id: 2,
        path: 'string',
        name: 'string',
        ingredients: 'string',
        weight: 2,
        price: 41,
        img: 'string',
        category: 'Category',
        count: 5
      },
    ];

    service.getProductsByCategory(categoryName).subscribe(products => {
      expect(products).toEqual(jasmine.arrayContaining(fakeProducts));
    });

    const req = httpTestingController.expectOne(`${service.api.products}?category.path=${categoryName}`);
    expect(req.request.method).toEqual('GET');
    req.flush(fakeProducts);
  });

  it('should get a single product', () => {
    const productId = 1;
    const fakeProduct = {
      id: productId,
      path: 'product-1',
      name: 'Product 1',
      ingredients: 'Ingredients 1',
      weight: 100,
      price: 200,
      img: 'image-1.jpg',
      category: {
        id: 1,
        name: 'string',
        path: 'string',
        img: 'string'
      },
      count: 5
    };

    service.getOne(productId).subscribe(product => {
      expect(product).toEqual(fakeProduct);
    });

    const req = httpTestingController.expectOne(`${service.api.products}/${productId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(fakeProduct);
  });

  it('should resolve product data', () => {
    const productId = 1;
    const fakeProduct = {
      id: productId,
      path: 'product-1',
      name: 'Product 1',
      ingredients: 'Ingredients 1',
      weight: 100,
      price: 200,
      img: 'image-1.jpg',
      category: {
        id: 1,
        name: 'string',
        path: 'string',
        img: 'string'
      },
      count: 5
    };
    const route: ActivatedRouteSnapshot = {
      paramMap: {
        get: jasmine.createSpy().and.returnValue(String(productId))
      }
    } as any;

    service.resolve(route).subscribe(product => {
      expect(product).toEqual(fakeProduct);
    });

    const req = httpTestingController.expectOne(`${service.api.products}/${productId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(fakeProduct);
  });
});