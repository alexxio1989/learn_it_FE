import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paragrafo } from '../model/Paragrafo';

@Injectable({
  providedIn: 'root'
})
export class ParagrafoServiceService {

  constructor(private http: HttpClient) { }

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
