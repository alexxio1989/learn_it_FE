import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lezione } from 'src/app/model/Lezione';
import { Paragrafo } from 'src/app/model/Paragrafo';
import { LezioneServiceService } from 'src/app/services/lezione-service.service';

@Component({
  selector: 'app-page-lezione',
  templateUrl: './page-lezione.component.html',
  styleUrls: ['./page-lezione.component.css']
})
export class PageLezioneComponent implements OnInit {

  edit: boolean;
  lezione: Lezione;



  constructor(private ls: LezioneServiceService , private route: Router) { }

  ngOnInit(): void {
    this.lezione = this.ls.lezioneSelected;
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
