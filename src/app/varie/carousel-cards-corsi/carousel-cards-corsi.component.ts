import { ChangeDetectorRef, Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
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
  @Output() typeEmitter = new EventEmitter<Dominio>();

  slides: Slide[] = [];
  isDevice: boolean;
  corsoSeleted: Corso;
  countDown:Subscription;
  counter = 4000;
  tick = 1000;
  widthSlide: number;
  paginazione = new Paginazione();
  loadNewCorsi: boolean;

  totCorsi: number;

  slideConfig = {
    infinite: true,
    slidesToShow: 1, 
    slidesToScroll: 1,
    dots: true,
    autoplay: false,
    autoplaySpeed: 2000 ,
    arrows: false,
    centerMode: true,
    focusOnSelect: false,
    variableWidth: true
  }

  
 
  constructor(private ds: DelegateServiceService,private deviceService: DeviceDetectorService , private cs: CorsoServiceService) { 
   
  }

  ngOnInit(): void {
    console.log('TOT CORSI : '+this.type.corsi.length)
    this.paginazione.numeroPerPagina = 3;
    this.isDevice = this.deviceService.isMobile() || this.deviceService.isTablet();

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


    this.widthSlide = 370 ;

    this.totCorsi = this.type.corsi[0].totOccurrences;
  
    this.type.configPagination = {id: ''+this.type.id, itemsPerPage: 3, currentPage: 0 , totalItems: this.totCorsi  }


  }




  
 
  
  removeSlide() {
    this.type.corsi.length = this.type.corsi.length - 1;
  }
  
  slickInit(e) {
  }
  
  breakpoint(e) {
  }
  
  afterChange(e) {
    let currentSlide = e.currentSlide;
    if(this.totCorsi > currentSlide && this.type.corsi.length < this.totCorsi  ){
      this.paginazione.pagina = 0
      this.paginazione.numeroPerPagina = this.paginazione.numeroPerPagina + 1;
      this.getCorsiByType();
    }
   
  }
  
  beforeChange(e) {
   
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
      page = page * 3
    } 
    this.type.configPagination.currentPage = event;
    this.paginazione.pagina = page
    this.getCorsiByType();
  }






  private getCorsiByType() {
    this.loadNewCorsi = true;
    this.cs.getCorsiByType(this.type.id, this.paginazione).subscribe(next => {
      this.loadNewCorsi = false;
      if(!this.isDevice){
        this.type.corsi = next.list;
      } else {

        next.list.forEach(newCorso => {
          let counter = 0;
          let retrivedCorsi = this.type.corsi.some(defaultCorso =>{
            return defaultCorso.id === newCorso.id
          })
       
          if(!retrivedCorsi){
            this.type.corsi.push(newCorso)
           
            this.typeEmitter.emit(this.type);
          }
        });
      
      }
    }, error => {
      this.loadNewCorsi = false;
    });
  }

  retrieveImg(base64:string){
    this.type.img = base64;

  }
}
