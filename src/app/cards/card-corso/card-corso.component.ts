import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Corso } from 'src/app/model/Corso';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { User } from 'src/app/model/User';
import { getUserLS, isNotEmptyArray, isNotNullObj, isSameUser } from 'src/app/utils/Util';

import { UtenteServiceService } from 'src/app/services/utente-service.service';
import { Lettura } from 'src/app/model/Lettura';
import { FormBuilder } from '@angular/forms';
 

import { PagamentiServiceService } from 'src/app/services/pagamenti-service.service';
import { Acquisto } from 'src/app/model/Acquisto';
import { ModalPagamentoComponent } from 'src/app/modals/modal-pagamento/modal-pagamento.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ICard } from '../ICard';

@Component({
  selector: 'app-card-corso',
  templateUrl: './card-corso.component.html',
  styleUrls: ['./card-corso.component.scss']
})
export class CardCorsoComponent implements OnInit,ICard {

  isFlipped: boolean;

  @Input() corso: Corso;
  
  url='https://www.ilmiocodice.com/corso?id=';

  
  isEmptyDescrizione: boolean;
  isCorsoLetto: boolean;
  isCorsoDaPagare: boolean;
  isPAy: boolean;
  user: User;
  acquisto = new Acquisto();
  modalPagamentoComponent = ModalPagamentoComponent;

  showAcquista: boolean;
  showContinua: boolean;
  showAccedi: boolean;
  isDevice: boolean;

  

  constructor(private fb: FormBuilder,
              private us: UtenteServiceService ,
              private cs: CorsoServiceService ,
              private route: Router,
              private ds: DelegateServiceService,
              private ps: PagamentiServiceService,
              private deviceService: DeviceDetectorService) {

              this.ds.getOBSUser().subscribe(next => {
                this.checkLettureUtente();
              })

              this.ps.getOBSAcquisto().subscribe(next => {
                if("CORSO" === next){
                  this.goToCorso(this.corso);
                }
              })

  }
  

  ngOnInit(): void {

    this.url = this.url + this.corso.id;
    

    this.isDevice = this.deviceService.isMobile();
    this.acquisto.acquirente = getUserLS();
    this.acquisto.owner = this.corso.owner;
    this.acquisto.causale = "Acquisto corso " + this.corso.nomeCorso;
    this.acquisto.total = this.corso.prezzo;
    this.acquisto.type = "CORSO"
    this.checkLettureUtente();

    if(this.corso.descrizioneCorso === undefined || 
       this.corso.descrizioneCorso === null || 
       this.corso.descrizioneCorso.trim() === '' ||
       this.corso.descrizioneCorso.trim().includes('>&#160;</font>')
       ){
      this.isEmptyDescrizione = true;
    }

  }


  private setFlags() {
    if (this.user !== undefined && this.user !== null) {
      this.showAccedi = false;
      this.showAcquista = this.corso.prezzo !== undefined && this.corso.prezzo > 0 && !this.isCorsoLetto;
      this.showContinua = !this.showAcquista;

    } else {
      this.showAccedi = true;
      this.showAcquista = false;
      this.showContinua = false;
    }
  }

  checkLettureUtente(){
    const user = getUserLS();
    this.user = user;
    if(isSameUser(getUserLS(),this.corso.owner)){
      this.isCorsoLetto = true;
    } else {

      this.isCorsoLetto = isNotNullObj(this.corso) &&
                          isNotEmptyArray(this.corso.listLetture) &&
                          isNotNullObj(user) ? this.corso.listLetture.filter(el => el.idUtente === user.id).length > 0 : false;
    }

    this.setFlags();
  }



  goToCorso(corso: Corso){
    let lettura = new Lettura();
    lettura.idCorso = corso.id;
    lettura.idUtente = getUserLS().id;
    lettura.corso = corso;
    lettura.lettore = getUserLS();
    this.us.getOBSInsertLettura(lettura).subscribe(next=>{
      this.ds.updatePage('CORSO');
      this.ds.updateSpinner(false);
      this.ds.updateResultService(next.status);
     
      localStorage.setItem('CORSO' , JSON.stringify(corso));
      this.cs.corsoSelected = corso;
      this.route.navigate(['/corso'], { queryParams: { id: corso.id } }); 
    },error =>{
      this.ds.updateSpinner(false);
      this.ds.updateResultService(error.error.status);
    })
  }

  continua(corso: Corso){
    this.ds.updatePage('CORSO');
    localStorage.setItem('CORSO' , JSON.stringify(corso));
    this.cs.corsoSelected = corso;
    this.route.navigate(['/corso'], { queryParams: { id: corso.id } }); 
  }

  openLogin() {
      this.ds.updateOpenLogin(true);
  }

  next(corso: Corso){

      if(this.isCorsoLetto){
        this.continua(corso);
      } else {
          this.goToCorso(corso);
      }
  }

 

  
}
