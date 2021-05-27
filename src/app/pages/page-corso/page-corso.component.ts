import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsActions } from 'src/app/constants/ConstantsActions';
import { Lezione } from 'src/app/model/Lezione';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { LezioneServiceService } from 'src/app/services/lezione-service.service';
import { getCorsoLS, getInfoPage, getUserLS, isEmptyArray, isEmptyString, isNotEmptyArray, isSameUser } from 'src/app/utils/Util';
import { Corso } from '../../model/Corso';
import { IPageCore } from '../IPageCore';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-page-corso',
  templateUrl: './page-corso.component.html',
  styleUrls: ['./page-corso.component.css']
})
export class PageCorsoComponent implements OnInit, IPageCore {
 
  public PAGE = ConstantsActions.CORSO ;

  corso: Corso = new Corso();

  isEmptyLezioni: boolean;

  lezione: Lezione;

  showFeeds: boolean;

  renderPage: boolean;

  newFeed: boolean;

  called = false;

  constructor(private titleService:Title,private fs: FeedbackService,private ls: LezioneServiceService , private cs: CorsoServiceService, private route: Router, private ds: DelegateServiceService, private ar: ActivatedRoute) {
    this.ds.getOBSSpinner().subscribe(next => {
      this.renderPage = !next;
    })

    

    this.ls._sbjNewLezione.asObservable().subscribe(next => {
      this.lezione = next;
      this.corso.lezioni.push(this.lezione);
      window.scrollTo(0,document.body.scrollHeight );
    })

    this.ls.getOBSUpdateLezioni().subscribe(next => {
      this.corso.lezioni = next;
    })

    this.fs.getOBS().subscribe(next => {
      this.corso.feeds = next;
    })

    this.fs._sbjNewFeed.asObservable().subscribe(next => {
      this.newFeed = next;
    })

    
  }

  get isUtenteLogged(): boolean {
    return isSameUser(getUserLS(), this.corso.owner);
  }

  ngOnInit(): void {
    this.ds.updatePage(this.PAGE);
    
    
    this.ar.queryParams.subscribe(params => {

      let id = params['id'];
      let title = params['title']
      this.titleService.setTitle(title);

      if (id !== undefined && id !== null && parseInt(id) > 0) {
        this.ds._sbjAbilitaNavigazione.asObservable().subscribe(next => {
          if(next === this.PAGE){
            this.retrieveCorso(id);
          }
        })
        let infoPage = getInfoPage(this.PAGE ,  parseInt(id));
        this.ds.checkUserLogged(getUserLS(),infoPage );

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


  

}
