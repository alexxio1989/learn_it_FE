import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { CorsoServiceService } from 'src/app/corso-service.service';
import { Corso } from 'src/app/model/Corso';
import { Dominio } from 'src/app/model/Dominio';
import { isEmptyString } from 'src/app/utils/Util';

@Component({
  selector: 'app-modal-corso',
  templateUrl: './modal-corso.component.html',
  styleUrls: ['./modal-corso.component.css']
})
export class ModalCorsoComponent implements OnInit {

  @Input() tipoCorsoList;

  nomeCorso: string = '';
  descCorso: string = '';
  tipoCorso: Dominio;

  ngOnInit(): void {
  }

  closeResult = '';

  constructor(private modalService: NgbModal , private cs: CorsoServiceService) {}

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
      this.cs.getOBSInsertCorso(corso).subscribe(res => {
        this.cs.updateCorsi(res);
      });
      this.closeResult = `Closedddd with: ${result}`;
    });
  }




  changeTipoCorso(obj: Dominio) {
    this.tipoCorso = obj;
  }

  changeNomeCorso(value: string) {
    this.nomeCorso = value;
  }


}
