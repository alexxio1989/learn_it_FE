import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Corso } from '../model/Corso';
import { Dominio } from '../model/Dominio';
import { InfoCorso } from '../model/InfoCorso';
import { Lezione } from '../model/Lezione';
import { User } from '../model/User';
import { getCorsoLS, getJWTTOKEN, getUserLS } from '../utils/Util';
import { ServiceCore } from './core/ServiceCore';

@Injectable({
  providedIn: 'root'
})
export class DelegateServiceService {

  objSelected : any;

  utente: User;

  isOpenSideBar: boolean;

  page: string;

  paing = false;

  infoCorsoSelected : InfoCorso;

  idObjSelected: number;


  public _sbjAbilitaNavigazione= new Subject<string>();
  public _sbjOpenLogin = new Subject();
  public _sbjOpenAcquista= new Subject();
  public _sbjSpinner = new Subject();
  public _sbjResultService = new Subject();
  public _sbjSideBar = new Subject();
  public _sbjPage = new Subject<string>();
  

  

  constructor(private http: HttpClient) {}

  getInfo(info: InfoCorso): Observable<any> {
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    return this.http.post(ServiceCore.baseURl + "/corso/infoCorso", info , {headers});
  }

  checkUserLogged(userLogged: User ,page: string , idCorso: number ): boolean{
    
    if(userLogged){
      let corsoLocalStorage = getCorsoLS();
      if(corsoLocalStorage && userLogged && corsoLocalStorage.owner.id === userLogged.id ){
        this._sbjAbilitaNavigazione.next('CORSO');
      }

      if(idCorso > 0){
          let info = new InfoCorso();
          info.richiedente = userLogged.id;
          info.idCorso = idCorso;
          this.getInfo(info).subscribe(next => {
            this.infoCorsoSelected = next.obj;
            if(this.infoCorsoSelected.prezzoCorso > 0 && !this.infoCorsoSelected.letto && !this.infoCorsoSelected.youAreOwner){
              this._sbjOpenAcquista.next(true) 
            } else {
              this._sbjAbilitaNavigazione.next(page);
            }
    
          }, error => {
            console.log(error.stack);
            this.updateResultService("Errore durante il recupero dell'utente");
            this.updateSpinner(false);
          })

      } else {
        if('UTENTE' === page){
          this._sbjAbilitaNavigazione.next(page);
        }
      }

      return true;
    } else {
      this._sbjOpenLogin.next(true);
      return false;
    }
  }

 

  updateSpinner(update: boolean) {
    this._sbjSpinner.next(update);
  }

  getOBSSpinner(): Observable<any> {
    return this._sbjSpinner.asObservable();
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
  

  updatePage(page: string) {
    this._sbjPage.next(page);
  }

  getOBSPage(): Observable<any> {
    return this._sbjPage.asObservable();
  }

}
