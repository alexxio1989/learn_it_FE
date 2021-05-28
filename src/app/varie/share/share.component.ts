import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {

  @Input() url:string;
  @Input() title:string;
  @Input() description:string;

  @Input() small:boolean = true;

  @Input() onLeft:boolean = false;

  constructor() { }

  ngOnInit(): void {
   
  }

  get textWhatsapp(){
    return this.title + '  \n\n' + this.description;
  }

}
