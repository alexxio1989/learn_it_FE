import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FileLearnIt } from '../model/FileLearnIt';
import { Lezione } from '../model/Lezione';
import { LezioneParagrafo } from '../model/LezioneParagrafo';
import { getJWTTOKEN } from '../utils/Util';
import { ServiceCore } from './core/ServiceCore';
import { DelegateServiceService } from './delegate-service.service';

@Injectable({
  providedIn: 'root'
})
export class LezioneServiceService {

  lezioneSelected: Lezione;

  public _sbjNewLezione= new Subject<Lezione>();

  private _sbjUpdateLezioni = new Subject();

  constructor(private http: HttpClient, private ds: DelegateServiceService) { } 

  getOBSInsertLezione(lezione: Lezione): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/lezione/save", lezione , {headers});
  }

  getOBSUpdateLezione(lezione: Lezione): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/lezione/update", lezione , {headers});
  }

  getOBSDeleteLezione(lezione: Lezione): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/lezione/delete", lezione , {headers});
  }

  getOBSGetLezione(id: number): Observable<any>{
    this.ds.updateSpinner(true);
    let token = getJWTTOKEN();
    const headers = new HttpHeaders().set("JWT_TOKEN",  token!== null ? token : '');

    let params = new HttpParams();
    params = params.append('id', id.toString());

    const httpOptions = {
      headers: headers,
      params: params
    };
    return this.http.get(ServiceCore.baseURl + "/lezione/get",httpOptions);
  }

  getOBSUpdateIDParagrafoReaded(obj: LezioneParagrafo): Observable<any>{
    return this.http.post(ServiceCore.baseURl_node + "/lezione/updateparagraph",obj );
  }

  updateLezioni(lezioni: Lezione[]){
    this._sbjUpdateLezioni.next(lezioni);
  }


  getOBSUpdateLezioni(): Observable<any> {
    return this._sbjUpdateLezioni.asObservable();
  }

}
