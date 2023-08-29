import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { Login } from '../../interfaces/interfaces.component';

describe('AccountService', () => {
  let service: AccountService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AccountService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform login', () => {
    const mockCredential: Login = {
      email: 'test@example.com',
      password: 'password123'
    };
    const mockResponse = { status: 'success', token: 'fake-token' };
  
    service.login(mockCredential).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });
  
    const expectedUrl = `http://localhost:3000/auth?email=${mockCredential.email}&password=${mockCredential.password}`;
    const req = httpTestingController.expectOne(expectedUrl);
  
    expect(req.request.method).toEqual('GET');
  
    req.flush(mockResponse, { status: 200, statusText: 'OK' });
  });
});
