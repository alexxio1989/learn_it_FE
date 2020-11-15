import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Corso } from 'src/app/model/Corso';
import { Lezione } from 'src/app/model/Lezione';
import { Paragrafo } from 'src/app/model/Paragrafo';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { LezioneServiceService } from 'src/app/services/lezione-service.service';
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



  constructor(private cs: CorsoServiceService ,private ls: LezioneServiceService , private route: Router) { }

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

  newParagrafo(paragrafo: Paragrafo){
    this.lezione.listaParagrafi.push(paragrafo);
  }


}
