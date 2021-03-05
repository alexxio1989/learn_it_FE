import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Richiesta } from '../model/Richiesta';
import { getJWTTOKEN } from '../utils/Util';
import { ServiceCore } from './core/ServiceCore';
import { DelegateServiceService } from './delegate-service.service';

@Injectable({
  providedIn: 'root'
})
export class RichiestaServiceService {

  constructor(private http: HttpClient , private ds: DelegateServiceService) { }

  getOBSSave(richiesta: Richiesta): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/richiesta/save", richiesta , {headers});
  }

  getOBSUpdate(richiesta: Richiesta): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/richiesta/update", richiesta , {headers});
  }

  getOBSGetAll(): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.get(ServiceCore.baseURl + "/richiesta/getAll", {headers});
  }
}
