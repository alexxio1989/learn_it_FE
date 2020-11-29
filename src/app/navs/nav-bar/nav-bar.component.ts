import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dominio } from 'src/app/model/Dominio';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input() tipoCorsoList: Dominio; 

  tabName: number = 0;
  showFiller = false;

  constructor(private cs: CorsoServiceService , private ds: DelegateServiceService, private route: Router) {
    this.ds.getOBSSideBar().subscribe(next => {
      this.ds.isOpenSideBar = next;
    })
   }

  ngOnInit(): void { 
    
  }

  filterListCorsi(nome: string){
    if(this.cs.listaCorsi.length > 0 && (nome.length > 2 || nome.length === 0)){
      var newArray = this.cs.listaCorsi.filter((data) => data.nomeCorso.toLowerCase().includes(nome.toLowerCase()));
      
      this.cs.filterCorsi(newArray);
      this.route.navigate(['/']);
    }
  }

  onChangeTab(id: number){
    this.tabName = id;
  }

  openSideBar(){
    this.ds.updateSideBar(!this.ds.isOpenSideBar);
    this.ds.isOpenSideBar = !this.ds.isOpenSideBar;
  }


}
