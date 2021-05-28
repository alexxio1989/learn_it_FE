import { Component, OnInit } from '@angular/core';
import { Router, UrlSerializer } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Corso } from 'src/app/model/Corso';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';

@Component({
  selector: 'app-modal-share',
  templateUrl: './modal-share.component.html',
  styleUrls: ['./modal-share.component.css']
})
export class ModalShareComponent implements OnInit {

  corso: Corso;
  url='https://www.ilmiocodice.com/corso';
  titolo: string;
  descrizione: string;
  descrizioneLight: string;

  constructor(
    private route: Router,
    private cs: CorsoServiceService ,
    private ds: DelegateServiceService,
    private deviceService: DeviceDetectorService) {

   

   

}

  ngOnInit(): void { 
    this.corso = this.cs.corsoSelected
    this.titolo = this.corso.nomeCorso + ' : ' + this.corso.subNomeCorso;
    this.descrizione = this.corso.descrizioneCorso;
    const queryParams = {
      id: this.corso.id,
      title: this.corso.nomeCorso + ' : ' + this.corso.subNomeCorso
    };
    const urlTree = this.route.createUrlTree([], {
      queryParams: queryParams
    });
    
    let urlTreeString = ''+urlTree

    this.url = this.url + urlTreeString.substring(1)

    if(this.descrizione){
      this.descrizioneLight = 'Riepilogo del mio codice : \n \n' + this.removeHtml(this.descrizione)
    }
  }

  removeHtml(descrizione: string): string{
    
    
    let removeListCase01 = descrizione.replace(/<br>-/g, '\n- ')
    let removeList = removeListCase01.replace(/<br>/g, '\n- ')
    return removeList.replace(/<[^>]*>/g, '');
  }

}
