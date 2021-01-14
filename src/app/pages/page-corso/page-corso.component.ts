import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lezione } from 'src/app/model/Lezione';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { getUserLS, isEmptyArray, isEmptyString, isNotEmptyArray, isSameUser } from 'src/app/utils/Util';
import { Corso } from '../../model/Corso';

@Component({
  selector: 'app-page-corso',
  templateUrl: './page-corso.component.html',
  styleUrls: ['./page-corso.component.css']
})
export class PageCorsoComponent implements OnInit {

  corso: Corso = new Corso();

  isEmptyLezioni: boolean;

  lezione: Lezione;

  showFeeds: boolean;


  constructor(private cs: CorsoServiceService , private route: Router , private ds: DelegateServiceService,private ar: ActivatedRoute) { } 

  get isUtenteLogged(): boolean{
    return isSameUser(getUserLS(),this.corso.owner);
  }

  ngOnInit(): void {
    this.ar.queryParams.subscribe(params => {

      let id = params['id'];
      let corso = JSON.parse(localStorage.getItem('CORSO'));
      if(id !== undefined && id !== null && id > 0){

        if(corso !== undefined && corso !== null ){
          this.corso = corso;
        } else {
          this.cs.getOBSGetCorso(id).subscribe(next => {
            this.corso = next.obj;
            this.ds.updateResultService("Recupero corso avvenuto con successo");
            this.ds.updateSpinner(false);
          },error=> {
            this.ds.updateResultService("Recupero corso in errore");
            this.ds.updateSpinner(false);
          })

        }
        
       
      
        this.isEmptyLezioni = isEmptyArray(this.corso.lezioni);

      } else {
        this.route.navigate(['/']);
      }


    });
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
