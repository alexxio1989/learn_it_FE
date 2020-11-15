import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Corso } from 'src/app/model/Corso';
import { Lezione } from 'src/app/model/Lezione';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { LezioneServiceService } from 'src/app/services/lezione-service.service';
import { getUserLS, isEmptyString, isSameUser } from 'src/app/utils/Util';

@Component({
  selector: 'app-card-lezione',
  templateUrl: './card-lezione.component.html',
  styleUrls: ['./card-lezione.component.css']
})
export class CardLezioneComponent implements OnInit {

  @Input() lezioni: Lezione[];

  @Input() lezione: Lezione;

  @Input() corso: Corso;

  @Output() newLezioni = new EventEmitter<Lezione[]>();
  

  title: string = '';

  edit: boolean;

  constructor(private cs: CorsoServiceService , 
              private ls: LezioneServiceService , 
              private route: Router,
              private ds: DelegateServiceService) { }
  
  get isUtenteLogged(): boolean{
    return isSameUser(getUserLS(),this.corso.owner);
  }

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
      this.ls.getOBSInsertLezione(this.lezione).subscribe(next => {
        this.ds.updateSpinner(false);
        this.ds.updateResultService('Inserimento lezione avvenuta con successo');
        this.newLezioni.emit(next);
      });
    } else if(this.lezione.id > 0){
      this.ls.getOBSUpdateLezione(this.lezione).subscribe(next => {
        this.ds.updateSpinner(false);
        this.ds.updateResultService('Modifica lezione avvenuta con successo');
        this.newLezioni.emit(next);
      });
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
    this.ls.getOBSDeleteLezione(this.lezione).subscribe(next => {
      this.ds.updateSpinner(false);
      this.ds.updateResultService('Eliminazione lezione avvenuta con successo');
      this.newLezioni.emit(next);
    });
  }

}
