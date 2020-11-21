import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Corso } from 'src/app/model/Corso';
import { Lezione } from 'src/app/model/Lezione';
import { Paragrafo } from 'src/app/model/Paragrafo';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { LezioneServiceService } from 'src/app/services/lezione-service.service';
import { ParagrafoServiceService } from 'src/app/services/paragrafo-service.service';
import { getUserLS, isSameUser } from 'src/app/utils/Util';

@Component({
  selector: 'app-page-lezione',
  templateUrl: './page-lezione.component.html',
  styleUrls: ['./page-lezione.component.css']
})
export class PageLezioneComponent implements OnInit {

  edit: boolean;
  lezione: Lezione;
  corso: Corso;



  constructor(private ds: DelegateServiceService , private cs: CorsoServiceService ,private ls: LezioneServiceService , private route: Router , private ps: ParagrafoServiceService) {
    this.ps.getOBSADDParagrafi().subscribe(next => {
      this.lezione.listaParagrafi = next;
    })
  }

  get isUtenteLogged(): boolean{
    return isSameUser(getUserLS(),this.corso.owner);
  }

  ngOnInit(): void {
    this.lezione = this.ls.lezioneSelected;
    this.corso = this.cs.corsoSelected;
    if(this.lezione === undefined || this.lezione.title === ''){
      this.route.navigate(['/']);
    }
  }

  editingLezione(lezione :Lezione){
    this.lezione = lezione;
    this.edit = false;
  }

  elimina(paragrafo: Paragrafo){
    this.ps.getOBSDeleteParagrafo(paragrafo).subscribe(next => {
      this.lezione.listaParagrafi = next;
      this.ds.updateResultService("Eliminazione paragrafo avvenuta con successo");
      this.ds.updateSpinner(false);
    })
  }

}
