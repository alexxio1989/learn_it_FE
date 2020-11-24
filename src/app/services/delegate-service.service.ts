import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Dominio } from '../model/Dominio';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class DelegateServiceService {

  utente: User;

  isOpenSideBar: boolean;

  private _sbjSpinner = new Subject();
  private _sbjResultService = new Subject();
  private _sbjSideBar = new Subject();
  private _sbjTipiCorso= new Subject();
  private _sbjUser = new Subject();

  constructor() { }

  updateTipiCorso(tipi: Dominio[]){
    this._sbjTipiCorso.next(tipi);
  }

  getOBSTipiCorso(): Observable<any>{
    return this._sbjTipiCorso.asObservable();
  }

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

  updateUser (utente: User){
    this._sbjUser.next(utente);
  }

  getOBSUser (): Observable<any>{
    return this._sbjUser.asObservable();
  }
  
}
