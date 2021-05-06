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
import { ICard } from '../ICard';

@Component({
  selector: 'app-card-corso-light',
  templateUrl: './card-corso-light.component.html',
  styleUrls: ['./card-corso-light.component.scss'],
  animations: [
    trigger('flipCard', [
      state('true', style({
        transform: 'rotateY(180deg)'
      })),
      state('false', style({
        transform: 'rotateY(0)'
      })),
      transition('true => false', animate('1000ms ease-out')),
      transition('false => true', animate('1000ms ease-out'))
    ])
  ]
})
export class CardCorsoLightComponent implements OnInit,ICard{

  isFlipped: boolean;

  @Input() corso: Corso;
  
  url='https://www.ilmiocodice.com/corso?id=';

  
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

  @Input() width: number;

  

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

             

  }
  

  ngOnInit(): void {

    this.url = this.url + this.corso.id;
    

    this.isDevice = this.deviceService.isMobile();
    this.acquisto.acquirente = getUserLS();
    this.acquisto.owner = this.corso.owner;
    this.acquisto.causale = "Acquisto corso " + this.corso.nomeCorso;
    this.acquisto.total = this.corso.prezzo;
    this.acquisto.type = "CORSO"
    this.acquisto.corso = this.corso;
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



  continua(corso: Corso){
    this.ds.updatePage('CORSO');
    localStorage.setItem('CORSO' , JSON.stringify(corso));
    this.cs.corsoSelected = corso;
    this.route.navigate(['/corso'], { queryParams: { id: corso.id } }); 
  }

  openLogin() {
      this.ds.updateOpenLogin(true);
  }

  next(corso: Corso){

      if(this.isCorsoLetto){
        this.continua(corso);
      } else {
        this.ds.objSelected = this.corso;
          
        this.ps.updateAcquisto("");
      }
  }


}
