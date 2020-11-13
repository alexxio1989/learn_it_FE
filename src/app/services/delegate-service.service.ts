import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DelegateServiceService {

  private _sbjSpinner = new Subject();
  private _sbjResultService = new Subject();
  private _sbjSideBar = new Subject();

  constructor() { }

  updateSpinner(update: boolean){
    this._sbjSpinner.next(update);
  }

  getOBSSpinner(): Observable<any>{
    return this._sbjSpinner.asObservable();
  }

  updateResultService (result: string){
    this._sbjResultService.next(result);
  }

  getOBSResultService (): Observable<any>{
    return this._sbjResultService.asObservable();
  }

  updateSideBar (update: boolean){
    this._sbjSideBar.next(update);
  }

  getOBSSideBar (): Observable<any>{
    return this._sbjSideBar.asObservable();
  }
}
