import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Corso } from 'src/app/model/Corso';
import { Dominio } from 'src/app/model/Dominio';
import { SubDominio } from 'src/app/model/SubDominio';
import { User } from 'src/app/model/User';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { UtenteServiceService } from 'src/app/services/utente-service.service';
import { isNotNullObj , isNotEmptyArray } from 'src/app/utils/Util';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  openSideBar: boolean;
  utente: User;
  listaCorsi: Array<Corso> = [];
  tipoCorsoListFilter: Dominio[] = [];
  
  get isUtenteLogged(): boolean{
    const localUser = localStorage.getItem('USER');
    isNotNullObj(localUser) && localUser !== 'undefined'  ? this.utente = JSON.parse(localUser) : null;
    return localUser !== undefined && localUser !== null;
  }

  constructor(private ds: DelegateServiceService, private route: Router, private cs: CorsoServiceService) {
    this.ds.getOBSSideBar().subscribe(next => {
      this.openSideBar = next
    })

    this.cs.getOBSUpdateCorsi().subscribe(next => {
      this.listaCorsi = next;
      this.tipoCorsoListFilter = [];
      this.buildListTypes();
    })
    
  }

  ngOnInit(): void {
    this.listaCorsi = this.cs.listaCorsi;
    this.buildListTypes();
   
  }

  buildListTypes(){
    this.listaCorsi.forEach(corso => {

      let tipoPadre = corso.tipoPadre;

      if(isNotEmptyArray(this.tipoCorsoListFilter)){

       const tipoPadrefound = this.tipoCorsoListFilter.some(el => el.codice === corso.tipoPadre.codice);

       if(!tipoPadrefound){        
        this.tipoCorsoListFilter.push(this.newDominio(corso));
       } else {
        this.tipoCorsoListFilter.forEach(tipo => {
          if(tipo.codice === corso.tipoPadre.codice){
            const tipofound = tipo.sottoTipi.some(el => el.codice === corso.tipo.codice);
            if(!tipofound){
              tipo.sottoTipi.push(corso.tipo)
            }
          }
        })
       }

      } else {       
        this.tipoCorsoListFilter.push(this.newDominio(corso));
      }

     });
  }

  newDominio(corso: Corso): Dominio{
    let newTipoPadre = new Dominio;
    newTipoPadre.codice = corso.tipoPadre.codice
    newTipoPadre.descrizione = corso.tipoPadre.descrizione;
    newTipoPadre.sottoTipi.push(corso.tipo)
    return newTipoPadre;
  }

  logout(){
    localStorage.removeItem('USER');
    localStorage.removeItem('JWT_TOKEN')
    localStorage.removeItem('COOKIE_CONSENT')
    this.ds.updateUser(null);
    this.route.navigate(['/']);
    this.ds.updateSideBar(false);
  }

  filterListCorsi(dominio: SubDominio){
    var newArray = this.listaCorsi.filter(function (el) {
      return el.tipo.codice === dominio.codice ;
    });
    this.cs.filterCorsi(newArray);
    this.openSideBar = false;
    this.route.navigate(['/']);
  }

  goToPageUtente(){
    this.route.navigate(['/utente']);
    this.ds.updateSideBar(false);
  }

  close(){
    this.ds.updateSideBar(false);
  }

  openLogin(){
    this.ds.updateOpenLogin(true);
  }

}
