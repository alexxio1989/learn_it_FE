import { Component, OnInit } from '@angular/core';
import { CorsoServiceService } from '../corso-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private cs: CorsoServiceService ) { }

  ngOnInit(): void {
  }

  filterListCorsi(nome: string){
    if(this.cs.listaCorsi.length > 0 && (nome.length > 2 || nome.length === 0)){
      var newArray = this.cs.listaCorsi.filter((data) => data.nomeCorso.toLowerCase().includes(nome.toLowerCase()));
      
      this.cs.filterCorsi(newArray);
    }
  }

}
