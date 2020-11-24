import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Corso } from 'src/app/model/Corso';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { User } from 'src/app/model/User';
import { getUserLS, isNotEmptyArray, isNotNullObj, isSameUser } from 'src/app/utils/Util';
import { MatDialog } from '@angular/material/dialog';
import { ContentModalLoginComponent } from 'src/app/modals/modal-login-user/content-modal-login/content-modal-login.component';
import { UtenteServiceService } from 'src/app/services/utente-service.service';
import { Lettura } from 'src/app/model/Lettura';

@Component({
  selector: 'app-card-corso',
  templateUrl: './card-corso.component.html',
  styles: [`
    .containerText {
      height: 30px;
      overflow: hidden;
      position: relative;
      width: 100%;
    }

    .scrolling-text {
      position: absolute;
      white-space: nowrap;
    }

    /* Below doesn't work to pause */

    .scrolling-text:hover, .container:hover {
      -moz-animation-play-state: paused;
      -webkit-animation-play-state: paused;
      animation-play-state: paused;
    }
  `],
  animations: [
    trigger('scroll', [
      state('on', style({left: '-100px'})),
      transition('* => *', [
        style({right: '-100px'}),
        animate(10000, style({right: '100%'}))
      ])
    ])
  ]
})
export class CardCorsoComponent implements OnInit {

  @Input() corso: Corso;
  
  state = 0;

  isShowInfo: boolean;
  isEmptyDescrizione: boolean;
  isCorsoLetto: boolean;

  get getMediumFeeds(){
    
    let count = this.corso.feeds.reduce(function (s, a) {
      return s + a.feed;
    }, 0);

    return count / this.corso.feeds.length;
  }

  get isUtenteLogged(): boolean{
    return isSameUser(getUserLS(),this.corso.owner);
  }

  constructor(private us: UtenteServiceService , private dialog: MatDialog , private cs: CorsoServiceService ,private route: Router, private ds: DelegateServiceService) { }

  ngOnInit(): void {
    
    this.isCorsoLetto = isNotNullObj(this.corso) && isNotEmptyArray(this.corso.listLetture) ? this.corso.listLetture.filter(el => el.idUtente === getUserLS().id).length > 0 : false;

    if(this.corso.descrizioneCorso === undefined || 
       this.corso.descrizioneCorso === null || 
       this.corso.descrizioneCorso.trim() === '' ||
       this.corso.descrizioneCorso.trim().includes('>&#160;</font>')
       ){
      this.isEmptyDescrizione = true;
    }
  }


  scrollDone() {
    this.state++;
  }

  goToCorso(corso: Corso){
    let lettura = new Lettura();
    lettura.idCorso = corso.id;
    lettura.idUtente = getUserLS().id;
    this.us.getOBSInsertLettura(lettura).subscribe(next=>{
      this.ds.updateSpinner(false);
      this.ds.updateResultService(next.esitoChiamata);
      localStorage.removeItem('USER');
      localStorage.setItem('USER',JSON.stringify(next.utente));
      this.ds.utente = next.utente;
      localStorage.setItem('CORSO' , JSON.stringify(corso));
      this.cs.corsoSelected = corso;
      this.route.navigate(['/corso']);
    },error =>{
      this.ds.updateSpinner(false);
      this.ds.updateResultService(error.esitoChiamata);
    })
  }

  continua(corso: Corso){
    localStorage.setItem('CORSO' , JSON.stringify(corso));
    this.cs.corsoSelected = corso;
    this.route.navigate(['/corso']);
  }

  elimina(){
    this.cs.getOBSDeleteCorso(this.corso).subscribe(next => {
      this.ds.updateSpinner(false);
      this.ds.updateResultService('Eliminazione Corso avvenuta con successo');
      this.cs.updateCorsi(next);
    });
  }

  showInfo(){
    this.isShowInfo = !this.isShowInfo;
  }

  openDialog() {
    const dialogRef = this.dialog.open(ContentModalLoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  next(corso: Corso){

    if(this.isUtenteLogged){

      if(this.isCorsoLetto){
        this.continua(corso);
      } else {
        this.goToCorso(corso);
      }

    } else {
      this.openDialog();
    }

  }

}
