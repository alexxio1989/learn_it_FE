import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Corso } from '../model/Corso';
import { Dominio } from '../model/Dominio';
import { SubDominio } from '../model/SubDominio';
import { User } from '../model/User';
import { DelegateServiceService } from './delegate-service.service';

@Injectable({
  providedIn: 'root'
})
export class CorsoServiceService {

  user: User;
  corsoSelected: Corso;
  

  private _sbjUpdateCorsi = new Subject();
  private _sbjFilterCorso = new Subject();

  listaCorsi: Array<Corso> = [];

  tipoCorsoList: Dominio[] = [];

  constructor(private http: HttpClient , private ds: DelegateServiceService) { }

  filterCorsi(newCorsi: Corso[]){
    this._sbjFilterCorso.next(newCorsi);
  }

  updateCorsi(corsi: Corso[]){
    this._sbjUpdateCorsi.next(corsi);
  }

  getOBSCorsiFiltered(): Observable<any> {
    return this._sbjFilterCorso.asObservable();
  }

  getOBSUpdateCorsi(): Observable<any> {
    return this._sbjUpdateCorsi.asObservable();
  }

  getOBSCorsi(): Observable<any>{
    this.ds.updateSpinner(true);
    return this.http.get("https://routerbe.herokuapp.com/router/datipagina/getCorsi");
  }

  getOBSTypes(): Observable<any>{
    return this.http.get("https://routerbe.herokuapp.com/router/datipagina/getTypes");
  }

  getOBSInsertTypes(dominio: Dominio): Observable<any>{
    return this.http.post("https://routerbe.herokuapp.com/router/insertType" , dominio);
  }

  getOBSInsertSubTypes(dominio: SubDominio): Observable<any>{
    return this.http.post("https://routerbe.herokuapp.com/router/insertSubType" , dominio);
  }

  getOBSInsertCorso(corso: Corso): Observable<any>{
    this.ds.updateSpinner(true);
    return this.http.post("https://routerbe.herokuapp.com/router/saveCorso", corso);
  }

  getOBSUpdateCorso(corso: Corso): Observable<any>{
    this.ds.updateSpinner(true);
    return this.http.post("https://routerbe.herokuapp.com/router/updateCorso", corso);
  }

  getOBSDeleteCorso(corso: Corso): Observable<any>{
    this.ds.updateSpinner(true);
    return this.http.post("https://routerbe.herokuapp.com/router/deleteCorso", corso);
  }


}
