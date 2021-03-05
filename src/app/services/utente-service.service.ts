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
    return this.http.post(ServiceCore.baseURl + "/soggetto/login", utente , {observe: 'response'});
  }

  getOBSSignIn(utente: User): Observable<any>{
    this.ds.updateSpinner(true);
    return this.http.post(ServiceCore.baseURl + "/soggetto/save", utente);
  }

  getOBSPropriCorsi(utente: User): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/soggetto/getProprioCorsi", utente,{headers});
  }

  getOBSUtenteById(utente: User): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/soggetto/getByID", utente,{headers});
  }

  getOBSInsertLettura(lettura: Lettura): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());

    return this.http.post(ServiceCore.baseURl + "/soggetto/insertLettura", lettura ,{headers});
  }

  getOBSUpdateUser(utente: User): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());

    return this.http.post(ServiceCore.baseURl + "/soggetto/update", utente ,{headers});
  }

  getOBSRecuperoPsw(utente: User): Observable<any>{
    this.ds.updateSpinner(true);
    return this.http.post(ServiceCore.baseURl + "/soggetto/richiediPws", utente);
  }
}
