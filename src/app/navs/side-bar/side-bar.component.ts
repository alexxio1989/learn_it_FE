import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { ContentModalCorsoComponent } from 'src/app/modals/content-modal-corso/content-modal-corso.component';
import { ModalRichiestaComponent } from 'src/app/modals/modal-richiesta/modal-richiesta.component';
import { Corso } from 'src/app/model/Corso';
import { Dominio } from 'src/app/model/Dominio';
import { SubDominio } from 'src/app/model/SubDominio';
import { User } from 'src/app/model/User';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { UtenteServiceService } from 'src/app/services/utente-service.service';
import { getUserLS , isNotEmptyArray } from 'src/app/utils/Util';

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
  isShowRichiesta: boolean;
  
  isUtenteLogged: boolean;
  isSuperUser: boolean;
  isUser: boolean;
  isRichiedente: boolean;
  isWriter: boolean;

  modalRichiestaComponent = ModalRichiestaComponent;
  modalCorsoComponent = ContentModalCorsoComponent

  constructor(private ds: DelegateServiceService, private route: Router, private cs: CorsoServiceService,private socialAuthService: SocialAuthService) {
    this.ds.getOBSSideBar().subscribe(next => {
      this.openSideBar = next
    })

    this.cs.getOBSUpdateCorsi().subscribe(next => {
      this.listaCorsi = next;
      this.tipoCorsoListFilter = [];
      this.buildListTypes();
    })

    this.ds.getOBSUser().subscribe(next => {
      this.utente = next;
      this.setRoles();
    })
    
  }

  private setRoles() {
    this.isUtenteLogged = this.utente !== null && this.utente !== undefined;
    this.isSuperUser = this.utente !== null && this.utente !== undefined && this.utente.tipo.codice === "SU";
    this.isUser = this.utente !== null && this.utente !== undefined && this.utente.tipo.codice === "U";
    this.isRichiedente = this.utente !== null && this.utente !== undefined && this.utente.tipo.codice === "R";
    this.isWriter = this.utente !== null && this.utente !== undefined && this.utente.tipo.codice === "W";
  }

  ngOnInit(): void {
    this.utente = getUserLS();
    this.setRoles();
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
    this.socialAuthService.signOut(); 
    localStorage.removeItem('JWT_TOKEN')
    localStorage.removeItem('COOKIE_CONSENT')
    this.ds.updateUser(null);
    this.route.navigate(['/']);
    this.ds.updateSideBar(false);

    window.location.reload();
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

  gotToPageAdmin(){
    this.route.navigate(['/admin']);
    this.ds.updateSideBar(false);
  }

  gotToPageTest(){
    this.route.navigate(['/test']);
    this.ds.updateSideBar(false);
  }
  
  close(){
    this.ds.updateSideBar(false);
  }

  openLogin(){
    this.ds.updateOpenLogin(true);
  }

}
