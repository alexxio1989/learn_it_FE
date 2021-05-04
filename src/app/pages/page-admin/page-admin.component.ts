import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Richiesta } from 'src/app/model/Richiesta';
import { User } from 'src/app/model/User';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { RichiestaServiceService } from 'src/app/services/richiesta-service.service';
import { getUserLS } from 'src/app/utils/Util';

@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.css']
})
export class PageAdminComponent implements OnInit {

  public PAGE = 'ADMIN';
  utente: User;
  isSuperUser: boolean;

  richieste: Richiesta[] = [];

  constructor(private ds: DelegateServiceService, private route: Router,private rs: RichiestaServiceService) { }

  ngOnInit(): void {
    
    this.utente = getUserLS();
    this.isSuperUser = this.utente !== null && this.utente !== undefined && this.utente.tipo.codice === "SU";

    if(this.utente === null || this.utente === undefined || !this.isSuperUser){
      this.ds.updateResultService("ATTENZIONE : Utente non autorizzato");
      this.route.navigate(['/']);
    } else {
      this.getRichieste();
    }
  }

  private getRichieste() {
    this.rs.getOBSGetAll().subscribe(next => {
      this.ds.updateSpinner(false);
      this.richieste = next.list;
    }, error => {
      this.ds.updateResultService("Recupero richieste in errore");
      this.ds.updateSpinner(false);
    });
  }

  editRichiesta(richiesta: Richiesta , esito: boolean){
    richiesta.approvato = esito;

    this.rs.getIPAddress().subscribe((res:any)=>{  
      richiesta.utente.ip = res.ip;  
      this.rs.getOBSUpdate(richiesta).subscribe(next => {
        
        this.ds.updateResultService("Richiesta modificata correttamente")
        this.ds.updateSpinner(false);
        this.getRichieste();
      },error => {
        this.ds.updateResultService("Modifica richiesta in errore")
        this.ds.updateSpinner(false);
      })
    });
  }

}
