import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ContentModalCorsoComponent } from 'src/app/modals/content-modal-corso/content-modal-corso.component';
import { ModalRichiestaComponent } from 'src/app/modals/modal-richiesta/modal-richiesta.component';
import { Dominio } from 'src/app/model/Dominio';
import { User } from 'src/app/model/User';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { getUserLS } from 'src/app/utils/Util';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input() tipoCorsoList: Dominio; 
  utente: User;

  modalRichiestaComponent = ModalRichiestaComponent;
  modalCorsoComponent = ContentModalCorsoComponent; 
  tabName: number = 0;
  showFiller = false;
  isMobile: boolean;
  isUtenteLogged: boolean;
  isSuperUser: boolean;
  isUser: boolean;
  isRichiedente: boolean;
  isWriter: boolean;

  constructor(private cs: CorsoServiceService , private ds: DelegateServiceService, private route: Router,private deviceService: DeviceDetectorService) {
    this.ds.getOBSSideBar().subscribe(next => {
      this.ds.isOpenSideBar = next;
    })
    this.ds.getOBSUser().subscribe(next => {
      this.utente = next;
      this.setRoles();
    })
   }

  ngOnInit(): void { 
    this.utente = getUserLS();
    this.setRoles();
    this.isMobile = this.deviceService.isMobile();
  }

  private setRoles() {
    this.isUtenteLogged = this.utente !== null && this.utente !== undefined;
    this.isSuperUser = this.utente !== null && this.utente !== undefined && this.utente.tipo.codice === "SU";
    this.isUser = this.utente !== null && this.utente !== undefined && this.utente.tipo.codice === "U";
    this.isRichiedente = this.utente !== null && this.utente !== undefined && this.utente.tipo.codice === "R";
    this.isWriter = this.utente !== null && this.utente !== undefined && this.utente.tipo.codice === "W";
  }

  filterListCorsi(nome: string){
    if(this.cs.listaCorsi.length > 0 && (nome.length > 2 || nome.length === 0)){
      var newArray = this.cs.listaCorsi.filter((data) => data.nomeCorso.toLowerCase().includes(nome.toLowerCase()));
      
      this.cs.filterCorsi(newArray);
      this.route.navigate(['/']);
    }
  }

  onChangeTab(id: number){
    this.tabName = id;
  }

  openSideBar(){
    this.ds.updateSideBar(!this.ds.isOpenSideBar);
    this.ds.isOpenSideBar = !this.ds.isOpenSideBar;
  }


}
