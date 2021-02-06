import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lettura } from '../model/Lettura';
import { User } from '../model/User';
import { getJWTTOKEN } from '../utils/Util';
import { ServiceCore } from './core/ServiceCore';
import { DelegateServiceService } from './delegate-service.service';


@Injectable({
  providedIn: 'root'
})
export class UtenteServiceService {

  constructor(private http: HttpClient , private ds: DelegateServiceService) { }

  getOBSLogin(utente: User): Observable<any>{ 
    this.ds.updateSpinner(true);
    return this.http.post(ServiceCore.baseURl + "/router/login", utente , {observe: 'response'});
  }

  getOBSSignIn(utente: User): Observable<any>{
    this.ds.updateSpinner(true);
    return this.http.post(ServiceCore.baseURl + "/router/signin", utente);
  }

  getOBSPropriCorsi(utente: User): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/router/getProprioCorsi", utente,{headers});
  }

  getOBSInsertLettura(lettura: Lettura): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());

    return this.http.post(ServiceCore.baseURl + "/router/insertLettura", lettura ,{headers});
  }

  getOBSUpdateUser(utente: User): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());

    return this.http.post(ServiceCore.baseURl + "/router/updateUtente", utente ,{headers});
  }

  getOBSRecuperoPsw(utente: User): Observable<any>{
    this.ds.updateSpinner(true);
    return this.http.post(ServiceCore.baseURl + "/router/richiediPws", utente);
  }
}
