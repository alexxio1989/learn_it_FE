import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Corso } from 'src/app/model/Corso';
import { Dominio } from 'src/app/model/Dominio';
import { SubDominio } from 'src/app/model/SubDominio';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { isEmptyString } from 'src/app/utils/Util';

@Component({
  selector: 'app-modal-corso',
  templateUrl: './modal-corso.component.html',
  styleUrls: ['./modal-corso.component.css']
})
export class ModalCorsoComponent implements OnInit {

  nomeCorso: string = '';
  descCorso: string = '';
  tipoCorso: Dominio;
  subTipo: SubDominio;
  tipoCorsoList = []

  newType: Dominio = new Dominio();
  newSubType: SubDominio = new SubDominio();

  isShowSaveTipo: boolean;
  isShowSaveSubTipo: boolean;

  ngOnInit(): void {
    this.tipoCorsoList = this.cs.tipoCorsoList;
  }

  closeResult = '';

  constructor(private modalService: NgbModal , private cs: CorsoServiceService , private ds: DelegateServiceService) {
    this.ds.getOBSTipiCorso().subscribe(next => {
      this.tipoCorsoList = next;
    })
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  get disableSave(){
    return isEmptyString(this.nomeCorso) || isEmptyString(this.descCorso) || (this.subTipo === undefined || this.subTipo.codice === '');
  }

  get labelTipoCorso(){
    return (this.tipoCorso === undefined || this.tipoCorso.codice === '') ? 'Scegli il tipo di corso' : this.tipoCorso.descrizione;
  }

  get labelSubTipoCorso(){
    return (this.subTipo === undefined || this.subTipo.codice === '') ? 'Scegli il tipo di corso' : this.subTipo.descrizione;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      let corso = new Corso();
      corso.nomeCorso = this.nomeCorso;
      corso.descrizioneCorso = this.descCorso;
      corso.tipo = this.subTipo;
      corso.owner = JSON.parse(localStorage.getItem('USER'));
      this.cs.getOBSInsertCorso(corso).subscribe(next => {
        this.ds.updateSpinner(false);
        this.ds.updateResultService('Inserimento corso avvenuta con successo');
        this.cs.updateCorsi(next);
        this.ds.updateSideBar(false);
      },error => {
        this.ds.updateSpinner(false);
        this.ds.updateResultService('Inserimento corso in errore');
      });
    });
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
      this.tipoCorsoList = next.tipi;
      this.ds.updateResultService(next.esito);
      this.ds.updateSpinner(false);
      this.ds.updateTipiCorso(next.tipi);
      this.changeShowSaveTipo();
    },error =>{
      this.ds.updateResultService("Inserimento tipo in errore");
    })
  }

  salvaSubTipo(){
    console.log(this.newSubType.descrizione);
    this.newSubType.idPadre = this.tipoCorso.id;
    this.ds.updateSpinner(true);
    this.cs.getOBSInsertSubTypes(this.newSubType).subscribe(next => {
      this.tipoCorsoList = next.tipi;
      this.ds.updateResultService(next.esito);
      this.ds.updateSpinner(false);
      this.ds.updateTipiCorso(next.tipi);
      this.changeShowSaveSubTipo();
    },error =>{
      this.ds.updateResultService("Inserimento sotto tipo in errore");
    })
  }

}
