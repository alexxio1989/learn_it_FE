import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConstantsActions } from '../constants/ConstantsActions';
import { Corso } from '../model/Corso';
import { Dominio } from '../model/Dominio';
import { InfoCorso } from '../model/InfoCorso';
import { InfoPage } from '../model/InfoPage';
import { Lezione } from '../model/Lezione';
import { User } from '../model/User';
import { getCorsoLS, getJWTTOKEN, isNotNullObj , isNullObj} from '../utils/Util';
import { ServiceCore } from './core/ServiceCore';

@Injectable({
  providedIn: 'root'
})
export class DelegateServiceService {

  objSelected : any;

  utente: User;

  isOpenSideBar: boolean;

  infoPage: InfoPage = new InfoPage();

  infoCorsoSelected : InfoCorso;

  


  public _sbjAbilitaNavigazione= new Subject<string>();
  public _sbjOpenLogin = new Subject();
  public _sbjOpenAcquista= new Subject();
  public _sbjSpinner = new Subject();
  public _sbjResultService = new Subject();
  public _sbjSideBar = new Subject();
  public _sbjPage = new Subject<string>();
  

  

  constructor(private http: HttpClient) {}

  getInfo(info: InfoCorso): Observable<any> {
   
    return this.http.post(ServiceCore.baseURl + "/corso/infoCorso", info );
  }

  checkUserLogged(userLogged: User ,infoPage: InfoPage): boolean{
    this.infoPage = infoPage; 
    if(environment.CTRL_UTENTE_LOGGED ? userLogged : true){
      let corsoLocalStorage = getCorsoLS();
      if(corsoLocalStorage && isNotNullObj(userLogged) && corsoLocalStorage.owner.id === userLogged.id ){
        this._sbjAbilitaNavigazione.next(infoPage.page);
      }

      if(infoPage && (infoPage.idCorso > 0 || infoPage.idLezione)){
          let info = new InfoCorso();
          info.richiedente = isNotNullObj(userLogged) ? userLogged.id : 0;
          info.idCorso = infoPage.idCorso ;
          info.idLezione = infoPage.idLezione
          this.getInfo(info).subscribe(next => {
            this.infoCorsoSelected = next.obj;
            if(this.infoCorsoSelected.prezzoCorso > 0 ){
              if(this.infoCorsoSelected.richiedenteLogged){
                if(!this.infoCorsoSelected.letto && !this.infoCorsoSelected.youAreOwner){
                  this._sbjOpenAcquista.next(true) 

                } else {
                  this._sbjAbilitaNavigazione.next(infoPage.page);
                }
              } else {
                this._sbjOpenLogin.next(true);
              }
             
            } else {
              this._sbjAbilitaNavigazione.next(infoPage.page);
            }
    
          }, error => {
            console.log(error.stack);
            this.updateResultService("Errore durante il recuper dell'informazioni");
            this.updateSpinner(false);
          })

      } else {
        if(infoPage && infoPage.isPageUtente){
          this._sbjAbilitaNavigazione.next(infoPage.page);
        }
      }

      return true;
    } else {
      this._sbjOpenLogin.next(true);
      return false;
    }
  }

  reset(){
    this.infoCorsoSelected = undefined;
    this.infoPage = new InfoPage();
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
    this.infoPage.page = page;
    this._sbjPage.next(page);
  }

  getOBSPage(): Observable<any> {
    return this._sbjPage.asObservable();
  }

}
