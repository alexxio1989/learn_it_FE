import { Component, OnInit } from '@angular/core';
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
  url='https://www.ilmiocodice.com/corso?id=';
  titolo: string;
  descrizione: string;


  constructor(
    private cs: CorsoServiceService ,
    private ds: DelegateServiceService,
    private deviceService: DeviceDetectorService) {

   

   

}

  ngOnInit(): void { 
    this.corso = this.cs.corsoSelected
    this.titolo = this.corso.nomeCorso + ' : ' + this.corso.subNomeCorso;
    this.descrizione = this.corso.descrizioneCorso;
    this.url = this.url + this.corso.id
  }

  get removeHtml(): string{
    return this.descrizione.replace(/<[^>]*>/g, '');
  }

}
