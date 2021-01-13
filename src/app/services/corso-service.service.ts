import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Corso } from '../model/Corso';
import { Dominio } from '../model/Dominio';
import { SubDominio } from '../model/SubDominio';
import { User } from '../model/User';
import { getJWTTOKEN } from '../utils/Util';
import { ServiceCore } from './core/ServiceCore';
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
    return this.http.get(ServiceCore.baseURl + "/router/datipagina/getCorsi");
  }

  getOBSTypes(): Observable<any>{
    return this.http.get(ServiceCore.baseURl + "/router/datipagina/getTypes");
  }

  getOBSInsertTypes(dominio: Dominio): Observable<any>{
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post("http://routerbe.herokuapp.com/router/insertType" , dominio , {headers});
  }

  getOBSInsertSubTypes(dominio: SubDominio): Observable<any>{
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/router/insertSubType" , dominio , {headers});
  }

  getOBSInsertCorso(corso: Corso): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/router/saveCorso", corso , {headers});
  }

  getOBSUpdateCorso(corso: Corso): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/router/updateCorso", corso , {headers});
  }

  getOBSDeleteCorso(corso: Corso): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/router/deleteCorso", corso , {headers});
  }

  getOBSGetCorso(id: number): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/router/getCorso", {'id' : id}  , {headers});
  }


}
