import { Component, OnInit } from '@angular/core';
import { Corso } from '../model/Corso';
import { CorsoServiceService } from '../services/corso-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  tipoCorsoList = [{descrizione:"Java" , codice: "J"} , {descrizione:"Angular" , codice: "A"}]

  tabName: number = 0;

  constructor(private cs: CorsoServiceService ) { }

  ngOnInit(): void { 
    this.cs.getOBSTypes().subscribe(next => {
      this.tipoCorsoList = next;
    })
  }

  filterListCorsi(nome: string){
    if(this.cs.listaCorsi.length > 0 && (nome.length > 2 || nome.length === 0)){
      var newArray = this.cs.listaCorsi.filter((data) => data.nomeCorso.toLowerCase().includes(nome.toLowerCase()));
      
      this.cs.filterCorsi(newArray);
    }
  }

  onChangeTab(id: number){
    this.tabName = id;
  }


}
