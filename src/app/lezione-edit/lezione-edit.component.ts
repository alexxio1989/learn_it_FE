import { Component, OnInit , Input ,Output, EventEmitter} from '@angular/core';
import { Lezione } from '../model/Lezione';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-lezione-edit',
  templateUrl: './lezione-edit.component.html',
  styleUrls: ['./lezione-edit.component.css']
})
export class LezioneEditComponent implements OnInit {

  @Input() lezione: Lezione;
  @Output() edit =  new EventEmitter<Lezione>();

  lezioneContent = '';

  constructor() { }

  ngOnInit(): void {
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

  salva(){
    console.log("lezione salvata")
    this.edit.emit(this.lezione);
  }

}
