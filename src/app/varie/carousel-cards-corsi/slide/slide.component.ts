import { Component, Input, OnInit } from '@angular/core';
import { Corso } from 'src/app/model/Corso';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {

  @Input() corsi: Corso[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
