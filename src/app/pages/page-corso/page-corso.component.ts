import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lezione } from 'src/app/model/Lezione';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { isEmptyArray, isEmptyString, isNotEmptyArray } from 'src/app/utils/Util';
import { Corso } from '../../model/Corso';

@Component({
  selector: 'app-page-corso',
  templateUrl: './page-corso.component.html',
  styleUrls: ['./page-corso.component.css']
})
export class PageCorsoComponent implements OnInit {

  corso: Corso;

  isEmptyLezioni: boolean;

  lezione: Lezione;

  showFeeds: boolean;


  constructor(private cs: CorsoServiceService , private route: Router) { }

  ngOnInit(): void {
    this.corso = this.cs.corsoSelected;
    if(this.corso === undefined || this.corso.nomeCorso === ''){
      this.route.navigate(['/']);
    } else {
      this.isEmptyLezioni = isEmptyArray(this.corso.lezioni);
    }
  }

  addLezione(){
    this.lezione = new Lezione;
    this.lezione.idCorso = this.corso.id;
    this.lezione.indexLezione = this.corso.lezioni.length + 1;
    this.corso.lezioni.push(this.lezione);
  }

  get getMediumFeeds(){
    
    let count = this.corso.feeds.reduce(function (s, a) {
      return s + a.feed;
    }, 0);

    return count / this.corso.feeds.length;
  }

  changeView(){
    this.showFeeds = !this.showFeeds;
  }

  changeListLezioni(lezioni: Lezione[]){
    this.corso.lezioni = lezioni;
  }

}
