import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    let token = getJWTTOKEN();
    const headers = new HttpHeaders().set("JWT_TOKEN",  token!== null ? token : '');
    return this.http.post(ServiceCore.baseURl + "/router/getLezione",{'id' : id} , {headers});
  }

  getOBSUpdateIDParagrafoReaded(obj: LezioneParagrafo): Observable<any>{
    return this.http.post(ServiceCore.baseURl_node + "/lezione/updateparagraph",obj );
  }

  insertVideo(obj: FileLearnIt): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/router/updateVideoLezione", obj , {headers});
    //return this.http.post("http://localhost:8082"+ "/lezione/updateVideoLezione", obj , {headers});
  }
}
