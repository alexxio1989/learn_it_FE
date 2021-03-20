import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { User } from 'src/app/model/User';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';
import { UtenteServiceService } from 'src/app/services/utente-service.service';

@Component({
  selector: 'app-carousel-coders',
  templateUrl: './carousel-coders.component.html',
  styleUrls: ['./carousel-coders.component.css']
})
export class CarouselCodersComponent implements OnInit {

  utenti: User[] = [];
  isDevice: boolean;

  constructor(private ds: DelegateServiceService,private us:UtenteServiceService,private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.isDevice = this.deviceService.isMobile();

    this.slideConfig = {"slidesToShow": this.isDevice? 3 : 6, "slidesToScroll": this.isDevice? 3 : 6}
    this.us.getOBSGetCoders().subscribe(next => {
      this.utenti =next.list
      this.ds.updateSpinner(false);
      this.ds.updateResultService(next.status);
    },error => {
      this.ds.updateSpinner(false);
      this.ds.updateResultService("Errore durante il recupero degli utenti");
    })

  }


  slideConfig ;
  
 
  
  removeSlide() {
    this.utenti.length = this.utenti.length - 1;
  }
  
  slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  }

}
