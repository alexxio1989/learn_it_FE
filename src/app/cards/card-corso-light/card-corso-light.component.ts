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
import { InfoCorso } from 'src/app/model/InfoCorso';
import { MatDialog } from '@angular/material/dialog';
import { ModalShareComponent } from 'src/app/modals/modal-share/modal-share.component';

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
  modalPagamentoComponent = ModalPagamentoComponent;
  
  isDevice: boolean;

  @Input() width: number;

  infoRetrived: InfoCorso;

  labelButton: string;

  constructor(private fb: FormBuilder,
              private us: UtenteServiceService ,
              private cs: CorsoServiceService ,
              private route: Router,
              private ds: DelegateServiceService,
              private ps: PagamentiServiceService,
              private dialog: MatDialog,
              private deviceService: DeviceDetectorService) {

              this.us.getOBSUser().subscribe(next => {
                this.user = next;
                this.setLabelButton();
              })

             

  }

  
  

  ngOnInit(): void {

    this.user = getUserLS();

    this.setLabelButton();

    this.url = this.url + this.corso.id;
    

    this.isDevice = this.deviceService.isMobile();

    if(this.corso.descrizioneCorso === undefined || 
       this.corso.descrizioneCorso === null || 
       this.corso.descrizioneCorso.trim() === '' ||
       this.corso.descrizioneCorso.trim().includes('>&#160;</font>')
       ){
      this.isEmptyDescrizione = true;
    }

  }

  setLabelButton(){
    
     
        this.labelButton = 'Leggi'
     
   
  }





  continua(corso: Corso){
    this.navigate(corso);
    
  }


  private navigate(corso: Corso) {
    localStorage.removeItem('CORSO')
    this.ds.updatePage('CORSO');

    let corsoString = JSON.stringify(corso);
    console.log(corsoString)
    localStorage.setItem('CORSO', corsoString);
    this.cs.corsoSelected = corso;
    this.route.navigate(['/corso'], { queryParams: { id: corso.id , title : corso.nomeCorso + ' : ' + corso.subNomeCorso} });
  }

  share(){
    this.cs.corsoSelected = this.corso;
    const dialogRef = this.dialog.open(ModalShareComponent, {
      width: '600px'
    });
  }
}
