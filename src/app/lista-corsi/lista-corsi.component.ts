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

  listaCorsi: Array<Corso> = [];
  tipoCorsoList = [{descrizione:"Java" , codice: "J"} , {descrizione:"Angular" , codice: "A"}]


  constructor(private cs: CorsoServiceService , private route: Router) { }

  ngOnInit(): void {}

  addCorso(corso: Corso){
    this.listaCorsi.push(corso);
  }

  goToCorso(corso: Corso){
    this.cs.corsoSelected = corso;
    this.route.navigate(['/corso']);
  }

}
