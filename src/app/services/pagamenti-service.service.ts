import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Corso } from '../model/Corso';
import { DelegateServiceService } from './delegate-service.service';

@Injectable({
  providedIn: 'root'
})
export class PagamentiServiceService {

  constructor(private http: HttpClient, private ds: DelegateServiceService) { }

  getOBSPay(corso: Corso): Observable<any>{
    this.ds.updateSpinner(true);
    return this.http.post("https://routerbe.herokuapp.com/router/pay",corso);
  }
}
