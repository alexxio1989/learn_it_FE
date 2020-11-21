import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/model/User';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { UtenteServiceService } from 'src/app/services/utente-service.service';
import { isEmptyString } from 'src/app/utils/Util';

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

  constructor(private modalService: NgbModal ,private ds: DelegateServiceService , private us: UtenteServiceService) { }

  ngOnInit(): void {}

  get disableSave(){
    return  isEmptyString(this.user.email) || isEmptyString(this.user.password);
  }
 
  login() {
      this.us.getOBSLogin(this.user).subscribe(next =>{
        this.ds.updateResultService('Login Avvenuto con successo');
        this.ds.updateSpinner(false);
        localStorage.setItem('USER',JSON.stringify(next));
        this.ds.utente = next;
        this.ds.updateSideBar(false);
      },error => {
        this.ds.updateResultService('Login in errore');
        this.ds.updateSpinner(false);
      });
  }

}
