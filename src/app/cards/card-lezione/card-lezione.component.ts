import { Component, Input, OnInit } from '@angular/core';
import { Lezione } from 'src/app/model/Lezione';

@Component({
  selector: 'app-card-lezione',
  templateUrl: './card-lezione.component.html',
  styleUrls: ['./card-lezione.component.css']
})
export class CardLezioneComponent implements OnInit {

  @Input() lezione: Lezione;

  constructor() { }

  ngOnInit(): void {
  }

}
