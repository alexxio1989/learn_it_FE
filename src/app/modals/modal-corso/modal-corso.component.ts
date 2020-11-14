import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Corso } from 'src/app/model/Corso';
import { Dominio } from 'src/app/model/Dominio';
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
  tipoCorsoList = []

  ngOnInit(): void {
  }

  closeResult = '';

  constructor(private modalService: NgbModal , private cs: CorsoServiceService , private ds: DelegateServiceService) {
    this.cs.getOBSTypes().subscribe(next => {
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
    return isEmptyString(this.nomeCorso) || isEmptyString(this.descCorso) || (this.tipoCorso === undefined || this.tipoCorso.codice === '');
  }

  get labelTipoCorso(){
    return (this.tipoCorso === undefined || this.tipoCorso.codice === '') ? 'Scegli il tipo di corso' : 'Tipologia del corso : ' + this.tipoCorso.descrizione;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      let corso = new Corso();
      corso.nomeCorso = this.nomeCorso;
      corso.descrizioneCorso = this.descCorso;
      corso.tipo = this.tipoCorso;
      corso.owner = this.cs.user;
      this.cs.getOBSInsertCorso(corso).subscribe(next => {
        this.ds.updateSpinner(false);
        this.ds.updateResultService('Inserimento corso avvenuta con successo');
        this.cs.updateCorsi(next);
      });
    });
  }

  changeTipoCorso(obj: Dominio) {
    this.tipoCorso = obj;
  }

}
