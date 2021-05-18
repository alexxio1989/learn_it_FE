import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { DelegateServiceService } from '../services/delegate-service.service';
import { StripeService } from '../services/stripe.service';

@Component({
  selector: 'app-info-profile',
  templateUrl: './info-profile.component.html',
  styleUrls: ['./info-profile.component.css']
})
export class InfoProfileComponent implements OnInit {

  @Input() utente : User;

  constructor(private ss: StripeService,private ds: DelegateServiceService) { }

  ngOnInit(): void {
  }

  update(){
    this.ss.retrieve(this.utente).subscribe(next => {
      console.log(JSON.stringify(next.accountStripeStatus))
      this.utente.accountStripeStatus = next.accountStripeStatus;
      this.utente.enablePayments = next.enablePayments;
      this.ds.updateUser(this.utente);
      this.ds.updateSpinner(false);
    },error=>{
      this.ds.updateSpinner(false);
    })
  }

}
