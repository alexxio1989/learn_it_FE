import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Corso } from 'src/app/model/Corso';
import { Feedback } from 'src/app/model/Feedback';
import { Lezione } from 'src/app/model/Lezione';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { getUserLS, isSameUser } from 'src/app/utils/Util';

@Component({
  selector: 'app-card-page-corso',
  templateUrl: './card-page-corso.component.html',
  styleUrls: ['./card-page-corso.component.css']
})
export class CardPageCorsoComponent implements OnInit {

  @Input() corso: Corso;

  showFeeds: boolean;
  newFeed: boolean;

  feed = new Feedback();
  url='https://www.ilmiocodice.com/corso?id=';

  @Output() changeViewEmitter = new EventEmitter<boolean>();


  constructor(private fs: FeedbackService, private ds: DelegateServiceService) { }

  ngOnInit(): void {
    this.url = this.url + this.corso.id;
    this.feed.idCorso = this.corso.id;
    let utenteLogged = getUserLS();
    if(utenteLogged !== undefined && utenteLogged !== null){
      this.feed.anagrafeCliente = utenteLogged.nome + ' ' + utenteLogged.cognome;
      this.feed.idUtente = utenteLogged.id;
      this.feed.emailOwnerCorso = this.corso.owner.email;
      this.feed.emailUtenteFeed = utenteLogged.email;
      this.feed.titoloCorso = this.corso.nomeCorso;
    }

    this.fs._sbjNewFeed.asObservable().subscribe(next => {
      this.newFeed = next;
    })
  }

  salvaFeed(){
    this.fs.insert(this.feed).subscribe(next => {
      this.ds.updateSpinner(false);
      this.fs.updateFeeds(next.list);
      this.ds.updateResultService('Inserimento feedback avvenuto con successo');
    },error => {
      this.ds.updateSpinner(false);
      this.ds.updateResultService('Inserimento feedback in errore');
    })
  }

  onRatingSet(e: any){
    this.feed.feed = Math.round(e);
  }



  get isUtenteLogged(): boolean {
    return isSameUser(getUserLS(), this.corso.owner);
  }

  get getMediumFeeds() {

    let count = this.corso.feeds.reduce(function (s, a) {
      return s + a.feed;
    }, 0);

    return count / this.corso.feeds.length;
  }

  changeView() {
    this.showFeeds = !this.showFeeds;
    this.changeViewEmitter.emit(this.showFeeds);
  }

  chiudiFeeds(){
    this.fs._sbjNewFeed.next(false);
  }

}
