import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lezione } from '../model/Lezione';
import { DelegateServiceService } from './delegate-service.service';

@Injectable({
  providedIn: 'root'
})
export class LezioneServiceService {

  lezioneSelected: Lezione;

  constructor(private http: HttpClient, private ds: DelegateServiceService) { }

  getOBSInsertLezione(lezione: Lezione): Observable<any>{
    this.ds.updateSpinner(true);
    return this.http.post("https://routerbe.herokuapp.com/router/saveLezione", lezione);
  }

  getOBSUpdateLezione(lezione: Lezione): Observable<any>{
    this.ds.updateSpinner(true);
    return this.http.post("https://routerbe.herokuapp.com/router/updateLezione", lezione);
  }

  getOBSDeleteLezione(lezione: Lezione): Observable<any>{
    this.ds.updateSpinner(true);
    return this.http.post("https://routerbe.herokuapp.com/router/deleteLezione", lezione);
  }
}
