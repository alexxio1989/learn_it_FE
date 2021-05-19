import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StripeCardElementOptions, StripeElement, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { from } from 'rxjs';
import { Acquisto } from 'src/app/model/Acquisto';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { PagamentiServiceService } from 'src/app/services/pagamenti-service.service';
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
  


  constructor(private stripeService: StripeService,
              private ps: PagamentiServiceService,
              private ds: DelegateServiceService,
              private cs: CorsoServiceService,
              private fb: FormBuilder,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.acquisto.acquirente = getUserLS();
    this.loading = true;

    if(this.ds.objSelected === undefined || this.ds.objSelected === null || this.ds.objSelected.owner === undefined || this.ds.objSelected.owner === null && this.ds.idCorsoSelected ){
      console.log("Ricerco corso con id : " + this.ds.idCorsoSelected )
      this.cs.getCorso(this.ds.idCorsoSelected ).subscribe(next => {
        this.ds.objSelected = next.obj;
        
        this.preparaAcquisto();
      }, error => {
        this.ds.updateResultService("Recupero corso in errore");
        
      });
    } else {

      this.preparaAcquisto();

    }

    
  }

  private preparaAcquisto() {
   
    
    this.acquisto.causale = "Acquisto tutorial " + this.ds.objSelected.nomeCorso + " , Acquirente : " + this.acquisto.acquirente.nome + this.acquisto.acquirente.cognome;
   
    this.acquisto.corso = this.ds.objSelected;
    this.acquisto.owner = this.ds.objSelected.owner;
    console.log(JSON.stringify(this.ds.objSelected))
    console.log("PREZZO" + this.ds.objSelected.owner)
    this.acquisto.total = this.ds.objSelected.prezzo
    this.ds.objSelected.owner.idStripe !== undefined && this.ds.objSelected.owner.idStripe !== null && this.ds.objSelected.owner.idStripe !== '' ?
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
          
          this.ps.updateAcquisto("");
          this.ds.updateSpinner(false);
          this.dialog.closeAll();
        }
      });


    // this.stripe
    // .confirmCardPayment(this.clientSecret, {
    //   payment_method: {
    //     card: this.card
    //   }
    // }).then(function(result) {
    //   if (result.error) {
       
        
    //   } else {
        
    //   }
    // });
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
