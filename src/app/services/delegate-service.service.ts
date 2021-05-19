import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Corso } from '../model/Corso';
import { Dominio } from '../model/Dominio';
import { Lezione } from '../model/Lezione';
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

  paing = false;

  idCorsoSelected: number;
  idLezioneSelected: number;


  private _sbjAbilitaNavigazione= new Subject();
  private _sbjOpenLogin = new Subject();
  private _sbjOpenAcquista= new Subject();
  private _sbjSpinner = new Subject();
  private _sbjVideo = new Subject();
  private _sbjResultService = new Subject();
  private _sbjSideBar = new Subject();
  private _sbjTipiCorso = new Subject();
  private _sbjUser = new Subject();
  private _sbjPage = new Subject();
  private _sbjCorsoSelected = new Subject();

  private _sbjNewLezione= new Subject();

  private _sbjNewFeed= new Subject();

  private _sbjUserGoogle= new Subject();

  constructor() {}

  checkUserLogged(page: string): boolean{
    if(getUserLS()){
      //this.updateOpenAcquista(true) 
      this.updateAbilitaNavigazione(page);
      return true;
    } else {
      this.updateOpenLogin(true) 
      return false;
    }
  }

  updateUserGoogle (utente: User) {
    this._sbjUserGoogle.next(utente);
  }

  getOBSUserGoogle (): Observable<any> {
    return this._sbjUserGoogle.asObservable();
  }


  updateCorsoSelected (corso: Corso) {
    this._sbjCorsoSelected.next(corso);
  }

  getOBSCorsoSelected (): Observable<any> {
    return this._sbjCorsoSelected.asObservable();
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
      localStorage.removeItem('TYPES');
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

  updateOpenAcquista(update: boolean) {
    this._sbjOpenAcquista.next(update);
  }

  getOBSOpenAcquista(): Observable<any> {
    return this._sbjOpenAcquista.asObservable();
  }

  updatePage(page: string) {
    this._sbjPage.next(page);
  }

  getOBSPage(): Observable<any> {
    return this._sbjPage.asObservable();
  }

  newLezione(lezione: Lezione){
    this._sbjNewLezione.next(lezione);
  }


  getOBSNewLezione(): Observable<any> {
    return this._sbjNewLezione.asObservable();
  }

  newFeed(value: boolean){
    this._sbjNewFeed.next(value);
  }


  getOBSNewFeed(): Observable<any> {
    return this._sbjNewFeed.asObservable();
  }

 

}
