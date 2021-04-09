import { Component, OnInit } from '@angular/core';
import { ContentModalCorsoComponent } from 'src/app/modals/content-modal-corso/content-modal-corso.component';
import { ModalRichiestaComponent } from 'src/app/modals/modal-richiesta/modal-richiesta.component';
import { User } from 'src/app/model/User';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { MatDialog } from '@angular/material/dialog';
import { getUserLS } from 'src/app/utils/Util';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
  
  utente: User;
  isUtenteLogged: boolean;
  isSuperUser: boolean;
  isUser: boolean;
  isRichiedente: boolean;
  isWriter: boolean;
  modalRichiestaComponent = ModalRichiestaComponent;
  modalCorsoComponent = ContentModalCorsoComponent; 
  component: any;

  constructor(private ds: DelegateServiceService,public dialog: MatDialog) {
    this.ds.getOBSUser().subscribe(next => {
      this.utente = next;
      this.setRoles();
    })
  }

  private setRoles() {
    this.isUtenteLogged = this.utente !== null && this.utente !== undefined;
    this.isSuperUser = this.utente !== null && this.utente !== undefined && this.utente.tipo.codice === "SU";
    this.isUser = this.utente !== null && this.utente !== undefined && this.utente.tipo.codice === "U";
    this.isRichiedente = this.utente !== null && this.utente !== undefined && this.utente.tipo.codice === "R";
    this.isWriter = this.utente !== null && this.utente !== undefined && this.utente.tipo.codice === "W";
  }

  ngOnInit(): void {
    this.utente = getUserLS();
  }

  add(){
    this.setRoles();
    this.component = undefined;
    if(!this.isUtenteLogged){
      this.ds.updateOpenLogin(true);
    } else if(this.isUser){
      this.component = this.modalRichiestaComponent;
    } else {
      this.component = this.modalCorsoComponent;
    }

    if(this.component !== undefined){
      const dialogRef = this.dialog.open(this.component, {
       
        width: '600px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });

    }
  }

}
