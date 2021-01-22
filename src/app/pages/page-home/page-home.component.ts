import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SubDominio } from 'src/app/model/SubDominio';
import { IPageCore } from 'src/app/pages/IPageCore';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { clearJWTTOKEN, getUserLS } from 'src/app/utils/Util';
import { Corso } from '../../model/Corso';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit , IPageCore {

  listaCorsiBase: Array<Corso> = [];
  listaCorsiFiltered: Array<Corso> = [];
  mapCorsi: Map<string, SubDominio>;
  viewList: boolean;
  text: string = '';

  pageIndex: number = 0;
  pageSize: number = 3;
  lowValue: number = 0;
  highValue: number = 3;
  renderPage: boolean;



  constructor(private cs: CorsoServiceService, private route: Router, private ds: DelegateServiceService,private deviceService: DeviceDetectorService) { 
    this.ds.getOBSSpinner().subscribe(next => {
      this.renderPage = !next;
    })
  }



  ngOnInit(): void {
    const isMobile = this.deviceService.isMobile();
    clearJWTTOKEN(this.route);
    localStorage.removeItem('CORSO');
    localStorage.removeItem('LEZIONE');
    this.cs.getOBSCorsi().subscribe(next => {
      this.ds.updateSpinner(false);
      this.listaCorsiBase = next.list;
      this.cs.listaCorsi = next.list;
      this.cs.updateCorsi(next.list);

      if (next.list.length > 0) {
        this.mapCorsi = new Map<string, SubDominio>();
        next.list.forEach(value => {
          var newArray = next.list.filter(function (el) {
            return el.tipoPadre.codice === value.tipoPadre.codice
          });
          let subtype = new SubDominio();
          if(isMobile){
            subtype.pageSize = 1;
            subtype.highValue = 1;
          }
          subtype.corsiAssociati = newArray;
          this.mapCorsi.set(value.tipoPadre.descrizione, subtype);
        });

      }

    }, error => {
      this.ds.updateSpinner(false);
      this.ds.updateResultService(error.status)
    })

    this.cs.getOBSCorsiFiltered().subscribe(next => {
      this.listaCorsiFiltered = next;
    })

    this.cs.getOBSUpdateCorsi().subscribe(next => {
      this.listaCorsiBase = next;
      this.listaCorsiFiltered = [];
      if (next.length > 0) {
        this.mapCorsi = new Map<string, SubDominio>();
        next.forEach(value => {
          var newArray = next.filter(function (el) {
            return el.tipoPadre.codice === value.tipoPadre.codice
          });
          let subtype = new SubDominio();
          if(isMobile){
            subtype.pageSize = 1;
            subtype.highValue = 1;
          }
          subtype.corsiAssociati = newArray;
          this.mapCorsi.set(value.tipoPadre.descrizione, subtype);
        });

      } else {
        this.mapCorsi = new Map<string, SubDominio>();
      }
    })
  }

  get style(): string {
    return "font-size: calc(" + this.text.length + "px + (20 - 18) * ((100vw - 300px) / (1600 - 300))) !important;";
  }

  cleanListaCorsiFiltered() {
    this.listaCorsiFiltered = [];
  }

  changView() {
    this.viewList = !this.viewList;
  }

  getPaginatorData(event, sudType: SubDominio) {
    console.log(event);
    if (event.pageIndex === sudType.pageIndex + 1) {
      sudType.lowValue = sudType.lowValue + sudType.pageSize;
      sudType.highValue = sudType.highValue + sudType.pageSize;
    }
    else if (event.pageIndex === sudType.pageIndex - 1) {
      sudType.lowValue = sudType.lowValue - sudType.pageSize;
      sudType.highValue = sudType.highValue - sudType.pageSize;
    }
    sudType.pageIndex = event.pageIndex;
  }

}
