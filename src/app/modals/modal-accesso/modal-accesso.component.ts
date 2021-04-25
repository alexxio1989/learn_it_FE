import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/model/User';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { UtenteServiceService } from 'src/app/services/utente-service.service';
import { isEmptyString } from 'src/app/utils/Util';
import { Router } from '@angular/router';
import {Country} from '@angular-material-extensions/select-country'; 

@Component({
  selector: 'app-modal-accesso',
  templateUrl: './modal-accesso.component.html',
  styleUrls: ['./modal-accesso.component.css']
})
export class ModalAccessoComponent implements OnInit {

  step1 = true;

  isLogin: boolean = true;
  isRecuperaPassword: boolean = false;

  loginFormGroup: FormGroup;
  richiediPasswordFormGroup: FormGroup;

  user: User = new User();

  hide: boolean;

  disableLogin = true;

  constructor(private _formBuilder: FormBuilder,private route: Router ,private ds: DelegateServiceService , private us: UtenteServiceService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loginFormGroup = this._formBuilder.group({
      emailCtrl: ['',  [Validators.required, Validators.email]],
      passwordCtrl: ['', Validators.required]
    });
    this.richiediPasswordFormGroup = this._formBuilder.group({
      emailCtrl: ['',  [Validators.required, Validators.email]]
    });
    this.loginFormGroup.valueChanges.subscribe((changedObj: any) => {
        this.disableLogin = !this.loginFormGroup.valid;
    });
  }

 
  get disableRecuperaPsw(){
    return  isEmptyString(this.user.email); 
  }
 
  login() {
      this.us.getOBSLogin(this.user).subscribe(next =>{
        this.ds.updateResultService("Login avvenuto con successo");
        localStorage.setItem('JWT_TOKEN',next.headers.get('JWT_TOKEN'));
        let dateString = new Date().toLocaleString('it-IT') 
        localStorage.setItem('JWT_TIME',dateString);
        this.ds.utente = next.body.obj;
        this.ds.updateUser(next.body.obj); 
        this.ds.updateSideBar(false);
        this.ds.updateSpinner(false);
        this.ds.updateAbilitaNavigazione(this.ds.page);
      },error => {
        this.ds.updateResultService("Errore durante la login");
        this.ds.updateSpinner(false);
      });
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

  changeTab(event: any){
    this.user = new User();
    this.disableLogin = true;
    this.isLogin = (event.index === 0);
  }

  recuperaPws(){

    this.us.getOBSRecuperoPsw(this.user).subscribe(next => {
      this.ds.updateResultService("Recupero Password avvenuto con successo : controlla la tua Email");
      this.ds.updateSpinner(false);
      const dialogRef = this.dialog.open(ModalAccessoComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    },error => {
      this.ds.updateResultService("Errore durante il recupero della password");
      this.ds.updateSpinner(false);
    })

  }

  fileChange(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.user.img = reader.result as string;
    };
  }

  retrieveImg(base64:string){
    this.user.img = base64;

  }

  


}
