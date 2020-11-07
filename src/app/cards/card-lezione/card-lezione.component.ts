import { Component, Input, OnInit } from '@angular/core';
import { Lezione } from 'src/app/model/Lezione';
import { isEmptyString } from 'src/app/utils/Util';

@Component({
  selector: 'app-card-lezione',
  templateUrl: './card-lezione.component.html',
  styleUrls: ['./card-lezione.component.css']
})
export class CardLezioneComponent implements OnInit {

  @Input() lezione: Lezione;

  title: string;

  edit: boolean;

  constructor() { }

  ngOnInit(): void {
    if(isEmptyString(this.title)){
      this.edit = true;
    }
  }

  save(){
    this.lezione.title = this.title;
    this.edit = false;
  }

  update(){
    this.lezione.title = this.title;
    this.edit = true;
  }

}
