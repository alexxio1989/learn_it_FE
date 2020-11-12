import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DelegateServiceService {

  private _sbjSpinner = new Subject();

  constructor() { }

  updateSpinner(update: boolean){
    this._sbjSpinner.next(update);
  }

  getOBSSpinner(): Observable<any>{
    return this._sbjSpinner.asObservable();
  }
}
