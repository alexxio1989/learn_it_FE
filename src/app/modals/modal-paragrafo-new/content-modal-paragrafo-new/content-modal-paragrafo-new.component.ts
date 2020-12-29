import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Paragrafo } from 'src/app/model/Paragrafo';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { LezioneServiceService } from 'src/app/services/lezione-service.service';
import { ParagrafoServiceService } from 'src/app/services/paragrafo-service.service';

@Component({
  selector: 'app-content-modal-paragrafo-new',
  templateUrl: './content-modal-paragrafo-new.component.html',
  styleUrls: ['./content-modal-paragrafo-new.component.css']
})
export class ContentModalParagrafoNewComponent implements OnInit {

  
  titolo: string = '';
  testo: string = '';
  
  ngOnInit(): void {
  }

  constructor( private ps: ParagrafoServiceService,private ds: DelegateServiceService,private ls: LezioneServiceService) {}

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

  save() {
      let paragrafo = new Paragrafo();
      paragrafo.titolo = this.titolo;
      paragrafo.content = this.testo;
      paragrafo.idlezione = this.ls.lezioneSelected.id;
      this.ps.getOBSInsertParagrafo(paragrafo).subscribe(next => {
        this.ds.updateSpinner(false);
        this.ds.updateResultService(next.status);
        this.ps.updateParagrafi(next.list);
      } , error => {
        this.ds.updateSpinner(false);
        this.ds.updateResultService(error.status);
      }); 
  }

}
