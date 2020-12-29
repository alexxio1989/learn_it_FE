import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Corso } from 'src/app/model/Corso';
import { Lezione } from 'src/app/model/Lezione';
import { Paragrafo } from 'src/app/model/Paragrafo';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { LezioneServiceService } from 'src/app/services/lezione-service.service';
import { ParagrafoServiceService } from 'src/app/services/paragrafo-service.service';
import { getUserLS, isEmptyString, isSameUser , isNotNullObj, isSameUserID } from 'src/app/utils/Util';

@Component({
  selector: 'app-page-lezione',
  templateUrl: './page-lezione.component.html',
  styleUrls: ['./page-lezione.component.scss']
})
export class PageLezioneComponent implements OnInit {
  toppings = new FormControl();
  edit: boolean;
  lezione: Lezione;
  corso: Corso;
  isExternalLink: boolean;
  isDevice: boolean;


  constructor(private deviceService: DeviceDetectorService , private ds: DelegateServiceService , private cs: CorsoServiceService ,private ls: LezioneServiceService , private route: Router ,private ar: ActivatedRoute , private ps: ParagrafoServiceService) {
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
      this.corso = JSON.parse(localStorage.getItem('CORSO'));
      let lezioneSelected = JSON.parse(localStorage.getItem('LEZIONE'));

      if( isNotNullObj(lezioneSelected) &&  lezioneSelected.id !== id){
        console.log('CALL BE CARICA LEZIONE BY ID LEZIONE')
        // CALL BE CARICA LEZIONE BY ID LEZIONE
        this.ls.getOBSGetLezione(id).subscribe(next => {
          this.lezione = next.obj;
          this.isExternalLink = true;
          this.ds.updateSpinner(false);
        },error => {
          this.ds.updateSpinner(false);
          this.route.navigate(['/']);
        })
      } else {
        if(isNotNullObj(lezioneSelected)){
          this.lezione = lezioneSelected;
        }else{
          if(this.lezione === undefined || this.lezione.title === ''){
            this.route.navigate(['/']);
          }
        }

      }
    });
    this.corso = this.cs.corsoSelected;
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
    let el = document.getElementById(paragrafo.idComponent);
    el.scrollIntoView();
  }
  

}
