import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { clearJWTTOKEN, getUserLS } from 'src/app/utils/Util';
import { Corso } from '../../model/Corso';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  listaCorsiBase: Array<Corso> = [];
  listaCorsiFiltered: Array<Corso> = [];
  mapCorsi: Map<string, Corso[]>;
  viewList: boolean;
  text:string = '';
  


  constructor(private cs: CorsoServiceService, private route: Router, private ds: DelegateServiceService) {}

  

  ngOnInit(): void {
    clearJWTTOKEN();
    this.cs.getOBSCorsi().subscribe(next => {
      this.ds.updateSpinner(false);
      this.listaCorsiBase = next.list;
      this.cs.listaCorsi = next.list;
      this.cs.updateCorsi(next.list);

      if(next.list.length > 0){
        this.mapCorsi = new Map<string, Corso[]>();
        next.list.forEach(value => {
          var newArray = next.list.filter(function (el) {
            return el.tipoPadre.codice === value.tipoPadre.codice
          });
          this.mapCorsi.set(value.tipoPadre.descrizione, newArray);
        });

       }

    },error => {
      this.ds.updateSpinner(false);
      this.ds.updateResultService(error.status)
    })

    this.cs.getOBSCorsiFiltered().subscribe(next => {
      this.listaCorsiFiltered = next;
    })
    
    this.cs.getOBSUpdateCorsi().subscribe(next => {
      this.listaCorsiBase = next;
      this.listaCorsiFiltered = [];
      if(next.length > 0){
        this.mapCorsi = new Map<string, Corso[]>();
        next.forEach(value => {
          var newArray = next.filter(function (el) {
            return el.tipoPadre.codice === value.tipoPadre.codice
          });
          this.mapCorsi.set(value.tipoPadre.descrizione, newArray);
        });

      } else {
        this.mapCorsi = new Map<string, Corso[]>();
      }
    })
  }

  get style(): string{
    return "font-size: calc(" + this.text.length +"px + (20 - 18) * ((100vw - 300px) / (1600 - 300))) !important;";
  }

  cleanListaCorsiFiltered() {
    this.listaCorsiFiltered = [];
  }

  changView(){
    this.viewList = !this.viewList;
  }

}
