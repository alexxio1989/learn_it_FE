import { Component } from '@angular/core';
import { DelegateServiceService } from './services/delegate-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'learnit';
  showSpinner: boolean;

  constructor(private ds: DelegateServiceService , private _snackBar: MatSnackBar){
    this.ds.getOBSSpinner().subscribe(next => {
      this.showSpinner = next;
    })
    this.ds.getOBSResultService().subscribe(next => {
      this.openSnackBar(next);
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

}
