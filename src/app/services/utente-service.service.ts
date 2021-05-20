import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Lettura } from '../model/Lettura';
import { User } from '../model/User';
import { getJWTTOKEN } from '../utils/Util';
import { ServiceCore } from './core/ServiceCore';
import { DelegateServiceService } from './delegate-service.service';


@Injectable({
  providedIn: 'root'
})
export class UtenteServiceService {

  private _sbjUser = new Subject();

  private _sbjUserGoogle= new Subject();

  constructor(private http: HttpClient , private ds: DelegateServiceService) { }

  updateUser(utente: User) {
    if(utente === undefined || utente === null){
      localStorage.removeItem('USER');
      localStorage.removeItem('TYPES');
    } else {
      localStorage.removeItem('USER');
      localStorage.setItem('USER',JSON.stringify(utente));
    }
    this._sbjUser.next(utente);
  }

  getOBSLogin(utente: User): Observable<any>{ 
    this.ds.updateSpinner(true);
    return this.http.post(ServiceCore.baseURl + "/soggetto/retrieve", utente , {observe: 'response'});
  }

  getOBSSignIn(utente: User): Observable<any>{
    this.ds.updateSpinner(true);
    return this.http.post(ServiceCore.baseURl + "/soggetto/save", utente);
  }

  getOBSCount(utente: User): Observable<any>{
    //this.ds.updateSpinner(true);
    return this.http.post(ServiceCore.baseURl + "/soggetto/count", utente);
  }

  

  getOBSUserById(utente: User): Observable<any>{
    this.ds.updateSpinner(true);
    const jwt = getJWTTOKEN();
    const headers = new HttpHeaders().set("JWT_TOKEN",  jwt);
    let params = new HttpParams();
    params = params.append('id', utente.id.toString());

    const httpOptions = {
      headers: headers
    };
    console.log('CHIAMATA A : ' + ServiceCore.baseURl + "/soggetto/get?id=" + utente.id.toString())
    return this.http.get(ServiceCore.baseURl + "/soggetto/get?id=" + utente.id.toString(),httpOptions);
  }

  getOBSInsertLettura(lettura: Lettura): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());

    return this.http.post(ServiceCore.baseURl + "/lettura/save", lettura ,{headers});
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

  getOBSGetCoders(): Observable<any>{
    this.ds.updateSpinner(true);
    return this.http.get(ServiceCore.baseURl + "/soggetto/getall");
  }

  getOBSDelete(utente: User): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    this.ds.updateSpinner(true);
    return this.http.post(ServiceCore.baseURl + "/soggetto/delete", utente,{headers});
  }

  getOBSUser(): Observable<any> {
    return this._sbjUser.asObservable();
  }

  updateCheckUserLogged(value: boolean) {
    this._sbjUser.next(value);
  }

  updateUserGoogle (utente: User) {
    this._sbjUserGoogle.next(utente);
  }

  getOBSUserGoogle (): Observable<any> {
    return this._sbjUserGoogle.asObservable();
  }
}
