import { Component, Input, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Slick } from 'ngx-slickjs';
import { Corso } from 'src/app/model/Corso';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';

@Component({
  selector: 'app-carousel-cards-corsi',
  templateUrl: './carousel-cards-corsi.component.html',
  styleUrls: ['./carousel-cards-corsi.component.css']
})
export class CarouselCardsCorsiComponent implements OnInit {

  @Input() corsi: Corso[] = [];
  @Input() title: string;
  isDevice: boolean;
  config: Slick.Config;
 
  constructor(private ds: DelegateServiceService,private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.isDevice = this.deviceService.isMobile();

    this.config = {
      infinite: true,
      slidesToShow: this.isDevice? (this.corsi.length === 1 ? 1.2 : 1.5) : 3.5, 
      slidesToScroll: 1,
      dots: true,
      autoplay: false,
      autoplaySpeed: 2000 
    }

  }



  slideConfig ;
  
 
  
  removeSlide() {
    this.corsi.length = this.corsi.length - 1;
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
