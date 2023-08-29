import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Discounts } from '../../interfaces/interfaces.component';
import { DiscountsRequest } from '../../interfaces/interfaces.component';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  public url = environment.BACKEND_URL
  public api = { discounts: `${this.url}/discounts` }

  private discounts:Array<Discounts> = []

  constructor(
    private http: HttpClient
  ) { }

  getDiscounts():Observable<Discounts[]>{
    return this.http.get<Discounts[]>(this.api.discounts)
  }

  create(blog:DiscountsRequest):Observable<void> {
    return this.http.post<void>(this.api.discounts, blog)
  }

  edit(blog:DiscountsRequest, id:number):Observable<Discounts>{
    return this.http.patch<Discounts>(`${this.api.discounts}/${id}`, blog)
  }

  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.api.discounts}/${id}`)
  }

  resolve(route:ActivatedRouteSnapshot):Observable<Discounts>{
    return this.http.get<Discounts>(`${this.api.discounts}/${route.paramMap.get('id')}`)
  }
}
