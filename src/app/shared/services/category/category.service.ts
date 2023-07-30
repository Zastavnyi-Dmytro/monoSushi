import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../../interfaces/interfaces.component';
import { CategoryRequest } from '../../interfaces/interfaces.component';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = environment.BACKEND_URL
  private api = { categories: `${this.url}/categories` }

  private categories:Array<Category> = []

  constructor(
    private http: HttpClient
  ) { }

  getCategory():Observable<Category[]>{
    return this.http.get<Category[]>(this.api.categories)
  }

  create(category:CategoryRequest):Observable<void> {
    return this.http.post<void>(this.api.categories, category)
  }

  edit(category:CategoryRequest, id:number):Observable<Category>{
    return this.http.patch<Category>(`${this.api.categories}/${id}`, category)
  }

  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.api.categories}/${id}`)
  }
}
