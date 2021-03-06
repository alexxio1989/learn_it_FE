import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Corso } from '../model/Corso';
import { Dominio } from '../model/Dominio';
import { InfoCorso } from '../model/InfoCorso';
import { Paginazione } from '../model/Paginazione';
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
  

  public _sbjUpdateCorsi = new Subject<Dominio[]>();
  public _sbjFilterCorsi = new Subject<Corso[]>();
  public _sbjTipiCorso = new Subject<Dominio[]>();
  public _sbjCorsoSelected = new Subject<Corso>();

  listaCorsi: Array<Dominio> = [];

  tipoCorsoList: Dominio[] = [];

  constructor(private http: HttpClient , private ds: DelegateServiceService) { }


  getOBSCorsi(): Observable<any>{
    this.ds.updateSpinner(true);
    return this.http.get(ServiceCore.baseURl + "/corso/getall");
  }

  getOBSTypes(): Observable<any>{
    return this.http.get(ServiceCore.baseURl + "/type/getall");
  }

  getOBSInsertTypes(dominio: Dominio): Observable<any>{
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/type/save" , dominio , {headers});
  }

  getOBSDeleteType(dominio: Dominio): Observable<any>{
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/type/delete" , dominio , {headers});
  }

  getOBSUpdateType(dominio: Dominio): Observable<any>{
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/type/update" , dominio , {headers});
  }


  getOBSInsertCorso(corso: Corso): Observable<any>{
    this.ds.updateSpinner(true);
    const token = getJWTTOKEN();
    const headers = new HttpHeaders().set("JWT_TOKEN",  token);
    return this.http.post(ServiceCore.baseURl + "/corso/save", corso , {headers});
  }

  getOBSUpdateCorso(corso: Corso): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/corso/update", corso , {headers});
  }

  getOBSDeleteCorso(corso: Corso): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/corso/delete", corso , {headers});
  }

  getOBSUpdateVisCorso(corso: Corso): Observable<any>{
    this.ds.updateSpinner(true);
    return this.http.post(ServiceCore.baseURl_node + "/corso/updateVisibilityCorso", corso );
  }

  getOBSGetCorso(id: number): Observable<any>{
    this.ds.updateSpinner(true);
    let token = getJWTTOKEN();
    const headers = new HttpHeaders().set("JWT_TOKEN",  token!== null ? token : '');
    let params = new HttpParams();
    params = params.append('id', id.toString());

    const httpOptions = {
      headers: headers,
      params: params
    };
    return this.http.get(ServiceCore.baseURl + "/corso/get" , httpOptions);
  }

  getCorso(id: number): Observable<any>{
    
    let token = getJWTTOKEN();
    const headers = new HttpHeaders().set("JWT_TOKEN",  token!== null ? token : '');
    let params = new HttpParams();
    params = params.append('id', id.toString());

    const httpOptions = {
      headers: headers,
      params: params
    };
    return this.http.get(ServiceCore.baseURl + "/corso/get" , httpOptions);
  }

  getOBSGetAllUtente(utente: User): Observable<any>{
    this.ds.updateSpinner(true);
    let token = getJWTTOKEN();
    const headers = new HttpHeaders().set("JWT_TOKEN",  token!== null ? token : '');
    let params = new HttpParams();
    params = params.append('id', utente.id.toString());

    const httpOptions = {
      headers: headers,
      params: params
    };
    return this.http.get(ServiceCore.baseURl + "/corso/getallbyid" , httpOptions);
  }

  getAllPaginata(paginazione: Paginazione): Observable<any>{
    this.ds.updateSpinner(true);
    return this.http.post(ServiceCore.baseURl + "/corso/getAllPaginata",paginazione);
  }

  getCorsiByType(idType: number , paginazione: Paginazione): Observable<any>{
    let token = getJWTTOKEN();
    const headers = new HttpHeaders().set("JWT_TOKEN",  token!== null ? token : '');
    let params = new HttpParams();
    params = params.append('idType', ''+idType);
    params = params.append('pagina', ''+paginazione.pagina);
    params = params.append('numeroPerPagina', ''+paginazione.numeroPerPagina);

    const httpOptions = {
      headers: headers,
      params: params
    };
    return this.http.get(ServiceCore.baseURl + "/corso/getCorsiByType" , httpOptions);
  }


}
