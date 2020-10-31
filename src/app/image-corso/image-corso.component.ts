import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-corso',
  templateUrl: './image-corso.component.html',
  styleUrls: ['./image-corso.component.css']
})
export class ImageCorsoComponent implements OnInit {

  @Input() codiceCorso;

  get getPath(){
    switch(this.codiceCorso) { 
      case "J": { 
        return this.path + "java.png"; 
        break; 
      } 
      case "A": { 
        return this.path + "angular.png";
         break; 
      } 
      case "B": { 
        return this.path + "boostrap.png";
         break; 
      }
      default: {
         break; 
      } 
    } 
  }

  path = "../../assets/images/";

  constructor() { }

  ngOnInit(): void {
    
  }

}
