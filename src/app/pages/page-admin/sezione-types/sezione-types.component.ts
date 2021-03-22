import { Component, OnInit } from '@angular/core';
import { Dominio } from 'src/app/model/Dominio';
import { SubDominio } from 'src/app/model/SubDominio';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';

@Component({
  selector: 'app-sezione-types',
  templateUrl: './sezione-types.component.html',
  styleUrls: ['./sezione-types.component.css']
})
export class SezioneTypesComponent implements OnInit {

  newDominio = new Dominio();
  newSubDominio = new SubDominio();

  tipoCorsoList : Dominio[];

  addDominio: boolean;

  addSubDominio:boolean;

  constructor(private cs: CorsoServiceService,private ds: DelegateServiceService) { }

  ngOnInit(): void {
    this.cs.getOBSTypes().subscribe(next => {
      this.tipoCorsoList = next.list;
      this.cs.tipoCorsoList = next.list;
      this.ds.updateTipiCorso(next.list);
    })
  }

  addDom(){
    this.addDominio = !this.addDominio 
    this.newDominio = new Dominio();
  }

  editDominio(dominio: Dominio){
    this.addDominio = !this.addDominio 
    this.newDominio = dominio;
  }

  deleteDominio(dominio: Dominio){
  }

  addSubDom(dominio: Dominio){
    this.addSubDominio = !this.addSubDominio
    this.newSubDominio = new SubDominio();
    this.newSubDominio.idPadre = dominio.id;
  }

  editSubDom(subDominio: SubDominio){
    this.addSubDominio = !this.addSubDominio
    this.newSubDominio = subDominio;
  }

  deleteSubDom(subDominio: SubDominio){
  }

  

}
