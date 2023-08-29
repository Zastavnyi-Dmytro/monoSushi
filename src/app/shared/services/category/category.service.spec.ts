import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryRequest } from '../../interfaces/interfaces.component';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CategoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new category', () => {
    const categoryRequest = {
      name: 'string',
      path: 'string',
      img: 'string'
    };

    service.create(categoryRequest).subscribe((response: any) => {
      expect(response).toEqual(categoryRequest);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/categories');

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(categoryRequest);

    req.flush(categoryRequest, { status: 200, statusText: 'OK' });
  });

  it('should edit category', () => {
    const editedCategory: CategoryRequest = {
      name: 'string',
      path: 'string',
      img: 'string'
    };
    const categoryId = 1;

    service.edit(editedCategory, categoryId).subscribe((response: any) => {
      expect(response).toEqual(editedCategory);
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/categories/${categoryId}`);

    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual(editedCategory);

    req.flush(editedCategory, { status: 200, statusText: 'OK' });
  });

  it('should delete category', () => {
    const categoryId = 1;

    service.delete(categoryId).subscribe(() => {
      expect(true).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/categories/${categoryId}`);

    expect(req.request.method).toEqual('DELETE');

    req.flush(null, { status: 204, statusText: 'No Content' });
  });
});
