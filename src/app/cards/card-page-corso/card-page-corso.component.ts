import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Corso } from 'src/app/model/Corso';
import { Lezione } from 'src/app/model/Lezione';
import { getUserLS, isSameUser } from 'src/app/utils/Util';

@Component({
  selector: 'app-card-page-corso',
  templateUrl: './card-page-corso.component.html',
  styleUrls: ['./card-page-corso.component.css']
})
export class CardPageCorsoComponent implements OnInit {

  @Input() corso: Corso;

  showFeeds: boolean;

  @Output() changeViewEmitter = new EventEmitter<boolean>();
  @Output() newLezioneEmitter = new EventEmitter<Lezione>();

  constructor() { }

  ngOnInit(): void {
  }

  addLezione() {
    let lezione = new Lezione();
    lezione.idCorso = this.corso.id;
    lezione.indexLezione = this.corso.lezioni.length + 1;
    this.newLezioneEmitter.emit(lezione);
    //this.corso.lezioni.push(this.lezione);
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

}
