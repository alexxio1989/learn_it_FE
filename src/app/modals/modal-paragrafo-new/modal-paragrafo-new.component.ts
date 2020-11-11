import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CorsoServiceService } from 'src/app/corso-service.service';
import { Lezione } from 'src/app/model/Lezione';
import { Paragrafo } from 'src/app/model/Paragrafo';

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

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => { 
      let paragrafo = new Paragrafo();
      paragrafo.titolo = this.titolo;
      paragrafo.content = this.testo;
      paragrafo.idlezione = this.lezione.id;
      this.cs.getOBSInsertParagrafo(paragrafo).subscribe(); 
      this.newParagrafo.emit(paragrafo);
    });
  }

}
