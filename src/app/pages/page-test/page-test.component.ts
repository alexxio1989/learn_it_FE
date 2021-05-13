import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { ServiceCore } from 'src/app/services/core/ServiceCore';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { RichiestaServiceService } from 'src/app/services/richiesta-service.service';
import { getJWTTOKEN, getUserLS } from 'src/app/utils/Util';

@Component({
  selector: 'app-page-test',
  templateUrl: './page-test.component.html',
  styleUrls: ['./page-test.component.css']
})
export class PageTestComponent implements OnInit {

  
  utente= new User();

  accountStripe: any;

  json = JSON.parse('{ "datiRegistrazioneUnCompleted": true, "tipo": { "codice":"W", "sottoTipi": [], "pageIndex": 0, "pageSize": 3, "lowValue": 0, "highValue": 3 }, "recapito": { "country": { "name": "Italia", "alpha2Code": "IT", "alpha3Code": "ITA", "numericCode": "380", "callingCode": "+39" }, "zip": "00172", "citta": "Roma", "indirizzo": "via test 0000" }, "bank": { "currency": "", "iban": "", "idStripe": "", "changed": false }, "mediaCorsi": 0, "totCorsiPubblicati": 0, "datiAccessoCompleted": true, "datiAnagraficiCompleted": true, "datiBancariCompleted": false, "documentiNecessariCompleted": false, "isSigningGoogle": false, "accountStripeStatus": {}, "enablePayments": {}, "email": "alessiopinna.elis@gmail.com", "password": "root", "confermaPassword": "root", "nome": "Alessio", "cognome": "Pinna", "attivita": "Software Developer Full Stack", "phone": "388 875 2937", "dataNascita": "1989-08-06T22:00:00.000Z" }')


  constructor(private http: HttpClient,private route: Router,private rs: RichiestaServiceService,private ds: DelegateServiceService) { }

  ngOnInit(): void {
    
    this.utente = this.json;

    let utenteTest =  JSON.parse(localStorage.getItem('UTENTE_TEST'));
    if(utenteTest){
      this.utente = utenteTest;
    }

    

    let utenteLogged = getUserLS();
    let isSuperUser =utenteLogged !== null && utenteLogged !== undefined && utenteLogged.tipo.codice === "SU";

    if(utenteLogged === null || utenteLogged=== undefined || !isSuperUser){
      
      this.route.navigate(['/']);
    } 
  }

  salva(){
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    this.rs.getIPAddress().subscribe((res:any)=>{  
      this.utente.ip = res.ip;   
      this.http.post(ServiceCore.baseURl + "/stripetest/save", this.utente , {headers}).subscribe(next=>{
        this.ds.updateSpinner(false);
        if(next){
          localStorage.setItem('UTENTE_TEST',JSON.stringify(next))
  
        }
      });
    },error => {
      this.ds.updateSpinner(false);
    });
  }

  modifica(){
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    this.ds.updateSpinner(true);
    this.http.post(ServiceCore.baseURl + "/stripetest/update", this.utente , {headers}).subscribe((next:User)=>{
      this.ds.updateSpinner(false);
      if(next){
        localStorage.removeItem('UTENTE_TEST');
        localStorage.setItem('UTENTE_TEST',JSON.stringify(next))
        this.utente = next;
      }
    },error => {
      this.ds.updateSpinner(false);
    });
  }

  elimina(){
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    this.ds.updateSpinner(true);
    this.http.post(ServiceCore.baseURl + "/stripetest/delete", this.utente , {headers}).subscribe((next:User)=>{
      this.ds.updateSpinner(false);
      localStorage.removeItem('UTENTE_TEST');
      this.utente = this.json;
    },error => {
      this.ds.updateSpinner(false);
    });
  }

  retrieve(){
    const headers = new HttpHeaders().set("JWT_TOKEN",  getJWTTOKEN());
    this.ds.updateSpinner(true);
    this.http.post(ServiceCore.baseURl + "/stripetest/retrieve", this.utente , {headers}).subscribe((next:User)=>{
      this.ds.updateSpinner(false);
      if(next){
        localStorage.removeItem('UTENTE_TEST');
        localStorage.setItem('UTENTE_TEST',JSON.stringify(next))
        this.utente = next;
      }
      
    },error => {
      this.ds.updateSpinner(false);
    });
  }

}
