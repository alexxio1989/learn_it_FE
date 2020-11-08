import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CorsoServiceService } from 'src/app/corso-service.service';
import { Lezione } from 'src/app/model/Lezione';

@Component({
  selector: 'app-page-lezione',
  templateUrl: './page-lezione.component.html',
  styleUrls: ['./page-lezione.component.css']
})
export class PageLezioneComponent implements OnInit {

  edit: boolean;
  lezione: Lezione;

  constructor(private cs: CorsoServiceService , private route: Router) { }

  ngOnInit(): void {
    this.lezione = this.cs.lezioneSelected;
  }

  editingLezione(lezione :Lezione){
    this.lezione = lezione;
    this.edit = false;
  }

}
