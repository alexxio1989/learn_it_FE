import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { Corso } from '../../model/Corso';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  listaCorsiBase: Array<Corso> = [];
  listaCorsiFiltered: Array<Corso> = [];
  


  constructor(private cs: CorsoServiceService , private route: Router) { }

  get listaCorsi(){
    return this.listaCorsiFiltered.length > 0 ? this.listaCorsiFiltered : this.listaCorsiBase;
  }

  ngOnInit(): void {
    this.cs.getOBSCorsi().subscribe(res => {
      this.listaCorsiBase = res;
      this.cs.listaCorsi = res;
    })
    this.cs.getOBSCorsiFiltered().subscribe(res => {
      this.listaCorsiFiltered = res;
    })
    this.cs.getOBSUpdateCorsi().subscribe(res => {
      this.listaCorsiBase = res;
      this.listaCorsiFiltered = [];
    })
  }

}
