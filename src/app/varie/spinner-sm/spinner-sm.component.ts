import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner-sm',
  templateUrl: './spinner-sm.component.html',
  styleUrls: ['./spinner-sm.component.css']
})
export class SpinnerSmComponent implements OnInit {

  @Input() show: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
