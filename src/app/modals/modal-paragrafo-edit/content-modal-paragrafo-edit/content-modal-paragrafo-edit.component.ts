import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Paragrafo } from 'src/app/model/Paragrafo';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { ParagrafoServiceService } from 'src/app/services/paragrafo-service.service';

@Component({
  selector: 'app-content-modal-paragrafo-edit',
  templateUrl: './content-modal-paragrafo-edit.component.html',
  styleUrls: ['./content-modal-paragrafo-edit.component.css']
})
export class ContentModalParagrafoEditComponent implements OnInit {

  paragrafo: Paragrafo;
  
  ngOnInit(): void {
    this.paragrafo = this.ps.paragrafoSelected;
  }

  constructor(private ps: ParagrafoServiceService,private ds: DelegateServiceService) {}

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

  salva() {
      this.ps.getOBSUpdateParagrafo(this.ps.paragrafoSelected).subscribe(next => {
        this.ds.updateSpinner(false);
        this.ds.updateResultService('Modifica paragrafo avvenuta con successo');
        this.ps.updateParagrafi(next);
      }); 
  }

}