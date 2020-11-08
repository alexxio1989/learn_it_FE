import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CorsoServiceService } from 'src/app/corso-service.service';
import { Corso } from 'src/app/model/Corso';
import { Dominio } from 'src/app/model/Dominio';
import { isEmptyString } from 'src/app/utils/Util';

@Component({
  selector: 'app-modal-corso-edit',
  templateUrl: './modal-corso-edit.component.html',
  styleUrls: ['./modal-corso-edit.component.css']
})
export class ModalCorsoEditComponent implements OnInit {

  @Input() corso: Corso;
  @Output() corsoEdited = new EventEmitter<Corso>();


  ngOnInit(): void {}

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
    return isEmptyString(this.corso.nomeCorso) || isEmptyString(this.corso.descrizioneCorso);
  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {     
      this.corsoEdited.emit(this.corso);
      this.closeResult = `Closedddd with: ${result}`;
    });
  }


}
