import { Component, Input, OnInit } from '@angular/core';
import { Corso } from 'src/app/model/Corso';

@Component({
  selector: 'app-rating-corso',
  templateUrl: './rating-corso.component.html',
  styleUrls: ['./rating-corso.component.css']
})
export class RatingCorsoComponent implements OnInit {

  @Input() corso: Corso;

  constructor() { }

  ngOnInit(): void {
  }

}
