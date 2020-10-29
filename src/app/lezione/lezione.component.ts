import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Lezione } from '../model/Lezione';

@Component({
  selector: 'app-lezione',
  templateUrl: './lezione.component.html',
  styleUrls: ['./lezione.component.css']
})
export class LezioneComponent implements OnInit {

  edit: boolean;
  lezione: Lezione = new Lezione();

  constructor() { }

  ngOnInit(): void {
  }

  editingLezione(lezione :Lezione){
    this.lezione = lezione;
    this.edit = false;
  }

}
