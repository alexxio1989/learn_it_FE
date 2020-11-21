import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/model/User';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { UtenteServiceService } from 'src/app/services/utente-service.service';
import { ContentModalSigninComponent } from './content-modal-signin/content-modal-signin.component';

@Component({
  selector: 'app-modal-signin-user',
  templateUrl: './modal-signin-user.component.html',
  styleUrls: ['./modal-signin-user.component.css']
})
export class ModalSigninUserComponent {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(ContentModalSigninComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
