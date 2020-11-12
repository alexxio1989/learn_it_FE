import { Component } from '@angular/core';
import { DelegateServiceService } from './services/delegate-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'learnit';
  showSpinner: boolean;

  constructor(private ds: DelegateServiceService){
    this.ds.getOBSSpinner().subscribe(next => {
      this.showSpinner = next;
    })
  }

}
