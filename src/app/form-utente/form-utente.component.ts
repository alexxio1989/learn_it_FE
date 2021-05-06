import { Country } from '@angular-material-extensions/select-country';
import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'angular-iban';
import { Recapito } from '../model/Recapito';
import { User } from '../model/User';


@Component({
  selector: 'app-form-utente',
  templateUrl: './form-utente.component.html',
  styleUrls: ['./form-utente.component.css']
})
export class FormUtenteComponent implements OnInit {

  @Input() utente : User;

  datiAnagraficiFormGroup: FormGroup;
  datiBancariFormGroup: FormGroup;

  datiAnagraficiCompleted = false;
  datiBancariCompleted = false;
  documentiNecessariCompleted = false;

  public ibanReactive: FormControl;

  @Output() adviceDatiAnagrafici = new EventEmitter<boolean>();
  @Output() adviceDatiBancari = new EventEmitter<boolean>();
  @Output() adviceDocumentiNecessari = new EventEmitter<boolean>();

  constructor( private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
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
    this.utente.docFront64 = base64;
    this.documentiNecessariCompleted = this.utente.docFront64 !== undefined && this.utente.docFront64  !== null && this.utente.docFront64  !== '' && this.utente.docBack64 !== undefined && this.utente.docBack64 !== null && this.utente.docBack64 !== ''

  }

  retrieveBack(base64:string){
    this.utente.docBack64  = base64;
    this.documentiNecessariCompleted = this.utente.docFront64 !== undefined && this.utente.docFront64  !== null && this.utente.docFront64  !== '' && this.utente.docBack64 !== undefined && this.utente.docBack64 !== null && this.utente.docBack64 !== ''

  }

}
