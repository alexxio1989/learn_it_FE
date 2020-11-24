import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { getUserLS } from 'src/app/utils/Util';
import { Corso } from '../../model/Corso';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  listaCorsiBase: Array<Corso> = [];
  listaCorsiFiltered: Array<Corso> = [];
  mapCorsi: Map<string, Corso[]> = new Map<string, Corso[]>();
  viewList: boolean;
  utenteLogged: User;

  mapCorsiUtente: Map<string, Corso[]> = new Map<string, Corso[]>();


  constructor(private cs: CorsoServiceService, private route: Router, private ds: DelegateServiceService) {
    this.ds.getOBSUser().subscribe(next=>{
      this.utenteLogged = next;
    })
  }

  

  ngOnInit(): void {
    this.utenteLogged = getUserLS();
    this.cs.getOBSCorsi().subscribe(next => {
      this.ds.updateSpinner(false);
      this.listaCorsiBase = next;
      this.cs.listaCorsi = next;

      next.forEach(value => {
        var newArray = next.filter(function (el) {
          return el.tipoPadre.codice === value.tipoPadre.codice
        });
        this.mapCorsi.set(value.tipoPadre.descrizione, newArray);
      });
    })

    this.cs.getOBSCorsiFiltered().subscribe(next => {
      this.listaCorsiFiltered = next;
    })
    
    this.cs.getOBSUpdateCorsi().subscribe(next => {
      this.listaCorsiBase = next;
      this.listaCorsiFiltered = [];
      next.forEach(value => {
        var newArray = next.filter(function (el) {
          return el.tipoPadre.codice === value.tipoPadre.codice
        });
        this.mapCorsi.set(value.tipoPadre.descrizione, newArray);
      });
    })
  }

  cleanListaCorsiFiltered() {
    this.listaCorsiFiltered = [];
  }

  changView(){
    this.viewList = !this.viewList;
  }

}
