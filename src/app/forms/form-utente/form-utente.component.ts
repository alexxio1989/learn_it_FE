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

  oldIban: string;
  oldCurrency: string;
  oldCountry: Country

  expandedMenuCurrency = false;

  currencyList = [
    {
      "id": 38,
      "symbol": "CAD",
      "name": "Canadian dollar"
    },
    {
      "id": 8,
      "symbol": "CZK",
      "name": "Czech koruna"
    },
    {
      "id": 37,
      "symbol": "DKK",
      "name": "Danish crone"
    },
    {
      "id": 27,
      "symbol": "EUR",
      "name": "European euro"
    },
    {
      "id": 15,
      "symbol": "NZD",
      "name": "New Zealand dollar"
    },
    {
      "id": 30,
      "symbol": "GBP",
      "name": "Pound sterling"
    },
    {
      "id": 35,
      "symbol": "RUB",
      "name": "Russian ruble"
    },
    {
      "id": 1,
      "symbol": "RSD",
      "name": "Serbian dinar"
    },
    {
      "id": 39,
      "symbol": "CHF",
      "name": "Swiss franc"
    },
    {
      "id": 2,
      "symbol": "USD",
      "name": "US Dollar"
    }
  ];

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

  showDoc0: boolean;
  showDoc1: boolean;

  codeDocumentoPersonale = "individual.verification.document";
  codeDocumentoExtraPersonale = "individual.verification.additional_document"


  constructor( private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    

    if(this.utente.idStripe !== undefined && this.utente.idStripe !== null && this.utente.idStripe !== '' ){
        this.showDoc0 = this.utente.enablePayments.docNeeded
        this.showDoc1 = this.utente.enablePayments.extraDocNeeded     
    } else {
      this.showDoc0 = true;
      this.showDoc1 = true;
    }

    if(this.utente.bank.idStripe !== undefined && this.utente.bank.idStripe !== null && this.utente.bank.idStripe !== ''){
      this.oldIban = this.utente.bank.iban;
      this.oldCurrency = this.utente.bank.currency;
      this.oldCountry = this.utente.bank.country;
    }

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
      if(this.utente.bank.idStripe !== undefined && this.utente.bank.idStripe !== null && this.utente.bank.idStripe !== '' && this.oldIban !== this.utente.bank.iban){
        this.utente.bank.changed = true;
      } else if(this.utente.bank.idStripe !== undefined && this.utente.bank.idStripe !== null && this.utente.bank.idStripe !== '' && this.oldIban === this.utente.bank.iban){
        this.utente.bank.changed = false;
      }
      this.utente.datiBancariCompleted = this.datiBancariFormGroup.valid && 
                                         (this.utente.bank.country !== undefined && this.utente.bank.country !== null && this.utente.bank.country.alpha2Code !== null) &&
                                         (this.utente.bank.currency !== undefined && this.utente.bank.currency !== null && this.utente.bank.currency !== '' )
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

    if(this.utente.bank.idStripe !== undefined && this.utente.bank.idStripe !== null && this.utente.bank.idStripe !== '' && this.oldCountry.alpha2Code !== country.alpha2Code){
      this.utente.bank.changed = true;
    } else if (this.utente.bank.idStripe !== undefined && this.utente.bank.idStripe !== null && this.utente.bank.idStripe !== '' && this.oldCountry.alpha2Code === country.alpha2Code){
      this.utente.bank.changed = false;
    }

    this.utente.bank.country = country;
    this.utente.datiBancariCompleted = this.datiBancariFormGroup.valid && 
                                       (this.utente.bank.country !== undefined && this.utente.bank.country !== null && this.utente.bank.country.alpha2Code !== null) && 
                                       (this.utente.bank.currency !== undefined && this.utente.bank.currency !== null && this.utente.bank.currency !== '' )
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

  retrieveFront1(base64:string){
    this.utente.doc1Front64 = base64;
    this.utente.documentiNecessariCompleted = this.utente.docFront64 !== undefined && this.utente.docFront64  !== null && this.utente.docFront64  !== '' && this.utente.docBack64 !== undefined && this.utente.docBack64 !== null && this.utente.docBack64 !== ''

  }

  retrieveBack1(base64:string){
    this.utente.doc1Back64  = base64;
    this.utente.documentiNecessariCompleted = this.utente.docFront64 !== undefined && this.utente.docFront64  !== null && this.utente.docFront64  !== '' && this.utente.docBack64 !== undefined && this.utente.docBack64 !== null && this.utente.docBack64 !== ''

  }

  changeCurrency(obj: any) {
    if(this.utente.bank.idStripe !== undefined && this.utente.bank.idStripe !== null && this.utente.bank.idStripe !== '' && this.oldCurrency !== obj.symbol){
      this.utente.bank.changed = true;
    } else if(this.utente.bank.idStripe !== undefined && this.utente.bank.idStripe !== null && this.utente.bank.idStripe !== '' && this.oldCurrency === obj.symbol){
      this.utente.bank.changed = false;
    }
   
    this.expandedMenuCurrency = !this.expandedMenuCurrency
    this.utente.bank.currency = obj.symbol;
    this.utente.datiBancariCompleted = this.datiBancariFormGroup.valid && 
                                       (this.utente.bank.country !== undefined && this.utente.bank.country !== null && this.utente.bank.country.alpha2Code !== null) && 
                                       (this.utente.bank.currency !== undefined && this.utente.bank.currency !== null && this.utente.bank.currency !== '' )
  }

  changeIban(iban:any){
    this.utente.bank.iban = iban;
    if(this.utente.bank.idStripe !== undefined && this.utente.bank.idStripe !== null && this.utente.bank.idStripe !== '' && this.oldIban !== this.utente.bank.iban){
      this.utente.bank.changed = true;
    } else if(this.utente.bank.idStripe !== undefined && this.utente.bank.idStripe !== null && this.utente.bank.idStripe !== '' && this.oldIban === this.utente.bank.iban){
      this.utente.bank.changed = false;
    }
  }


}
