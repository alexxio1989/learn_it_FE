import { Country } from '@angular-material-extensions/select-country';
import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'angular-iban';
import { Recapito } from '../../model/Recapito';
import { User } from '../../model/User';


@Component({
  selector: 'app-form-utente',
  templateUrl: './form-utente.component.html',
  styleUrls: ['./form-utente.component.css']
})
export class FormUtenteComponent implements OnInit {

  @Input() utente : User;
  @Output() utenteChange = new EventEmitter<User>();

  datiAccessoFormGroup: FormGroup;
  datiAnagraficiFormGroup: FormGroup;
  datiBancariFormGroup: FormGroup;
  public ibanReactive: FormControl;

  hide: boolean;

  @Input() showDatiAccesso = true;
  @Input() showDatiAnagrafici = true;
  @Input() showDatiBancari = true;
  @Input() showDocumentiNecessari = true;


  constructor( private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.datiAccessoFormGroup = this._formBuilder.group({
      emailCtrl: ['', Validators.required],
      passwordCtrl: ['', Validators.required],
      passwordConfirmCtrl: ['', Validators.required]
    });

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

    this.datiAccessoFormGroup.valueChanges.subscribe((changedObj: any) => {
      this.utente.datiAccessoCompleted =  this.datiAccessoFormGroup.valid ;
      
    });

    this.datiAnagraficiFormGroup.valueChanges.subscribe((changedObj: any) => {
      this.utente.datiAnagraficiCompleted= this.datiAnagraficiFormGroup.valid && (this.utente.recapito.country !== undefined && this.utente.recapito.country !== null && this.utente.recapito.country.alpha2Code !== null);
      
    });
    this.datiBancariFormGroup.valueChanges.subscribe((changedObj: any) => {
      
      this.utente.datiBancariCompleted = this.datiBancariFormGroup.valid && (this.utente.bank.country !== undefined && this.utente.bank.country !== null && this.utente.bank.country.alpha2Code !== null);;
    });

    if(this.utente.docFront64 !== undefined && this.utente.docFront64 !==  null && this.utente.docFront64 !== '' && 
    this.utente.docBack64 !== undefined && this.utente.docBack64 !==  null && this.utente.docBack64 !== ''){
      this.utente.documentiNecessariCompleted = true
    }
  }



  onCountrySelected(country: Country) {
    this.utente.recapito = new Recapito();
    this.utente.recapito.country= country;
    this.utente.datiAnagraficiCompleted = this.datiAnagraficiFormGroup.valid && (this.utente.recapito.country !== undefined && this.utente.recapito.country !== null && this.utente.recapito.country.alpha2Code !== null);

    // if(this.secondFormGroup.valid){
    //   this.datiAnagraficiUncompleted = false;
    // }
    // this.utente.datiRegistrazioneUnCompleted = this.datiAccessoUncompleted || this.datiAnagraficiUncompleted;  
    // this.userChange.emit(this.user);
  }

  onCountryBankSelected(country: Country) {
    this.utente.bank.country = country;
    this.utente.datiBancariCompleted = this.datiBancariFormGroup.valid && (this.utente.bank.country !== undefined && this.utente.bank.country !== null && this.utente.bank.country.alpha2Code !== null);;
    // if(this.secondFormGroup.valid){
    //   this.datiAnagraficiUncompleted = false;
    // }
    // this.utente.datiRegistrazioneUnCompleted = this.datiAccessoUncompleted || this.datiAnagraficiUncompleted;  
    // this.userChange.emit(this.user);
  }

  retrieveFront(base64:string){
    this.utente.docFront64 = base64;
    this.utente.documentiNecessariCompleted = this.utente.docFront64 !== undefined && this.utente.docFront64  !== null && this.utente.docFront64  !== '' && this.utente.docBack64 !== undefined && this.utente.docBack64 !== null && this.utente.docBack64 !== ''

  }

  retrieveBack(base64:string){
    this.utente.docBack64  = base64;
    this.utente.documentiNecessariCompleted = this.utente.docFront64 !== undefined && this.utente.docFront64  !== null && this.utente.docFront64  !== '' && this.utente.docBack64 !== undefined && this.utente.docBack64 !== null && this.utente.docBack64 !== ''

  }

}
