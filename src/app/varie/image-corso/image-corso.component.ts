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
        return this.path + "J.png"; 
        break; 
      } 
      case "A": { 
        return this.path + "A.png";
         break; 
      } 
      case "B": { 
        return this.path + "B.png";
         break; 
      }
      default: {
        return this.path + "default.png";
         break; 
      } 
    } 
  }

  path = "../../assets/images/";

  constructor() { }

  ngOnInit(): void {
    
  }

}
