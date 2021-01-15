import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/model/User';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { UtenteServiceService } from 'src/app/services/utente-service.service';
import { isEmptyString } from 'src/app/utils/Util';
import {ContentModalSigninComponent} from 'src/app/modals/modal-signin-user/content-modal-signin/content-modal-signin.component'

@Component({
  selector: 'app-content-modal-login',
  templateUrl: './content-modal-login.component.html',
  styleUrls: ['./content-modal-login.component.css']
})
export class ContentModalLoginComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  user: User = new User();

  hide: boolean;

  constructor(private modalService: NgbModal ,private ds: DelegateServiceService , private us: UtenteServiceService,public dialog: MatDialog) { }

  ngOnInit(): void {}

  get disableSave(){
    return  isEmptyString(this.user.email) || isEmptyString(this.user.password);
  }
 
  login() {
      this.us.getOBSLogin(this.user).subscribe(next =>{
        this.ds.updateResultService(next.body.status);
        localStorage.setItem('JWT_TOKEN',next.headers.get('JWT_TOKEN'));
        localStorage.setItem('USER',JSON.stringify(next.body.obj));
        let dateString = new Date().toLocaleString()
        localStorage.setItem('JWT_TIME',dateString);
        this.ds.utente = next.body.obj;
        this.ds.updateUser(next.body.obj); 
        this.ds.updateSideBar(false);
        this.ds.updateSpinner(false);
      },error => {
        this.ds.updateResultService(error.esitoChiamata);
        this.ds.updateSpinner(false);
      });
  }

  openDialogSignin(){
    const dialogRef = this.dialog.open(ContentModalSigninComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
