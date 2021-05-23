import { Component, Input, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Slick } from 'ngx-slickjs';
import { Subscription, timer } from 'rxjs';
import { Corso } from 'src/app/model/Corso';
import { Paginazione } from 'src/app/model/Paginazione';
import { Dominio } from 'src/app/model/Dominio';
import { Slide } from 'src/app/model/Slide';
import { CorsoServiceService } from 'src/app/services/corso-service.service';
import { DelegateServiceService } from 'src/app/services/delegate-service.service';

@Component({
  selector: 'app-carousel-cards-corsi',
  templateUrl: './carousel-cards-corsi.component.html',
  styleUrls: ['./carousel-cards-corsi.component.css']
})
export class CarouselCardsCorsiComponent implements OnInit {

  @Input() type: Dominio;

  slides: Slide[] = [];
  isDevice: boolean;
  config: Slick.Config;

  configSlides: Slick.Config;

  corsoSeleted: Corso;

  countDown:Subscription;
  counter = 4000;
  tick = 1000;

  widthSlide: number;

  paginazione = new Paginazione();

  
 
  constructor(private ds: DelegateServiceService,private deviceService: DeviceDetectorService , private cs: CorsoServiceService) { 
   
  }

  ngOnInit(): void {


    this.isDevice = this.deviceService.isMobile();

    if(this.type.corsi.length > 0){
      this.slides = this.getSlides(this.type.corsi , this.isDevice && this.type.corsi.length > 2 ? 1: 1);
    }

    //this.countDown = timer(0, this.tick).subscribe(() => --this.counter)

    this.cs._sbjCorsoSelected.asObservable().subscribe(next => {
      var result = this.type.corsi.find(obj => {
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
      dots: false,
      autoplay: false,
      autoplaySpeed: 2000 ,
      arrows: false,
      centerMode: true,
      focusOnSelect: false,
      variableWidth: true
    }
  
    this.type.configPagination = {id: ''+this.type.id, itemsPerPage: this.isDevice ? 1 :3, currentPage: 0 , totalItems: this.type.corsi[0].totOccurrences }


  }



  slideConfig ;
  
 
  
  removeSlide() {
    this.type.corsi.length = this.type.corsi.length - 1;
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

  pageChanged(event){
    let page = event -1;
    if(page > 0){
      page = page * (this.isDevice ? 1 :3)
      this.paginazione.pagina = page
      
    }
    this.paginazione.numeroPerPagina = this.isDevice ? 1 :3;
    this.type.configPagination.currentPage = event;
    this.cs.getCorsiByType(this.type.id ,this. paginazione).subscribe(next =>{
      this.type.corsi = next.list
    },error =>{
      
    } )
  }



}
