import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/model/User';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { UtenteServiceService } from 'src/app/services/utente-service.service';
import { isEmptyString } from 'src/app/utils/Util';

@Component({
  selector: 'app-content-modal-signin',
  templateUrl: './content-modal-signin.component.html',
  styleUrls: ['./content-modal-signin.component.css']
})
export class ContentModalSigninComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  user: User = new User();
  confirmPassword: string;

  constructor(private modalService: NgbModal ,private ds: DelegateServiceService , private us: UtenteServiceService) { }

  get disableSave(){
    return isEmptyString(this.user.nome) || isEmptyString(this.user.cognome) || isEmptyString(this.user.email) || isEmptyString(this.user.password);
  }

  ngOnInit(): void {
  }

  save() {
      this.us.getOBSSignIn(this.user).subscribe(next =>{
        this.ds.updateResultService("Registrazione avvenuta con successo"); 
        this.ds.updateSpinner(false);
        this.ds.updateOpenLogin(true);
      },error => {
        this.ds.updateResultService("Errore durante la registrazione");
        this.ds.updateSpinner(false);
      });
   
  }

}
