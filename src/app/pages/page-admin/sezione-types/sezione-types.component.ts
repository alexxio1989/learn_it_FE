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

  newDomain(){
    this.addDominio = true;
    this.newDominio = new Dominio();
  }

  newSubDomain(tipoPadre: Dominio){
    this.addSubDominio = true;
    this.newSubDominio = new SubDominio();
    this.newDominio = tipoPadre;
  }

  saveDom(){

    if(this.newDominio.id === undefined || this.newDominio.id === 0){
      this.ds.updateSpinner(true);
      this.cs.getOBSInsertTypes(this.newDominio).subscribe(next => {
        this.tipoCorsoList = next.list;
        this.ds.updateResultService(next.status);
        this.ds.updateSpinner(false);
        this.ds.updateTipiCorso(next.list);
        this.addDominio = false;
      },error =>{
        this.ds.updateResultService("Inserimento tipo in errore");
        this.ds.updateSpinner(false);
        this.addDominio = false;
      })

    } else {
      this.ds.updateSpinner(true);
      this.cs.getOBSUpdateType(this.newDominio).subscribe(next => {
        this.tipoCorsoList = next.list;
        this.ds.updateResultService(next.status);
        this.ds.updateSpinner(false);
        this.ds.updateTipiCorso(next.list);
        this.addDominio = false;
      },error =>{
        this.ds.updateResultService("Update tipo in errore");
        this.ds.updateSpinner(false);
        this.addDominio = false;
      })
    }

  }

  deleteDominio(dominio: Dominio){
    this.cs.getOBSDeleteType(dominio).subscribe(next => {
      this.tipoCorsoList = next.list;
      this.ds.updateResultService(next.status);
      this.ds.updateSpinner(false);
      this.ds.updateTipiCorso(next.list);
    },error =>{
      this.ds.updateResultService("Eliminazione tipo in errore");
      this.ds.updateSpinner(false);
    })
  }

  saveSubDom(dominio: Dominio){
   
    this.newSubDominio.idPadre = dominio.id;

    if(this.newSubDominio.id === undefined || this.newSubDominio.id === 0){
      this.ds.updateSpinner(true);
      this.cs.getOBSInsertSubTypes(this.newSubDominio).subscribe(next => {
        this.tipoCorsoList = next.list;
        this.ds.updateResultService(next.status);
        this.ds.updateSpinner(false);
        this.ds.updateTipiCorso(next.list);
        this.addSubDominio = false;
      },error =>{
        this.ds.updateResultService("Inserimento sotto tipo in errore");
        this.ds.updateSpinner(false);
        this.addSubDominio = false;
      })

    } else {
      this.ds.updateSpinner(true);
      this.cs.getOBSUpdateSubTypes(this.newSubDominio).subscribe(next => {
        this.tipoCorsoList = next.list;
        this.ds.updateResultService(next.status);
        this.ds.updateSpinner(false);
        this.ds.updateTipiCorso(next.list);
        this.addSubDominio = false;
      },error =>{
        this.ds.updateResultService("Inserimento sotto tipo in errore");
        this.ds.updateSpinner(false);
        this.addSubDominio = false;
      })
    }
  }

  

  deleteSubDom(subDominio: SubDominio){
    this.ds.updateSpinner(true);
    this.cs.getOBSDeleteSubTypes(subDominio).subscribe(next => {
      this.tipoCorsoList = next.list;
      this.ds.updateResultService(next.status);
      this.ds.updateSpinner(false);
      this.ds.updateTipiCorso(next.list);
    },error =>{
      this.ds.updateResultService("Inserimento sotto tipo in errore");
      this.ds.updateSpinner(false);
    })
  }

  

}
