import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Lezione } from 'src/app/model/Lezione';
import { Paragrafo } from 'src/app/model/Paragrafo';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { ParagrafoServiceService } from 'src/app/services/paragrafo-service.service';

@Component({
  selector: 'app-modal-paragrafo-new',
  templateUrl: './modal-paragrafo-new.component.html',
  styleUrls: ['./modal-paragrafo-new.component.css']
})
export class ModalParagrafoNewComponent implements OnInit {

  @Output() newParagrafo = new EventEmitter<Paragrafo>();
  @Input() lezione: Lezione;

  titolo: string = '';
  testo: string = '';
  
  ngOnInit(): void {
  }

  constructor(private modalService: NgbModal , private ps: ParagrafoServiceService,private ds: DelegateServiceService) {}

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

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => { 
      let paragrafo = new Paragrafo();
      paragrafo.titolo = this.titolo;
      paragrafo.content = this.testo;
      paragrafo.idlezione = this.lezione.id;
      this.ps.getOBSInsertParagrafo(paragrafo).subscribe(next => {
        this.ds.updateSpinner(false);
        this.ds.updateResultService('Inserimento avvenuto con successo');
        this.newParagrafo.emit(paragrafo);
      }); 
    });
  }

}
