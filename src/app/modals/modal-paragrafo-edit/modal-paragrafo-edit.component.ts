import { Component, Input, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CorsoServiceService } from 'src/app/corso-service.service';
import { Paragrafo } from 'src/app/model/Paragrafo';

@Component({
  selector: 'app-modal-paragrafo-edit',
  templateUrl: './modal-paragrafo-edit.component.html',
  styleUrls: ['./modal-paragrafo-edit.component.css']
})
export class ModalParagrafoEditComponent implements OnInit {

  @Input() paragrafo: Paragrafo;

  
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
      this.cs.getOBSUpdateParagrafo(this.paragrafo).subscribe(); 
    });
  }

}
