import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileLearnIt } from '../model/FileLearnIt';
import { ServiceCore } from './core/ServiceCore';
import { DelegateServiceService } from './delegate-service.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient, private ds: DelegateServiceService) { } 

  getVideos(obj: FileLearnIt): Observable<any>{
    this.ds.updateSpinnerVideos(true);
    return this.http.post("https://learn-it-be.herokuapp.com/file/get", obj );
    //return this.http.post("http://localhost:8082"+ "/file/get", obj);
  }

  save(obj: FileLearnIt): Observable<any>{
    this.ds.updateSpinnerVideos(true);
    //return this.http.post("https://learn-it-be.herokuapp.com/file/get", obj );
    return this.http.post(ServiceCore.baseURl_node+ "/file/save", obj);
  }
}
