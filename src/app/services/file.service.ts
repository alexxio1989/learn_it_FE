import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FileLearnIt } from '../model/FileLearnIt';
import { ServiceCore } from './core/ServiceCore';
import { DelegateServiceService } from './delegate-service.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  fileLearnIt = new FileLearnIt();

  private _sbj = new Subject();

  updateSBJ(video: FileLearnIt) {
    this._sbj.next(video);
  }

  getSBJ(): Observable<any> {
    return this._sbj.asObservable();
  }

  constructor(private http: HttpClient, private ds: DelegateServiceService) { } 

  get(obj: FileLearnIt): Observable<any>{
    this.ds.updateSpinnerVideos(true);
    return this.http.post(ServiceCore.baseURl_node+ "/file/getFile", obj );
  }

  save(obj: FileLearnIt): Observable<any>{
    this.ds.updateSpinnerVideos(true);
    return this.http.post(ServiceCore.baseURl_node+ "/file/saveFile", obj);
  }

  delete(obj: FileLearnIt): Observable<any>{
    this.ds.updateSpinnerVideos(true);
    return this.http.post(ServiceCore.baseURl_node+ "/file/deleteFile", obj);
  }
  
}
