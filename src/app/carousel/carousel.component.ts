import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';
import { SwiperOptions } from 'swiper';
import { PaginationOptions } from 'swiper/types/components/pagination';
import { ScrollbarOptions } from 'swiper/types/components/scrollbar';
import { Corso } from '../model/Corso';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit{

  public show: boolean = true;

  @Input() listaCorsi;
 
  public type: string = 'component';

  public disabled: boolean = false;

  isDevice: boolean;


  constructor(private deviceService: DeviceDetectorService) {}

  ngOnInit(): void {
    this.isDevice = this.deviceService.isMobile();
    this.config.pagination = this.deviceService.isMobile();
    this.config.navigation = !this.deviceService.isMobile();
    this.deviceService.isMobile() ? this.config.slidesPerView = 1 : this.config.slidesPerView = 2;
  }

  public config: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: false,
    pagination: true,
    breakpoints: {  
   
      // when window width is <= 320px     
      320: {       
         slidesPerView: 1,
         spaceBetween: 10     
      },     
      // when window width is <= 480px     
      480: {       
         slidesPerView: 2,       
         spaceBetween: 20     
      },   
  
      // when window width is <= 640px     
      640: {       
         slidesPerView: 3,       
         spaceBetween: 30     
      } 
  
   } 
    
  };

  private scrollbar: ScrollbarOptions = {
    el: '.swiper-scrollbar',
    hide: false,
    draggable: true
  };

  private pagination: PaginationOptions = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  };

  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;

  

  public toggleType(): void {
    this.type = (this.type === 'component') ? 'directive' : 'component';
  }

  public toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  public toggleDirection(): void {
    this.config.direction = (this.config.direction === 'horizontal') ? 'vertical' : 'horizontal';
  }

  public toggleSlidesPerView(): void {
    if (this.config.slidesPerView !== 1) {
      this.config.slidesPerView = 1;
    } else {
      this.config.slidesPerView = 2;
    }
  }

 

  public toggleKeyboardControl(): void {
    this.config.keyboard = !this.config.keyboard;
  }

  public toggleMouseWheelControl(): void {
    this.config.mousewheel = !this.config.mousewheel;
  }

  public onIndexChange(index: number): void {
    console.log('Swiper index: ', index);
  }

  public onSwiperEvent(event: string): void {
    console.log('Swiper event: ', event);
  }

}
