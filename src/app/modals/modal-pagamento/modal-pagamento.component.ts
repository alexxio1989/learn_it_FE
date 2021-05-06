import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeCardElementOptions, StripeElement, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { Acquisto } from 'src/app/model/Acquisto';
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


  stripe = Stripe(environment.STRIPE_PUBLIC_TOKEN, {
    stripeAccount: this.ds.objSelected.owner.idStripe
  }); ;


  card : stripe.elements.Element;

  disablePay = true;

  clientSecret : string;
  


  constructor(private stripeService: StripeService,
              private ps: PagamentiServiceService,
              private ds: DelegateServiceService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.acquisto = this.ds.objSelected;

    this.stripe = Stripe(environment.STRIPE_PUBLIC_TOKEN, {
      stripeAccount: this.acquisto.owner.idStripe
    });

    this.ps.getOBSPayIntent(this.acquisto).subscribe(next => {
      var elements = this.stripe.elements();
      this.ds.updateSpinner(false);
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
        this.card
        if (event && event.error) {
          this.disablePay = true;
        } else if(event && event.complete) {
          this.disablePay = false;
        }
      });
       

    },error=>{
      this.ds.updateSpinner(false);
    })
    
  }

  pay(){
    
   
    this.stripe
    .confirmCardPayment(this.clientSecret, {
      payment_method: {
        card: this.card
      }
    }).then(function(result) {
      if (result.error) {
       
        
      } else {
        
      }
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
