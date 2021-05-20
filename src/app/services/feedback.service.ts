import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Feedback } from '../model/Feedback';
import { getJWTTOKEN } from '../utils/Util';
import { ServiceCore } from './core/ServiceCore';
import { DelegateServiceService } from './delegate-service.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  public _sbjNewFeed= new Subject<boolean>();

  feedSelected : Feedback;

  constructor(private http: HttpClient , private ds: DelegateServiceService) { }

  private _sbjUpdateFeedback = new Subject();

  updateFeeds(feeds: Feedback[]){
    this._sbjUpdateFeedback.next(feeds);
  }

  getOBS(): Observable<any> {
    return this._sbjUpdateFeedback.asObservable();
  }

  insert(feed: Feedback): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/feedback/save", feed , {headers});
  }

  delete(feed: Feedback): Observable<any>{
    this.ds.updateSpinner(true);
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/feedback/delete", feed , {headers});
  }
}
