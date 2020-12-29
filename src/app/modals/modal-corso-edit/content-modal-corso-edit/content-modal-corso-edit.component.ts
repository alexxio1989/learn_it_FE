import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Corso } from 'src/app/model/Corso';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { isEmptyString } from 'src/app/utils/Util';

@Component({
  selector: 'app-content-modal-corso-edit',
  templateUrl: './content-modal-corso-edit.component.html',
  styleUrls: ['./content-modal-corso-edit.component.css']
})
export class ContentModalCorsoEditComponent implements OnInit {

  corso: Corso;

  aPagamento: boolean;

  ngOnInit(): void {
    this.corso = this.cs.corsoSelected;
    this.aPagamento = this.corso.prezzo > 0;
  }

  closeResult = ''; 

  constructor(private cs: CorsoServiceService , private ds: DelegateServiceService) {}

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

  get disableSave(){
    return isEmptyString(this.corso.nomeCorso) || isEmptyString(this.corso.descrizioneCorso);
  }


  salva() {
      this.cs.getOBSUpdateCorso(this.corso).subscribe(next => {
        this.ds.updateSpinner(false);
        this.ds.updateResultService(next.status);
        this.cs.updateCorsi(next.list);
      },error => {
        this.ds.updateSpinner(false);
        this.ds.updateResultService(error.status);
      });   
  }

  fileChange(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.corso.image = reader.result as string;
    };
  }

}
