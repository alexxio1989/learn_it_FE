import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Corso } from 'src/app/model/Corso';
import { Dominio } from 'src/app/model/Dominio';
import { SubDominio } from 'src/app/model/SubDominio';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { isEmptyString,getUserLS, readFile } from 'src/app/utils/Util';

@Component({
  selector: 'app-content-modal-corso',
  templateUrl: './content-modal-corso.component.html',
  styleUrls: ['./content-modal-corso.component.css']
})
export class ContentModalCorsoComponent implements OnInit {

  @ViewChild('myCanvas')
  myCanvas: ElementRef<HTMLCanvasElement>;
  corso = new Corso();

  tipoCorso: Dominio;
  subTipo: SubDominio;
  tipoCorsoList = []
  enableCorsoAPagamento: boolean;

  newType: Dominio = new Dominio();
  newSubType: SubDominio = new SubDominio();

  isShowSaveTipo: boolean;
  isShowSaveSubTipo: boolean;

  addDescrizione: boolean;

  ngOnInit(): void {
    this.tipoCorsoList = this.cs.tipoCorsoList;
    if(this.cs.corsoSelected !== undefined && this.cs.corsoSelected !== null){
      this.corso = this.cs.corsoSelected;
    } else {
      this.corso.colorCard = '#ffc400';
    }
    let utente = getUserLS();
    this.enableCorsoAPagamento = utente !== undefined && utente !== null && ( 'SU' === utente.tipo.codice || 'WF' === utente.tipo.codice )
  }

  closeResult = '';

  constructor(private modalService: NgbModal , private cs: CorsoServiceService , private ds: DelegateServiceService) {
    this.ds.getOBSTipiCorso().subscribe(next => {
      this.tipoCorsoList = next;
    })
  }


  get disableSave(){
    return this.corso.id === undefined || this.corso.id === 0 ? isEmptyString(this.corso.nomeCorso)  || (this.subTipo === undefined || this.subTipo.codice === '') : isEmptyString(this.corso.nomeCorso);
  }

  get labelTipoCorso(){
    return (this.tipoCorso === undefined || this.tipoCorso.codice === '') ? 'Scegli la tipologia di tutorial' : this.tipoCorso.descrizione;
  }

  get labelSubTipoCorso(){
    return (this.subTipo === undefined || this.subTipo.codice === '') ? 'Scegli il sotto tipo di tutorial' : this.subTipo.descrizione;
  }

  salva() {

    if(this.corso.id === undefined || this.corso.id === 0 ){

      this.corso.tipo = this.subTipo;
      this.corso.owner = JSON.parse(localStorage.getItem('USER'));
      this.cs.getOBSInsertCorso(this.corso).subscribe(next => {
        this.ds.updateSpinner(false);
        this.ds.updateResultService("Corso salvato correttamente");
        this.cs.updateCorsi(next.list);
        this.ds.updateSideBar(false);
      },error => {
        this.ds.updateSpinner(false);
        this.ds.updateResultService("Errore durante la creazione del corso");
      });
    } else {
      this.cs.getOBSUpdateCorso(this.corso).subscribe(next => {
        this.ds.updateSpinner(false);
        this.ds.updateResultService("Corso modificato correttamente");
        this.cs.updateCorsi(next.list);
        this.ds.updateSideBar(false);
      },error => {
        this.ds.updateSpinner(false);
        this.ds.updateResultService("Errore durante la modifica del corso");
      });
    }
   
    
  }

  changeTipoCorso(obj: Dominio) {
    this.subTipo = undefined;
    this.tipoCorso = obj;
  }

  changeSubTipoCorso(obj: SubDominio) {
    this.subTipo = obj;
  }

  changeShowSaveTipo() {
    this.isShowSaveTipo = !this.isShowSaveTipo;
  }

  changeShowSaveSubTipo() {
    this.isShowSaveSubTipo = !this.isShowSaveSubTipo;
  }

  salvaTipo(){
    console.log(this.newType.descrizione);
    this.ds.updateSpinner(true);
    this.cs.getOBSInsertTypes(this.newType).subscribe(next => {
      this.tipoCorsoList = next.list;
      this.ds.updateResultService(next.status);
      this.ds.updateSpinner(false);
      this.ds.updateTipiCorso(next.list);
      this.changeShowSaveTipo();
    },error =>{
      this.ds.updateResultService("Inserimento tipo in errore");
      this.ds.updateSpinner(false);
    })
  }

  salvaSubTipo(){
    console.log(this.newSubType.descrizione);
    this.newSubType.idPadre = this.tipoCorso.id;
    this.ds.updateSpinner(true);
    this.cs.getOBSInsertSubTypes(this.newSubType).subscribe(next => {
      this.tipoCorsoList = next.list;
      this.ds.updateResultService(next.status);
      this.ds.updateSpinner(false);
      this.ds.updateTipiCorso(next.list);
      this.changeShowSaveSubTipo();
    },error =>{
      this.ds.updateResultService("Inserimento sotto tipo in errore");
      this.ds.updateSpinner(false);
    })
  }

  openInput(){ 
    document.getElementById("fileInput").click();
  }

  fileChange(event:any){
    const file = event.target.files[0];
    readFile(file).then(img => {
     
      var ctx = this.myCanvas.nativeElement.getContext("2d");
          if(ctx !== null){

            
            
            ctx.drawImage(img, 0, 0);
        
            
            var MAX_HEIGHT = 140;
            var width = img.width;
            var height = img.height;
        
           
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
           
            this.myCanvas.nativeElement.width = width;
            this.myCanvas.nativeElement.height = height;
        
            ctx.drawImage(img, 0, 0, width, height);
        
            const canvas = this.myCanvas.nativeElement;
            console.log("WIDTH : " + canvas.width);
            console.log("HEIGHT : " + canvas.height);
            var dataurl = canvas.toDataURL("image/png");
            this.corso.image = dataurl;
            console.log(dataurl);
          }
    });

  }

}
