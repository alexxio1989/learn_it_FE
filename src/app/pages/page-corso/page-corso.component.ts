import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lezione } from 'src/app/model/Lezione';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { LezioneServiceService } from 'src/app/services/lezione-service.service';
import { getUserLS, isEmptyArray, isEmptyString, isNotEmptyArray, isSameUser } from 'src/app/utils/Util';
import { Corso } from '../../model/Corso';
import { IPageCore } from '../IPageCore';

@Component({
  selector: 'app-page-corso',
  templateUrl: './page-corso.component.html',
  styleUrls: ['./page-corso.component.css']
})
export class PageCorsoComponent implements OnInit, IPageCore {
 
  public PAGE = 'CORSO';

  corso: Corso = new Corso();

  isEmptyLezioni: boolean;

  lezione: Lezione;

  showFeeds: boolean;

  renderPage: boolean;

  called = false;

  constructor(private fs: FeedbackService,private ls: LezioneServiceService , private cs: CorsoServiceService, private route: Router, private ds: DelegateServiceService, private ar: ActivatedRoute) {
    this.ds.getOBSSpinner().subscribe(next => {
      this.renderPage = !next;
    })

    this.ls.getOBSUpdateLezioni().subscribe(next => {
      this.corso.lezioni = next;
    })

    this.fs.getOBS().subscribe(next => {
      this.corso.feeds = next;
    })
  }

  get isUtenteLogged(): boolean {
    return isSameUser(getUserLS(), this.corso.owner);
  }

  ngOnInit(): void {
    this.ds.updatePage('CORSO');
    this.ar.queryParams.subscribe(params => {

      let id = params['id'];

      if (id !== undefined && id !== null && parseInt(id) > 0) {
        this.ds.getOBSAbilitaNavigazione().subscribe(next => {
          if(next === this.PAGE){
            this.retrieveCorso(id);
          }
        })
        this.ds.page = this.PAGE;
        this.ds.checkUserLogged(this.PAGE);

      } else {
        this.route.navigate(['/']);
      }





    });
  }

  private retrieveCorso(id: any) {
    if(!this.called){

      this.called = true;
      this.cs.getOBSGetCorso(id).subscribe(next => {
        this.corso = next.obj;
        this.ds.updateResultService("Recupero corso avvenuto con successo");
        this.ds.updateSpinner(false);
        this.renderPage = true;
      }, error => {
        this.ds.updateResultService("Recupero corso in errore");
        this.ds.updateSpinner(false);
      });
      this.isEmptyLezioni = isEmptyArray(this.corso.lezioni);
    }
  }


  retrieveChangeView(change: boolean){
    this.showFeeds = change;
  }

  retrieveNewLezione(lezione : Lezione){
    this.lezione = lezione;
    this.corso.lezioni.push(this.lezione);
    window.scrollTo(0,document.body.scrollHeight );
  }
  

}
