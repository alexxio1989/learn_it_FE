import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Code } from 'src/app/model/Code';
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
  subTitolo: string = '';
  testo: string = '';
  codes: Code[] = [];

  isTextArea: boolean = true;
  
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
      paragrafo.subTitolo = this.subTitolo;
      paragrafo.content = this.testo;
      paragrafo.codes = this.codes;
      let lezioneSelected;

      let lezioneSelectedLS = JSON.parse(localStorage.getItem('LEZIONE'));
      if(this.ls.lezioneSelected !== undefined){
        lezioneSelected = this.ls.lezioneSelected
      } else if(lezioneSelectedLS !== undefined){
        lezioneSelected = lezioneSelectedLS;
      }
      paragrafo.idlezione = lezioneSelected.id;
      this.ps.getOBSInsertParagrafo(paragrafo).subscribe(next => {
        this.ds.updateSpinner(false);
        this.ds.updateResultService(next.status);
        this.ps.updateParagrafi(next.list);
      } , error => {
        this.ds.updateSpinner(false);
        this.ds.updateResultService(error.status);
      }); 
  }

  addCodice(){
    let code = new Code();
    code.newCode = true;
    this.codes.push(code);
  }

}
