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

@Component({
  selector: 'app-card-corso',
  templateUrl: './card-corso.component.html',
  styleUrls: ['./card-corso.component.css'],
  animations: [
    trigger('scroll', [
      state('on', style({left: '-100px'})),
      transition('* => *', [
        style({right: '-100px'}),
        animate(10000, style({right: '100%'}))
      ])
    ])
  ]
})
export class CardCorsoComponent implements OnInit {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  @Input() corso: Corso;
  
  state = 0;

  isShowInfo: boolean;
  isEmptyDescrizione: boolean;
  isCorsoLetto: boolean;
  isPAy: boolean;
  user: User;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        color: '#303238',
        fontSize: '16px',
        fontFamily: '"Open Sans", sans-serif',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#CFD7DF',
        },
      },
      invalid: {
        color: '#e5424d',
        ':focus': {
          color: '#303238',
        },
      },
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'it'
  };

  stripeTest: FormGroup;

  get getMediumFeeds(){
    
    let count = this.corso.feeds.reduce(function (s, a) {
      return s + a.feed;
    }, 0);

    return count / this.corso.feeds.length;
  }

  get isUtenteLogged(): boolean{
    return isSameUser(getUserLS(),this.corso.owner);
  }

  constructor(private ps: PagamentiServiceService ,
              private fb: FormBuilder,
              private stripeService: StripeService ,
              private us: UtenteServiceService ,
              private cs: CorsoServiceService ,
              private route: Router,
              private ds: DelegateServiceService) {

              this.ds.getOBSUser().subscribe(next => {
                this.checkLettureUtente();
              })

  }

  ngOnInit(): void {
    this.checkLettureUtente();
    if(this.corso.descrizioneCorso === undefined || 
       this.corso.descrizioneCorso === null || 
       this.corso.descrizioneCorso.trim() === '' ||
       this.corso.descrizioneCorso.trim().includes('>&#160;</font>')
       ){
      this.isEmptyDescrizione = true;
    }

    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  checkLettureUtente(){
    const user = getUserLS();
    this.user = user;
    this.isCorsoLetto = isNotNullObj(this.corso) &&
                        isNotEmptyArray(this.corso.listLetture) &&
                        isNotNullObj(user) ? this.corso.listLetture.filter(el => el.idUtente === user.id).length > 0 : false;
  }


  scrollDone() {
    this.state++;
  }

  goToCorso(corso: Corso){
    let lettura = new Lettura();
    lettura.idCorso = corso.id;
    lettura.idUtente = getUserLS().id;
    this.us.getOBSInsertLettura(lettura).subscribe(next=>{
      this.ds.updateSpinner(false);
      this.ds.updateResultService(next.status);
      localStorage.removeItem('USER');
      localStorage.setItem('USER',JSON.stringify(next.obj));
      this.ds.utente = next.obj;
      localStorage.setItem('CORSO' , JSON.stringify(corso));
      this.cs.corsoSelected = corso;
      this.route.navigate(['/corso']);
    },error =>{
      this.ds.updateSpinner(false);
      this.ds.updateResultService(error.status);
    })
  }

  continua(corso: Corso){
    localStorage.setItem('CORSO' , JSON.stringify(corso));
    this.cs.corsoSelected = corso;
    this.route.navigate(['/corso'], { queryParams: { id: corso.id } }); 
  }

  elimina(){
    this.cs.getOBSDeleteCorso(this.corso).subscribe(next => {
      this.ds.updateSpinner(false);
      this.ds.updateResultService(next.status);
      this.cs.updateCorsi(next.list);
    },error => {
      this.ds.updateSpinner(false);
      this.ds.updateResultService(error.status);
    });
  }

  showInfo(){
    this.isShowInfo = !this.isShowInfo;
  }

  openLogin() {
      this.ds.updateOpenLogin(true);
  }

  next(corso: Corso){

    if(isNotNullObj(getUserLS())){

      if(this.isCorsoLetto){
        this.continua(corso);
      } else {
        if(this.corso.prezzo > 0){
          this.isPAy = true;
        } else {
          this.goToCorso(corso);

        }
      }

    } else {
      this.openLogin();
    }

  }

  back(){
    this.isPAy = false;
  }

  createToken(): void {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          this.corso.acquirente = getUserLS();
          this.corso.stripeToken = result.token.id;
          console.log(result.token.id);
          this.ps.getOBSPay(this.corso).subscribe(next=>{
            this.ds.updateResultService(next.esito);
            this.ds.updateSpinner(false);
            this.goToCorso(this.corso);
          })
        } else if (result.error) {
          console.log(result.error.message);
        }
      });
  }

}
