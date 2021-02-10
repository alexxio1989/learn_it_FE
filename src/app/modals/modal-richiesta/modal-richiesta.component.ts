import { Component, OnInit } from '@angular/core';
import { Richiesta } from 'src/app/model/Richiesta';
import { User } from 'src/app/model/User';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { RichiestaServiceService } from 'src/app/services/richiesta-service.service';
import { getUserLS } from 'src/app/utils/Util';

@Component({
  selector: 'app-modal-richiesta',
  templateUrl: './modal-richiesta.component.html',
  styleUrls: ['./modal-richiesta.component.css']
})
export class ModalRichiestaComponent implements OnInit {

  utente: User;

  richiesta = new Richiesta();

  constructor(private rs: RichiestaServiceService,private ds: DelegateServiceService) { }

  ngOnInit(): void {
    this.utente = getUserLS();
  }

  salva(){
    this.richiesta.utente = this.utente;
    this.rs.getOBSSave(this.richiesta).subscribe(next => {
      let utente = next.obj.utente;
      localStorage.removeItem('USER');
      localStorage.setItem('USER',JSON.stringify(utente));
      this.ds.updateUser(utente); 
      this.ds.updateResultService("Richiesta salvata correttamente")
      this.ds.updateSpinner(false);
    },error => {
      this.ds.updateResultService("Richiesta in errore")
      this.ds.updateSpinner(false);
    })
  }

}
