import { AfterContentInit,AfterViewChecked,Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Dominio } from 'src/app/model/Dominio';
import { IPageCore } from 'src/app/pages/IPageCore';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { clearJWTTOKEN, getMapCorsi, getUserLS } from 'src/app/utils/Util';
import { Corso } from '../../model/Corso';



@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit , IPageCore , AfterViewChecked{

  @ViewChild('titleIlMioCodice') el:ElementRef;

  public PAGE = 'HOME';
  listaCorsiBase: Array<Corso> = [];
  listaCorsiFiltered: Array<Corso> = [];
  mapCorsi: Map<string, Dominio>;
  viewList: boolean;
  text: string = '';

  pageIndex: number = 0;
  pageSize: number = 3;
  lowValue: number = 0;
  highValue: number = 3;
  renderPage: boolean;





  constructor(private cs: CorsoServiceService, private route: Router, private ds: DelegateServiceService,private deviceService: DeviceDetectorService) { 
    
  }
  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 

  scrollToBottom(): void {
    try {
        this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight;
    } catch(err) { }                 
}


  ngOnInit(): void {
    this.ds.updatePage(this.PAGE);
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
        this.mapCorsi =  getMapCorsi(next.list);
      }
      this.renderPage = true;

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
        this.mapCorsi =  getMapCorsi(next);
      } else {
        this.mapCorsi = new Map<string, Dominio>();
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


}
