import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Corso } from './model/Corso';
import { Lezione } from './model/Lezione';
import { Paragrafo } from './model/Paragrafo';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class CorsoServiceService {

  user: User;
  corsoSelected: Corso;
  lezioneSelected: Lezione;

  private _sbjUpdateCorsi = new Subject();
  private _sbjFilterCorso = new Subject();

  listaCorsi: Array<Corso> = [];

  constructor(private http: HttpClient) { }

  filterCorsi(newCorsi: Corso[]){
    this._sbjFilterCorso.next(newCorsi);
  }

  updateCorsi(corsi: Corso[]){
    this._sbjUpdateCorsi.next(corsi);
  }

  getOBSCorsiFiltered(): Observable<any> {
    return this._sbjFilterCorso.asObservable();
  }

  getOBSUpdateCorsi(): Observable<any> {
    return this._sbjUpdateCorsi.asObservable();
  }

  getOBSCorsi(): Observable<any>{
    return this.http.get("https://routerbe.herokuapp.com/router/datipagina/getCorsi");
  }

  getOBSTypes(): Observable<any>{
    return this.http.get("https://routerbe.herokuapp.com/router/datipagina/getTypes");
  }

  getOBSInsertCorso(corso: Corso): Observable<any>{
    return this.http.post("https://routerbe.herokuapp.com/router/saveCorso", corso);
  }

  getOBSUpdateCorso(corso: Corso): Observable<any>{
    return this.http.post("https://routerbe.herokuapp.com/router/updateCorso", corso);
  }

  getOBSDeleteCorso(corso: Corso): Observable<any>{
    return this.http.post("https://routerbe.herokuapp.com/router/deleteCorso", corso);
  }

  getOBSInsertLezione(lezione: Lezione): Observable<any>{
    return this.http.post("https://routerbe.herokuapp.com/router/saveLezione", lezione);
  }

  getOBSUpdateLezione(lezione: Lezione): Observable<any>{
    return this.http.post("https://routerbe.herokuapp.com/router/updateLezione", lezione);
  }

  getOBSDeleteLezione(lezione: Lezione): Observable<any>{
    return this.http.post("https://routerbe.herokuapp.com/router/deleteLezione", lezione);
  }

  getOBSInsertParagrafo(paragrafo: Paragrafo): Observable<any>{
    return this.http.post("https://routerbe.herokuapp.com/router/saveParagrafo", paragrafo);
  }

  getOBSUpdateParagrafo(paragrafo: Paragrafo): Observable<any>{
    return this.http.post("https://routerbe.herokuapp.com/router/updateParagrafo", paragrafo);
  }

  getOBSDeleteParagrafo(paragrafo: Paragrafo): Observable<any>{
    return this.http.post("https://routerbe.herokuapp.com/router/deleteParagrafo", paragrafo);
  }

}
