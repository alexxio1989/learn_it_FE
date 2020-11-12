import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Lezione } from 'src/app/model/Lezione';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { LezioneServiceService } from 'src/app/services/lezione-service.service';
import { isEmptyString } from 'src/app/utils/Util';

@Component({
  selector: 'app-card-lezione',
  templateUrl: './card-lezione.component.html',
  styleUrls: ['./card-lezione.component.css']
})
export class CardLezioneComponent implements OnInit {

  @Input() lezioni: Lezione[];

  @Input() lezione: Lezione;

  @Output() newLezioni = new EventEmitter<Lezione[]>();
  

  title: string = '';

  edit: boolean;

  constructor(private cs: CorsoServiceService , private ls: LezioneServiceService , private route: Router) { }

  ngOnInit(): void {
    if(isEmptyString(this.lezione.title)){
      this.edit = true;
    } else {
      this.title = this.lezione.title;
    }
  }

  save(){
    this.lezione.title = this.title;
    if(this.lezione.id === 0 || this.lezione.id === undefined ){
      this.ls.getOBSInsertLezione(this.lezione).subscribe();
    } else if(this.lezione.id > 0){
      this.ls.getOBSUpdateLezione(this.lezione).subscribe();
    }
    this.edit = false;
  }

  update(){
    this.edit = true;
  }

  goToLezione(){
    this.ls.lezioneSelected = this.lezione;
    this.route.navigate(['/lezione']);
  }

  eliminaLezione(){
    this.ls.getOBSDeleteLezione(this.lezione).subscribe(res => {
      this.newLezioni.emit(res);
    });
  }

}
