import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CorsoServiceService } from '../corso-service.service';
import { Corso } from '../model/Corso';

@Component({
  selector: 'app-lista-corsi',
  templateUrl: './lista-corsi.component.html',
  styleUrls: ['./lista-corsi.component.css']
})
export class ListaCorsiComponent implements OnInit {

  listaCorsiBase: Array<Corso> = [];
  listaCorsiFiltered: Array<Corso> = [];
  tipoCorsoList = [{descrizione:"Java" , codice: "J"} , {descrizione:"Angular" , codice: "A"}]


  constructor(private cs: CorsoServiceService , private route: Router) { }

  get listaCorsi(){
    return this.listaCorsiFiltered.length > 0 ? this.listaCorsiFiltered : this.listaCorsiBase;
  }

  ngOnInit(): void {
    this.cs.getCorsi().subscribe(res => {
      this.listaCorsiBase = res;
      this.cs.listaCorsi = res;
    })
    this.cs.getCorsiFiltered().subscribe(res => {
      this.listaCorsiFiltered = res;
    })
  }

  addCorso(corso: Corso){
    this.listaCorsiBase.push(corso);
  }

}
