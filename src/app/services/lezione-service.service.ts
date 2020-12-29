import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lezione } from '../model/Lezione';
import { getJWTTOKEN } from '../utils/Util';
import { ServiceCore } from './core/ServiceCore';
import { DelegateServiceService } from './delegate-service.service';

@Injectable({
  providedIn: 'root'
})
export class LezioneServiceService {

  lezioneSelected: Lezione;

  constructor(private http: HttpClient, private ds: DelegateServiceService) { }

  getOBSInsertLezione(lezione: Lezione): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/router/saveLezione", lezione , {headers});
  }

  getOBSUpdateLezione(lezione: Lezione): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/router/updateLezione", lezione , {headers});
  }

  getOBSDeleteLezione(lezione: Lezione): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/router/deleteLezione", lezione , {headers});
  }

  getOBSGetLezione(id: number): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/router/getLezione",{'id' : id} , {headers});
  }
}
