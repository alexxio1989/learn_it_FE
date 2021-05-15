import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { getJWTTOKEN } from '../utils/Util';
import { ServiceCore } from './core/ServiceCore';
import { DelegateServiceService } from './delegate-service.service';
import { RichiestaServiceService } from './richiesta-service.service';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(private http: HttpClient,private ds: DelegateServiceService) { }

  retrieve(utente: User): Observable<any>{
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    this.ds.updateSpinner(true);
    return this.http.post(ServiceCore.baseURl + "/stripe/retrieve", utente , {headers});
  }

  getResoconto(utente: User): Observable<any>{
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    this.ds.updateSpinner(true);
    return this.http.post(ServiceCore.baseURl + "/stripe/resoconto", utente , {headers});
  }
}
