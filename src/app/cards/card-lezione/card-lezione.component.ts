import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CorsoServiceService } from 'src/app/corso-service.service';
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

  constructor(private cs: CorsoServiceService , private route: Router) { }

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

  goToLezione(){
    this.cs.lezioneSelected = this.lezione;
    this.route.navigate(['/lezione']);
  }

}
