import { Component, Input, OnInit } from '@angular/core';
import { Corso } from 'src/app/model/Corso';
import { Lezione } from 'src/app/model/Lezione';

@Component({
  selector: 'app-card-page-lezione',
  templateUrl: './card-page-lezione.component.html',
  styleUrls: ['./card-page-lezione.component.css']
})
export class CardPageLezioneComponent implements OnInit {

  @Input() corso: Corso;

  @Input() lezione: Lezione;

  constructor() { }

  ngOnInit(): void {
  }

}
