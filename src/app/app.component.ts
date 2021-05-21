import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DelegateServiceService } from './services/delegate-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CorsoServiceService } from './services/corso-service.service';
import { Dominio } from './model/Dominio';
import { Subscription } from 'rxjs';
import { NgcCookieConsentService, NgcInitializeEvent, NgcNoCookieLawEvent, NgcStatusChangeEvent } from 'ngx-cookieconsent';
import { Router } from '@angular/router';
import { clearJWTTOKEN, getUserLS } from './utils/Util';
import { MatDialog } from '@angular/material/dialog';
import { ModalAccessoComponent } from './modals/modal-accesso/modal-accesso.component';
import { Lettura } from './model/Lettura';
import { PagamentiServiceService } from './services/pagamenti-service.service';
import { UtenteServiceService } from './services/utente-service.service';
import { ModalPagamentoComponent } from './modals/modal-pagamento/modal-pagamento.component';
import { ConstantsActions } from './constants/ConstantsActions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit, OnDestroy,AfterViewInit  {

  //keep refs to subscriptions to be able to unsubscribe later
  private popupOpenSubscription: Subscription;
  private popupCloseSubscription: Subscription;
  private initializeSubscription: Subscription;
  private statusChangeSubscription: Subscription;
  private revokeChoiceSubscription: Subscription;
  private noCookieLawSubscription: Subscription;
  

  title = 'learnit';
  showSpinner: true;

  tipoCorsoList = [];

  isHomePage= true;

  constructor(private ds: DelegateServiceService , 
              private _snackBar: MatSnackBar , 
              private cs: CorsoServiceService , 
              private ccService: NgcCookieConsentService, 
              private route: Router,
              private us: UtenteServiceService,
              private ps: PagamentiServiceService,
              private dialog: MatDialog){

   

    this.showSpinner = true;
    this.ds.getOBSSpinner().subscribe(next => {
      this.showSpinner = next;
    })
    this.ds.getOBSResultService().subscribe(next => {
      this.openSnackBar(next);
    })

    this.ds._sbjOpenLogin.asObservable().subscribe(next => {
      this.openLogin();
    })

    this.ds._sbjOpenAcquista.asObservable().subscribe(next => {
      this.openAcquisto();
    })


   

    this.cs._sbjTipiCorso.asObservable().subscribe(next => {
      this.tipoCorsoList = next;
      this.cs.tipoCorsoList = next;
    })

    
  }

  ngOnInit() {
    // subscribe to cookieconsent observables to react to main events
    clearJWTTOKEN(this.route);
    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });
 
    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });
 
    this.initializeSubscription = this.ccService.initialize$.subscribe(
      (event: NgcInitializeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });
 
    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        localStorage.setItem("COOKIE_CONSENT" , "true");
      });
 
    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });
 
      this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });

      if(localStorage.getItem("COOKIE_CONSENT") !== undefined && localStorage.getItem("COOKIE_CONSENT") !== null){
        this.ccService.fadeOut();
      } 
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.ds.getOBSPage().subscribe(next => {
        this.isHomePage = next === ConstantsActions.HOME;
      })
    });
  } 

 


  ngOnDestroy() {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializeSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
  }

  openLogin() {
    const dialogRef = this.dialog.open(ModalAccessoComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAcquisto() {
    const dialogRef = this.dialog.open(ModalPagamentoComponent, {
     
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', { 
      duration: 2000,
    });
  }

  main() {
    return {
      
      'margin-top':this.isHomePage ?'10px' : '60px',
      
    };
  }

}
