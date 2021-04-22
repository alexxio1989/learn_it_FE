import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Corso } from 'src/app/model/Corso';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { User } from 'src/app/model/User';
import { getUserLS, isNotEmptyArray, isNotNullObj, isSameUser } from 'src/app/utils/Util';

import { UtenteServiceService } from 'src/app/services/utente-service.service';
import { Lettura } from 'src/app/model/Lettura';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
 
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions 
} from '@stripe/stripe-js';
import { PagamentiServiceService } from 'src/app/services/pagamenti-service.service';
import { Acquisto } from 'src/app/model/Acquisto';
import { ModalPagamentoComponent } from 'src/app/modals/modal-pagamento/modal-pagamento.component';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-card-corso-light',
  templateUrl: './card-corso-light.component.html',
  styleUrls: ['./card-corso-light.component.css']
})
export class CardCorsoLightComponent implements OnInit {

  @Input() corso: Corso;
  
  state = 0;

  url='https://www.ilmiocodice.com/corso?id=';

  isShowInfo: boolean;
  isEmptyDescrizione: boolean;
  isCorsoLetto: boolean;
  isCorsoDaPagare: boolean;
  isPAy: boolean;
  user: User;
  acquisto = new Acquisto();
  modalPagamentoComponent = ModalPagamentoComponent;

  showAcquista: boolean;
  showContinua: boolean;
  showAccedi: boolean;
  isDevice: boolean;

  


  get getMediumFeeds(){
    
    let count = this.corso.feeds.reduce(function (s, a) {
      return s + a.feed;
    }, 0);

    return count / this.corso.feeds.length;
  }


  constructor(private fb: FormBuilder,
              private us: UtenteServiceService ,
              private cs: CorsoServiceService ,
              private route: Router,
              private ds: DelegateServiceService,
              private ps: PagamentiServiceService,
              private deviceService: DeviceDetectorService) {

              this.ds.getOBSUser().subscribe(next => {
                this.checkLettureUtente();
              })

              this.ps.getOBSAcquisto().subscribe(next => {
                if("CORSO" === next){
                  this.goToCorso(this.corso);
                }
              })

  }

  ngOnInit(): void {

    this.url = this.url + this.corso.id;
    

    this.isDevice = this.deviceService.isMobile();
    this.acquisto.acquirente = getUserLS();
    this.acquisto.owner = this.corso.owner;
    this.acquisto.causale = "Acquisto corso " + this.corso.nomeCorso;
    this.acquisto.total = this.corso.prezzo;
    this.acquisto.type = "CORSO"
    this.checkLettureUtente();

    if(this.corso.descrizioneCorso === undefined || 
       this.corso.descrizioneCorso === null || 
       this.corso.descrizioneCorso.trim() === '' ||
       this.corso.descrizioneCorso.trim().includes('>&#160;</font>')
       ){
      this.isEmptyDescrizione = true;
    }

  }

  private setFlags() {
    if (this.user !== undefined && this.user !== null) {
      this.showAccedi = false;
      this.showAcquista = this.corso.prezzo !== undefined && this.corso.prezzo > 0 && !this.isCorsoLetto;
      this.showContinua = !this.showAcquista;

    } else {
      this.showAccedi = true;
      this.showAcquista = false;
      this.showContinua = false;
    }
  }

  checkLettureUtente(){
    const user = getUserLS();
    this.user = user;
    if(isSameUser(getUserLS(),this.corso.owner)){
      this.isCorsoLetto = true;
    } else {

      this.isCorsoLetto = isNotNullObj(this.corso) &&
                          isNotEmptyArray(this.corso.listLetture) &&
                          isNotNullObj(user) ? this.corso.listLetture.filter(el => el.idUtente === user.id).length > 0 : false;
    }

    this.setFlags();
  }


  scrollDone() {
    this.state++;
  }

  goToCorso(corso: Corso){
    let lettura = new Lettura();
    lettura.idCorso = corso.id;
    lettura.idUtente = getUserLS().id;
    lettura.corso = corso;
    lettura.lettore = getUserLS();
    this.us.getOBSInsertLettura(lettura).subscribe(next=>{
      this.ds.updatePage('CORSO');
      this.ds.updateSpinner(false);
      this.ds.updateResultService(next.status);
     
      localStorage.setItem('CORSO' , JSON.stringify(corso));
      this.cs.corsoSelected = corso;
      this.route.navigate(['/corso'], { queryParams: { id: corso.id } }); 
    },error =>{
      this.ds.updateSpinner(false);
      this.ds.updateResultService(error.status);
    })
  }

  continua(corso: Corso){
    this.ds.updatePage('CORSO');
    localStorage.setItem('CORSO' , JSON.stringify(corso));
    this.cs.corsoSelected = corso;
    this.route.navigate(['/corso'], { queryParams: { id: corso.id } }); 
  }


  showInfo(){
    this.isShowInfo = !this.isShowInfo;
  }

  openLogin() {
      this.ds.updateOpenLogin(true);
  }

  next(corso: Corso){

      if(this.isCorsoLetto){
        this.continua(corso);
      } else {
          this.goToCorso(corso);
      }
  }

}
