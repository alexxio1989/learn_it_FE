import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Acquisto } from '../model/Acquisto';
import { Corso } from '../model/Corso';
import { getJWTTOKEN } from '../utils/Util';
import { ServiceCore } from './core/ServiceCore';
import { DelegateServiceService } from './delegate-service.service';

@Injectable({
  providedIn: 'root'
})
export class PagamentiServiceService {

  constructor(private http: HttpClient, private ds: DelegateServiceService) { }

  private _sbjAcquisto = new Subject();

  updateAcquisto(type: string) {
    this._sbjAcquisto.next(type);
  }

  getOBSAcquisto(): Observable<any> {
    return this._sbjAcquisto.asObservable();
  }

  getOBSPay(acquisto: Acquisto): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/router/pay",acquisto ,{headers});
  }
}
