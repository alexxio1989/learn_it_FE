import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Dominio } from '../model/Dominio';
import { User } from '../model/User';
import { getUserLS } from '../utils/Util';

@Injectable({
  providedIn: 'root'
})
export class DelegateServiceService {

  objSelected : any;

  utente: User;

  isOpenSideBar: boolean;

  page: string;

  private _sbjAbilitaNavigazione= new Subject();
  private _sbjOpenLogin = new Subject();
  private _sbjSpinner = new Subject();
  private _sbjVideo = new Subject();
  private _sbjResultService = new Subject();
  private _sbjSideBar = new Subject();
  private _sbjTipiCorso = new Subject();
  private _sbjUser = new Subject();
  private _sbjPage = new Subject();

  constructor() {}

  checkUserLogged(page: string): boolean{
    if(getUserLS()){
      this.updateAbilitaNavigazione(page);
      return true;
    } else {
      this.updateOpenLogin(true)
      return false;
    }
  }



  updateTipiCorso(tipi: Dominio[]) {
    this._sbjTipiCorso.next(tipi);
  }

  getOBSTipiCorso(): Observable<any> {
    return this._sbjTipiCorso.asObservable();
  }

  updateSpinner(update: boolean) {
    this._sbjSpinner.next(update);
  }

  getOBSSpinner(): Observable<any> {
    return this._sbjSpinner.asObservable();
  }

  updateSpinnerVideos(update: boolean) {
    this._sbjVideo.next(update);
  }

  getOBSSpinnerVideo(): Observable<any> {
    return this._sbjVideo.asObservable();
  }

  updateResultService(result: string) {
    this._sbjResultService.next(result);
  }

  getOBSResultService(): Observable<any> {
    return this._sbjResultService.asObservable();
  }

  updateSideBar(update: boolean) {
    this._sbjSideBar.next(update);
  }

  getOBSSideBar(): Observable<any> {
    return this._sbjSideBar.asObservable();
  }

  updateUser(utente: User) {
    if(utente === undefined || utente === null){
      localStorage.removeItem('USER');
    } else {
      localStorage.removeItem('USER');
      localStorage.setItem('USER',JSON.stringify(utente));
    }
    this._sbjUser.next(utente);
  }

  getOBSUser(): Observable<any> {
    return this._sbjUser.asObservable();
  }

  updateCheckUserLogged(value: boolean) {
    this._sbjUser.next(value);
  }

  getOBSCheckUserLogged(): Observable<any> {
    return this._sbjUser.asObservable();
  }

  updateAbilitaNavigazione(page: string) {
    this._sbjAbilitaNavigazione.next(page);
  }

  getOBSAbilitaNavigazione(): Observable<any> {
    return this._sbjAbilitaNavigazione.asObservable();
  }

  updateOpenLogin(update: boolean) {
    this._sbjOpenLogin.next(update);
  }

  getOBSOpenLogin(): Observable<any> {
    return this._sbjOpenLogin.asObservable();
  }

  updatePage(page: string) {
    this._sbjPage.next(page);
  }

  getOBSPage(): Observable<any> {
    return this._sbjPage.asObservable();
  }

}
