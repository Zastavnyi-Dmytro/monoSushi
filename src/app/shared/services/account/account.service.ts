import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category, Login } from '../../interfaces/interfaces.component';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public isUserLogin$ = new Subject<boolean>()
  private url = environment.BACKEND_URL
  private api = { auth: `${this.url}/auth` }

  private categories:Array<Category> = []

  constructor(
    private http: HttpClient
  ) { }

  login(credential:Login):Observable<any>{
    return this.http.get(`${this.api.auth}?email=${credential.email}&password=${credential.password}`)
  }
}
