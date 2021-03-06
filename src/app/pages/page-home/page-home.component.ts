import { AfterContentInit,AfterViewChecked,ChangeDetectorRef,Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ConstantsActions } from 'src/app/constants/ConstantsActions';
import { Dominio } from 'src/app/model/Dominio';
import { Paginazione } from 'src/app/model/Paginazione';
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

  public PAGE = ConstantsActions.HOME;
  listaCorsiBase: Array<Dominio> = [];
  listaCorsiFiltered: Array<Corso> = [];
 
  viewList: boolean;
  text: string = '';

  pageIndex: number = 0;
  pageSize: number = 3;
  lowValue: number = 0;
  highValue: number = 3;
  renderPage: boolean;

  paginazione = new Paginazione();

  isDevice: boolean;
  showCarica = true;


  constructor(private titleService:Title,private cd: ChangeDetectorRef,private cs: CorsoServiceService, private route: Router, private ds: DelegateServiceService,private deviceService: DeviceDetectorService) { 
    
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
    this.titleService.setTitle('Ilmiocodice.com');
    this.ds.reset();
    this.ds.updatePage(this.PAGE);
    this.isDevice = this.deviceService.isMobile();
    clearJWTTOKEN(this.route);
    localStorage.removeItem('CORSO');
    localStorage.removeItem('LEZIONE');
    this.paginazione.pagina = 0;
    this.paginazione.numeroPerPagina = 2;
    this.getCorsi();

    this.cs._sbjFilterCorsi.asObservable().subscribe(next => {
      this.listaCorsiFiltered = next;
    })

    this.cs._sbjUpdateCorsi.asObservable().subscribe(next => {
      this.listaCorsiBase = next;
      this.listaCorsiFiltered = [];
      this.cd.markForCheck();
    })

    
  }

  private getCorsi() {
    this.cs.getAllPaginata(this.paginazione).subscribe(next => {
      this.ds.updateSpinner(false);
      this.listaCorsiBase = next.list;
      this.cs.listaCorsi = next.list;
      //this.cs._sbjUpdateCorsi.next(next.list);
      this.renderPage = true;

      if(this.listaCorsiBase && this.paginazione.numeroPerPagina < this.listaCorsiBase[0].totOccurrences )   {
        this.showCarica = true
      } else {
        this.showCarica = false
      }

    }, error => {
      this.ds.updateSpinner(false);
      this.ds.updateResultService(error.status);
    });
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
  

  carica() {
  //In chrome and some browser scroll is given to body tag

  // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    
      this.paginazione.numeroPerPagina = this.paginazione.numeroPerPagina +1;
      if(this.listaCorsiBase && this.paginazione.numeroPerPagina <= this.listaCorsiBase[0].totOccurrences )   {
        this.getCorsi();
      } else {
        this.showCarica = false
      }

   
  }

  retrieveType(type: Dominio){
    this.cd.markForCheck();
    console.log('TOT CORSI TYPE RETRIEVED :' + type.corsi.length )
    this.listaCorsiBase.forEach(defaultType => {
      if(defaultType.id === type.id){
        defaultType.corsi = type.corsi
        // type.corsi.forEach(retrievedCoorso => {
        //   defaultType.corsi.push(retrievedCoorso)
        // })
      }
    })
    this.cs._sbjUpdateCorsi.next(this.listaCorsiBase)
    this.listaCorsiBase.forEach(defaultType => {
      console.log('TOT CORSI ' + defaultType.descrizione + ' : ' + defaultType.corsi.length )
    })
  }

}
