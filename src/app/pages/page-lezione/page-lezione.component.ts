import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ContentModalParagrafoEditComponent } from 'src/app/modals/content-modal-paragrafo-edit/content-modal-paragrafo-edit.component';
import { FileLearnIt } from 'src/app/model/FileLearnIt';
import { Lezione } from 'src/app/model/Lezione';
import { LezioneParagrafo } from 'src/app/model/LezioneParagrafo';
import { Paragrafo } from 'src/app/model/Paragrafo';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { LezioneServiceService } from 'src/app/services/lezione-service.service';
import { ParagrafoServiceService } from 'src/app/services/paragrafo-service.service';
import { getUserLS, isSameUserID } from 'src/app/utils/Util';
import { IPageCore } from '../IPageCore';

@Component({
  selector: 'app-page-lezione',
  templateUrl: './page-lezione.component.html',
  styleUrls: ['./page-lezione.component.scss']
})
export class PageLezioneComponent implements OnInit, IPageCore {

  public PAGE = 'LEZIONE';
  toppings = new FormControl();
  edit: boolean;
  lezione: Lezione = new Lezione();
  
  isExternalLink: boolean;
  isDevice: boolean;
  renderPage: boolean;




  constructor(private deviceService: DeviceDetectorService ,
              private ds: DelegateServiceService ,
              private cs: CorsoServiceService ,
              private ls: LezioneServiceService , 
              private route: Router ,
              private ar: ActivatedRoute , 
              private ps: ParagrafoServiceService,
              public dialog: MatDialog
              ) {

    this.ps.getOBSADDParagrafi().subscribe(next => {
      this.lezione.listaParagrafi = next;
    })


  }

  get isUtenteLogged(): boolean{
    return isSameUserID(getUserLS(),this.lezione.idOwner
     );
  }

  ngOnInit(): void {

    this.isDevice = this.deviceService.isMobile();
    this.ar.queryParams.subscribe(params => {
      
      let id = params['id'];
      
      if(id !== undefined && id !== null && parseInt(id) > 0){
        
        this.ds.getOBSAbilitaNavigazione().subscribe(next => {
          if(next === this.PAGE){
            this.retrieveLezione(id);
          }
        })
        this.ds.page = this.PAGE;
        this.ds.checkUserLogged(this.PAGE);

      } else {
        this.route.navigate(['/']);
      }


      
    });
    
  }

  private retrieveLezione(id: any) {
    this.ls.getOBSGetLezione(id).subscribe(next => {
      this.lezione = next.obj;
      this.isExternalLink = true;
      this.ds.updateResultService("Recupero lezione avvenuto con successo");
      this.ds.updateSpinner(false);
      this.renderPage = true;
    }, error => {
      this.ds.updateSpinner(false);
      this.ds.updateResultService("Recupero lezione in errore");
      this.route.navigate(['/']);
    });
  }


  editingLezione(lezione :Lezione){
    this.lezione = lezione;
    this.edit = false;
  }

  elimina(paragrafo: Paragrafo){
    this.ps.getOBSDeleteParagrafo(paragrafo).subscribe(next => {
      this.lezione.listaParagrafi = next.list;
      this.ds.updateSpinner(false);
      this.ds.updateResultService(next.status);
    },error => {
      this.ds.updateSpinner(false);
      this.ds.updateResultService(error.status);
    })
  }

  scroll(paragrafo: Paragrafo) {
    console.log(`scrolling to ${paragrafo.idComponent}`);
    let obj = new LezioneParagrafo();
    obj.paragrafo = paragrafo;
    obj.lezione = this.lezione;
    this.ls.getOBSUpdateIDParagrafoReaded(obj).subscribe(next => {

    } , error => {
      this.ds.updateResultService("Errore durante l'update dell'ultimpo paragrafo letto");
    })
    let el = document.getElementById(paragrafo.idComponent);
    el.scrollIntoView();
  }

  openModalEditParagrafo(paragrafo : Paragrafo) {
    this.ps.paragrafoSelected = paragrafo;
    const dialogRef = this.dialog.open(ContentModalParagrafoEditComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  

  
  

}
