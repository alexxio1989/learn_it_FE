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
  datiAccessoUncompleted: boolean = true;
  datiAnagraficiUncompleted: boolean = true;
 

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      emailCtrl: ['',  [Validators.required, Validators.email]],
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
    this.firstFormGroup.valueChanges.subscribe((changedObj: any) => {
      this.datiAccessoUncompleted = !this.firstFormGroup.valid;
      this.user.datiRegistrazioneUnCompleted = this.datiAccessoUncompleted || this.datiAnagraficiUncompleted;  
      this.userChange.emit(this.user);
    });
    this.secondFormGroup.valueChanges.subscribe((changedObj: any) => {
      this.datiAnagraficiUncompleted = !this.secondFormGroup.valid || (this.user.recapito.country === undefined || this.user.recapito.country === null);
      this.user.datiRegistrazioneUnCompleted = this.datiAccessoUncompleted || this.datiAnagraficiUncompleted;  
      this.userChange.emit(this.user);
      
    });
  }

  get f1() { return this.firstFormGroup.controls; }
  get f2() { return this.secondFormGroup.controls; }

  onCountrySelected(country: Country) {
    this.user.recapito.country= country;
    
    if(this.secondFormGroup.valid){
      this.datiAnagraficiUncompleted = false;
    }
    this.user.datiRegistrazioneUnCompleted = this.datiAccessoUncompleted || this.datiAnagraficiUncompleted;  
    this.userChange.emit(this.user);
  }

 

}
