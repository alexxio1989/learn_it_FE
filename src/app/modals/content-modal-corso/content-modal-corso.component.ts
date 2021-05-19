import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Corso } from 'src/app/model/Corso';
import { Dominio } from 'src/app/model/Dominio';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { isEmptyString,getUserLS, readFile } from 'src/app/utils/Util';

@Component({
  selector: 'app-content-modal-corso',
  templateUrl: './content-modal-corso.component.html',
  styleUrls: ['./content-modal-corso.component.css']
})
export class ContentModalCorsoComponent implements OnInit {

 
  corso = new Corso();

  tipoCorso: Dominio;
  tipoCorsoList = []
  enableCorsoAPagamento: boolean;

  newType: Dominio = new Dominio();

  isShowSaveTipo: boolean;
  isShowSaveSubTipo: boolean;

  addDescrizione: boolean;

  ngOnInit(): void {
    this.tipoCorsoList = this.cs.tipoCorsoList;
    if(this.tipoCorsoList === undefined || this.tipoCorsoList === null || this.tipoCorsoList.length === 0){

      if(localStorage.getItem('TYPES') !== undefined && localStorage.getItem('TYPES') !== null){
        this.tipoCorsoList = JSON.parse(localStorage.getItem('TYPES'));
      } else {
  
        this.cs.getOBSTypes().subscribe(next => {
          this.tipoCorsoList = next.list;
    
          localStorage.setItem('TYPES' , JSON.stringify(this.tipoCorsoList));
          this.cs.tipoCorsoList = next.list;
          this.ds.updateTipiCorso(next.list);
        })
      }
    }
    if(this.cs.corsoSelected !== undefined && this.cs.corsoSelected !== null){
      this.corso = this.cs.corsoSelected;
      this.tipoCorso = this.corso.tipo;
    } else {
      this.corso.colorCard = '##dddddd';
    }
    let utente = getUserLS();
    this.enableCorsoAPagamento = utente !== undefined && utente !== null && ( 'SU' === utente.tipo.codice || ('W' === utente.tipo.codice && !utente.enablePayments.error && !utente.accountStripeStatus.error))
  }

  closeResult = '';

  constructor(private modalService: NgbModal , private cs: CorsoServiceService , private ds: DelegateServiceService) {
    this.ds.getOBSTipiCorso().subscribe(next => {
      this.tipoCorsoList = next;
    })
  }


  get disableSave(){
    return this.corso.id === undefined || this.corso.id === 0 ? isEmptyString(this.corso.nomeCorso) : isEmptyString(this.corso.nomeCorso);
  }

  get labelTipoCorso(){
    return (this.tipoCorso === undefined || this.tipoCorso.codice === '') ? 'Scegli la tipologia di tutorial' : this.tipoCorso.descrizione;
  }


  salva() {

    if(this.corso.id === undefined || this.corso.id === 0 ){

      this.corso.tipo = this.tipoCorso;
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
    this.corso.tipo = obj;
    this.tipoCorso = obj;
  }

 

  changeShowSaveTipo() {
    this.isShowSaveTipo = !this.isShowSaveTipo;
  }

  changeShowSaveSubTipo() {
    this.isShowSaveSubTipo = !this.isShowSaveSubTipo;
  }

  openInput(){ 
    document.getElementById("fileInput").click();
  }

  retrieveImg(base64:string){
    this.corso.image = base64;

  }

}
