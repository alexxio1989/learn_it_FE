import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Corso } from 'src/app/model/Corso';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { User } from '../../model/User';
import { getInfoPage, getUserLS , isNullObj} from '../../utils/Util';
import { UtenteServiceService } from 'src/app/services/utente-service.service';
import { IPageCore } from '../IPageCore';
import { ModalEditUtenteComponent } from 'src/app/modals/modal-edit-utente/modal-edit-utente.component';
import { MatDialog } from '@angular/material/dialog';
import { Resoconto } from 'src/app/model/Resoconto';
import { StripeService } from '../../services/stripe.service';
import { ConstantsActions } from 'src/app/constants/ConstantsActions';

@Component({
  selector: 'app-page-utente',
  templateUrl: './page-utente.component.html',
  styleUrls: ['./page-utente.component.css']
})
export class PageUtenteComponent implements OnInit , IPageCore{

  activeTab = 0;

  utente: User;
  renderPage: boolean;
  renderEditorInfoUser: boolean;
  extraUtenteLogged: boolean;
  public PAGE = ConstantsActions.UTENTE;

  resoconto: Resoconto = new Resoconto();

  saldoTotale = 0;
  bonificiFuturi = 0;
  InTransito = 0;

  constructor(private ar: ActivatedRoute , 
              private route: Router,
              private cs: CorsoServiceService,
              private ds: DelegateServiceService,
              private us: UtenteServiceService,
              private ss: StripeService) {
    this.ds.getOBSSpinner().subscribe(next => {
      this.renderPage = !next;
    })

    this.us.getOBSUser().subscribe(next => {
      this.utente = next;
    })
  }

  ngOnInit(): void {
    this.ds.updatePage(this.PAGE);
    this.ar.queryParams.subscribe(params => {
      
      let id = params['id'];
      if(id !== undefined && id !== null && parseInt(id) > 0){
        let utente = new User();
        utente.id = id;
        this.ds._sbjAbilitaNavigazione.asObservable().subscribe(next => {
          if(next === this.PAGE){
            this.retrieveUtente(utente);
          }
        })
       
        let infoPage = getInfoPage(this.PAGE ,  parseInt(id));
        this.ds.checkUserLogged(getUserLS(),infoPage );
      } else {

        this.utente = getUserLS();
        if(isNullObj(this.utente)){
          this.route.navigate(['/']);
        }else {
          this.cs.getOBSGetAllUtente(this.utente).subscribe(next=>{
            this.utente.propriCorsi = next.list;
            this.ds.updateResultService("Recupero dei tuoi corsi")
            this.ds.updateSpinner(false);
            this.renderPage = true;
      
          },error=>{
            this.ds.updateResultService("Errore durante il recupero dei tuoi corsi")
            this.ds.updateSpinner(false);
          })
        }

      }

    });
    
  }

  private retrieveUtente(utente: User) {
    this.us.getOBSUserById(utente).subscribe(
      next => {
        this.utente = next.obj;
        this.extraUtenteLogged = true;
        this.ds.updateResultService("Recupero utente avvenuto con successo");
        this.ds.updateSpinner(false);
        this.renderPage = true;

      }, error => {
        console.log(error.stack);
        this.ds.updateResultService("Errore durante il recupero dell'utente");
        this.ds.updateSpinner(false);
      }
    );
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
    },error=>{
      this.ds.updateResultService("Errore durante la modificata alla visibilità del corso")
      this.ds.updateSpinner(false);
    })
  }

  

  updateUser(){
    this.us.getOBSUpdateUser(this.utente).subscribe(next => {
      this.utente = next.obj;
      this.us.updateUser(this.utente);
      this.ds.updateSpinner(false);
      this.ds.updateResultService(next.status);
    },error => {
      this.ds.updateSpinner(false);
      this.ds.updateResultService(error.error.status);
    })

  }

  getResoconto(){
    this.ss.getResoconto(this.utente).subscribe(next => {
      this.activeTab = 2;
      this.resoconto = next;
      this.resoconto.loaded = true;
      let disponibili = 0;
      
      if(this.resoconto.available){
        disponibili = this.resoconto.available.reduce(function(prev, cur) {
          return prev + cur.amount;
        }, 0);

      }
      if(this.resoconto.pending){
        this.bonificiFuturi = this.resoconto.pending.reduce(function(prev, cur) {
          return prev + cur.amount;
        }, 0);

      }

      if(this.resoconto.connectReserved){
        this.InTransito = this.resoconto.connectReserved.reduce(function(prev, cur) {
          return prev + cur.amount;
        }, 0);

      }

      this.saldoTotale = disponibili + this.bonificiFuturi;

      this.ds.updateSpinner(false);
    },error => {
      this.ds.updateSpinner(false);
    })
  }

}
