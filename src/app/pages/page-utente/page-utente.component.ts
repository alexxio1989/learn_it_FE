import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Corso } from 'src/app/model/Corso';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { User } from '../../model/User';
import { getUserLS , isNullObj} from '../../utils/Util';
import { UtenteServiceService } from 'src/app/services/utente-service.service';
import { IPageCore } from '../IPageCore';
import { ModalEditUtenteComponent } from 'src/app/modals/modal-edit-utente/modal-edit-utente.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-page-utente',
  templateUrl: './page-utente.component.html',
  styleUrls: ['./page-utente.component.css']
})
export class PageUtenteComponent implements OnInit , IPageCore{

  utente: User;
  renderPage: boolean;
  renderEditorInfoUser: boolean;
  extraUtenteLogged: boolean;

  constructor(private ar: ActivatedRoute , 
              private route: Router,
              private cs: CorsoServiceService,
              private ds: DelegateServiceService,
              private us: UtenteServiceService) {
    this.ds.getOBSSpinner().subscribe(next => {
      this.renderPage = !next;
    })
  }

  ngOnInit(): void {
    this.ar.queryParams.subscribe(params => {
      
      let id = params['id'];
      if(id !== undefined && id !== null && parseInt(id) > 0){
        let utente = new User();
        utente.id = id;
        this.us.getOBSUtenteById(utente).subscribe(
          next=>{
            this.utente = next;
            this.extraUtenteLogged = true;
            this.ds.updateResultService("Recupero utente avvenuto con successo")
            this.ds.updateSpinner(false);
            this.getOBSPropriCorsiUtenteRetrieved(next);
      
          },error=>{
            this.ds.updateResultService("Errore durante la modificata alla visibilità del corso")
            this.ds.updateSpinner(false);
          }
        );
      } else {

        this.utente = getUserLS();
        if(isNullObj(this.utente)){
          this.route.navigate(['/']);
        }else {
          this.getOBSPropriCorsi();
        }

      }

    });
    
  }

  goToCourse(corso: Corso){
    localStorage.setItem('CORSO' , JSON.stringify(corso));
    this.cs.corsoSelected = corso;
    this.route.navigate(['/corso'], { queryParams: { id: corso.id } }); 
  }

  updateVisCorso(corso: Corso){ 
    corso.enable = !corso.enable;
    this.cs.getOBSUpdateVisCorso(corso).subscribe(next=>{
      this.ds.updateResultService("Visibilità del corso modificata correttamente")
      this.ds.updateSpinner(false);
      this.getOBSPropriCorsi();

    },error=>{
      this.ds.updateResultService("Errore durante la modificata alla visibilità del corso")
      this.ds.updateSpinner(false);
    })
  }

  private getOBSPropriCorsiUtenteRetrieved(utente:User) {
    this.us.getOBSPropriCorsi(utente).subscribe(next => {
      this.utente.propriCorsi = next.list;
      
      this.ds.updateSpinner(false);
    }, error => {
      this.ds.updateResultService("Errore durante il recupero corsi");
      this.ds.updateSpinner(false);
    });
  }


  private getOBSPropriCorsi() {
    this.us.getOBSPropriCorsi(this.utente).subscribe(next => {
      this.utente.propriCorsi = next.list;
      localStorage.removeItem('USER');
      localStorage.setItem('USER', JSON.stringify(this.utente));
      this.ds.updateResultService("Recupero dei tuoi corsi avvenuto con successo");
      this.ds.updateSpinner(false);
    }, error => {
      this.ds.updateResultService("Errore durante il recuper dei tuoi corsi");
      this.ds.updateSpinner(false);
    });
  }

  updateUser(){
    this.us.getOBSUpdateUser(this.utente).subscribe(next => {
      this.ds.updateSpinner(false);
      this.ds.updateResultService(next.status);
    },error => {
      this.ds.updateSpinner(false);
      this.ds.updateResultService("Errore durante l'aggiornamento utente");
    })

  }

}
