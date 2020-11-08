import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Corso } from './model/Corso';
import { Lezione } from './model/Lezione';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class CorsoServiceService {

  user: User;
  corsoSelected: Corso;
  lezioneSelected: Lezione;

  private _sbjNewCorso = new Subject();
  private _sbjFilterCorso = new Subject();

  listaCorsi: Array<Corso> = [];

  constructor(private http: HttpClient) { }

  filterCorsi(newCorsi: Corso[]){
    this._sbjFilterCorso.next(newCorsi);
  }

  addCorso(corso: Corso){
    this._sbjNewCorso.next(corso);
  }

  getOBSCorsiFiltered(): Observable<any> {
    return this._sbjFilterCorso.asObservable();
  }

  getOBSNewCorso(): Observable<any> {
    return this._sbjNewCorso.asObservable();
  }

  getOBSCorsi(): Observable<any>{
    return this.http.get("https://routerbe.herokuapp.com/router/datipagina/getCorsi");
  }
}
