import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StripeCardElementOptions, StripeElement, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { from } from 'rxjs';
import { Acquisto } from 'src/app/model/Acquisto';
import { Lettura } from 'src/app/model/Lettura';
import { User } from 'src/app/model/User';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { PagamentiServiceService } from 'src/app/services/pagamenti-service.service';
import { UtenteServiceService } from 'src/app/services/utente-service.service';
import { getUserLS } from 'src/app/utils/Util';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-pagamento',
  templateUrl: './modal-pagamento.component.html',
  styleUrls: ['./modal-pagamento.component.css']
})
export class ModalPagamentoComponent implements OnInit {

  acquisto = new Acquisto();


  error: any;
  complete = false;


  stripe = this.ds.objSelected && this.ds.objSelected.owner.idStripe !== undefined && this.ds.objSelected.owner.idStripe !== null && this.ds.objSelected.owner.idStripe !== '' ?
   Stripe(environment.STRIPE_PUBLIC_TOKEN, {stripeAccount: this.ds.objSelected.owner.idStripe}) : Stripe(environment.STRIPE_PUBLIC_TOKEN);


  card : stripe.elements.Element;

  disablePay = true;

  clientSecret : string;

  loading:boolean;

  nomeCorso: string;

  utenteLogged: User;
  


  constructor(private stripeService: StripeService,
              private ps: PagamentiServiceService,
              private us: UtenteServiceService,
              private ds: DelegateServiceService,
              private cs: CorsoServiceService,
              private fb: FormBuilder,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.utenteLogged = getUserLS();
    this.nomeCorso = this.ds.infoCorsoSelected.nomeCorso;
    this.loading = true;
    this.preparaAcquisto();


    
  }

  private preparaAcquisto() {
   
    this.acquisto.acquirente = this.utenteLogged;
    this.acquisto.causale = "Acquisto tutorial " + this.ds.infoCorsoSelected.nomeCorso + " , Acquirente : " + this.acquisto.acquirente.nome + this.acquisto.acquirente.cognome;
    
    this.acquisto.owner = new User();
    this.acquisto.owner.idStripe = this.ds.infoCorsoSelected.idStripe;
    this.acquisto.total = this.ds.infoCorsoSelected.prezzoCorso;
    this.ds.infoCorsoSelected.idStripe !== undefined && this.ds.infoCorsoSelected.idStripe !== null && this.ds.infoCorsoSelected.idStripe !== '' ?
      this.stripe = Stripe(environment.STRIPE_PUBLIC_TOKEN, {
        stripeAccount: this.acquisto.owner.idStripe
      }) : this.stripe = Stripe(environment.STRIPE_PUBLIC_TOKEN);

     
    this.ps.getOBSPayIntent(this.acquisto).subscribe(next => {
      var elements = this.stripe.elements();

      this.loading = false;
      
      this.clientSecret = next.clientSecret;
      var style = {
        base: {
          color: "#32325d",
          fontFamily: 'Arial, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#32325d"
          }
        },
        invalid: {
          fontFamily: 'Arial, sans-serif',
          color: "#fa755a",
          iconColor: "#fa755a"
        }
      };
      this.card = elements.create("card", { style: style });

      this.card.mount("#card-element");


      this.card.addEventListener('change', event => {
        this.card;
        if (event && event.error) {
          this.disablePay = true;
        } else if (event && event.complete) {
          this.disablePay = false;
        }
      });


    }, error => {
     
    });
  }

  pay(){
    this.ds.updateSpinner(true);

   
    const observable = from(this.stripe
      .confirmCardPayment(this.clientSecret, {
        payment_method: {
          card: this.card
        }
      })).subscribe(next => {
        if(next.error){
          this.ds.updateSpinner(false);
        } else {

          this.ds.objSelected = this.acquisto.corso;

          this.insertLettura();

          //this.ps.updateAcquisto("");
          this.ds.updateSpinner(false);
          this.dialog.closeAll();
        }
      }, error=>{
        this.ds.updateSpinner(false);
      });

   }

  private insertLettura() {
    let lettura = new Lettura();
    lettura.idCorso = this.ds.infoCorsoSelected.idCorso;
    lettura.idUtente = this.utenteLogged.id;
    lettura.emailOwner = this.ds.infoCorsoSelected.emailOwner
    lettura.nomeCorso = this.ds.infoCorsoSelected.nomeCorso;
    lettura.anagrafeOwner = this.ds.infoCorsoSelected.anagrafeOwner;
    lettura.anagrafeLettore = this.utenteLogged.nome + ' ' + this.utenteLogged.cognome;

    this.us.getOBSInsertLettura(lettura).subscribe(next => {
      this.ds.updateSpinner(false);
      this.ds.updateResultService(next.status);
      this.ds._sbjAbilitaNavigazione.next(this.ds.infoPage.page);
      
    }, error => {
      this.ds.updateSpinner(false);
      this.ds.updateResultService(error.error.status);
    });
  }

  cardUpdated(result) {
    
    this.complete = result.complete;
    
  }

  // createToken(): void {
  //   const name = this.stripeTest.get('name').value;
  //   this.stripeService
  //     .createToken(this.card.element, { name })
  //     .subscribe((result) => {
  //       if (result.token) {
  //         // Use the token
  //         this.acquisto.acquirente = getUserLS();
  //         this.acquisto.stripeToken = result.token.id;
  //         console.log(result.token.id);
  //         this.ps.getOBSPay(this.acquisto).subscribe(next=>{
  //           this.ds.updateResultService(next.esito);
  //           this.ds.updateSpinner(false);
  //           this.ps.updateAcquisto(this.acquisto.type)
  //         },error => {
  //           this.ds.updateResultService("Errore durante l'acquisto");
  //           this.ds.updateSpinner(false);
  //         })
  //       } else if (result.error) {
  //         console.log(result.error.message);
  //       }
  //     });
  // }

}
