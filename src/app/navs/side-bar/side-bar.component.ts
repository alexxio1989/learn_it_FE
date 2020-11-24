import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dominio } from 'src/app/model/Dominio';
import { SubDominio } from 'src/app/model/SubDominio';
import { User } from 'src/app/model/User';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { UtenteServiceService } from 'src/app/services/utente-service.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  openSideBar: boolean;
  @Input() tipoCorsoList: Dominio[]; 
  utente: User;
  
  get isUtenteLogged(): boolean{
    const localUser = localStorage.getItem('USER');
    this.utente = JSON.parse(localUser);
    return localUser !== undefined && localUser !== null;
  }

  constructor(private ds: DelegateServiceService, private route: Router, private cs: CorsoServiceService) {
    this.ds.getOBSSideBar().subscribe(next => {
      this.openSideBar = next
    })
    
  }

  ngOnInit(): void {
    
  }

  logout(){
    localStorage.removeItem('USER');
    this.ds.updateUser(null);
    this.route.navigate(['/']);
    this.ds.updateSideBar(false);
  }

  filterListCorsi(dominio: SubDominio){
    var newArray = this.cs.listaCorsi.filter(function (el) {
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

}
