import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Corso } from './model/Corso';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class CorsoServiceService {

  user: User;
  corsoSelected: Corso;

  constructor(private http: HttpClient) { }

  getCorsi(): Observable<any>{
    return this.http.get("https://routerbe.herokuapp.com/router/datipagina/getCorsi");
  }
}
