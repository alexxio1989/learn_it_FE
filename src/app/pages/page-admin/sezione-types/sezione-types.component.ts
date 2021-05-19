import { Component, OnInit } from '@angular/core';
import { Dominio } from 'src/app/model/Dominio';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';

@Component({
  selector: 'app-sezione-types',
  templateUrl: './sezione-types.component.html',
  styleUrls: ['./sezione-types.component.css']
})
export class SezioneTypesComponent implements OnInit {

  newDominio = new Dominio();
  tipoCorsoList : Dominio[];

  addDominio: boolean;


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

  retrieveImg(base64:string){
    this.newDominio.img = base64;

  }

}
