import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lezione } from 'src/app/model/Lezione';
import { isEmptyArray, isEmptyString, isNotEmptyArray } from 'src/app/utils/Util';
import { CorsoServiceService } from '../../corso-service.service';
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
    this.lezione.indexArray = this.corso.lezioni.length + 1;
    this.corso.lezioni.push(this.lezione);
  }

}