import { Component, OnInit } from '@angular/core';
import { Corso } from 'src/app/model/Corso';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { isEmptyString ,getUserLS } from 'src/app/utils/Util';

@Component({
  selector: 'app-content-modal-corso-edit',
  templateUrl: './content-modal-corso-edit.component.html',
  styleUrls: ['./content-modal-corso-edit.component.css']
})
export class ContentModalCorsoEditComponent implements OnInit {

  corso: Corso;

  aPagamento: boolean;
  enableCorsoAPagamento: boolean;

  ngOnInit(): void {
    this.corso = this.cs.corsoSelected;
    this.aPagamento = this.corso.prezzo > 0;
    let utente = getUserLS();
    this.enableCorsoAPagamento = utente !== undefined && utente !== null && ( 'SU' === utente.tipo.codice || 'WF' === utente.tipo.codice )
  }

  closeResult = ''; 

  constructor(private cs: CorsoServiceService , private ds: DelegateServiceService) {}


  get disableSave(){
    return isEmptyString(this.corso.nomeCorso) 
  }


  salva() {
      this.cs.getOBSUpdateCorso(this.corso).subscribe(next => {
        this.ds.updateSpinner(false);
        this.ds.updateResultService("Corso modificato correttamente");
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
