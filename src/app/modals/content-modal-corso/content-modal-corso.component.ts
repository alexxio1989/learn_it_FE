import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Corso } from 'src/app/model/Corso';
import { Dominio } from 'src/app/model/Dominio';
import { SubDominio } from 'src/app/model/SubDominio';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { isEmptyString,getUserLS } from 'src/app/utils/Util';

@Component({
  selector: 'app-content-modal-corso',
  templateUrl: './content-modal-corso.component.html',
  styleUrls: ['./content-modal-corso.component.css']
})
export class ContentModalCorsoComponent implements OnInit {

  corso = new Corso();

  tipoCorso: Dominio;
  subTipo: SubDominio;
  tipoCorsoList = []
  enableCorsoAPagamento: boolean;

  newType: Dominio = new Dominio();
  newSubType: SubDominio = new SubDominio();

  isShowSaveTipo: boolean;
  isShowSaveSubTipo: boolean;

  ngOnInit(): void {
    this.tipoCorsoList = this.cs.tipoCorsoList;
    if(this.cs.corsoSelected !== undefined && this.cs.corsoSelected !== null){
      this.corso = this.cs.corsoSelected;
    } else {
      this.corso.colorCard = '#8cb8e0';
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
    return (this.tipoCorso === undefined || this.tipoCorso.codice === '') ? 'Scegli il tipo di corso' : this.tipoCorso.descrizione;
  }

  get labelSubTipoCorso(){
    return (this.subTipo === undefined || this.subTipo.codice === '') ? 'Scegli il sotto tipo di corso' : this.subTipo.descrizione;
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

  fileChange(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.corso.image = reader.result as string;
      console.log(this.corso.image);
    };
  }

}
