import { Country } from '@angular-material-extensions/select-country';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { User } from 'src/app/model/User';
import { isEmptyString } from 'src/app/utils/Util';

@Component({
  selector: 'app-steppers-registrazione',
  templateUrl: './steppers-registrazione.component.html',
  styleUrls: ['./steppers-registrazione.component.css']
})
export class SteppersRegistrazioneComponent implements OnInit {

  @Input() user: User;
  @Output() userChange= new EventEmitter<User>();


  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  datiAccessoUncompleted: boolean;
  datiAnagraficiUncompleted: boolean;
 

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      emailCtrl: ['', Validators.required],
      passwordCtrl: ['', Validators.required],
      confirmPswCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      nomeCtrl: ['', Validators.required],
      cognometrl: ['', Validators.required],
      attivitaCtrl: ['', Validators.required],
      cittaCtrl: ['', Validators.required],
      indirizzoCtrl: ['', Validators.required],
    });
  }

  onCountrySelected(country: Country) {
    this.user.recapito.country= country;
    this.changeStatus();
    this.user.datiRegistrazioneUnCompleted = this.datiAccessoUncompleted || this.datiAnagraficiUncompleted;  
    this.userChange.emit(this.user);
  }

  changeEvnt(){
    this.changeStatus();

    this.user.datiRegistrazioneUnCompleted = this.datiAccessoUncompleted || this.datiAnagraficiUncompleted;                                
    this.userChange.emit(this.user);
  }

  private changeStatus() {
    this.datiAccessoUncompleted = isEmptyString(this.user.email) ||
      isEmptyString(this.user.password) ||
      isEmptyString(this.user.confirmPassword) ||
      this.user.confirmPassword !== this.user.password;

    this.datiAnagraficiUncompleted = isEmptyString(this.user.nome) ||
      isEmptyString(this.user.cognome) ||
      isEmptyString(this.user.password) ||
      isEmptyString(this.user.attivita) ||
      isEmptyString(this.user.recapito.citta) ||
      isEmptyString(this.user.recapito.indirizzo) ||
      (this.user.recapito.country === undefined || this.user.recapito.country === null);
  }
}
