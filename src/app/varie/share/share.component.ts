import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  currentUrl : string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.currentUrl = this.router.url; 
  }

  get textWhatsapp(){
    return this.title + ' : ' + this.description;
  }

}
