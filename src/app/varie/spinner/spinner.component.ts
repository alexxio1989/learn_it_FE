import { Component, OnInit } from '@angular/core';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  showSpinner: false;

  constructor(private ds: DelegateServiceService) {
    this.ds.getOBSSpinner().subscribe(next => {
      this.showSpinner = next;
    })
  }

  ngOnInit(): void {
  }

}
