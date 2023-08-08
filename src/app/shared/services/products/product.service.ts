import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Products } from '../../interfaces/interfaces.component';
import { ProductsRequest } from '../../interfaces/interfaces.component';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService{
  private url = environment.BACKEND_URL
  private api = { products: `${this.url}/products` }

  private products:Array<Products> = []

  constructor(
    private http: HttpClient
  ) { }

  getProducts():Observable<Products[]>{
    return this.http.get<Products[]>(this.api.products)
  }

  getProductsByCategory(name:string):Observable<Products[]>{
    return this.http.get<Products[]>(`${this.api.products}?category.path=${name}`)
  }

  getOne(id: number): Observable<Products> {
    return this.http.get<Products>(`${this.api.products}/${id}`);
  }

  create(products:ProductsRequest):Observable<void> {
    return this.http.post<void>(this.api.products, products)
  }

  edit(products:ProductsRequest, id:number):Observable<Products>{
    return this.http.patch<Products>(`${this.api.products}/${id}`, products)
  }

  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.api.products}/${id}`)
  }
  
  resolve(route:ActivatedRouteSnapshot):Observable<Products>{
    return this.http.get<Products>(`${this.api.products}/${route.paramMap.get('id')}`)
  }
}
