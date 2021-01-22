import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/model/User';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { UtenteServiceService } from 'src/app/services/utente-service.service';
import { ContentModalLoginComponent } from './content-modal-login/content-modal-login.component';

@Component({
  selector: 'app-modal-login-user',
  templateUrl: './modal-login-user.component.html',
  styleUrls: ['./modal-login-user.component.css']
})
export class ModalLoginUserComponent{

  constructor(public dialog: MatDialog, private ds: DelegateServiceService) {
    this.ds.getOBSOpenLogin().subscribe(next => {
      this.openDialog();
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(ContentModalLoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
