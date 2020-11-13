import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { Corso } from '../../model/Corso';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  listaCorsiBase: Array<Corso> = [];
  listaCorsiFiltered: Array<Corso> = [];
  


  constructor(private cs: CorsoServiceService , private route: Router , private ds: DelegateServiceService) { }

  get listaCorsi(){
    return this.listaCorsiFiltered.length > 0 ? this.listaCorsiFiltered : this.listaCorsiBase;
  }

  ngOnInit(): void {    
    this.cs.getOBSCorsi().subscribe(next => {
      this.ds.updateSpinner(false);
      this.listaCorsiBase = next;
      this.cs.listaCorsi = next;
    })
    this.cs.getOBSCorsiFiltered().subscribe(next => {
      this.listaCorsiFiltered = next;
    })
    this.cs.getOBSUpdateCorsi().subscribe(next => {
      this.listaCorsiBase = next;
      this.listaCorsiFiltered = [];
    })
  }

}
