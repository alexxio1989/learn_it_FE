import { Component, Input, OnInit } from '@angular/core';
import { Feedback } from 'src/app/model/Feedback';

@Component({
  selector: 'app-card-feedback',
  templateUrl: './card-feedback.component.html',
  styleUrls: ['./card-feedback.component.css']
})
export class CardFeedbackComponent implements OnInit {

  @Input() feed: Feedback;

  constructor() { }

  ngOnInit(): void {
  }

}
