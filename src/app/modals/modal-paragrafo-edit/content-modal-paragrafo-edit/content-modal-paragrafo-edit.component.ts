import { Component, OnInit } from '@angular/core';
import { Code } from 'src/app/model/Code';
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


  salva() {
      this.ps.getOBSUpdateParagrafo(this.ps.paragrafoSelected).subscribe(next => {
        this.ds.updateSpinner(false);
        this.ds.updateResultService(next.status);
        this.ps.updateParagrafi(next.list);
      },error => {
        this.ds.updateSpinner(false);
        this.ds.updateResultService(error.status);
      }); 
  }

  addCodice(){
    let code = new Code();
    code.newCode = true;
    this.paragrafo.codes.push(code);
  }

}
