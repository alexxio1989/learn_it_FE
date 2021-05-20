import { Country } from '@angular-material-extensions/select-country';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'angular-iban';
import { Recapito } from 'src/app/model/Recapito';
import { Richiesta } from 'src/app/model/Richiesta';
import { User } from 'src/app/model/User';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { RichiestaServiceService } from 'src/app/services/richiesta-service.service';
import { UtenteServiceService } from 'src/app/services/utente-service.service';
import { getUserLS } from 'src/app/utils/Util';

@Component({
  selector: 'app-modal-richiesta',
  templateUrl: './modal-richiesta.component.html',
  styleUrls: ['./modal-richiesta.component.css']
})
export class ModalRichiestaComponent implements OnInit {


  utente: User;

  richiesta = new Richiesta();




  constructor(private rs: RichiestaServiceService,private ds: DelegateServiceService, private _formBuilder: FormBuilder,private us: UtenteServiceService) { }

  ngOnInit(): void {
    this.utente = getUserLS();

    this.utente.bank.currency = 'EUR'

    
  }

  salva(){
    this.rs.getIPAddress().subscribe((res:any)=>{  
      this.utente.ip = res.ip;   
      this.richiesta.utente = this.utente;
      console.log(JSON.stringify(this.richiesta))
      this.rs.getOBSSave(this.richiesta).subscribe(next => {
        let utente = next.obj.utente;
        localStorage.removeItem('USER');
        this.us.updateUser(utente); 
        this.ds.updateResultService("Richiesta salvata correttamente")
        this.ds.updateSpinner(false);
      },error => {
        this.ds.updateResultService("Richiesta in errore")
        this.ds.updateSpinner(false);
      })
    });  
  }


}
