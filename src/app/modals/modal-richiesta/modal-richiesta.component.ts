import { Country } from '@angular-material-extensions/select-country';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'angular-iban';
import { Recapito } from 'src/app/model/Recapito';
import { Richiesta } from 'src/app/model/Richiesta';
import { User } from 'src/app/model/User';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { RichiestaServiceService } from 'src/app/services/richiesta-service.service';
import { getUserLS } from 'src/app/utils/Util';

@Component({
  selector: 'app-modal-richiesta',
  templateUrl: './modal-richiesta.component.html',
  styleUrls: ['./modal-richiesta.component.css']
})
export class ModalRichiestaComponent implements OnInit {

  datiAnagraficiFormGroup: FormGroup;
  datiBancariFormGroup: FormGroup;

  datiAnagraficiCompleted = false;
  datiBancariCompleted = false;
  documentiNecessariCompleted = false;

  utente: User;

  richiesta = new Richiesta();

  public ibanReactive: FormControl;


  constructor(private rs: RichiestaServiceService,private ds: DelegateServiceService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.utente = getUserLS();

    this.utente.bank.currency = 'EUR'

    this.datiAnagraficiFormGroup = this._formBuilder.group({
      nomeCtrl: ['', Validators.required],
      cognometrl: ['', Validators.required],
      attivitaCtrl: ['', Validators.required],
      cittaCtrl: ['', Validators.required],
      indirizzoCtrl: ['', Validators.required],
      phoneCtrl: ['', Validators.required],
      dataCtrl: ['', Validators.required],
      zipCtrl: ['', Validators.required]
    });

    this.ibanReactive = new FormControl(
      null,
        [
          Validators.required,
          ValidatorService.validateIban
        ]
    );
    this.datiBancariFormGroup = this._formBuilder.group({
      ibanReactive: this.ibanReactive,
    });

    this.datiAnagraficiFormGroup.valueChanges.subscribe((changedObj: any) => {
      this.datiAnagraficiCompleted = this.datiAnagraficiFormGroup.valid && (this.utente.recapito.country !== undefined && this.utente.recapito.country !== null && this.utente.recapito.country.alpha2Code !== null);
      
    });
    this.datiBancariFormGroup.valueChanges.subscribe((changedObj: any) => {
      
      this.datiBancariCompleted = this.datiBancariFormGroup.valid && (this.utente.bank.country !== undefined && this.utente.bank.country !== null && this.utente.bank.country.alpha2Code !== null);;
    });
  }

  salva(){
    this.rs.getIPAddress().subscribe((res:any)=>{  
      this.utente.ip = res.ip;   
      this.richiesta.utente = this.utente;
      console.log(JSON.stringify(this.richiesta))
      this.rs.getOBSSave(this.richiesta).subscribe(next => {
        let utente = next.obj.utente;
        localStorage.removeItem('USER');
        this.ds.updateUser(utente); 
        this.ds.updateResultService("Richiesta salvata correttamente")
        this.ds.updateSpinner(false);
      },error => {
        this.ds.updateResultService("Richiesta in errore")
        this.ds.updateSpinner(false);
      })
    });  
  }

  onCountrySelected(country: Country) {
    this.utente.recapito = new Recapito();
    this.utente.recapito.country= country;
    this.datiAnagraficiCompleted = this.datiAnagraficiFormGroup.valid && (this.utente.recapito.country !== undefined && this.utente.recapito.country !== null && this.utente.recapito.country.alpha2Code !== null);

    // if(this.secondFormGroup.valid){
    //   this.datiAnagraficiUncompleted = false;
    // }
    // this.utente.datiRegistrazioneUnCompleted = this.datiAccessoUncompleted || this.datiAnagraficiUncompleted;  
    // this.userChange.emit(this.user);
  }

  onCountryBankSelected(country: Country) {
    this.utente.bank.country = country;
    this.datiBancariCompleted = this.datiBancariFormGroup.valid && (this.utente.bank.country !== undefined && this.utente.bank.country !== null && this.utente.bank.country.alpha2Code !== null);;
    // if(this.secondFormGroup.valid){
    //   this.datiAnagraficiUncompleted = false;
    // }
    // this.utente.datiRegistrazioneUnCompleted = this.datiAccessoUncompleted || this.datiAnagraficiUncompleted;  
    // this.userChange.emit(this.user);
  }

  retrieveFront(base64:string){
    this.richiesta.front = base64;
    this.documentiNecessariCompleted = this.richiesta.front !== undefined && this.richiesta.front !== null && this.richiesta.front !== '' && this.richiesta.back !== undefined && this.richiesta.back !== null && this.richiesta.back !== ''

  }

  retrieveBack(base64:string){
    this.richiesta.back = base64;
    this.documentiNecessariCompleted = this.richiesta.front !== undefined && this.richiesta.front !== null && this.richiesta.front !== '' && this.richiesta.back !== undefined && this.richiesta.back !== null && this.richiesta.back !== ''

  }

}
