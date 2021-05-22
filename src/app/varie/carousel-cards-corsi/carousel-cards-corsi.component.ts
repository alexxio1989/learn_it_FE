import { Component, Input, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Slick } from 'ngx-slickjs';
import { Subscription, timer } from 'rxjs';
import { Corso } from 'src/app/model/Corso';
import { Slide } from 'src/app/model/Slide';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';

@Component({
  selector: 'app-carousel-cards-corsi',
  templateUrl: './carousel-cards-corsi.component.html',
  styleUrls: ['./carousel-cards-corsi.component.css']
})
export class CarouselCardsCorsiComponent implements OnInit {

  @Input() corsi: Corso[] = [];
  @Input() title: string;

  slides: Slide[] = [];
  isDevice: boolean;
  config: Slick.Config;

  configSlides: Slick.Config;

  corsoSeleted: Corso;

  countDown:Subscription;
  counter = 4000;
  tick = 1000;

  widthSlide: number;
 
  constructor(private ds: DelegateServiceService,private deviceService: DeviceDetectorService , private cs: CorsoServiceService) { }

  ngOnInit(): void {


    this.isDevice = this.deviceService.isMobile();

    if(this.corsi.length > 0){
      this.slides = this.getSlides(this.corsi , this.isDevice && this.corsi.length > 2 ? 1: 1);
    }

    //this.countDown = timer(0, this.tick).subscribe(() => --this.counter)

    this.cs._sbjCorsoSelected.asObservable().subscribe(next => {
      var result = this.corsi.find(obj => {
        return obj.id === next.id
      })
      if(result !== undefined && result !== null){
        
        this.corsoSeleted = next;
      } else {
        this.corsoSeleted = undefined;
      }
    })


    this.widthSlide = 350 ;



    this.configSlides = {
      infinite: true,
      slidesToShow: 1, 
      slidesToScroll: 1,
      dots: true,
      autoplay: false,
      autoplaySpeed: 2000 ,
      arrows: true,
      centerMode: true,
      focusOnSelect: false,
      variableWidth: true
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

  emitCourse(corso: Corso){

    this.cs._sbjCorsoSelected.next(corso);
  }

  getSlides(corsi: Corso[], chunkCount): Slide[]{
    let slides = [];
    var chunks = [],  i, j;
    for (i = 0, j = corsi.length; i<j; i+= chunkCount) {

        chunks.push(corsi.slice(i, i + chunkCount)); 
    }

    if(chunks.length > 0){
      chunks.forEach(next => {
        let slide = new Slide();

        next.forEach(c => {
         
          slide.corsi.push(c)
          
         });

       
       slides.push(slide);
      });
    }
    return slides;
  }



}
