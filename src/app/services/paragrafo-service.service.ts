import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Paragrafo } from '../model/Paragrafo';
import { getJWTTOKEN } from '../utils/Util';
import { ServiceCore } from './core/ServiceCore';
import { DelegateServiceService } from './delegate-service.service';

@Injectable({
  providedIn: 'root'
})
export class ParagrafoServiceService {

  paragrafoSelected: Paragrafo;

  private _sbjParagrafo = new Subject();

  updateParagrafi(paragrafi: Paragrafo[]){
    this._sbjParagrafo.next(paragrafi);
  }

  getOBSADDParagrafi(): Observable<any>{
    return this._sbjParagrafo.asObservable(); 
  }

  constructor(private http: HttpClient, private ds: DelegateServiceService) { }

  getOBSInsertParagrafo(paragrafo: Paragrafo): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/router/saveParagrafo", paragrafo , {headers});
  }

  getOBSUpdateParagrafo(paragrafo: Paragrafo): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/router/updateParagrafo", paragrafo , {headers});
  }

  getOBSDeleteParagrafo(paragrafo: Paragrafo): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN())
    return this.http.post(ServiceCore.baseURl + "/router/deleteParagrafo", paragrafo , {headers});
  }
}
