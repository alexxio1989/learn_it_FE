import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { UtenteServiceService } from 'src/app/services/utente-service.service';
import { isEmptyString } from 'src/app/utils/Util';

@Component({
  selector: 'app-modal-edit-utente',
  templateUrl: './modal-edit-utente.component.html',
  styleUrls: ['./modal-edit-utente.component.css']
})
export class ModalEditUtenteComponent implements OnInit {

  user: User;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private route: Router ,private ds: DelegateServiceService , private us: UtenteServiceService) { }

  get disableSave(){
    return isEmptyString(this.user.nome) || isEmptyString(this.user.cognome) || isEmptyString(this.user.email) || isEmptyString(this.user.password) ;
  }

  ngOnInit(): void {
    this.user = this.ds.objSelected;
  }

  fileChange(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.user.img = reader.result as string;
    };
  }

  salva(){

    this.us.getOBSUpdateUser(this.user).subscribe(next => {
      this.user = next.obj;
      this.ds.updateUser(this.user);
      this.ds.updateSpinner(false);
      this.ds.updateResultService(next.status);
    },error => {
      this.ds.updateSpinner(false);
      this.ds.updateResultService("Errore durante l'aggiornamento utente");
    })

  }

  retrieveImg(base64:string){
    this.user.img = base64;

  }

}
