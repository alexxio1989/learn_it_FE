import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeCardElementOptions, StripeElement, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { Acquisto } from 'src/app/model/Acquisto';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { PagamentiServiceService } from 'src/app/services/pagamenti-service.service';
import { getUserLS } from 'src/app/utils/Util';

@Component({
  selector: 'app-modal-pagamento',
  templateUrl: './modal-pagamento.component.html',
  styleUrls: ['./modal-pagamento.component.css']
})
export class ModalPagamentoComponent implements OnInit {

  acquisto = new Acquisto();

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  error: any;
  complete = false;
  

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

  constructor(private stripeService: StripeService,
              private ps: PagamentiServiceService,
              private ds: DelegateServiceService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.acquisto = this.ds.objSelected;
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  cardUpdated(result) {
    
    this.complete = result.complete;
    
  }

  createToken(): void {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          this.acquisto.acquirente = getUserLS();
          this.acquisto.stripeToken = result.token.id;
          console.log(result.token.id);
          this.ps.getOBSPay(this.acquisto).subscribe(next=>{
            this.ds.updateResultService(next.esito);
            this.ds.updateSpinner(false);
            this.ps.updateAcquisto(this.acquisto.type)
          },error => {
            this.ds.updateResultService("Errore durante l'acquisto");
            this.ds.updateSpinner(false);
          })
        } else if (result.error) {
          console.log(result.error.message);
        }
      });
  }

}
