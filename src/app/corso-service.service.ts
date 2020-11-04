import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Corso } from './model/Corso';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class CorsoServiceService {

  user: User;
  corsoSelected: Corso;

  private _subject = new Subject();

  listaCorsi: Array<Corso> = [];

  constructor(private http: HttpClient) { }

  filterCorsi(newCorsi: Corso[]){
    this._subject.next(newCorsi);
  }

  getCorsiFiltered(): Observable<any> {
    return this._subject.asObservable();
  }

  getCorsi(): Observable<any>{
    return this.http.get("https://routerbe.herokuapp.com/router/datipagina/getCorsi");
  }
}
