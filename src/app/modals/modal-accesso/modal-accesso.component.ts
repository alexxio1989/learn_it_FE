import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/model/User';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { UtenteServiceService } from 'src/app/services/utente-service.service';
import { isEmptyString } from 'src/app/utils/Util';
import { Router } from '@angular/router';
import {Country} from '@angular-material-extensions/select-country'; 
import { SocialAuthService } from 'angularx-social-login';

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

  utente: User = new User();

  hide: boolean;

  disableLogin = true;

  emailGoogle = '';

  constructor(private socialAuthService: SocialAuthService,private _formBuilder: FormBuilder,private route: Router ,private ds: DelegateServiceService , private us: UtenteServiceService,public dialog: MatDialog) { }

  ngOnInit(): void {

    this.us.getOBSUserGoogle().subscribe(utenteGoogle => {
      this.utente = utenteGoogle;
      
      console.log("Accesso con google + this.utente.email")
      if(this.emailGoogle === '' || this.emailGoogle !== this.utente.email && !this.utente.isSigningGoogle){
        this.utente.isSigningGoogle = true;
        this.emailGoogle = this.utente.email;
        this.us.getOBSCount(this.utente).subscribe(next => {
          console.log(JSON.stringify(this.utente))
          if(next > 0){
            this.accediGoogle(this.utente);
            
          } else {
            this.registratiGoogle(this.utente);
          }
        },error => {
          
        })
      }
    })

   


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
      this.accedi(this.user);
  }

  accedi(user: User) {
    this.us.getOBSLogin(user).subscribe(next =>{
      this.ds.updateResultService("Login avvenuto con successo");
      localStorage.setItem('JWT_TOKEN',next.headers.get('JWT_TOKEN'));
      let dateString = new Date().toLocaleString('it-IT') 
      localStorage.setItem('JWT_TIME',dateString);
      this.ds.utente = next.body.obj;
      this.us.updateUser(next.body.obj); 
      this.ds.updateSideBar(false);
      this.ds.updateSpinner(false);
      this.ds.checkUserLogged(this.ds.utente , this.ds.page , this.ds.idObjSelected )
    },error => {
      this.ds.updateResultService(error.error.status);
      this.ds.updateSpinner(false);
    });
}

accediGoogle(user: User) {
  this.us.getOBSLogin(user).subscribe(next =>{
    this.ds.updateResultService("Login avvenuto con successo");
    console.log(next.headers.get('JWT_TOKEN'))
    localStorage.setItem('JWT_TOKEN',next.headers.get('JWT_TOKEN'));
    let dateString = new Date().toLocaleString('it-IT') 
    localStorage.setItem('JWT_TIME',dateString);
    this.ds.utente = next.body.obj;
    this.us.updateUser(next.body.obj); 
    this.ds.updateSideBar(false);
    this.ds.updateSpinner(false);
    this.ds.checkUserLogged(this.ds.utente , this.ds.page , this.ds.idObjSelected )
    this.dialog.closeAll();
  },error => {
    this.ds.updateResultService(error.error.status);
    this.ds.updateSpinner(false);
  });
}


  save() {
    this.registrati(this.utente);
 
  }

  registratiGoogle(user: User) {
    this.us.getOBSSignIn(user).subscribe(next =>{
      this.ds.updateResultService("Registrazione avvenuta con successo"); 
      
      this.accediGoogle(this.utente);
    },error => {
      this.ds.updateResultService(error.error.status);
      this.ds.updateSpinner(false);
    });
 
  }

  registrati(user: User) {
    this.us.getOBSSignIn(user).subscribe(next =>{
      this.ds.updateResultService("Registrazione avvenuta con successo"); 
      this.ds.updateSpinner(false);
      this.ds._sbjOpenLogin.next(true);
    },error => {
      this.ds.updateResultService(error.error.status);
      this.ds.updateSpinner(false);
    });
 
  }

  changeTab(event: any){
    this.user = new User();
    this.utente =  new User();
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
